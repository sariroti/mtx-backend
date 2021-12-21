require('dotenv').config();

const { auth } = require('express-openid-connect');

const express = require('express');
const app = express();
const auth0 = require('./auth');
const mw = require('./middleware/response');
const api = require('./api');
const controller = require('./controller');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(express.static(__dirname + '/public'));

app.use(auth(auth0.config));

app.use(mw.responseMiddleware);

app.set('view engine', 'pug');

app.use(api);

app.use(controller);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
