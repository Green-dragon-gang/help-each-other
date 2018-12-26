import pymysql
from flask import Flask, request, make_response
import random
import string

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

    def save_user(self, name, avatar):
        self.cur.execute("insert into User (user_name, avatar) values ('%s', '%s')" % (name, avatar))
        self.con.commit()

    def update_user_account(self, name, account):
        self.cur.execute("update User set user_account = %d where user_name = '%s'" % (account, name))
        self.con.commit()

    def save_task(self, sender_name, title, content, location, start_time, end_time, reward, tag, picture):
        self.cur.execute("insert into Task "
                         "(sender_name, title, content, location, start_time, end_time, reward, tag, picture)"
                         "values ('%s', '%s', '%s', '%s', '%s', '%s', %s, %s, '%s')"
                         % (sender_name, title, content, location, start_time, end_time, reward, tag, picture))
        self.con.commit()

    def create_message(self, user_name, title, content):
        self.cur.execute("insert into Message (user_name, title, content) "
                         "values ('%s', '%s', '%s')" % (user_name, title, content))
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
        self.cur.execute("select * from Task where task_id = %s" % task_id)
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
        self.cur.execute("delete from Task where task_id = %s" % task_id)
        self.con.commit()

    def save_receive(self, task_id, receiver_name):
        self.cur.execute("insert into Receiver (task_id, receiver_name) values (%s, '%s')" % (task_id, receiver_name))
        self.con.commit()

    def find_receive_by_task_id(self, task_id):
        self.cur.execute("select * from Receiver where task_id = %s" % task_id)
        result = self.cur.fetchall()

        return result

    def find_follow(self, user_name, follow_name):
        self.cur.execute("select * from Follow where user_name = '%s' and follow_name = '%s'" % (user_name, follow_name))
        result = self.cur.fetchall()

        return result

    def save_follow(self, user_name, follow_name):
        self.cur.execute("insert into Follow (user_name, follow_name) value ('%s', '%s')" % (user_name, follow_name))
        self.con.commit()

    def delete_follow(self, user_name, follow_name):
        self.cur.execute("delete from Follow where user_name = '%s' and follow_name = '%s'" % (user_name, follow_name))
        self.con.commit()

    def find_comment(self, task_id):
        self.cur.execute("select comment from Comment where task_id = %s" % task_id)
        result = self.cur.fetchall()

        return result

    def add_comment(self, task_id, comment):
        self.cur.execute("insert into Comment (task_id, comment) values (%s, '%s')" % (task_id, comment))
        self.con.commit()

    def find_message(self, user_name):
        self.cur.execute("select message_id, title, content, status from Message where user_name = '%s'" % user_name)
        result = self.cur.fetchall()

        return result

    def read_message(self, user_name):
        self.cur.execute("select new_message from User where user_name = '%s'" % user_name)
        result = self.cur.fetchall()
        new_message = 0
        if result[0]['new_message'] > 0:
            new_message = result[0]['new_message'] - 1
        self.cur.execute("update User set new_message = %s where user_name = '%s'" % (new_message, user_name))
        self.con.commit()

    def change_status(self, message_id):
        self.cur.execute("update Message set status = %d where message_id = %s" % (1, message_id))
        self.con.commit()

    def get_user_name_by_message_id(self, message_id):
        self.cur.execute("select user_name from Message where message_id = %s" % message_id)
        result = self.cur.fetchall()

        return result

    def set_task_status(self, task_id, status):
        self.cur.execute("update Task set status = %s where task_id = %s" % (status, task_id))
        self.con.commit()

    def get_avatar(self, user_name):
        self.cur.execute("select avatar from User where user_name = '%s'" % user_name)
        result = self.cur.fetchall()

        return result

    def get_receiver(self, task_id):
        self.cur.execute("select receiver_name from Receiver where task_id = %s" % task_id)
        result = self.cur.fetchall()

        return result

    def is_follow(self, user_name, follow_name):
        self.cur.execute("select * from Follow where user_name = '%s' and follow_name = '%s'" % (user_name, follow_name))
        result = self.cur.fetchall()

        return result

    def delete_receiver(self, task_id):
        self.cur.execute("delete from Receiver where task_id = %s" % task_id)
        self.con.commit()

    def create_event(self, end_time):
        pass


@app.route("/")
def hello():
    return '{\'success\': \'true\'}'


@app.route("/help/login", methods=['POST'])
def login():
    user_name = request.form['user_name']
    avatar = request.form['avatar']
    db = Database()
    res = db.find_user(user_name)
    if not res:
        db.save_user(user_name, avatar)
    db.close_db()
    return '{\"success\": \"true\"}'


