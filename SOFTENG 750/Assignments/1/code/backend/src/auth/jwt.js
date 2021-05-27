import { auth0 } from "../../config";

const jwt = require("express-jwt");
const jwtAuthz = require("express-jwt-authz");
const jwksRsa = require("jwks-rsa");
var jwks = require("jwks-rsa");

auth0;

const checkJwt = jwt({
	secret: jwksRsa.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: `${auth0.issuer}.well-known/jwks.json`,
	}),
	audience: "http://localhost:3001/",
	issuer: auth0.issuer,
	algorithms: ["RS256"],
});

export default checkJwt;
