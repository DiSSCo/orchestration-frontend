/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import Mapping from "./Mapping";
import FormBuilder from "components/formBuilder/FormBuilder";


/* Routes associated with the Home page */
const routes = [
    <Route path="/mapping/:prefix/:suffix" element={<Mapping />} />,
    <Route path="/mapping/add" element={<FormBuilder />} />,
    <Route path="/mapping/:prefix/:suffix/edit" element={<FormBuilder />} />
];

export default routes;