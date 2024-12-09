/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { SourceSystem } from 'app/types/SourceSystem';
import { JSONResult, Dict } from 'app/Types';


const PatchSourceSystem = async (sourceSystemRecord: Dict, sourceSystemId: string, token?: string) => {
    if (sourceSystemRecord && token) {
        let sourceSystem = <SourceSystem>{};

        const endPoint = `/source-system/v1/${sourceSystemId}`;

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
            /* Set Data Mapping */
            const data: JSONResult = result.data;

            sourceSystem = data.data.attributes as SourceSystem;
        }).catch((error) => {
            console.warn(error);
        });

        return sourceSystem;
    }
};

export default PatchSourceSystem;