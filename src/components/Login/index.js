import React, {useEffect, useState} from "react";
import auth0 from "auth0-js";
import {connect} from "react-redux";
import {useNavigate, useLocation} from "react-router-dom";
import {
    loginSagaRequest,
    registerUserSagaRequest
} from "../../redux/sagas/actions/authentication.action";

const Login = ({
                   auth,
                   onLoginSagaRequest,
                   onRegisterUserSagaRequest
               }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [webAuth0, setWebAuth0] = useState(null);

    useEffect(() => {
        // Inicialización Auth0
        const authRedirectUri =
            process.env.REACT_APP_ENV === "production"
                ? `${process.env.REACT_APP_AUTH0_DOMAIN}login`
                : "http://localhost:3001/login";
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
        const authConfig = {
            domain: authDomain,
            clientID: authClientId,
            redirectUri: authRedirectUri,
            audience: authAudience,
            responseType: "token id_token",
            scope: "openid profile",
            container: "hiw-login-container"
        };
        setWebAuth0(new auth0.WebAuth(authConfig));
    }, []);

    const handleAuthentication = () => {
        if (!webAuth0) return;
        webAuth0.parseHash({hash: location.hash}, (err, authResult) => {
            if (err) {
                console.error(err);
                if (err.error === "invalid_token") {
                    navigate("/");
                }
                return;
            }
            if (authResult?.accessToken && authResult?.idToken) {
                onLoginSagaRequest(authResult);
            }
            webAuth0.client.userInfo(authResult.accessToken, (err, user) => {
                if (err) {
                    console.error(err);
                    return;
                }
                onRegisterUserSagaRequest(user);
            });
        });
    };

    useEffect(() => {
        if (!webAuth0) return;
        if (!location.hash) {
            webAuth0.authorize();
        } else if (!auth) {
            handleAuthentication();
        } else {
            navigate("/", {state: {referer: location}});
        }
    }, [webAuth0, auth, location, navigate]);

    return <div/>;
};

const mapStateToProps = state => ({
    auth: state.authentication.auth
});

const mapActionsToProps = dispatch => ({
    onLoginSagaRequest: auth => dispatch(loginSagaRequest(auth)),
    onRegisterUserSagaRequest: user => dispatch(registerUserSagaRequest(user))
});

export default connect(
    mapStateToProps,
    mapActionsToProps
)(Login);
