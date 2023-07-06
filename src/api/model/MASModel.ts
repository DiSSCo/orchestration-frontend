/* Import Types */
import { MAS as MASType, Dict } from "global/Types"


/* Source System Model for API calls */
const MASModel = (result: Dict) => {
    const MAS: MASType = {
        id: result.id,
        name: result.attributes.name,
        containerImage: result.attributes.containerImage,
        containerTag: result.attributes.containerTag,
        targetDigitalObjectFilters: result.attributes.targetDigitalObjectFilters,
        serviceDescription: result.attributes.serviceDescription,
        serviceState: result.attributes.serviceState,
        sourceCodeRepository: result.attributes.sourceCodeRepository,
        serviceAvailability: result.attributes.serviceAvailability,
        codeMaintainer: result.attributes.codeMaintainer,
        codeLicense: result.attributes.codeLicense,
        dependencies: result.attributes.dependencies,
        supportContact: result.attributes.supportContact,
        slaDocumentation: result.attributes.slaDocumentation
    }

    return MAS;
}

export default MASModel;