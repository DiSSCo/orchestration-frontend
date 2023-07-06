/* Import Dependencies */
import ReactDOM from 'react-dom/client';
import axios from "axios";
import { Provider } from 'react-redux';
import { store } from 'app/Store';
import KeycloakService from 'keycloak/Keycloak';

/* Import Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tabs/style/react-tabs.css';

/* Import Components */
import App from './App';


axios.defaults.baseURL = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/api/v1`;

const RenderRoot = () => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
}

KeycloakService.InitKeyCloak(RenderRoot);