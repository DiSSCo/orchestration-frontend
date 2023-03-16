/* Import Types */
import { SourceSystem as SourceSystemType, JSONResult, Dict } from "global/Types"


/* Source System Model for API calls */
const SourceSystemModel = (result: Dict) => {
    const sourceSystem: SourceSystemType = {
        id: result.id,
        created: result.attributes.created,
        sourceSystem: {
            name: result.attributes.sourceSystem.name,
            endpoint: result.attributes.sourceSystem.endpoint,
            description: result.attributes.sourceSystem.description,
            mappingId: result.attributes.sourceSystem.mappingId
        }
    }

    return sourceSystem;
}

export default SourceSystemModel;