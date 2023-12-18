import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';

import * as serviceWorker from './serviceWorker';

// toastify styles
import 'react-toastify/dist/ReactToastify.css';

// lumino styles
import '@lumino/widgets/style/index.css';
import '@lumino/dragdrop/style/index.css';
import '@lumino/default-theme/style/commandpalette.css';
import '@lumino/default-theme/style/datagrid.css';
import '@lumino/default-theme/style/dockpanel.css';
import '@lumino/default-theme/style/menu.css';
import '@lumino/default-theme/style/menubar.css';
import '@lumino/default-theme/style/scrollbar.css';
import '@lumino/default-theme/style/tabbar.css';

// custom styles
import 'styles/lumino.css';
import 'styles/index.css';

// store
import store from 'store';

// modules
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));

const exampleTheme = {
  ...teamsLightTheme,
  borderRadiusMedium: 0,
};

function run() {
  root.render(
    <FluentProvider theme={exampleTheme}>
      <Provider store={store}>
        <Router basename="/">
          <Switch>
            <Route exact path="/" component={App} />
          </Switch>
        </Router>
      </Provider>
    </FluentProvider>
  );
}

run();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();