@app.route("/help/getSelfInfo/<user_name>")
def get_self_info(user_name):
    db = Database()
    res = db.find_user(user_name)
    db.close_db()
    return str(res[0]).replace("\'", "\"")


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
    target_person_name = request.form['target_person_name']
    db = Database()
    # decline sender's account value when add task
    res0 = db.find_user(sender_name)
    if not res0:
        db.close_db()
        return '{\"success\": \"false\"}'
    else:
        if int(res0[0]['user_account']) < int(reward):
            db.close_db()
            return '{\"success\": \"false\"}'
        else:
            new_account = int(res0[0]['user_account']) - int(reward)
            db.update_user_account(sender_name, new_account)
            start_time = start_time.replace('-', '/')
            end_time = end_time.replace('-', '/')

    db.save_task(sender_name, title, content, location, start_time, end_time, reward, tag, picture)

    if target_person_name != 'null':
        res = db.find_user(target_person_name)
        # 如果不存在这个人返回false
        if res:
            message_title = '任务邀请'
            message_content = str(" %s 发布的任务 %s 邀请您来完成哦" % (sender_name, title))
            db.create_message(target_person_name, message_title, message_content)
            db.add_message(target_person_name)
            db.close_db()
            return '{\"success\": \"true\"}'
        else:
            db.close_db()
            return '{\"success\": \"false\"}'
    else:
        db.close_db()
        return '{\"success\": \"true\"}'


@app.route("/help/getFriends/<user_name>")
def get_friends(user_name):
    db = Database()
    res = db.get_friends(user_name)
    db.close_db()
    return str(res).replace("\'", "\"")


@app.route("/help/getTasks")
def get_tasks():
    db = Database()
    res = db.get_tasks()
    db.close_db()
    return str(res).replace("\'", "\"")


@app.route("/help/getTaskById/<task_id>")
def get_task_by_id(task_id):
    db = Database()
    res = db.get_task_by_id(task_id)
    db.close_db()
    return str(res[0]).replace("\'", "\"")


@app.route("/help/getTasksBySender/<sender_name>")
def get_tasks_by_sender(sender_name):
    db = Database()
    res = db.get_task_by_sender(sender_name)
    db.close_db()
    return str(res).replace("\'", "\"")


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
        temp = str(res)
        temp = temp.replace("\'", "\"")
        position = temp.find("{")
        while position != -1:
            temp = temp[:position - 1] + temp[position:]
            position = temp.find("{", position + 1)
        position = temp.find("}")
        while position != -1:
            temp = temp[:position + 1] + temp[position + 2:]
            position = temp.find("}", position + 1)
        return temp


@app.route("/help/deleteTask", methods=['POST'])
def delete_task():
    task_id = request.form['task_id']
    db = Database()
    res = db.get_task_by_id(task_id)
    if not res:
        db.close_db()
        return '{\"success\": \"false\"}'
    if res[0]['status'] == 0:
        # give back money to sender
        sender_name = res[0]['sender_name']
        new_account = int(db.find_user(sender_name)[0]['user_account']) + int(res[0]['reward'])
        db.update_user_account(sender_name, new_account)

        db.delete_task(task_id)
        db.close_db()
        return '{\"success\": \"true\"}'
    else:
        db.close_db()
        return '{\"success\": \"false\"}'


@app.route("/help/acceptTask", methods=['POST'])
def accept_task():
    task_id = request.form['task_id']
    receiver_name = request.form['receiver_name']
    db = Database()
    res = db.find_receive_by_task_id(task_id)
    if not res:
        db.save_receive(task_id, receiver_name)
        db.set_task_status(task_id, 1)

        # send message to sender
        message_title = '有人接受了您的任务'
        task = db.get_task_by_id(task_id)
        task_name = task[0]['title']
        sender_name = task[0]['sender_name']
        message_content = str("您的任务 %s 被 %s 接受" % (task_name, receiver_name))
        db.create_message(sender_name, message_title, message_content)
        db.add_message(sender_name)

        db.close_db()
        return '{\"success\": \"true\"}'
    else:
        db.close_db()
        return '{\"success\": \"false\"}'


@app.route("/help/finishTask", methods=['POST'])
def finish_task():
    task_id = request.form['task_id']
    db = Database()
    # give reward to receiver
    res = db.get_task_by_id(task_id)
    if not res:
        return '{\"success\": \"false\"}'
    elif res[0]['status'] != 1:
        return '{\"success\": \"false\"}'
    else:
        receiver_name = db.get_receiver(task_id)[0]['receiver_name']
        new_account = int(db.find_user(receiver_name)[0]['user_account']) + int(res[0]['reward'])
        db.update_user_account(receiver_name, new_account)

    db.set_task_status(task_id, 2)

    # send message to sender
    message_title = '有人完成了您的任务'
    task = db.get_task_by_id(task_id)
    task_name = task[0]['title']
    sender_name = task[0]['sender_name']
    message_content = str("您的任务 %s 被 %s 完成" % (task_name, receiver_name))
    db.create_message(sender_name, message_title, message_content)
    db.add_message(sender_name)

    db.close_db()
    return '{\"success\": \"true\"}'


