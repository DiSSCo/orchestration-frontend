/* Import Utilities */
import KeycloakService from "keycloak/Keycloak";

/* Import Types */
import { SourceSystem, Mapping, EditTarget, Dict } from "app/Types";

/* Import API */
import InsertSourceSystem from 'api/sourceSystem/InsertSourceSystem';
import PatchSourceSystem from 'api/sourceSystem/PatchSourceSystem';
import InsertMapping from 'api/mapping/InsertMapping';
import PatchMapping from 'api/mapping/PatchMapping';


const SubmitSourceSystem = async (form: Dict, editTarget: EditTarget) => {
    const sourceSystemRecord = {
        data: {
            type: 'sourceSystem',
            attributes: {
                name: form.sourceSystemName,
                description: form.sourceSystemDescription,
                endpoint: form.sourceSystemEndpoint,
                mappingId: form.mappingId
            }
        }
    }

    /* If edit target is not empty, patch instead of insert */
    let sourceSystemResponse: SourceSystem | undefined;

    if (editTarget?.sourceSystem) {
        await PatchSourceSystem(sourceSystemRecord, editTarget?.sourceSystem.id, KeycloakService.GetToken()).then((sourceSystem) => {
            sourceSystemResponse = sourceSystem;
        });
    } else {
        await InsertSourceSystem(sourceSystemRecord, KeycloakService.GetToken()).then((sourceSystem) => {
            sourceSystemResponse = sourceSystem;
        });
    }

    return sourceSystemResponse;
}

const SubmitMapping = async (form: Dict, editTarget: EditTarget) => {
    /* Format default mappings */
    const defaultMappings: Dict[] = [];

    form.defaults.forEach((mapping: Dict) => {
        if (mapping.field) {
            defaultMappings.push({ [mapping.field]: mapping.value });
        }
    });

    /* Format field mappings */
    const fieldMappings: Dict[] = [];

    form.mapping.forEach((mapping: Dict) => {
        if (mapping.field) {
            fieldMappings.push({ [mapping.field]: mapping.value });
        }
    });

    const mappingRecord = {
        data: {
            type: "mapping",
            attributes: {
                name: form.mappingName,
                description: form.mappingDescription,
                sourceDataStandard: form.mappingSourceDataStandard,
                fieldMapping: {
                    mapping: fieldMappings,
                    defaults: defaultMappings
                }
            }
        }
    }

    /* If edit target is not empty, patch instead of insert */
    let mappingResponse: Mapping | undefined;

    if (editTarget?.mapping) {
        await PatchMapping(mappingRecord, editTarget.mapping.id, KeycloakService.GetToken()).then((mapping) => {
            mappingResponse = mapping;
        }).catch(error => {
            console.warn(error);
        });
    } else {
        await InsertMapping(mappingRecord, KeycloakService.GetToken()).then((mapping) => {
            mappingResponse = mapping;
        }).catch(error => {
            console.warn(error);
        });
    }

    return mappingResponse;
}

export {
    SubmitSourceSystem,
    SubmitMapping
}