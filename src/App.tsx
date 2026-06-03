/* Import Components */
import {
  BrowserRouter as Router,
  Routes
} from "react-router-dom";

/* Import Routes */
import AppRoutes from 'app/Routes';

/* Import Styles */
import 'styles/App.css';
import 'styles/index.scss';
import 'styles/main.scss';


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