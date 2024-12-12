/* Import Dependencies */
import { Route } from "react-router-dom";

/* Import Components */
import DataMapping from "./DataMapping";
import FormBuilder from "components/formBuilder/FormBuilder";


/* Routes associated with the Home page */
const routes = [
    <Route key="dataMapping" path="/data-mapping/:prefix/:suffix" element={<DataMapping />} />,
    <Route key="dataMappingAdd" path="/data-mapping/add" element={<FormBuilder />} />,
    <Route key="dataMappingEdit" path="/data-mapping/:prefix/:suffix/edit" element={<FormBuilder />} />
];

export default routes;