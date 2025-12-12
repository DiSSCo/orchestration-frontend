/* Import Types */
import { DataMapping } from 'app/types/DataMapping';
import { Dict } from 'app/Types';

/* Import Sources */
import DataMappingFields from 'sources/formFields/DataMappingFields.json';


const DataMappingForm = (DetermineFormField: Function, dataMapping?: DataMapping) => {
    const formFieldsPages: JSX.Element[][] = [];
    const initialValuesFields: Dict = {};

    /* Mandatory fields for this form (UI only, no form validation logic) */
    const requiredFields = [
        'schema:name',
        'ods:mappingDataStandard'
    ];

    /* Generate Data Mapping form fields */
    DataMappingFields.pages.forEach((page, index) => {
        formFieldsPages[index] = [];

        /* Iterate to prepare initial form values */
        page.fields.forEach((field: { name: string, alias?: string, type: string, options?: { name: string, label: string }[] }) => {
            /* Check if this field should be marked as mandatory */
            const isRequired = requiredFields.includes(field.name);
            
            formFieldsPages[index].push(DetermineFormField(field.alias ?? field.name, field.name, field.type, field.options, isRequired));

            /* Add to initial form values */
            if (field.type === 'dataMapping') {
                const reformatMappings: Dict[] = [];

                /* Reformat mappings for form input */
                (dataMapping?.[field.name as keyof typeof dataMapping] as Dict[])?.forEach((dataMapping) => {
                    reformatMappings.push({
                        field: Object.keys(dataMapping)[0],
                        value: Object.values(dataMapping)[0]
                    });
                });

                initialValuesFields[field.name] = reformatMappings ?? [];
            } else {
                initialValuesFields[field?.alias ?? field.name] = dataMapping?.[field.name as keyof typeof dataMapping] ?? '';
            }
        });
    });

    return { formFieldsPages, initialValuesFields };
}

export default DataMappingForm;