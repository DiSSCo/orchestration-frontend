/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { SourceSystem } from 'app/types/SourceSystem';
import { JSONResult, Dict } from 'app/Types';


const InsertSourceSystem = async (sourceSystemRecord: Dict, token?: string) => {
    if (sourceSystemRecord && token) {
        let sourceSystem = <SourceSystem>{};

        const endPoint = '/source-system';

        await axios({
            method: "post",
            url: endPoint,
            data: sourceSystemRecord,
            responseType: 'json',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then((result) => {
            /* Set Mapping */
            const data: JSONResult = result.data;

            sourceSystem = data.data.attributes as SourceSystem;
        }).catch((error) => {
            console.warn(error);
        });

        return sourceSystem;
    }
};

export default InsertSourceSystem;