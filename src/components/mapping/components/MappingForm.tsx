/* Import Types */
import { DataMapping } from 'app/types/DataMapping';
import { Dict } from 'app/Types';

/* Import Sources */
import MappingFields from 'sources/formFields/MappingFields.json';


const MappingForm = (DetermineFormField: Function, mapping?: DataMapping) => {
    const formFieldsPages: JSX.Element[][] = [];
    const initialValuesFields: Dict = {};

    /* Generate Mapping form fields */
    MappingFields.pages.forEach((page, index) => {
        formFieldsPages[index] = [];

        /* Iterate to prepare initial form values */
        page.fields.forEach((field: { name: string, alias?: string, type: string, options?: { name: string, label: string }[] }) => {
            formFieldsPages[index].push(DetermineFormField(field.alias ?? field.name, field.name, field.type, field.options));

            /* Add to initial form values */
            if (field.type === 'mapping') {
                const reformatMappings: Dict[] = [];

                /* Reformat mappings for form input */
                console.log(mapping);

                (mapping?.[field.name as keyof typeof mapping] as Dict[])?.forEach((mapping) => {
                    reformatMappings.push({
                        field: Object.keys(mapping)[0],
                        value: Object.values(mapping)[0]
                    });
                });

                initialValuesFields[field.name] = reformatMappings ?? [];
            } else {
                initialValuesFields[field?.alias ?? field.name] = mapping?.[field.name as keyof typeof mapping] ?? '';
            }
        });
    });

    return { formFieldsPages, initialValuesFields };
}

export default MappingForm;