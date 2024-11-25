/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { MachineAnnotationService } from 'app/types/MachineAnnotationService';
import { JSONResult, Dict } from 'app/Types';


const InsertMas = async (MASRecord: Dict, token?: string) => {
    if (MASRecord && token) {
        let machineAnnoationService = <MachineAnnotationService>{};

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

            machineAnnoationService = data.data.attributes as MachineAnnotationService;
        }).catch((error) => {
            console.warn(error);
        });

        return machineAnnoationService;
    }
};

export default InsertMas;