import webAuth0 from "application/webAuth0";
import { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import {
    loginSagaRequest,
    registerUserSagaRequest,
} from "../../redux/sagas/actions/authentication.action";

const Login = ({ auth, onLoginSagaRequest, onRegisterUserSagaRequest }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleAuthentication = () => {
        webAuth0.parseHash(location.hash, (err, authResult) => {
            if (err) {
                if (err.error === "access_denied") {
                    webAuth0.logout();
                    return;
                }
                console.error(err);
                if (err.error === "invalid_token") {
                    navigate("/");
                    return;
                }
                return;
            }
            if (authResult?.accessToken && authResult?.idToken) {
                onLoginSagaRequest({ auth: authResult, navigate });
            }
            webAuth0.getUserInfo(authResult.accessToken, (err, user) => {
                if (err) {
                    console.error(err);
                    return;
                }
                onRegisterUserSagaRequest(user);
            });
        });
    };

    useEffect(() => {
        if (!location.hash) {
            webAuth0.authorize();
        } else if (!auth) {
            handleAuthentication();
        } else {
            navigate("/", { state: { referer: location } });
        }
    }, [auth, location, navigate]);

    return <div />;
};

const mapStateToProps = (state) => ({
    auth: state.authentication.auth,
});

const mapActionsToProps = (dispatch) => ({
    onLoginSagaRequest: (payload) => dispatch(loginSagaRequest(payload)),
    onRegisterUserSagaRequest: (user) => dispatch(registerUserSagaRequest(user)),
});

export default connect(mapStateToProps, mapActionsToProps)(Login);
