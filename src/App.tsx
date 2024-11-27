/* Import Components */
import {
  BrowserRouter as Router,
  Routes
} from "react-router-dom";

/* Import Routes */
import AppRoutes from 'app/Routes';

/* Import Styles */
import './App.css';


const App = () => {
  return (
    <Router>
      <Routes>
        {AppRoutes}
      </Routes>
    </Router>
  );
};

export default App;