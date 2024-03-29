USE [master]
GO
/****** Object:  Database [ChatRoom]    Script Date: 8/30/2022 5:54:31 AM ******/
CREATE DATABASE [ChatRoom]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ChatRoom', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\ChatRoom.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ChatRoom_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\ChatRoom_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [ChatRoom] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ChatRoom].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ChatRoom] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ChatRoom] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ChatRoom] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ChatRoom] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ChatRoom] SET ARITHABORT OFF 
GO
ALTER DATABASE [ChatRoom] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ChatRoom] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ChatRoom] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [ChatRoom] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ChatRoom] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ChatRoom] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ChatRoom] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ChatRoom] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ChatRoom] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ChatRoom] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ChatRoom] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ChatRoom] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ChatRoom] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ChatRoom] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ChatRoom] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ChatRoom] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ChatRoom] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ChatRoom] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [ChatRoom] SET  MULTI_USER 
GO
ALTER DATABASE [ChatRoom] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [ChatRoom] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ChatRoom] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ChatRoom] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ChatRoom] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ChatRoom] SET QUERY_STORE = OFF
GO
USE [ChatRoom]
GO
/****** Object:  Table [dbo].[chat_message]    Script Date: 8/30/2022 5:54:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chat_message](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[chat_id] [varchar](255) NULL,
	[message] [varchar](255) NULL,
	[message_status] [int] NULL,
	[message_timestamp] [datetime2](7) NULL,
	[recevier_user_id] [bigint] NOT NULL,
	[sender_user_id] [bigint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[chat_room]    Script Date: 8/30/2022 5:54:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chat_room](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[avatar_url] [varchar](255) NULL,
	[chat_room_description] [varchar](255) NULL,
	[chat_room_name] [varchar](255) NULL,
	[created_by] [bigint] NULL,
	[created_timestamp] [datetime2](7) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[chat_room_message]    Script Date: 8/30/2022 5:54:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chat_room_message](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[message] [varchar](255) NULL,
	[message_timestamp] [datetime2](7) NULL,
	[sender_user_id] [bigint] NULL,
	[chat_room_id] [bigint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[chat_room_message_recevier]    Script Date: 8/30/2022 5:54:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chat_room_message_recevier](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[message_status] [int] NULL,
	[recevier_user_id] [bigint] NULL,
	[chat_room_message_id] [bigint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[chat_room_user]    Script Date: 8/30/2022 5:54:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[chat_room_user](
	[chat_room_id] [bigint] NOT NULL,
	[user_id] [bigint] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 8/30/2022 5:54:31 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[avatar_url] [varchar](255) NULL,
	[created_timestamp] [datetime2](7) NULL,
	[description] [varchar](255) NULL,
	[first_name] [varchar](255) NULL,
	[last_login_timestamp] [datetime2](7) NULL,
	[last_name] [varchar](255) NULL,
	[password] [varchar](255) NULL,
	[status] [int] NULL,
	[user_id] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[chat_message]  WITH CHECK ADD  CONSTRAINT [FK8lc8xyp0hf2nhy2i84w3a33l0] FOREIGN KEY([sender_user_id])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[chat_message] CHECK CONSTRAINT [FK8lc8xyp0hf2nhy2i84w3a33l0]
GO
ALTER TABLE [dbo].[chat_message]  WITH CHECK ADD  CONSTRAINT [FKoq4ovu3escm7vmnj21v7fhht0] FOREIGN KEY([recevier_user_id])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[chat_message] CHECK CONSTRAINT [FKoq4ovu3escm7vmnj21v7fhht0]
GO
ALTER TABLE [dbo].[chat_room_message]  WITH CHECK ADD  CONSTRAINT [FKj8dlx5ourmappdky3fmd6siov] FOREIGN KEY([chat_room_id])
REFERENCES [dbo].[chat_room] ([id])
GO
ALTER TABLE [dbo].[chat_room_message] CHECK CONSTRAINT [FKj8dlx5ourmappdky3fmd6siov]
GO
ALTER TABLE [dbo].[chat_room_message_recevier]  WITH CHECK ADD  CONSTRAINT [FKee7vyqg9oe4ahhamj8a30svfa] FOREIGN KEY([chat_room_message_id])
REFERENCES [dbo].[chat_room_message] ([id])
GO
ALTER TABLE [dbo].[chat_room_message_recevier] CHECK CONSTRAINT [FKee7vyqg9oe4ahhamj8a30svfa]
GO
ALTER TABLE [dbo].[chat_room_user]  WITH CHECK ADD  CONSTRAINT [FK1483pmv1lx4x5py5gm0m1109v] FOREIGN KEY([user_id])
REFERENCES [dbo].[users] ([id])
GO
ALTER TABLE [dbo].[chat_room_user] CHECK CONSTRAINT [FK1483pmv1lx4x5py5gm0m1109v]
GO
ALTER TABLE [dbo].[chat_room_user]  WITH CHECK ADD  CONSTRAINT [FKn7wfsq1ii61la6vi9gigw4pk1] FOREIGN KEY([chat_room_id])
REFERENCES [dbo].[chat_room] ([id])
GO
ALTER TABLE [dbo].[chat_room_user] CHECK CONSTRAINT [FKn7wfsq1ii61la6vi9gigw4pk1]
GO
USE [master]
GO
ALTER DATABASE [ChatRoom] SET  READ_WRITE 
GO
