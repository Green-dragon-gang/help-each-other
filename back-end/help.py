import pymysql
from flask import Flask, request, make_response

app = Flask(__name__)


class Database:
    def __init__(self):
        host = "127.0.0.1"
        user = "root"
        password = "123123"
        db = "help"

        self.con = pymysql.connect(host=host, user=user, password=password, db=db, cursorclass=pymysql.cursors.
                                   DictCursor)
        self.cur = self.con.cursor()

    def close_db(self):
        self.con.close()

    def find_user(self, name):
        self.cur.execute("select * from User where user_name = '%s'" % name)
        result = self.cur.fetchall()

        return result

    def save_user(self, name):
        self.cur.execute("insert into User (user_name) values ('%s')" % name)
        self.con.commit()

    def save_task(self, sender_name, title, content, location, start_time, end_time, reward, tag, picture):
        self.cur.execute("insert into Task "
                         "(sender_name, title, content, location, start_time, end_time, reward, tag, picture)"
                         "values ('%s', '%s', '%s', '%s', '%s', '%s', '%d', '%d', '%s')"
                         % sender_name, title, content, location, start_time, end_time, reward, tag, picture)
        self.con.commit()
        return self.cur.lastrowid

    def create_message(self, user_name, title, content):
        self.cur.execute("insert into Message (user_name, title, content) "
                         "values ('%s', '%s', '%s')" % user_name, title, content)
        self.con.commit()

    def add_message(self, name):
        self.cur.execute("update User set new_message = new_message + 1 where user_name = '%s'" % name)
        self.con.commit()

    def get_friends(self, name):
        self.cur.execute("select follow_name from Follow where user_name = '%s'" % name)
        result = self.cur.fetchall()

        return result

    def get_tasks(self):
        self.cur.execute("select * from Task")
        result = self.cur.fetchall()

        return result

    def get_task_by_id(self, task_id):
        self.cur.execute("select * from Task where task_id = %d" % task_id)
        result = self.cur.fetchall()

        return result

    def get_task_by_sender(self, sender_name):
        self.cur.execute("select * from Task where sender_name = '%s'" % sender_name)
        result = self.cur.fetchall()

        return result

    def get_task_by_receiver(self, receiver_name):
        self.cur.execute("select task_id from Receiver where receiver_name = '%s'" % receiver_name)
        result = self.cur.fetchall()

        return result

    def delete_task(self, task_id):
        self.cur.execute("delete from Task where task_id = %d" % task_id)
        self.con.commit()

    def save_receive(self, task_id, receiver_name):
        self.cur.execute("insert into Receiver (task_id, receiver_name) values (%d, '%s')" % task_id, receiver_name)
        self.con.commit()

    def find_receive_by_task_id(self, task_id):
        self.cur.execute("select * from Receiver where task_id = %d" % task_id)
        result = self.cur.fetchall()

        return result

    def find_follow(self, user_name, follow_name):
        self.cur.execute("select * from Follow where user_name = '%s' and follow_name = '%s'" % user_name, follow_name)
        result = self.cur.fetchall()

        return result

    def save_follow(self, user_name, follow_name):
        self.cur.execute("insert into Follow (user_name, follow_name) value ('%s', '%s')" % user_name, follow_name)
        self.con.commit()

    def delete_follow(self, user_name, follow_name):
        self.cur.execute("delete from Follow where user_name = '%s' and follow_name = '%s'" % user_name, follow_name)
        self.con.commit()

    def find_comment(self, task_id):
        self.cur.execute("select (comment) from Comment where task_id = %d" % task_id)
        result = self.cur.fetchall()

        return result

    def add_comment(self, task_id, comment):
        self.cur.execute("insert into Comment (task_id, comment) values (%d, '%s')" % task_id, comment)
        self.con.commit()

    def find_message(self, user_name):
        self.cur.execute("select (message_id, title, content, status) from Message where user_name = '%s'" % user_name)
        result = self.cur.fetchall()

        return result

    def read_message(self, user_name):
        self.cur.execute("select (new_message) from User where user_name = '%s'" % user_name)
        result = self.cur.fetchall()
        new_message = 0
        if result[0]['user_name'] > 0:
            new_message = result[0]['user_name'] - 1
        self.cur.execute("update User set new_message = %d where user_name = '%s'" % new_message, user_name)
        self.con.commit()

    def get_user_name_by_message_id(self, message_id):
        self.cur.execute("select (user_name) from Message where message_id = %d" % message_id)
        result = self.cur.fetchall()

        return result

    def set_task_status(self, task_id, status):
        self.cur.execute("update Task set status = %d where task_id = %d" % status, task_id)
        self.con.commit()

    def get_avatar(self, user_name):
        self.cur.execute("select (avatar) from User where user_name = '%s'" % user_name)
        result = self.cur.fetchall()

        return result

    def get_receiver(self, task_id):
        self.cur.execute("select (receiver_name) from Receiver where task_id = %d" % task_id)
        result = self.cur.fetchall()

        return result

    def is_follow(self, user_name, follow_name):
        self.cur.execute("select * from Follow where user_name = '%s' and follow_name = '%s'" % user_name, follow_name)
        result = self.cur.fetchall()

        return result


