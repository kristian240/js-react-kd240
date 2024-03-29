import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { action } from 'mobx';

import { appContext } from './state/appContext';
import { PrivateRoute } from './containers/PrivateRoute';
import { Landing } from './containers/Landing';
import { Login } from './containers/Login';
import { Flight } from './containers/Flight';
import { Register } from './containers/Register';
import { BookingModal } from './containers/BookingModal';
import { User } from './containers/User';
import { UserModal } from './containers/UserModal';
import { Error404 } from './components/Error404';

import './index.scss';

export function AppComponent() {
  const { appState } = React.useContext(appContext);

  action(function() {
    if (localStorage.getItem('remember')) {
      appState.sessionToken = localStorage.getItem('sessionToken');
      appState.firstName = localStorage.getItem('sessionName');
      appState.userId = localStorage.getItem('sessionId');
    } else if (sessionStorage.getItem('loged')) {
      appState.sessionToken = sessionStorage.getItem('sessionToken');
      appState.firstName = sessionStorage.getItem('sessionName');
      appState.userId = sessionStorage.getItem('sessionId');
    }
  })();

  const isLogged = appState.sessionToken;

  return (
    <Router>
      <PrivateRoute isLogged={isLogged} exact path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <PrivateRoute isLogged={isLogged} path="/flight/:id" component={Flight} />
      <PrivateRoute
        isLogged={isLogged}
        path="/flight/:id/book"
        component={BookingModal}
      />
      <PrivateRoute isLogged={isLogged} path="/user" component={User} />
      <PrivateRoute
        isLogged={isLogged}
        path="/user/edit"
        component={UserModal}
      />
      <Route path="/error404" component={Error404} />
    </Router>
  );
}

export const App = observer(AppComponent);

ReactDOM.render(<App />, document.getElementById('root'));
