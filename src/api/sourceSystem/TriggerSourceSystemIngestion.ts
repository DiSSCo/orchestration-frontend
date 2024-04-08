/* Import Dependencies */
import axios from "axios";

/* Import Types */
import { JSONResult } from "app/Types";


const TriggerSourceSystemIngestion = async (sourceSystemId?: string, token?: string) => {
    let response;

    if (sourceSystemId && token) {
        const endPoint = `/source-system/${sourceSystemId}/run`;

        try {
            const result = await axios({
                method: "post",
                url: endPoint,
                responseType: 'json',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data: JSONResult = result.data;

            console.log(result);
        } catch (error) {
            console.warn(error);
        }
    }

    return response;
}

export default TriggerSourceSystemIngestion;