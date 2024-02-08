/* Import Types */
import { Mapping, Dict } from 'app/Types';

/* Import Sources */
import SourceSystemFields from 'sources/formFields/SourceSystemFields.json';


const MappingMetaForm = (DetermineFormField: Function, mapping?: Mapping) => {
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

export default MappingMetaForm;