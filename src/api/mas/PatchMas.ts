/* Import Dependencies */
import axios from 'axios';

/* Import Types */
import { MachineAnnotationService } from 'app/types/MachineAnnotationService';
import { JSONResult, Dict } from 'app/Types';


const PatchMas = async (masRecord: Dict, masId: string, token?: string) => {
    if (masRecord && token) {
        let machineAnnoationService = <MachineAnnotationService>{};

        const endPoint = `/mas/${masId}`;

        await axios({
            method: "patch",
            url: endPoint,
            data: masRecord,
            responseType: 'json',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).then((result) => {
            /* Set Machine annotation service */
            const data: JSONResult = result.data;

            machineAnnoationService = data.data.attributes as MachineAnnotationService;
        }).catch((error) => {
            console.warn(error);
        });

        return machineAnnoationService;
    }
};

export default PatchMas;