/* Import Types */
import { Mapping as MappingType, Dict } from "global/Types"


/* Source System Model for API calls */
const MappingModel = (result: Dict) => {
    const mapping: MappingType = {
        id: result.id,
        version: result.attributes.version,
        created: result.attributes.created,
        creator: result.attributes.creator,
        mapping: {
            name: result.attributes.mapping.name,
            description: result.attributes.mapping.description,
            mapping: {
                mapping: result.attributes.mapping.mapping.mapping,
                defaults: result.attributes.mapping.mapping.defaults
            }
        }
    }

    return mapping;
}

export default MappingModel;