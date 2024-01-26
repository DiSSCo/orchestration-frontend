/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { SourceSystem, JSONResult, Dict } from 'app/Types';

/* Import Model */
import SourceSystemModel from 'api/model/SourceSystemModel';


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

export default InsertSourceSystem;