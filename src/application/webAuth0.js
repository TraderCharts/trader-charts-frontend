import { WebAuth } from "auth0-js";

const authRedirectUri =
    process.env.REACT_APP_ENV === "production"
        ? `${process.env.REACT_APP_PUBLIC_AUTH0_DOMAIN}login`
        : `${process.env.REACT_APP_AUTH0_DOMAIN}login`;
const authDomain =
    process.env.REACT_APP_ENV === "production"
        ? process.env.REACT_APP_PUBLIC_AUTH_DOMAIN
        : process.env.REACT_APP_AUTH_DOMAIN;
const authClientId =
    process.env.REACT_APP_ENV === "production"
        ? process.env.REACT_APP_PUBLIC_AUTH_CLIENT_ID
        : process.env.REACT_APP_AUTH_CLIENT_ID;
const authAudience =
    process.env.REACT_APP_ENV === "production"
        ? process.env.REACT_APP_PUBLIC_AUTH_AUDIENCE
        : process.env.REACT_APP_AUTH_AUDIENCE;
const authConfig = {
    domain: authDomain,
    clientID: authClientId,
    redirectUri: authRedirectUri,
    audience: authAudience,
    responseType: "token id_token",
    scope: "openid profile",
    container: "hiw-login-container",
};

const aWebAuth = new WebAuth(authConfig);

export const webAuth = {
    authorize: () => aWebAuth.authorize(),
    parseHash: (hash, callback) => aWebAuth.parseHash({ hash }, callback),
    getUserInfo: (accessToken, callback) => aWebAuth.client.userInfo(accessToken, callback),
    logout: () => aWebAuth.logout({ returnTo: authRedirectUri, clientID: authClientId }),
};

export default webAuth;
