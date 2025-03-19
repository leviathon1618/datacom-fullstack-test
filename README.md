# JobApplicationTracker.Api
 how to run this app:
 first you need to clone the repo:
 this will wive you a file with folders inside named: 
JobApplicationTracker.Api
and
job-application-tracker-ui

the job application tracker.Api folder contains the code which manages the api. this also hosts the in memory database
for the web app to run; you must first open the solution file and run the backend. 
i use microsoft visual studio for this. 

once running a swagger API interface will pop up and this indicates the backend has started. 

next open the front end app in visual studio code. 
this will be under the "job-application-tracker-ui" folder
from here when inside the visual studio code editor open a new terminal and type "npm start"
this will allow you to open your web application

to use this web app start by filling out the fields i.e company, position, status, and dat applied. then click add application

to edit your applications click the edit button and make the desired changes. this will update the entry.

-note these changes are stored inside an in memory database, when the backend is closed down, then changes will be lost

-assumptions
i assume you already have visual studio and visual studio code installed
i also assume the api path is the same as my own. you might need to change this in these files:
ApplicationForm.js
ApplicationList.js
Program.cs
