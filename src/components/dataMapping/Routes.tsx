/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import DataMapping from "./DataMapping";
import FormBuilder from "components/formBuilder/FormBuilder";


/* Routes associated with the Home page */
const routes = [
    <Route key="dataMapping" path="/dataMapping/:prefix/:suffix" element={<DataMapping />} />,
    <Route key="dataMappingAdd" path="/dataMapping/add" element={<FormBuilder />} />,
    <Route key="dataMappingEdit" path="/dataMapping/:prefix/:suffix/edit" element={<FormBuilder />} />
];

export default routes;