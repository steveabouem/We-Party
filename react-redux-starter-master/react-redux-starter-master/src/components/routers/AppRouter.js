import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Header } from '../Header/Header';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { ZipCodesPage } from '../pages/ZipCodesPage';
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage.jsx";
import Groups from "../pages/Groups.jsx";


export const AppRouter = () => (
    <BrowserRouter>
        <Fragment>
            <Header />            
            <Switch>
                <Route path='/' component={LandingPage} exact={true} />
                <Route path='/home' component={HomePage} exact={true} />
                <Route path='/authenticate' component={LoginPage} />
                <Route path='/groups' component={Groups} />
                <Redirect to="/" />
            </Switch>
        </Fragment>
    </BrowserRouter>
);