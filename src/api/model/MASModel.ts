/* Import Types */
import { MAS as MASType, Dict } from "app/Types"


/* Source System Model for API calls */
const MASModel = (result: Dict) => {
    const MAS: MASType = {
        id: result.id,
        name: result.attributes.name,
        containerImage: result.attributes.containerImage,
        containerTag: result.attributes.containerTag,
        targetDigitalObjectFilters: result.attributes.targetDigitalObjectFilters,
        topicName: result.attributes.topicName,
        serviceDescription: result.attributes.serviceDescription,
        serviceState: result.attributes.serviceState,
        sourceCodeRepository: result.attributes.sourceCodeRepository,
        serviceAvailability: result.attributes.serviceAvailability,
        codeMaintainer: result.attributes.codeMaintainer,
        codeLicense: result.attributes.codeLicense,
        dependencies: result.attributes.dependencies,
        supportContact: result.attributes.supportContact,
        slaDocumentation: result.attributes.slaDocumentation,
        maxReplicas: result.attributes.maxReplicas,
        batchingPermitted: result.attributes.batchingPermitted
    }

    return MAS;
}

export default MASModel;