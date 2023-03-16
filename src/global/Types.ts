/* Generic Types */
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

/* Source System Type */
export interface SourceSystem {
    id: string,
    created: Date,
    sourceSystem: {
        name: string,
        endpoint: string,
        description: string,
        mappingId: string
    }
};

/* Mapping Type */
export interface Mapping {
    id: string,
    version: number,
    created: Date,
    creator: string,
    mapping: {
        name: string,
        description: string,
        mapping: {
            mapping: [{
                [property: string]: string;
            }],
            defaults: [{
                [property: string]: string;
            }]
        }
    }
}