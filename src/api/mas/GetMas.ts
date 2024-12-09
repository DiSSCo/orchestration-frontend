/* Import Dependencies */
import axios from "axios";

/* Import Types */
import { MachineAnnotationService } from "app/types/MachineAnnotationService";
import { JSONResult } from "app/Types";


const GetMas = async (masId: string) => {
    let mas: MachineAnnotationService | undefined;

    if (masId) {
        const endPoint = `/mas/v1/${masId}`;

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                responseType: 'json'
            });

            const data: JSONResult = result.data;

            mas = data.data.attributes as MachineAnnotationService;
        } catch (error) {
            console.warn(error);
        }
    }

    return mas;
};

export default GetMas;