/* Import Dependencies */
import axios from "axios";
import ReactDOM from 'react-dom/client';
import KeycloakService from 'app/Keycloak';
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

/* Import Store */
import { setupStore } from './app/Store';

/* Import Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tabs/style/react-tabs.css';

/* Import Components */
import App from './App';


/* Define axios base url */
axios.defaults.baseURL = `${window.location.protocol}//${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}/api`;
/* Set up queryClient for TanStack query */
const queryClient = new QueryClient();

const RenderRoot = () => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  root.render(
    <QueryClientProvider client={queryClient}>
      <Provider store={setupStore()}>
        <App/>
      </Provider>
    </QueryClientProvider >
  );
}

KeycloakService.InitKeyCloak(RenderRoot);