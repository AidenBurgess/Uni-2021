const nock = require("nock");
const jwt = require("jsonwebtoken");

const config = require("../../../config");

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAx8ezF9UB/OgRSnRy+NRYbCw6r7gwsE9U4jyn85QqbJkS+t96
4HDcAlCJIDmunodIVGHqVGK3YV8JGSXyBHGXeicAT/OO0Yz05neCvlvvGlRNYVeK
KNjkZM2McELWCXaPTFhfqkW/xitWlJSx6wSt26/fH7LBYYX+ywq9fSCXTvdIhbIb
PLMfPmXvxNprNfz4VzXeNpr9oYdshsY/oELl1d13rE2TuHtTvjlgMyqPkqkigaif
Wd1qR5CdFpDp6FoxGa7IaDkCIQEnVplf3rnyBkfwis0lN25S1GFEZbKF3eRix7Di
Xj7HTBkaCUc8BSZOK118u5tc0cQdIOBzANQyBQIDAQABAoIBACQGIQevm7OofxGv
bNnspGMhGJX9/x2TuIkxCdH0yi+Z7J+7M5OMFkf+kLN0Y0XnvAWnQFNmF44hzmiv
/HOLrhZTOQ2xq/OiWLjEHRnJRxS21dszJ1EVRx3cKLJHgwPi0pUgLGPuPtXzk6Go
LGrmBZmjHXdASvmUaWzga2nIOjB9OgLYivsLDOjeEvDi8s2b9jZqBzBrQjvI/S/R
PiiN95i1foWT0Pi+j5rkf/wtPfIPUm6jnhrAT8/YPMnfGDbnnz2hAjdbYqcpsA0e
ciHzxQLpEqwvvPTTrv18WzLxPe1xd+n1FvameIm0Qe2SRWHNkQ/4+DdQlGSM2AaG
5+uVlxECgYEA2bU76GD8r2zXUbXpv8/0jy/r/KcuU8Vaj/7wRrKlQQMtQ3nWWWfy
as61wGRGRwtp4ijR76OoQqHE87F1WNjPjzw4Ki4UJPnEJpiVZ6YOnGreJoIq5lUQ
7hLTCjQeC6eafBFCenEAi03OdsatP+rcjBLU9SLNXRqH365b3JMHlf0CgYEA6us5
lECVsctcpUBSpW3hP5BIbW1cYXC+oYZ+h/NHJBwXN16CewUgPRMrOJeMmbxN5URE
ywVByGzrOLPommL1J+izcJCb23v0PmjZK1kGVy8/xb0m1ylReOCMKlR9qJEA/MRW
tWYDutuPSMR/g4wz9+T/McB+zlqylQsqjua7RqkCgYB8nxTy+YnLtYcv++0ZYqYA
zRLOJrkLNP6ZTPsnzR1xsKrZZEYCGdGXuEosHnpoMq1iy7EY91rbAZUnVl7xA/MU
cAlKg+P+IodY/KERmunkOfx+mKaMAQfW8CmkPp8wVrnE6XBffI4uL9TPAv2rh/rF
qAYFaO2brRM4RKvLANMn1QKBgH0JCjKQVZy2Qu9p1xNZ8qPkZchoht0OJ0jNzxcJ
M3pSwUClOwnDZq9bPov2jc1d3pAC0CLG/4ZwAprBlzJlLVs6jheBwJMH3K5DHCPo
VGmfKnBTBxNKWKTfz3rQUbmgxEfFMOmIDMAuEIuImt4nh5mP9wxCCrxGpfqSYOqC
gHdRAoGBAKfRmiGEtibHLPX/CWuaYYs0edPtlhx8+YEMy0UJRrOB40QLQdI+Q5do
6XXQu8YfNO2EDJer8PyZDF/HNRhFHobyOTxFfa9uDlKSE4nheDgJKni7iESOU3+x
Xi1vzaXgf7j5F56b1qTXV/nMq/SY6m4g+lMJLWj+BNN9f3gtZjT6
-----END RSA PRIVATE KEY-----`;

const getToken = () => {
	const user = {
		email: "someone@gmail.com",
	};

	const payload = {
		sub: user.email,
	};

	const options = {
		header: { kid: "0" },
		algorithm: "RS256",
		expiresIn: "1d",
		audience: config.auth0.audience,
		issuer: config.auth0.issuer,
	};

	let token;
	try {
		token = jwt.sign(payload, privateKey, options);
	} catch (err) {
		console.log(err);
		throw err;
	}

	return token;
};

module.exports = {
	getToken,
};
