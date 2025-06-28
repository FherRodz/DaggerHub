const { auth } = require('express-oauth2-jwt-bearer');

const checkJWT = auth({
    audience: 'https://dagger-hub-api',
    issuerBaseURL: 'https://dev-r6ljsg4omqzl6yet.us.auth0.com/',
    tokenSigningAlg: 'RS256'
});

module.exports = checkJWT;