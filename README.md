# PARQ API
API server for an app called Parq that I am in the process of building.

The goal of the app is to serve as a purchase sharing platform

Creating a API Server

1) Initialize API dir with npm init

2) Install Express : npm install --save express

3) Install Mongoose to talk to MongoDB: npm install --save mongoose

4) npm install --save body-parser (For parsing JSON requests and responses)

5) npm install --save morgan (Logging framework)

6) Complete Server setups

7) Complete App Middleware setups

8) npm install --save nodemon for automatically restarting node server after file changes

9) Define Mongoose Models for MongoDB Documents

10) Install and Setup MongoDB. Run mongod command to start mongoDB

  ------------------------

To run the Node app with Docker:  
1) Install Docker : https://www.docker.com  

2) Build Docker Image from Dockerfile:  
 docker build -t parq .  

3) Run Docker Image inside Docker container and link it to MongoDB:  
docker run --rm --name -it --link db:db -p 3090:3090 parq  
