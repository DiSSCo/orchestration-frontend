/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { MachineAnnotationService } from 'app/types/MachineAnnotationService';
import { JSONResult, Dict } from 'app/Types';


const InsertMas = async (masRecord: Dict, token?: string) => {
    if (masRecord && token) {
        let machineAnnoationService = <MachineAnnotationService>{};

        const endPoint = '/mas/v1';

        await axios({
            method: "post",
            url: endPoint,
            data: masRecord,
            responseType: 'json',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then((result) => {
            /* Set Machine Annotation Service */
            const data: JSONResult = result.data;

            machineAnnoationService = data.data.attributes as MachineAnnotationService;
        }).catch((error) => {
            console.warn(error);
        });

        return machineAnnoationService;
    }
};

export default InsertMas;