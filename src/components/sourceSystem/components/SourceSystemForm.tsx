/* Import Types */
import { SourceSystem } from 'app/types/SourceSystem';
import { Dict } from 'app/Types';

/* Import Sources */
import SourceSystemFields from 'sources/formFields/SourceSystemFields.json';


const SourceSystemForm = (DetermineFormField: Function, sourceSystem?: SourceSystem) => {
    const formFields: JSX.Element[] = [];
    const initialValuesFields: Dict = {};

    /* Mandatory fields for this form (UI only, no form validation logic) */
    const requiredFields = [
        'schema:name',
        'schema:url',
        'ods:translatorType',
        'ods:dataMappingID'
    ];

    /* Generate Source System form fields */
    SourceSystemFields.fields.forEach((field) => {
        /* Check if this field should be marked as mandatory */
        const isRequired = requiredFields.includes(field.name);

        /* Push to form fields */
        formFields.push(DetermineFormField(field.alias ?? field.name, field.name, field.type, field?.options, isRequired));

        /* Add to initial form values */
        const key = field?.alias ?? field.name;
        const existingValue = sourceSystem?.[field.name as keyof typeof sourceSystem];

        if (field.type === "multiValueTextField") {
            initialValuesFields[key] = (existingValue as any) ?? [];
        } else {
            initialValuesFields[key] = existingValue ?? '';
        }
    });

    return { formFields, initialValuesFields };
}

export default SourceSystemForm;