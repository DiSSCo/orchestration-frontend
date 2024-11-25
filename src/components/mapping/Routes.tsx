/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import Mapping from "./Mapping";
import FormBuilder from "components/formBuilder/FormBuilder";


/* Routes associated with the Home page */
const routes = [
    <Route key="mapping" path="/mapping/:prefix/:suffix" element={<Mapping />} />,
    <Route key="mappingAdd" path="/mapping/add" element={<FormBuilder />} />,
    <Route key="mappingEdit" path="/mapping/:prefix/:suffix/edit" element={<FormBuilder />} />
];

export default routes;