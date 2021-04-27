const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");
var jwks = require("jwks-rsa");

const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: "https://dev-aids.au.auth0.com/.well-known/jwks.json",
	}),
	audience: "http://localhost:3001/",
	issuer: "https://dev-aids.au.auth0.com/",
	algorithms: ["RS256"],
});

export default checkJwt;
