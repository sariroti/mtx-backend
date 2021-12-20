const Auth0ManagementClient = require('auth0').ManagementClient;
const Auth0AuthenticationClient = require('auth0').AuthenticationClient;

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: 'IMjyMsTuGtUlIEBBGs9mDzc78p0iBRvM',
  issuerBaseURL: 'https://dev-4-0pia4h.us.auth0.com',
  secret: 'ca369yhWRgX2-D6j24cgGpKabhxu1ILWF2QNwuU-x50FiuHp2qX9NCnjMRLaBgK0',
};

const auth0ManagementClient = new Auth0ManagementClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENTID,
  clientSecret: process.env.AUTH0_CLIENTSECRET,
});

const auth0AuthenticationClient = new Auth0AuthenticationClient({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENTID,
  clientSecret: process.env.AUTH0_CLIENTSECRET,
});

auth0AuthenticationClient.clientCredentialsGrant(
  {
    audience: process.env.AUTH0_DOMAIN_API,

    scope: 'update:users',
  },
  function (err, response) {
    if (err) {
      // Handle error.
      console.log(err);
    }
    //console.log(response.access_token);
  }
);

module.exports = {
  config,
  auth0ManagementClient,
};
