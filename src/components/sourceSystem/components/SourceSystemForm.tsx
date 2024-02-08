/* Import Types */
import { SourceSystem, Dict } from 'app/Types';

/* Import Sources */
import SourceSystemFields from 'sources/formFields/SourceSystemFields.json';


const SourceSystemForm = (DetermineFormField: Function, sourceSystem?: SourceSystem) => {
    const formFields: JSX.Element[] = [];
    const initialValuesFields: Dict = {};

    /* Generate Source System form fields */
    SourceSystemFields.fields.forEach((field) => {
        /* Push to form fields */
        formFields.push(DetermineFormField(field.name, field.type));

        /* Add to initial form values */
        initialValuesFields[field.name] = '';
    });

    return { formFields, initialValuesFields };
}

export default SourceSystemForm;