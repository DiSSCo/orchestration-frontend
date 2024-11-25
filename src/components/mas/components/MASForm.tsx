/* Import Types */
import { MAS, Dict } from 'app/Types';

/* Import Sources */
import MASFields from 'sources/formFields/MASFields.json';


const MASForm = (DetermineFormField: Function, MAS?: MAS) => {
    const formFields: JSX.Element[] = [];
    const initialValuesFields: Dict = {};

    /* Generate MAS form fields */
    MASFields.fields.forEach((field) => {
        /* Push to form fields, if not hidden */
        const formField = DetermineFormField(field.alias ?? field.name, field.name, field.type);

        if (formField) {
            formFields.push(formField);
        }

        /* Add to initial form values */
        if (field.name === 'targetDigitalObjectFilters' && MAS) {
            /* If form field is: Target Digital Object Filters, remove JSON path prefixes */
            const filterValues: Dict = {};

            Object.entries(MAS?.[field.name] as keyof typeof MAS).forEach((keyValuePair) => {
                filterValues[keyValuePair[0].replace('$.', '')] = keyValuePair[1];
            });

            initialValuesFields[field?.alias ?? field.name] = filterValues;
        } else {
            initialValuesFields[field?.alias ?? field.name] = MAS?.[field.name as keyof typeof MAS] ?? (field.defaultValue ?? '');
        }
    });

    return { formFields, initialValuesFields };
}

export default MASForm;