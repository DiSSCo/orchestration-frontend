/* Import Components */
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import KeycloakService from "keycloak/Keycloak";

/* Import Styles */
import './App.css';

/* Import Components */
import Home from "components/home/Home";
import Landing from "components/landing/Landing";
import SourceSystem from "components/sourceSystem/SourceSystem";
import FormBuilder from "components/formBuilder/FormBuilder";


const App = () => {
  /* If user is logged in, show actionable Home page, otherwise show landing page */
  if (KeycloakService.IsLoggedIn()) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sourceSystem/:prefix/:suffix" element={<SourceSystem />} />
          <Route path="/sourceSystem/:prefix/:suffix/edit" element={<FormBuilder />} />
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
    );
  }
}

export default App;