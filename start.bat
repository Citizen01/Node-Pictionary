REM This script will create the db folder for mongodb if it doesn't exist,
REM It will then start the mongodb server and then the node server in 2 different cmd window.

IF EXIST ./db GOTO START_SERVERS
	MKDIR db

:START_SERVERS
REM Start the mongodb server
START cmd /C mongod --dbpath ./db

REM Start the node server
START cmd /K nodemon -e js,html,css app.js