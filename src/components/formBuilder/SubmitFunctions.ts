/* Import Dependencies */
import KeycloakService from "app/Keycloak";

/* Import Types */
import { DataMapping } from "app/types/DataMapping";
import { MachineAnnotationService } from "app/types/MachineAnnotationService";
import { SourceSystem } from "app/types/SourceSystem";
import { EditTarget, Dict } from "app/Types";

/* Import API */
import InsertSourceSystem from 'api/sourceSystem/InsertSourceSystem';
import PatchSourceSystem from 'api/sourceSystem/PatchSourceSystem';
import InsertMapping from 'api/mapping/InsertMapping';
import PatchMapping from 'api/mapping/PatchMapping';
import InsertMas from 'api/mas/InsertMas';
import PatchMas from "api/mas/PatchMas";


const SubmitSourceSystem = async (form: Dict, editTarget: EditTarget) => {
    const sourceSystemRecord = {
        data: {
            type: 'ods:SourceSystem',
            attributes: {
                "schema:name": form.sourceSystemName,
                "schema:description": form.sourceSystemDescription,
                "schema:url": form.sourceSystemEndpoint,
                "ods:dataMappingID": form['ods:dataMappingID'].replace(import.meta.env.VITE_HANDLE_URL, ''),
                "ods:translatorType": form.sourceSystemTranslatorType
            }
        }
    };

    /* If edit target is not empty, patch instead of insert */
    let sourceSystemResponse: SourceSystem | undefined;

    if (editTarget?.sourceSystem) {
        await PatchSourceSystem(sourceSystemRecord,
            (editTarget?.sourceSystem["@id"] ?? editTarget?.sourceSystem["schema:identifier"] ?? '').replace(import.meta.env.VITE_HANDLE_URL, ''), KeycloakService.GetToken()
        ).then((sourceSystem) => {
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

    form['ods:hasDefaultMapping'].forEach((mapping: Dict) => {
        if (mapping.field) {
            defaultMappings.push({ [mapping.field]: mapping.value });
        }
    });

    /* Format field mappings */
    const fieldMappings: Dict[] = [];

    form['ods:hasTermMapping'].forEach((mapping: Dict) => {
        if (mapping.field) {
            fieldMappings.push({ [mapping.field]: mapping.value });
        }
    });

    const mappingRecord = {
        data: {
            type: "ods:DataMapping",
            attributes: {
                "schema:name": form.mappingName,
                "schema:description": form.mappingDescription,
                "ods:mappingDataStandard": form.mappingSourceDataStandard,
                "ods:hasDefaultMapping": defaultMappings,
                "ods:hasTermMapping": fieldMappings
            }
        }
    };

    /* If edit target is not empty, patch instead of insert */
    let mappingResponse: DataMapping | undefined;

    if (editTarget?.mapping) {
        await PatchMapping(
            mappingRecord, (editTarget.mapping["@id"] ?? editTarget.mapping["schema:identifier"]).replace(import.meta.env.VITE_HANDLE_URL, ''), KeycloakService.GetToken()
        ).then((mapping) => {
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
};

const SubmitMas = async (form: Dict, editTarget: EditTarget) => {
    /* For each target filter, add the necessary prefix of '$/' */
    const targetDigitalObjectFilters: Dict = {};

    Object.entries(form['ods:hasTargetDigitalObjectFilter']).forEach((filterKeyValuePair: [string, any]) => {
        targetDigitalObjectFilters[`$['${filterKeyValuePair[0]}']`] = filterKeyValuePair[1];
    });

    /* Create MAS record */
    const MasRecord = {
        data: {
            type: 'ods:MachineAnnotationService',
            attributes: {
                "schema:name": form.masName,
                "ods:containerImage": form.masContainerImage,
                "ods:containerTag": form.masContainerTag,
                "ods:hasTargetDigitalObjectFilter": targetDigitalObjectFilters,
                "ods:topicName": form.masTopicName,
                "schema:description": form.masServiceDescription,
                "schema:codeRepository": form.masSourceCodeRepository,
                "ods:serviceAvailability": form.masServiceAvailability,
                "schema:maintainer": {
                    "@type": "schema:Person",
                    "schema:identifier": form.masCodeMaintainer
                },
                "schema:license": form.masCodeLicense,
                "schema:ContactPoint": {
                    "schema:url": form.masSupportContact
                },
                "ods:slaDocumentation": form.masSlaDocumentation,
                "ods:maxReplicas": form.masMaxReplicas,
                "ods:batchingPermitted": form.masBatchingPermitted
            }
        }
    };

    /* If edit target is not empty, patch instead of insert */
    let masResponse: MachineAnnotationService | undefined;

    if (editTarget?.mas) {
        await PatchMas(
            MasRecord, (editTarget?.mas["@id"] ?? editTarget?.mas["schema:identifier"] ?? '').replace(import.meta.env.VITE_HANDLE_URL, ''), KeycloakService.GetToken()
        ).then((mas) => {
            masResponse = mas;
        });
    } else {
        await InsertMas(MasRecord, KeycloakService.GetToken()).then((mas) => {
            masResponse = mas;
        });
    }

    return masResponse;
};

export {
    SubmitSourceSystem,
    SubmitMapping,
    SubmitMas
};