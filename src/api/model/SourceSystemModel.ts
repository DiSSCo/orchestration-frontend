/* Import Types */
import { SourceSystem as SourceSystemType, Dict } from "global/Types"


/* Source System Model for API calls */
const SourceSystemModel = (result: Dict) => {
    const sourceSystem: SourceSystemType = {
        id: result.id,
        created: result.attributes.created,
        name: result.attributes.name,
        endpoint: result.attributes.endpoint,
        description: result.attributes.description,
        mappingId: result.attributes.mappingId
    }

    return sourceSystem;
}

export default SourceSystemModel;