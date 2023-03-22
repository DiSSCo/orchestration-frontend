/* Generic Types */
export type EmptyCallback = {
    (): void;
}

export type Dict = {
    [name: string]: any;
};

/* JSON Result Interface */
export type JSONResult = {
    data: {
        id: string,
        type: string,
        attributes: Dict
    },
    links: {
        self: string
    }
};

/* User Type */
export type User = {
    id: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    organization?: string
    orcid?: string,
};

/* Source System Type */
export interface SourceSystem {
    id: string,
    created: Date,
    name: string,
    endpoint: string,
    description: string,
    mappingId: string
};

/* Mapping Type */
export interface Mapping {
    id: string,
    version: number,
    created: Date,
    creator: string,
    name: string,
    description: string,
    sourceDataStandard: string,
    fieldMapping: {
        mapping: [{
            [property: string]: string;
        }],
        defaults: [{
            [property: string]: string;
        }]
    }
}

/* Edit Target Type */
export interface EditTarget {
    sourceSystem?: SourceSystem,
    mapping?: Mapping
}