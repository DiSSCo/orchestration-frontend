/* Import Types */
import { MachineAnnotationService } from 'app/types/MachineAnnotationService';
import { Dict } from 'app/Types';

/* Import Sources */
import MASFields from 'sources/formFields/MASFields.json';


const MasForm = (DetermineFormField: Function, mas?: MachineAnnotationService) => {
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
        if (field.name === 'ods:hasTargetDigitalObjectFilter' && mas) {
            /* If form field is: Target Digital Object Filters, remove JSON path prefixes */
            const filterValues: Dict = {};

            Object.entries(mas[field.name] ?? {}).forEach((keyValuePair) => {
                filterValues[keyValuePair[0].replace('$.', '')] = keyValuePair[1];
            });

            initialValuesFields[field?.alias ?? field.name] = filterValues;
        } else {
            initialValuesFields[field?.alias ?? field.name] = mas?.[field.name as keyof typeof mas] ?? (field.defaultValue ?? '');
        }
    });

    return { formFields, initialValuesFields };
}

export default MasForm;