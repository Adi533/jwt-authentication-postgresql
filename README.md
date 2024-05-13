Hi, This is Aditya, below is the brief overview of the app. So having previous experience with working on jwt authentication , I was able to create it quickly, the only problem is previously i had used mongodb but this i need to use postgresql so that was my only challenge for this app.

Files: 

index.js -- main server file

pg.js -- main database file includes functions like creating client and creating table

error.js -- custom error handler is here

verfifyToken.js -- verifies our token to grant access to protected routes

Folders:

Routes - contain all routes 

controllers - contain all function to be used in those routes

You will need visual studio code,api testing app like postman,etc and postgresql installed on your device. 

Steps to follow to run on local machine:

1. Download or clone the repo in your device.

2. open visual studio and open the downloaded folder there.

3. go to terminal and do npm i to install all used depenedencies that were used in the app.

4. Now go to .env file and fill all the required details there. I have wrote down their what you need to fill which is password, username and db name.

   4.1 password is created by user upon downloading postgresql you need to use that. username will most likely be postgres

   4.2 for creating db you need to go to psqshell or psadmin which you got upon downloading postgresql and write the query: create database "db_name";

5. Now, if you filled all things correctly you need to go to terminal and run nodemon index.js and there our application is running.

6. Now, you need to open api testing app you will use to check for various routes :

   6.1 Route 1 : http://localhost:3000/api/auth/register (Registering New User)

   6.2 Route 2 : http://localhost:3000/api/auth/login (Log in user)

   6.3 Route 3 : http://localhost:3000/api/auth/logout (Logout user)

   6.4 Route 4 : http://localhost:3000/api/dash (Dashboard)

7 Therefore you will complete checking our application here.

Challenges I faced building this :

I had a problem where i was not able to access the cookie in dashboard during verification face and it was giving me undefined value. So after spending a lot of time over it, i figgured the problem was not that big i forget to add the cookie parser in index.js and it solved all our problems.

Steps to make it secure :

I used bcrypt hashing and jwtwebtoken for authentications becrypt and hashing enables us to store user password in an encrypted code which is almost impossible to hack from our server.
Upon login and register i created cookies using jwt-tokens. These tokens have an expiration limit after which the user token get destroyed and user might need to login again.
verifyToken.js verifies the token and if it is valid gives user access to dashboard where we can see the name of all entries.
Upon logging out all cookies are revoked or erased.

Thank You 

