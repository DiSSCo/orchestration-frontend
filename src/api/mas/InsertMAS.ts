/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { MAS, JSONResult, Dict } from 'app/Types';

/* Import Model */
import MASModel from 'api/model/MASModel';


const InsertMAS = async (MASRecord: Dict, token?: string) => {
    if (MASRecord && token) {
        let machineAnnoationService = <MAS>{};

        const endPoint = '/mas';

        await axios({
            method: "post",
            url: endPoint,
            data: MASRecord,
            responseType: 'json',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then((result) => {
            /* Set Machine Annotation Service */
            const data: JSONResult = result.data;

            machineAnnoationService = MASModel(data.data);
        }).catch((error) => {
            console.warn(error);
        });

        return machineAnnoationService;
    }
}

export default InsertMAS;