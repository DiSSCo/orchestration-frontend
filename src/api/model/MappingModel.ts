/* Import Types */
import { Mapping as MappingType, Dict } from "app/Types"


/* Source System Model for API calls */
const MappingModel = (result: Dict) => {
    const mapping: MappingType = {
        id: result.id,
        version: result.attributes.version,
        created: result.attributes.created,
        creator: result.attributes.creator,
        name: result.attributes.name,
        description: result.attributes.description,
        sourceDataStandard: result.attributes.sourceDataStandard,
        fieldMapping: {
            mapping: result.attributes.fieldMapping.mapping,
            defaults: result.attributes.fieldMapping.defaults
        }
    }

    return mapping;
}

export default MappingModel;