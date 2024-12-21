import React, { useContext } from 'react';
import AuthContext from '../Auth/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Pages/Loading';

const PrivetLayout = ({ children }) => {
    const location = useLocation()

    const { user, loading } = useContext(AuthContext);
    if (loading) {
        return <Loading></Loading>
    }
    if (user && user.email) {
        return children;
    }
    return <Navigate to={"/signin"} state={location.pathname}></Navigate>

};

export default PrivetLayout;