/* Import Types */
import { SourceSystem } from "./types/SourceSystem";
import { MachineAnnotationService } from "./types/MachineAnnotationService";
import { DataMapping } from "./types/DataMapping";


/* Generic Types */
export type EmptyCallback = () => void;

/* General type for a dictionary */
export type Dict = {
    [name: string]: any;
};

/* Types for JSON Result Interfaces */
type DataFragment = {
    id: string,
    type: string,
    attributes: {
        sourceSystem?: SourceSystem,
        Mapping?: DataMapping,
        Mas?: MachineAnnotationService
        [property: string]: any
    }
};

export type JSONResult = {
    data: DataFragment,
    links: {
        self: string
    },
    meta?: {
        totalRecords: number
    }
};

export type JSONResultArray = {
    data: DataFragment[] | Dict[],
    links: {
        self: string,
        first?: string,
        next?: string,
        previous?: string
    },
    meta?: {
        totalRecords: number
    }
};

/* Edit Target */
export interface EditTarget {
    sourceSystem?: SourceSystem,
    mapping?: DataMapping,
    mas?: MachineAnnotationService
}