create table User (
user_name varchar(63) primary key,
user_account int default 100 not null,
new_message int default 0 not null,
avatar varchar(255) default '/help/getPicture/home/ubuntu/help/picture/defaultAvatar.png'
) character set = utf8;

create table Follow (
user_name varchar(63) not null,
follow_name varchar(63) not null,
FOREIGN KEY (user_name) REFERENCES User(user_name) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (follow_name) REFERENCES User(user_name) ON DELETE CASCADE ON UPDATE CASCADE
) character set = utf8;

create table Message (
message_id int auto_increment primary key,
user_name varchar(63) not null,
title varchar(63) not null,
content varchar(255) not null,
status int default 0 not null,
FOREIGN KEY (user_name) REFERENCES User(user_name) ON DELETE CASCADE ON UPDATE CASCADE
) character set = utf8;

create table Task (
task_id int auto_increment primary key,
sender_name varchar(63) not null,
title varchar(63) not null,
content varchar(1023) not null,
location varchar(255),
start_time date not null,
end_time date not null,
reward int not null,
tag int not null,
picture varchar(255),
status int default 0 not null,
FOREIGN KEY (sender_name) REFERENCES User(user_name) ON DELETE CASCADE ON UPDATE CASCADE
) character set = utf8;

create table Receiver (
task_id int primary key,
receiver_name varchar(63) not null,
FOREIGN KEY (task_id) REFERENCES Task(task_id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (receiver_name) REFERENCES User(user_name) ON DELETE CASCADE ON UPDATE CASCADE
) character set = utf8;

create table Comment (
task_id int primary key,
comment varchar(1023) not null,
FOREIGN KEY (task_id) REFERENCES Task(task_id) ON DELETE CASCADE ON UPDATE CASCADE
) character set = utf8;
=======
create table User (
user_name varchar(63) primary key,
user_account int default 100 not null,
new_message int default 0 not null,
avatar varchar(255) default '/help/getPicture/home/ubuntu/help/picture/defaultAvatar.png'
) character set = utf8;

create table Follow (
user_name varchar(63) not null,
follow_name varchar(63) not null,
FOREIGN KEY (user_name) REFERENCES User(user_name) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (follow_name) REFERENCES User(user_name) ON DELETE CASCADE ON UPDATE CASCADE
) character set = utf8;

create table Message (
message_id int auto_increment primary key,
user_name varchar(63) not null,
title varchar(63) not null,
content varchar(255) not null,
status int default 0 not null,
FOREIGN KEY (user_name) REFERENCES User(user_name) ON DELETE CASCADE ON UPDATE CASCADE
) character set = utf8;

create table Task (
task_id int auto_increment primary key,
sender_name varchar(63) not null,
title varchar(63) not null,
content varchar(1023) not null,
location varchar(20) not null,
start_time date not null,
end_time date not null,
reward int not null,
tag int not null,
picture blob,
status int default 0 not null,
FOREIGN KEY (sender_name) REFERENCES User(user_name) ON DELETE CASCADE ON UPDATE CASCADE
) character set = utf8;

create table Receiver (
task_id int primary key,
receiver_name varchar(63) not null,
FOREIGN KEY (task_id) REFERENCES Task(task_id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (receiver_name) REFERENCES User(user_name) ON DELETE CASCADE ON UPDATE CASCADE
) character set = utf8;

create table Comment (
task_id int primary key,
comment varchar(1023) not null,
FOREIGN KEY (task_id) REFERENCES Task(task_id) ON DELETE CASCADE ON UPDATE CASCADE
) character set = utf8;

create table User (
user_name varchar(63) primary key,
user_account int default 100 not null,
new_message int default 0 not null,
avatar varchar(255) default '/help/getPicture/home/ubuntu/help/picture/defaultAvatar.png'
) character set = utf8;

create table Follow (
user_name varchar(63) not null,
follow_name varchar(63) not null,
FOREIGN KEY (user_name) REFERENCES User(user_name) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (follow_name) REFERENCES User(user_name) ON DELETE CASCADE ON UPDATE CASCADE
) character set = utf8;

create table Message (
message_id int auto_increment primary key,
user_name varchar(63) not null,
title varchar(63) not null,
content varchar(255) not null,
status int default 0 not null,
FOREIGN KEY (user_name) REFERENCES User(user_name) ON DELETE CASCADE ON UPDATE CASCADE
) character set = utf8;

create table Task (
task_id int auto_increment primary key,
sender_name varchar(63) not null,
title varchar(63) not null,
content varchar(1023) not null,
location varchar(20) not null,
start_time date not null,
end_time date not null,
reward int not null,
tag int not null,
picture blob,
status int default 0 not null,
FOREIGN KEY (sender_name) REFERENCES User(user_name) ON DELETE CASCADE ON UPDATE CASCADE
) character set = utf8;

create table Receiver (
task_id int primary key,
receiver_name varchar(63) not null,
FOREIGN KEY (task_id) REFERENCES Task(task_id) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (receiver_name) REFERENCES User(user_name) ON DELETE CASCADE ON UPDATE CASCADE
) character set = utf8;

create table Comment (
task_id int primary key,
comment varchar(1023) not null,
FOREIGN KEY (task_id) REFERENCES Task(task_id) ON DELETE CASCADE ON UPDATE CASCADE
) character set = utf8;
