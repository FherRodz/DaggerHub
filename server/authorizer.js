const { auth } = require('express-oauth2-jwt-bearer');

const checkJWT = auth({
    audience: process.env.AUDIENCE,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    tokenSigningAlg: 'RS256'
});

module.exports = checkJWT;