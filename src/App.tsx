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
import Mapping from "components/mapping/Mapping";
import FormBuilder from "components/formBuilder/FormBuilder";


const App = () => {
  /* If user is logged in, show actionable Home page, otherwise show landing page */
  if (KeycloakService.IsLoggedIn()) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/sourceSystem/:prefix/:suffix" element={<SourceSystem />} />
          <Route path="/sourceSystem/add" element={<FormBuilder />} />
          <Route path="/sourceSystem/:prefix/:suffix/edit" element={<FormBuilder />} />

          <Route path="/mapping/:prefix/:suffix" element={<Mapping />} />
          <Route path="/mapping/add" element={<FormBuilder />} />
          <Route path="/mapping/:prefix/:suffix/edit" element={<FormBuilder />} />
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