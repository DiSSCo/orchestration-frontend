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
        formFields.push(DetermineFormField(field.alias ?? field.name, field.name, field.type, field?.options));

        /* Add to initial form values */
        initialValuesFields[field?.alias ?? field.name] = sourceSystem?.[field.name as keyof typeof sourceSystem] ?? '';
    });

    return { formFields, initialValuesFields };
}

export default SourceSystemForm;