/* Import Dependencies */
import KeycloakService from "app/Keycloak";

/* Import Utilities */
import { RetrieveEnvVariable } from "app/Utilities";
import { StringToArray } from "app/Utilities";
import {StringToHandleUrlArray} from "app/Utilities";

/* Import Types */
import { DataMapping } from "app/types/DataMapping";
import { MachineAnnotationService } from "app/types/MachineAnnotationService";
import { SourceSystem } from "app/types/SourceSystem";
import { EditTarget, Dict } from "app/Types";

/* Import API */
import InsertSourceSystem from 'api/sourceSystem/InsertSourceSystem';
import PatchSourceSystem from 'api/sourceSystem/PatchSourceSystem';
import InsertDataMapping from 'api/dataMapping/InsertDataMapping';
import PatchDataMapping from 'api/dataMapping/PatchDataMapping';
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
                "ods:dataMappingID": form.dataMappingId,
                "ods:translatorType": form.sourceSystemTranslatorType,
                "ods:filters": StringToArray(form.sourceSystemFilters),
                "ltc:collectionManagementSystem": form.sourceSystemCollectionManagementSystem,
                "ods:maximumRecords": Number(form.sourceSystemMaximumRecords),
                "ods:mediaMachineAnnotationServices": StringToHandleUrlArray(form.sourceSystemMediaMAS),
                "ods:specimenMachineAnnotationServices": StringToHandleUrlArray(form.sourceSystemSpecimenMAS)
            }
        }
    };

    /* If edit target is not empty, patch instead of insert */
    let sourceSystemResponse: SourceSystem | undefined;

    if (editTarget?.sourceSystem) {
        await PatchSourceSystem(sourceSystemRecord,
            (editTarget?.sourceSystem["@id"] ?? editTarget?.sourceSystem["schema:identifier"] ?? '').replace(RetrieveEnvVariable('HANDLE_URL'), ''), KeycloakService.GetToken()
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

const SubmitDataMapping = async (form: Dict, editTarget: EditTarget) => {
    /* Format default mappings */
    const defaultMappings: Dict[] = [];

    form['ods:hasDefaultMapping'].forEach((dataMapping: Dict) => {
        if (dataMapping.field) {
            defaultMappings.push({ [dataMapping.field]: dataMapping.value });
        }
    });

    /* Format field mappings */
    const fieldMappings: Dict[] = [];

    form['ods:hasTermMapping'].forEach((dataMapping: Dict) => {
        if (dataMapping.field) {
            fieldMappings.push({ [dataMapping.field]: dataMapping.value });
        }
    });

    const dataMappingRecord = {
        data: {
            type: "ods:DataMapping",
            attributes: {
                "schema:name": form.dataMappingName,
                "schema:description": form.dataMappingDescription,
                "ods:mappingDataStandard": form.dataMappingSourceDataStandard,
                "ods:hasDefaultMapping": defaultMappings,
                "ods:hasTermMapping": fieldMappings
            }
        }
    };

    /* If edit target is not empty, patch instead of insert */
    let dataMappingResponse: DataMapping | undefined;

    if (editTarget?.dataMapping) {
        await PatchDataMapping(
            dataMappingRecord, (editTarget.dataMapping["@id"] ?? editTarget.dataMapping["schema:identifier"]).replace(RetrieveEnvVariable('HANDLE_URL'), ''), KeycloakService.GetToken()
        ).then((dataMapping) => {
            dataMappingResponse = dataMapping;
        }).catch(error => {
            console.warn(error);
        });
    } else {
        await InsertDataMapping(dataMappingRecord, KeycloakService.GetToken()).then((dataMapping) => {
            dataMappingResponse = dataMapping;
        }).catch(error => {
            console.warn(error);
        });
    }

    return dataMappingResponse;
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
            MasRecord, (editTarget?.mas["@id"] ?? editTarget?.mas["schema:identifier"] ?? '').replace(RetrieveEnvVariable('HANDLE_URL'), ''), KeycloakService.GetToken()
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
    SubmitDataMapping,
    SubmitMas
};