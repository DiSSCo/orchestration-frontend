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
import InsertMas from "api/mas/InsertMas";
import PatchMas from "api/mas/PatchMas";


const SubmitSourceSystem = async (form: Dict, editTarget: EditTarget) => {
    const sourceSystemRecord = {
        data: {
            type: 'sourceSystem',
            attributes: {
                name: form.sourceSystemName,
                description: form.sourceSystemDescription,
                endpoint: form.sourceSystemEndpoint,
                mappingId: form.mappingId,
                translatorType: form.sourceSystemTranslatorType
            }
        }
    }

    /* If edit target is not empty, patch instead of insert */
    let sourceSystemResponse: SourceSystem | undefined;

    if (editTarget?.sourceSystem) {
        await PatchSourceSystem(sourceSystemRecord, editTarget?.sourceSystem["@id"] ?? '', KeycloakService.GetToken()).then((sourceSystem) => {
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
    let mappingResponse: DataMapping | undefined;

    if (editTarget?.mapping) {
        await PatchMapping(mappingRecord, editTarget.mapping["@id"] ?? '', KeycloakService.GetToken()).then((mapping) => {
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

const SubmitMas = async (form: Dict, editTarget: EditTarget) => {
    /* For each target filter, add the necessary prefix of '$/' */
    const targetDigitalObjectFilters: Dict = {};

    Object.entries(form.targetDigitalObjectFilters).forEach((filterKeyValuePair: [string, any]) => {
        targetDigitalObjectFilters[`$.${filterKeyValuePair[0]}`] = filterKeyValuePair[1];
    });

    /* Create MAS record */
    const MasRecord = {
        data: {
            type: 'machineAnnotationService',
            attributes: {
                name: form.MASName,
                containerImage: form.MASContainerImage,
                containerTag: form.MASContainerTag,
                targetDigitalObjectFilters: targetDigitalObjectFilters,
                topicName: form.MASTopicName,
                serviceDescription: form.MASServiceDescription,
                serviceState: form.MASServiceState,
                sourceCodeRepository: form.MASSourceCodeRepository,
                serviceAvailability: form.MASServiceAvailability,
                codeMaintainer: form.MASCodeMaintainer,
                codeLicense: form.MASCodeLicense,
                dependencies: form.MASDependencies,
                supportContact: form.MASSupportContact,
                slaDocumentation: form.MASSlaDocumentation,
                maxReplicas: form.MASMaxReplicas,
                batchingPermitted: form.MASBatchingPermitted
            }
        }
    }

    /* If edit target is not empty, patch instead of insert */
    let masResponse: MachineAnnotationService | undefined;

    if (editTarget?.mas) {
        await PatchMas(MasRecord, editTarget?.mas["@id"] ?? '', KeycloakService.GetToken()).then((mas) => {
            masResponse = mas;
        });
    } else {
        await InsertMas(MasRecord, KeycloakService.GetToken()).then((mas) => {
            masResponse = mas;
        });
    }

    return masResponse;
}

export {
    SubmitSourceSystem,
    SubmitMapping,
    SubmitMas
}