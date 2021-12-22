# mtx-backend

Backend submission created by : Budi Erwanto

## source code

1. Tasks
   A. Email verification done
   B. Login done
   C. User Profile done
   D. Reset Password done, note that Im using auth0 and already try to search how to add another input but seems there is no custom can be made for this in auth0
   E. Cookies and Logout, logout is done but for the cookies already try to search auth0 seems the option is to use built in token with expiry rather than cookies. can be read here https://community.auth0.com/t/how-to-stay-logged-in-forever-ish/62926
   F. User Database Dashboard done
   G. User Statistic done
   H. Attention to detail bug finding on going will update later
2. folders explanation
   A. api : containing all apis
   B. auth : currently store configuration for auth0
   C. controller : containing all controller for rendering views
   D. db : to store data to db, for this submission using node-json-db. this db is stored in myDatabase.json at root
   E. middleware : to change all response from api so it has the same structure. e.g : status, message and payload
   F. public : for serving public files can be css / js
   G. services : functions that use in controller / api
   H. views : using pugjs as view engine template
   I. myDatabase.json : the place where everytime profile name edited
   J. Procfile : for heroku to use as starting point app
   K. swagger.json : for swagger api definition in JSON

## License

[MIT](https://choosealicense.com/licenses/mit/)
