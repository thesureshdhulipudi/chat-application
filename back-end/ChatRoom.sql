delete users;
delete chat_message;
drop table chat_room;
drop table chat_room_user;
drop table chat_room_message;
drop table chat_room_message_recevier;
--drop table users;
--drop table chat_message;
--drop table chat_room;
--drop table chat_room_user;
--drop table chat_room_message;
--drop table chat_room_message_recevier;
create table users(
	id int identity(1,1) PRIMARY KEY,
	user_id varchar(250) unique,
	first_name varchar(250) not null,
	last_name varchar(250),
	created_timestamp datetime not null,
	last_login_timestamp datetime,
	avatar_url varchar(250),
	description varchar(250),
	status bit
	);
create table chat_message(
	id int identity(1,1) PRIMARY KEY,
	chatId varchar(250),
	message text not null,
	sender_user_id int not null,
	recevier_user_id int not null,
	message_status varchar(250) not null,
	message_timestamp datetime not null
	);
create table chat_room(
	id int identity(1,1) PRIMARY KEY,
	chat_room_name varchar(250) not null unique,
	chat_room_description varchar(250) not null,
	created_timestamp datetime not null
	);
create table chat_room_user(
	chat_room_id int not null,
	user_id int not null
	);
create table chat_room_message(
	id int identity(1,1) PRIMARY KEY,
	message text not null,
	chat_room_id int not null,
	sender_user_id int not null,
	message_timestamp datetime not null
	);
create table chat_room_message_recevier(
	chat_room_message_id int not null,
	message_status varchar(250) not null,
	recevier_user_id int not null
	);
	
GO
ALTER TABLE [dbo].[chat_message]  WITH CHECK ADD  CONSTRAINT [FK_chat_message_sender_id] FOREIGN KEY([sender_user_id])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[chat_message]  WITH CHECK ADD  CONSTRAINT [FK_chat_message_recevier_id] FOREIGN KEY([recevier_user_id])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[chat_room_user]  WITH CHECK ADD  CONSTRAINT [FK_chat_room_user_chat_room_id] FOREIGN KEY([chat_room_id])
REFERENCES [dbo].[chat_room] ([id])
GO
ALTER TABLE [dbo].[chat_room_user]  WITH CHECK ADD  CONSTRAINT [FK_chat_room_user_id] FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[chat_room_message]  WITH CHECK ADD  CONSTRAINT [FK_chat_room_id] FOREIGN KEY([chat_room_id])
REFERENCES [dbo].[chat_room] ([id])
GO
ALTER TABLE [dbo].[chat_room_message]  WITH CHECK ADD  CONSTRAINT [FK_chat_room_sender_user_id] FOREIGN KEY([sender_user_id])
REFERENCES [dbo].[chat_room_message] ([id])
GO
ALTER TABLE [dbo].[chat_room_message_recevier]  WITH CHECK ADD  CONSTRAINT [FK_chat_room_message_id] FOREIGN KEY([chat_room_message_id])
REFERENCES [dbo].[chat_room] ([id])
GO
ALTER TABLE [dbo].[chat_room_message_recevier]  WITH CHECK ADD  CONSTRAINT [FK_chat_room_recevier_user_id] FOREIGN KEY([recevier_user_id])
REFERENCES [dbo].[users] ([id])
GO