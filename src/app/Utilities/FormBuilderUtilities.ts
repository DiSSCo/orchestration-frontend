/* Import Types */
import { EditTarget} from "app/Types";

/* Import API */
import GetSourceSystem from "api/sourceSystem/GetSourceSystem";
import GetMapping from "api/mapping/GetMapping";
import GetMAS from "api/mas/GetMAS";


const DefineEditTarget = async (targetName: string, id: string) => {
    let editTarget: EditTarget = {};
    let copyEditTarget = { ...editTarget };

    if (targetName === 'sourceSystem') {
        await GetSourceSystem(id).then(async (sourceSystem) => {
            if (sourceSystem) {
                copyEditTarget = { ...copyEditTarget, sourceSystem: { ...sourceSystem, id } };
            }
        }).catch(error => {
            console.warn(error);
        });
    } else if (targetName === 'mapping') {
        await GetMapping(id).then((mapping) => {
            if (mapping) {
                copyEditTarget = { ...editTarget, mapping: mapping };
            }
        }).catch(error => {
            console.warn(error);
        });
    } else if (targetName === 'MAS') {
        await GetMAS(id).then((MAS) => {
            if (MAS) {
                copyEditTarget = { ...editTarget, MAS: MAS };
            }
        }).catch(error => {
            console.warn(error);
        })
    }

    editTarget = copyEditTarget;

    return editTarget;
}

export {
    DefineEditTarget
}