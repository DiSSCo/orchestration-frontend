/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import SourceSystem from "./SourceSystem";
import FormBuilder from "components/formBuilder/FormBuilder";


/* Routes associated with the Home page */
const routes = [
    <Route path="/sourceSystem/:prefix/:suffix" element={<SourceSystem />} />,
    <Route path="/sourceSystem/add" element={<FormBuilder />} />,
    <Route path="/sourceSystem/:prefix/:suffix/edit" element={<FormBuilder />} />
];

export default routes;