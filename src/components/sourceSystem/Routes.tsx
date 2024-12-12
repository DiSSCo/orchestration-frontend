/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import SourceSystem from "./SourceSystem";
import FormBuilder from "components/formBuilder/FormBuilder";


/* Routes associated with the Home page */
const routes = [
    <Route key="sourceSystem" path="/source-system/:prefix/:suffix" element={<SourceSystem />} />,
    <Route key="sourceSystemAdd" path="/source-system/add" element={<FormBuilder />} />,
    <Route key="sourceSystemEdit" path="/source-system/:prefix/:suffix/edit" element={<FormBuilder />} />
];

export default routes;