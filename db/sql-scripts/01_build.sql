-- ************************************** user

CREATE TYPE USER_TYPE AS ENUM ('ADMIN', 'PROFESSOR', 'STUDENT');
CREATE TYPE STRATEGY_TYPE AS ENUM ('LOCAL', 'GOOGLE', 'FACEBOOK', 'OPENID');

CREATE TABLE IF NOT EXISTS user_account (
  id           SERIAL PRIMARY KEY ,
  first_name   VARCHAR(50) NOT NULL ,
  last_name    VARCHAR(50) NOT NULL ,
  tel          VARCHAR(20) NOT NULL ,
  email        VARCHAR(100) NOT NULL UNIQUE ,
  password     VARCHAR(60) ,
  type         USER_TYPE NOT NULL ,
  token        VARCHAR(100) UNIQUE ,
  strategy     STRATEGY_TYPE NOT NULL ,
  identifier   VARCHAR(100) ,
  approved     BOOLEAN NOT NULL
);


-- ************************************** project

CREATE TABLE IF NOT EXISTS project
(
  id           SERIAL PRIMARY KEY ,
  name         VARCHAR(100) NOT NULL ,
  min_students INT NOT NULL ,
  max_students INT ,
  description  TEXT NOT NULL ,
  author_id    INT NOT NULL ,
  visibility   INT NOT NULL ,
  slug         VARCHAR(30) NOT NULL ,
  tag_id       INT[] ,

  FOREIGN KEY (author_id) REFERENCES user_account (id)
);


-- ************************************** document

CREATE TABLE IF NOT EXISTS document
(
  id       SERIAL PRIMARY KEY ,
  location VARCHAR(255) NOT NULL ,
  user_id  INT NOT NULL ,

  FOREIGN KEY (user_id) REFERENCES user_account (id)
);


-- ************************************** application

CREATE TABLE IF NOT EXISTS application
(
  id         SERIAL PRIMARY KEY ,
  student_id INT NOT NULL ,
  project_id INT NOT NULL ,
  proposal   TEXT NOT NULL ,
  accepted   INT NOT NULL ,

  FOREIGN KEY (student_id) REFERENCES user_account (id),
  FOREIGN KEY (project_id) REFERENCES project (id)
);


-- ************************************** tag

CREATE TABLE IF NOT EXISTS tag
(
  id          SERIAL PRIMARY KEY ,
  text        VARCHAR(50) NOT NULL ,
  project_id  INT[]
);


-- ************************************** application_document

CREATE TABLE IF NOT EXISTS application_document
(
  id             SERIAL PRIMARY KEY ,
  application_id INT NOT NULL ,
  document_id    INT NOT NULL ,
  title          VARCHAR(100) ,

  FOREIGN KEY (application_id) REFERENCES application (id),
  FOREIGN KEY (document_id) REFERENCES document (id)
);


-- ************************************** project_document

CREATE TABLE IF NOT EXISTS project_document
(
  id          SERIAL PRIMARY KEY ,
  project_id  INT NOT NULL ,
  document_id INT NOT NULL ,
  title       VARCHAR(100) NOT NULL ,

  FOREIGN KEY (project_id) REFERENCES project (id),
  FOREIGN KEY (document_id) REFERENCES document (id)
);


