/* Import Types */
import { EditTarget} from "app/Types";

/* Import API */
import GetSourceSystem from "api/sourceSystem/GetSourceSystem";
import GetDataMapping from "api/dataMapping/GetDataMapping";
import GetMas from "api/mas/GetMas";


const DefineEditTarget = async (targetName: string, id: string) => {
    let editTarget: EditTarget = {};
    let copyEditTarget = { ...editTarget };

    if (targetName === 'sourceSystem') {
        await GetSourceSystem(id).then(async (sourceSystem) => {
            if (sourceSystem) {
                copyEditTarget = { ...copyEditTarget, sourceSystem: sourceSystem };
            }
        }).catch(error => {
            console.warn(error);
        });
    } else if (targetName === 'data-mapping') {
        await GetDataMapping(id).then((dataMapping) => {
            if (dataMapping) {
                copyEditTarget = { ...editTarget, dataMapping };
            }
        }).catch(error => {
            console.warn(error);
        });
    } else if (targetName === 'mas') {
        await GetMas(id).then((mas) => {
            if (mas) {
                copyEditTarget = { ...editTarget, mas };
            }
        }).catch(error => {
            console.warn(error);
        })
    }

    editTarget = copyEditTarget;

    return editTarget;
};

export {
    DefineEditTarget
};