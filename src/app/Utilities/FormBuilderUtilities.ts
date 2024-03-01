/* Import Utilities */
import KeycloakService from "keycloak/Keycloak";

/* Import Types */
import { SourceSystem, Mapping, MAS, EditTarget, Dict } from "app/Types";

/* Import API */
import GetSourceSystem from "api/sourceSystem/GetSourceSystem";
import InsertSourceSystem from 'api/sourceSystem/InsertSourceSystem';
import PatchSourceSystem from 'api/sourceSystem/PatchSourceSystem';
import GetMapping from "api/mapping/GetMapping";
import InsertMapping from 'api/mapping/InsertMapping';
import PatchMapping from 'api/mapping/PatchMapping';
import GetMAS from "api/mas/GetMAS";
import InsertMAS from "api/mas/InsertMAS";
import PatchMAS from "api/mas/PatchMAS";


const DefineEditTarget = async (targetName: string, id: string) => {
    let editTarget: EditTarget = {};
    let copyEditTarget = { ...editTarget };

    if (targetName === 'sourceSystem') {
        await GetSourceSystem(id).then(async (sourceSystem) => {
            if (sourceSystem) {
                copyEditTarget = { ...copyEditTarget, sourceSystem: { ...sourceSystem, id } };

                await GetMapping(sourceSystem.mappingId).then((mapping) => {
                    if (mapping) {
                        copyEditTarget = { ...copyEditTarget, ...mapping };
                    }
                }).catch(error => {
                    console.warn(error);
                });
            }
        }).catch(error => {
            console.warn(error);
        });
    } else if (targetName === 'mapping') {
        await GetMapping(id).then((mapping) => {
            if (mapping) {
                copyEditTarget = { ...editTarget, mapping: mapping };
            }
        }).catch(error => {
            console.warn(error);
        });
    } else if (targetName === 'MAS') {
        await GetMAS(id).then((MAS) => {
            if (MAS) {
                copyEditTarget = { ...editTarget, MAS: MAS };
            }
        }).catch(error => {
            console.warn(error);
        })
    }

    editTarget = copyEditTarget;

    return editTarget;
}

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

const SubmitMAS = async (form: Dict, editTarget: EditTarget) => {
    const MASRecord = {
        data: {
            type: 'machineAnnotationService',
            attributes: {
                name: form.MASName,
                containerImage: form.MASContainerImage,
                containerTag: form.MASContainerTag,
                targetDigitalObjectFilters: form.targetDigitalObjectFilters,
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
                maxReplicas: form.MASMaxReplicas
            }
        }
    }

    /* If edit target is not empty, patch instead of insert */
    let MASResponse: MAS | undefined;

    if (editTarget?.MAS) {
        await PatchMAS(MASRecord, editTarget?.MAS.id, KeycloakService.GetToken()).then((MAS) => {
            MASResponse = MAS;
        });
    } else {
        await InsertMAS(MASRecord, KeycloakService.GetToken()).then((MAS) => {
            MASResponse = MAS;
        });
    }

    return MASResponse;
}


export {
    DefineEditTarget,
    SubmitSourceSystem,
    SubmitMapping,
    SubmitMAS
}