@app.route("/")
def hello():
    return '{\'success\': \'true\'}'


@app.route("/help/login/<user_name>")
def login(user_name):
    db = Database()
    res = db.find_user(user_name)
    if not res:
        db.save_user(user_name)
    db.close_db()
    return '{\'success\': \'true\'}'


@app.route("/help/getSelfInfo/<user_name>")
def get_self_info(user_name):
    db = Database()
    res = db.find_user(user_name)
    if not res:
        db.save_user(user_name)
    res = db.find_user(user_name)
    db.close_db()
    return res


@app.route("/help/addTask", methods=['POST'])
def add_task():
    sender_name = request.form['sender_name']
    title = request.form['title']
    content = request.form['content']
    location = request.form['location']
    start_time = request.form['start_time']
    end_time = request.form['end_time']
    reward = request.form['reward']
    tag = request.form['tag']
    picture = request.form['picture']
    target_person_name = request.form['target_person_id']
    db = Database()
    task_id = db.save_task(sender_name, title, content, location, start_time, end_time, reward, tag, picture)
    if target_person_name != 'null':
        res = db.find_user(target_person_name)
        # 如果不存在这个人返回false
        if res:
            message_title = 'Invitation'
            message_content = str("task id: %s" % task_id)
            db.create_message(target_person_name, message_title, message_content)
            db.add_message(target_person_name)
            db.close_db()
            return '{\'success\': \'true\'}'
        else:
            db.close_db()
            return '{\'success\': \'false\'}'
    else:
        db.close_db()
        return '{\'success\': \'true\'}'


@app.route("/help/getFriends/<user_name>")
def get_friends(user_name):
    db = Database()
    res = db.get_friends(user_name)
    db.close_db()
    return res


@app.route("/help/getTasks")
def get_tasks():
    db = Database()
    res = db.get_tasks()
    db.close_db()
    return res


@app.route("/help/getTaskById/<task_id>")
def get_task_by_id(task_id):
    db = Database()
    res = db.get_task_by_id(task_id)
    db.close_db()
    return res


@app.route("/help/getTasksBySender/<sender_name>")
def get_tasks_by_sender(sender_name):
    db = Database()
    res = db.get_task_by_sender(sender_name)
    db.close_db()
    return res


@app.route("/help/getTasksByReceiver/<receiver_name>")
def get_tasks_by_receiver(receiver_name):
    db = Database()
    task_ids = db.get_task_by_receiver(receiver_name)
    if not task_ids:
        db.close_db()
        return "{}"
    else:
        res = []
        for result in task_ids:
            res.append(get_task_by_id(result['task_id']))
        db.close_db()
        return res


@app.route("/help/deleteTask", methods=['POST'])
def delete_task():
    task_id = request.form['task_id']
    db = Database()
    db.delete_task(task_id)
    db.close_db()
    return '{\'success\': \'true\'}'


@app.route("/help/acceptTask", methods=['POST'])
def accept_task():
    task_id = request.form['task_id']
    receiver_name = request.form['receiver_name']
    db = Database()
    res = db.find_receive_by_task_id(task_id)
    if not res:
        db.save_receive(task_id, receiver_name)
        db.set_task_status(task_id, 1)
        db.close_db()
        return '{\'success\': \'true\'}'
    else:
        db.close_db()
        return '{\'success\': \'false\'}'


