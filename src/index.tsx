/* Import Dependencies */
import axios from "axios";
import ReactDOM from 'react-dom/client';
import KeycloakService from 'app/Keycloak';
import { Provider } from 'react-redux';

/* Import Store */
import { setupStore } from './app/Store';

/* Import Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tabs/style/react-tabs.css';

/* Import Components */
import App from './App';


axios.defaults.baseURL = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/api`;

const RenderRoot = () => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <Provider store={setupStore()}>
      <App />
    </Provider>
  );
}

KeycloakService.InitKeyCloak(RenderRoot);