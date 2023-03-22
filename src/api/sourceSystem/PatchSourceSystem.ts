/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { SourceSystem, JSONResult, Dict } from 'global/Types';

/* Import Model */
import SourceSystemModel from 'api/model/SourceSystemModel';


const PatchSourceSystem = async (sourceSystemRecord: Dict, sourceSystemId: string, token?: string) => {
    if (sourceSystemRecord && token) {
        let sourceSystem = <SourceSystem>{};

        const endPoint = `/source-system/${sourceSystemId}`;

        await axios({
            method: "patch",
            url: endPoint,
            data: sourceSystemRecord,
            responseType: 'json',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then((result) => {
            /* Set Mapping */
            const data: JSONResult = result.data;

            sourceSystem = SourceSystemModel(data.data);
        }).catch((error) => {
            console.warn(error);
        });

        return sourceSystem;
    }
}

export default PatchSourceSystem;