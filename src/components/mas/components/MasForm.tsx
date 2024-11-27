/* Import Types */
import { MachineAnnotationService } from 'app/types/MachineAnnotationService';
import { Dict } from 'app/Types';

/* Import Sources */
import MasFields from 'sources/formFields/MasFields.json';


const MasForm = (DetermineFormField: Function, mas?: MachineAnnotationService) => {
    const formFields: JSX.Element[] = [];
    const initialValuesFields: Dict = {};

    /* Generate MAS form fields */
    MasFields.fields.forEach((field) => {
        /* Push to form fields, if not hidden */
        const formField = DetermineFormField(field.alias ?? field.name, field.name, field.type);

        if (formField) {
            formFields.push(formField);
        }

        console.log(mas);

        /* Add to initial form values */
        if (field.name === 'ods:hasTargetDigitalObjectFilter' && mas) {
            /* If form field is: Target Digital Object Filters, remove JSON path prefixes */
            const filterValues: Dict = {};

            Object.entries(mas[field.name] ?? {}).forEach((keyValuePair) => {
                filterValues[keyValuePair[0].replace("$['", '').replace("']", '')] = keyValuePair[1];
            });

            initialValuesFields[field?.alias ?? field.name] = filterValues;
        } else if (field.name === 'schema:maintainer') {
            initialValuesFields[field?.alias ?? field.name] = mas?.['schema:maintainer']?.['schema:identifier'];
        } else if (field.name === 'schema:ContactPoint') {
            initialValuesFields[field?.alias ?? field.name] = mas?.['schema:ContactPoint']?.['schema:url'];
        } else {
            initialValuesFields[field?.alias ?? field.name] = mas?.[field.name as keyof typeof mas] ?? (field.defaultValue ?? '');
        }
    });

    return { formFields, initialValuesFields };
}

export default MasForm;