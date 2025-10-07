import React from "react";
import auth0 from "auth0-js";
import {useNavigate, useLocation} from "react-router-dom";

const DAOAuth0 = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const authRedirectUri =
        process.env.REACT_APP_ENV === "production"
            ? `${process.env.REACT_APP_AUTH0_DOMAIN}loginCallback`
            : "http://localhost:3001/loginCallback";
    const authDomain =
        process.env.REACT_APP_ENV === "production"
            ? process.env.REACT_APP_AUTH_DOMAIN
            : "sgonzaloc.auth0.com";
    const authClientId =
        process.env.REACT_APP_ENV === "production"
            ? process.env.REACT_APP_AUTH_CLIENT_ID
            : "gRUZB0RXcoR0MwlxLczvUSbTVHeXx03a";
    const authAudience =
        process.env.REACT_APP_ENV === "production"
            ? process.env.REACT_APP_AUTH_AUDIENCE
            : "https://sgonzaloc.auth0.com/userinfo";

    const _auth0 = new auth0.WebAuth({
        domain: authDomain,
        clientID: authClientId,
        redirectUri: authRedirectUri,
        audience: authAudience,
        responseType: "token id_token",
        scope: "openid"
    });

    const login = () => _auth0.authorize();

    const handleAuthentication = () => {
        _auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                setSession(authResult);
            } else if (err) {
                console.error(err);
                navigate("/home", {state: {referer: location}});
            }
        });
    };

    const setSession = (authResult) => {
        const expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem("access_token", authResult.accessToken);
        localStorage.setItem("id_token", authResult.idToken);
        localStorage.setItem("expires_at", expiresAt);
        navigate("/home", {state: {referer: location}});
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("id_token");
        localStorage.removeItem("expires_at");
        navigate("/home", {state: {referer: location}});
    };

    const isAuthenticated = () => {
        const expiresAt = JSON.parse(localStorage.getItem("expires_at") || "0");
        return new Date().getTime() < expiresAt;
    };

    return null;
};

export default DAOAuth0;
