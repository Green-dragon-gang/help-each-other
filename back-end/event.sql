delimiter //
create event test
on schedule every 1 hour
on completion preserve
do begin
update Task INNER JOIN User ON Task.sender_name = User.user_name set User.user_account = User.user_account + Task.reward, status = 3 where Task.end_time < now() and Task.status < 2;
end //
delimiter ;
