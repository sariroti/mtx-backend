# mtx-backend

Backend submission created by : Budi Erwanto

## source code

1. Tasks
   - Email verification done
   - Login done
   - User Profile done
   - Reset Password done, note that Im using auth0 and already try to search how to add another input but seems there is no custom can be made for this in auth0
   - Cookies and Logout, logout is done but for the cookies already try to search auth0 seems the option is to use built in token with expiry rather than cookies. can be read here https://community.auth0.com/t/how-to-stay-logged-in-forever-ish/62926
   - User Database Dashboard done
   - User Statistic done
   - Attention to detail bug finding on going will update later
2. folders explanation
   - api : containing all apis
   - auth : currently store configuration for auth0
   - controller : containing all controller for rendering views
   - db : to store data to db, for this submission using node-json-db. this db is stored in myDatabase.json at root
   - middleware : to change all response from api so it has the same structure. e.g : status, message and payload
   - public : for serving public files can be css / js
   - services : functions that use in controller / api
   - views : using pugjs as view engine template
   - myDatabase.json : the place where everytime profile name edited
   - Procfile : for heroku to use as starting point app
   - swagger.json : for swagger api definition in JSON

## License

[MIT](https://choosealicense.com/licenses/mit/)
