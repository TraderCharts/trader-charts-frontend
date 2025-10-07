const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('./services/mockServer/db.json');
const middlewares = jsonServer.defaults();
const fs = require('fs');
const _ = require('lodash');

function getRegisteredUser(accessToken, registeredUsers) {
    return _.find(registeredUsers, user => user.accessToken === accessToken);
}

function getToken(req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        // Authorization: Bearer g1jipjgi1ifjioj
        // Handle token presented as a Bearer token in the Authorization header
        return req.headers.authorization.split(' ')[1];
    }
    if (req.query && req.query.token) {
        // Handle token presented as URI param
        return req.query.token;
    }
    if (req.cookies && req.cookies.token) {
        // Handle token presented as a cookie parameter
        return req.cookies.token;
    }
    // If we return null, we couldn't find a token.
    // In this case, the JWT middleware will return a 401 (unauthorized) to the client for this request
    return null;
}

const publicRoutes = [
    {
        originalUrl: '/users/',
        methods: ['POST', 'GET', 'PUT'],
    },
];

const sharedUserRoutes = [
    {
        originalUrl: '/negotiableInstruments/',
        methods: ['GET'],
    },
    {
        originalUrl: '/bymaStocksData/',
        methods: ['GET'],
    },
];

function isPublicRoute(req) { // valid public routes
    return (
        publicRoutes.findIndex(publicRoute => {
            const regex = new RegExp(`^${publicRoute.originalUrl}[^\/]*$`, 'g');
            return req.originalUrl.match(regex) && publicRoute.methods.includes(req.method);
        }) !== -1
    );
}

function isSharedUserRoutes(req) { // valid private routes
    return (
        sharedUserRoutes.findIndex(sharedUserRoute => {
            const regex = new RegExp(`^${sharedUserRoute.originalUrl}$`, 'g');
            return req.originalUrl.match(regex) && sharedUserRoute.methods.includes(req.method);
        }) !== -1
    );
}

server.use(middlewares);
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);


server.use((req, res, next) => {
    const registeredUsers = JSON.parse(fs.readFileSync('./services/mockServer/db.json', 'UTF-8')).users;
    const registeredUser = getRegisteredUser(getToken(req), registeredUsers) || registeredUsers[0];
    const isAuthorized = !!registeredUser;
    const isPrivate = !isSharedUserRoutes(req);
    console.log('------ ------ ------ NEW REQUEST ------ ------ ------');
    console.log(isPrivate ? 'Request to a private route' : 'Request to a public route')
    console.log('REQ.: ', req.method, req.originalUrl);
    if (isPublicRoute(req)) {
        console.log('Requesting a valid public Route');
        next(); // continue to JSON Server router
    } else {
        console.log('Not requesting a valid public Route');
        if (isAuthorized) {
            console.log('User token is Authorized');
            if (isPrivate) {
                console.log('Requesting a valid Private Route');
                let operator = '?';
                if (req.url.includes('?')) {
                    operator = '&';
                }
                req.url = `${req.url}${operator}sub=${registeredUser.sub}`;
                console.log('REQ. URL filtered by user: ', req.url);
            } else {
                console.log('Is Shared User Route');
            }
            console.log('------ ------ ------ END REQUEST ------ ------ ------');
            next();
        } else {
            console.log('User token is Not Authorized');
            res.sendStatus(401);
        }
    }
    console.log('\n');
});
server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running\n');
});
