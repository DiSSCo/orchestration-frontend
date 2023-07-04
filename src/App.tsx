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


const App = () => {
  /* If user is logged in, show actionable Home page, otherwise show landing page */
  if (KeycloakService.IsLoggedIn()) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
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