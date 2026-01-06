/* Import Types */
import { SourceSystem } from 'app/types/SourceSystem';
import { Dict } from 'app/Types';

/* Import Sources */
import SourceSystemFields from 'sources/formFields/SourceSystemFields.json';


const SourceSystemForm = (DetermineFormField: Function, sourceSystem?: SourceSystem) => {
    const formFields: JSX.Element[] = [];
    const initialValuesFields: Dict = {};

    /* Required fields for this form */
    const requiredFields = [
        'schema:name',
        'schema:url',
        'ods:translatorType',
        'ods:dataMappingID'
    ];

    /* Generate Source System form fields */
    SourceSystemFields.fields.forEach((field) => {
        /* Check if this field should be marked as required */
        const isRequired = requiredFields.includes(field.name);

        /* Push to form fields */
        formFields.push(DetermineFormField(field.alias ?? field.name, field.name, field.type, field?.options, isRequired));

        /* Determine the key used in Formik */
        const formFieldName = field?.alias ?? field.name;

        /* Retrieve the existing value from the backend object (if editing) */
        const backendValue = sourceSystem?.[field.name as keyof SourceSystem];

        /* Populate initial values, handling specific transformations for multi-value fields */
        if (field.type === "multiValueTextField") {
            initialValuesFields[formFieldName] = backendValue ?? [];
        } else {
            initialValuesFields[formFieldName] = backendValue ?? '';
        }
    });

    return { formFields, initialValuesFields };
}

export default SourceSystemForm;