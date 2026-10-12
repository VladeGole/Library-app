import React from 'react';
import './App.css';
import {Navbar} from './layout/NavBarAndFooter/Navbar';
import {Footer} from './layout/NavBarAndFooter/Footer';
import {HomePage} from './layout/HomePage/HomePage';
import {SearchBooksPage} from './layout/SearchBooksPage/SearchBooksPage';
import {Redirect, Route, Switch, useHistory} from 'react-router-dom';
import {BookCheckoutPage} from './layout/SearchBooksPage/BookCheckoutPage';
import {auth0Config} from './lib/auth0Config';
import {Auth0Provider, withAuthenticationRequired} from '@auth0/auth0-react';
import {LoginPage} from './auth/LoginPage';
import {ReviewListPage} from './layout/SearchBooksPage/component/ReviewListPage';
import {Shelf} from './layout/Shelf/Shelf';
import {MessagePage} from './layout/MessagePage/MessagePage';
import {ManageLibraryPage} from './layout/ManageLibraryPage/ManageLibraryPage';

const Auth0ProviderWithHistory = ({children}: { children: React.ReactNode }) => {
    const history = useHistory();

    const onRedirectCallback = (appState: any) => {
        history.push(appState?.returnTo || '/home');
    }

    return (
        <Auth0Provider
            clientId={auth0Config.clientId}
            domain={auth0Config.issuer}
            cacheLocation="localstorage"
            authorizationParams={{
                redirect_uri: auth0Config.redirectUri,
                audience: auth0Config.audience,
                scope: auth0Config.scope
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );
}

const SecureRoute = ({component, path, ...args}: { component: React.ComponentType<any>, path: string }) => (
    <Route
        path={path}
        component={withAuthenticationRequired(component, {
            returnTo: () => window.location.pathname
        })}
        {...args}
    />
);

export const App = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Auth0ProviderWithHistory>
                <Navbar />
                <div className="flex-grow-1">
                    <Switch>
                        <Route path='/' exact><Redirect to='/home' /></Route>
                        <Route path='/home'><HomePage /></Route>
                        <Route path='/search'><SearchBooksPage /></Route>
                        <Route path='/reviewList/:bookId'><ReviewListPage /></Route>
                        <Route path="/checkout/:bookId"><BookCheckoutPage /></Route>
                        <Route path="/login"><LoginPage /></Route>
                        <SecureRoute path="/shelf" component={Shelf} />
                        <SecureRoute path="/message" component={MessagePage}/>
                        <SecureRoute path="/admin" component={ManageLibraryPage}/>
                    </Switch>
                </div>
                <Footer />
            </Auth0ProviderWithHistory>
        </div>
    );
}