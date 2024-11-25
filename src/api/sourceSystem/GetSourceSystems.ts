/* Import Dependencies */
import axios from "axios";

/* Import Types */
import { SourceSystem } from "app/types/SourceSystem";
import { JSONResultArray } from "app/Types";


const GetSourceSystems = async () => {
    let sourceSystems = <SourceSystem[]>[];

    const endPoint = "/source-system"

    try {
        const result = await axios({
            method: "get",
            url: endPoint,
            params: {
                pageSize: 50
            },
            responseType: 'json'
        });

        const data: JSONResultArray = result.data;

        data.data.forEach((sourceSystem) => {
            sourceSystems.push(sourceSystem.attributes as SourceSystem);
        });
    } catch (error) {
        console.warn(error);
    }

    return sourceSystems;
};

export default GetSourceSystems;