@app.route("/help/finishTask", methods=['POST'])
def finish_task():
    task_id = request.form['task_id']
    db = Database()
    db.set_task_status(task_id, 2)
    db.close_db()
    return '{\'success\': \'true\'}'


@app.route("/help/follow", methods=['POST'])
def follow():
    user_name = request.form['user_name']
    follow_name = request.form['follow_name']
    db = Database()
    res = db.find_follow(user_name, follow_name)
    if res:
        db.close_db()
        return '{\'success\': \'false\'}'
    else:
        db.save_follow(user_name, follow_name)
        db.close_db()
        return '{\'success\': \'true\'}'


@app.route("/help/unfollow", methods=['POST'])
def unfollow():
    user_name = request.form['user_name']
    follow_name = request.form['follow_name']
    db = Database()
    res = db.find_follow(user_name, follow_name)
    if not res:
        db.close_db()
        return '{\'success\': \'false\'}'
    else:
        db.delete_follow(user_name, follow_name)
        db.close_db()
        return '{\'success\': \'true\'}'


@app.route("/help/addComment", methods=['POST'])
def add_comment():
    task_id = request.form['task_id']
    comment = request.form['comment']
    db = Database()
    db.add_comment(task_id, comment)
    db.close_db()
    return '{\'success\': \'true\'}'


@app.route("/help/getComment/<task_id>")
def get_comment(task_id):
    db = Database()
    res = db.find_comment(task_id)
    db.close_db()
    return res


@app.route("/help/getTaskWithoutComment/<user_name>")
def get_task_without_comment(user_name):
    db = Database()
    tasks = db.get_task_by_sender(user_name)
    if not tasks:
        return '{}'
    else:
        task_ids = []
        for task in tasks:
            if task['status'] == 2:
                task_ids.append(task['task_id'])
        need_comment = []
        for task_id in task_ids:
            temp_res = db.find_comment(task_id)
            if not temp_res:
                need_comment.append(task_id)
        res = []
        for task_id in need_comment:
            res.append(db.get_task_by_id(task_id))
        return res


@app.route("/help/getMessage/<user_name>")
def get_message(user_name):
    db = Database()
    res = db.find_message(user_name)
    db.close_db()
    return res


@app.route("/help/readMessage", methods=['POST'])
def read_message():
    message_id = request.form['message_id']
    db = Database()
    user_name = db.get_user_name_by_message_id(message_id)[0]['user_name']
    db.read_message(user_name)
    db.close_db()
    return '{\'success\': \'true\'}'


@app.route("/help/uploadPicture", methods=['POST'])
def upload_picture():
    f = request.files['picture']
    path = '/home/ubuntu/help/picture/%s' % f.filename
    f.save(path)
    url = '/help/getPicture%s' % path
    return '{\'url\': \'%s\'}' % url


@app.route("/help/getPicture/<relative_path>")
def get_picture(relative_path):
    image_data = open(relative_path, "rb").read()
    response = make_response(image_data)
    response.headers['Content-Type'] = 'image/png'
    return response


@app.route("/help/getAvatar/<user_name>")
def get_avatar(user_name):
    db = Database()
    res = db.get_avatar(user_name)
    db.close_db()
    relative_path = '/help/getPicture/home/ubuntu/help/picture/defaultAvatar.png'
    if res:
        relative_path = res[0]['avatar']
    image_data = open(relative_path, "rb").read()
    response = make_response(image_data)
    response.headers['Content-Type'] = 'image/png'
    return response


@app.route("/help/getReceiver/<task_id>")
def get_receiver(task_id):
    db = Database()
    res = db.get_receiver(task_id)
    db.close_db()
    if not res:
        return '{\'receiver_name\': \'null\'}'
    else:
        return res


@app.route("/help/isFollow/<user_name>/<follow_name>")
def is_follow(user_name, follow_name):
    db = Database()
    res = db.is_follow(user_name, follow_name)
    db.close_db()
    if res:
        return '{\'success\': \'true\'}'
    else:
        return '{\'success\': \'false\'}'


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
