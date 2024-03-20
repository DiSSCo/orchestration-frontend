/* Generic Types */
export type EmptyCallback = () => void;

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
    organisation?: string
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

/* Machine Annotation System (MAS) Type */
export interface MAS {
    id: string,
    name: string,
    containerImage: string,
    containerTag: string,
    targetDigitalObjectFilters: {},
    topicName: string,
    serviceDescription: string,
    serviceState: string,
    sourceCodeRepository: string,
    serviceAvailability: string,
    codeMaintainer: string,
    codeLicense: string,
    dependencies: [],
    supportContact: string,
    slaDocumentation: string,
    maxReplicas: number,
    batchingPermitted: boolean
}

/* Edit Target Type */
export interface EditTarget {
    sourceSystem?: SourceSystem,
    mapping?: Mapping,
    MAS?: MAS
}