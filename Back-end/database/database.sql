CREATE DATABASE IF NOT EXISTS students;

USE students;

CREATE TABLE student (
	id_student int not null,
	firstName varchar(255) not null,
	lastName varchar(255) not null,
	email varchar(255) not null,
	age int not null,
	PRIMARY KEY (id_student)
);

CREATE TABLE users(
	userId varchar(150) not null,
	password varchar(255) not null,
	id_student int,
	PRIMARY KEY (userId),
	FOREIGN KEY (id_student) references student(id_student)
);

CREATE TABLE courses(
	nameCourse varchar(100),
	id_student int,
	start_course time,
	end_course time,
	day varchar(100),
	CONSTRAINT PK_courses PRIMARY KEY (nameCourse, id_student, 
		day),
	FOREIGN KEY (id_student) references student(id_student)
);

CREATE TABLE location(
	id_student int,
	country varchar(100) not null,
	state varchar(100) not null,
	CONSTRAINT PK_userLocation PRIMARY KEY (id_student,state),
	FOREIGN KEY (id_student) references student(id_student)
);

CREATE TABLE professors(
	professorsId int auto_increment,
	firstName varchar(100) not null,
	lastName varchar(100) not null,
	email varchar(255) not null,
	phone varchar(150),
	description varchar(255),
	CONSTRAINT PK_professor PRIMARY KEY (professorsId,email)
);

