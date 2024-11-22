/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import MAS from "./Mas";
import FormBuilder from "components/formBuilder/FormBuilder";


/* Routes associated with the Home page */
const routes = [
    <Route path="/mas/:prefix/:suffix" element={<MAS/>} />,
    <Route path="/mas/add" element={<FormBuilder />} />,
    <Route path="/mas/:prefix/:suffix/edit" element={<FormBuilder />} />
];

export default routes;