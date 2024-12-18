/* Import Dependencies */
import axios from "axios";

/* Import Types */
import { SourceSystem } from "app/types/SourceSystem";
import { JSONResult } from "app/Types";


const GetSourceSystem = async (sourceSystemId: string) => {
    let sourceSystem: SourceSystem | undefined;

    if (sourceSystemId) {
        const endPoint = `/source-system/v1/${sourceSystemId}`;

        try {
            const result = await axios({
                method: "get",
                url: endPoint,
                responseType: 'json'
            });

            const data: JSONResult = result.data;

            sourceSystem = data.data.attributes as SourceSystem;
        } catch (error) {
            console.warn(error);
        }
    }

    return sourceSystem;
};

export default GetSourceSystem;