@app.route("/help/follow", methods=['POST'])
def follow():
    user_name = request.form['user_name']
    follow_name = request.form['follow_name']
    db = Database()
    res = db.find_follow(user_name, follow_name)
    if res:
        db.close_db()
        return '{\"success\": \"false\"}'
    else:
        db.save_follow(user_name, follow_name)

        # send message to follow
        message_title = '有人悄悄关注了您哦'
        message_content = str("您真是魅力四射呢！！")
        db.create_message(user_name, message_title, message_content)
        db.add_message(user_name)

        db.close_db()
        return '{\"success\": \"true\"}'


@app.route("/help/unfollow", methods=['POST'])
def unfollow():
    user_name = request.form['user_name']
    follow_name = request.form['follow_name']
    db = Database()
    res = db.find_follow(user_name, follow_name)
    if not res:
        db.close_db()
        return '{\"success\": \"false\"}'
    else:
        db.delete_follow(user_name, follow_name)
        db.close_db()
        return '{\"success\": \"true\"}'


@app.route("/help/addComment", methods=['POST'])
def add_comment():
    task_id = request.form['task_id']
    comment = request.form['comment']
    db = Database()
    res = db.find_comment(task_id)
    if res:
        return '{\"success\": \"false\"}'
    else:
        db.add_comment(task_id, comment)
        # send message to receiver
        message_title = '您完成的任务被评论啦'
        receiver_name = db.get_receiver(task_id)
        task = db.get_task_by_id(task_id)
        task_name = task[0]['title']
        sender_name = task[0]['sender_name']
        message_content = str("您的完成的任务 %s 被 %s 评论啦，快去查看吧" % (task_name, sender_name))
        db.create_message(receiver_name, message_title, message_content)
        db.add_message(receiver_name)

        db.close_db()
        return '{\"success\": \"true\"}'


@app.route("/help/getComment/<task_id>")
def get_comment(task_id):
    db = Database()
    res = db.find_comment(task_id)
    db.close_db()
    if res:
        return str(res[0]).replace("\'", "\"")
    else:
        return '{}'


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
        return str(res).replace("\'", "\"")


@app.route("/help/getMessage/<user_name>")
def get_message(user_name):
    db = Database()
    res = db.find_message(user_name)
    db.close_db()
    return str(res).replace("\'", "\"")


@app.route("/help/readMessage", methods=['POST'])
def read_message():
    message_id = request.form['message_id']
    db = Database()
    user_name = db.get_user_name_by_message_id(message_id)[0]['user_name']
    db.read_message(user_name)
    db.change_status(message_id)
    db.close_db()
    return '{\"success\": \"true\"}'


@app.route("/help/uploadPicture", methods=['POST'])
def upload_picture():
    f = request.files['picture']
    seed = "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    sa = []
    for i in range(32):
        sa.append(random.choice(seed))
    salt = ''.join(sa)
    salt += '.png'
    path = '/home/ubuntu/help/picture/%s' % salt
    f.save(path)
    url = 'http://129.204.29.200:8080/help/getPicture/%s' % salt
    return '{\"url\": \"%s\"}' % url


@app.route("/help/getPicture/<relative_path>")
def get_picture(relative_path):
    path = '/home/ubuntu/help/picture/%s' % relative_path
    image_data = open(path, "rb").read()
    response = make_response(image_data)
    response.headers['Content-Type'] = 'image/png'
    return response


@app.route("/help/getAvatar/<user_name>")
def get_avatar(user_name):
    db = Database()
    res = db.get_avatar(user_name)
    db.close_db()
    return str(res[0]).replace("\'", "\"")


@app.route("/help/getReceiver/<task_id>")
def get_receiver(task_id):
    db = Database()
    res = db.get_receiver(task_id)
    db.close_db()
    if not res:
        return '{\"receiver_name\": \"null\"}'
    else:
        return str(res[0]).replace("\'", "\"")


@app.route("/help/isFollow/<user_name>/<follow_name>")
def is_follow(user_name, follow_name):
    db = Database()
    res = db.is_follow(user_name, follow_name)
    db.close_db()
    if res:
        return '{\"success\": \"true\"}'
    else:
        return '{\"success\": \"false\"}'


@app.route("/help/abandonTask/<task_id>")
def abandon_task(task_id):
    db = Database()
    res = db.get_task_by_id(task_id)
    if not res:
        db.close_db()
        return '{\"success\": \"false\"}'
    res = db.get_receiver(task_id)
    if not res:
        db.close_db()
        return '{\"success\": \"false\"}'
    db.set_task_status(task_id, 0)
    db.delete_receiver(task_id)

    # send message to sender
    message_title = '您的任务被放弃'
    task = db.get_task_by_id(task_id)
    task_name = task[0]['title']
    sender_name = task[0]['sender_name']
    message_content = str("您的任务 %s 被放弃，重新进入任务列表。" % task_name)
    db.create_message(sender_name, message_title, message_content)
    db.add_message(sender_name)

    db.close_db()
    return '{\"success\": \"true\"}'


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
