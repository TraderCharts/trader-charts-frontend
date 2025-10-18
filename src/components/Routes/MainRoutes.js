import React from "react";
import {connect} from "react-redux";
import {BrowserRouter, Routes, Route, Navigate, useLocation} from "react-router-dom";
import MainPage from "./MainPage";
import Login from "../Login/index";
import PropTypes from "prop-types";

// PrivateRoute funcional para v6
const PrivateRoute = ({isAuthorized, children}) => {
    const location = useLocation();
    return isAuthorized ? (
        children
    ) : (
        <Navigate to="/login" state={{from: location}} replace/>
    );
};

const MainRoutesComponent = ({isAuthorized = false}) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route
                    path="*"
                    element={
                        <PrivateRoute isAuthorized={isAuthorized}>
                            <MainPage/>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};

MainRoutesComponent.propTypes = {
    isAuthorized: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthorized: !!state.authentication.auth
});

export default connect(mapStateToProps)(MainRoutesComponent);
