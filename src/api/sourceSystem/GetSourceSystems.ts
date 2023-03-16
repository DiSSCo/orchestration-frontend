/* Import Dependencies */
import axios from "axios";

/* Import Model */
import SourceSystemModel from "api/model/SourceSystemModel";

/* Import Types */
import { SourceSystem, JSONResult, Dict } from "global/Types";


const GetSourceSystems = async () => {
    let sourceSystems = <SourceSystem[]>[];

    const endPoint = "/source-system"

    try {
        const result = await axios({
            method: "get",
            url: endPoint,
            responseType: 'json'
        });

        const data: JSONResult = result.data;

        Object.values(data.data).forEach((sourceSystem) => {
            sourceSystems.push(SourceSystemModel(sourceSystem as Dict));
        });
    } catch (error) {
        console.warn(error);
    }

    return sourceSystems;
}

export default GetSourceSystems;