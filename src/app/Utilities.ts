/* Import Dependencies */
import { startCase, toUpper } from "lodash";


/* Function to capitalize the first character of a string */
const Capitalize = (string: string) => {
    if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
        return '';
    }
};

/**
 * Function to transform a JSON path to a human readable string
 * @param jsonPath The provided JSON path to transform
 * @returns String
 */
const MakeJsonPathReadableString = (jsonPath: string): string => {
    let readableString: string = jsonPath;

    /* Remove root dollar sign */
    readableString = readableString.replace('$', '');

    /* Remove schema prefixes */
    readableString = RemoveSchemaPrefixes(readableString);

    /* Remove JSON path indications */
    readableString = readableString.replaceAll('[', '');
    readableString = readableString.replaceAll(']', ' ')
    readableString = readableString.replaceAll('.', ' ');

    return MakeReadableString(readableString);
};

/**
 * Function to replace capitals in a string with spaces to make a readable string
 * @param string The string that needs to be made readable
 * @returns Human readable string
 */
const MakeReadableString = (string: string): string => {
    const splitArray: RegExpMatchArray | null = string.match(/[A-Z]?[a-z]+|\d+|[A-Z]+(?![a-z])/g);

    return startCase(splitArray?.join(' ')) ?? startCase(string.split(/(?=[A-Z])/).join(' '));
};

/* Function that takes a CamelCase string and returns a readable version of it */
const ParseString = (string: string) => {
    let newString: string = string;

    /* Split input string at every upper case character break */
    for (const character of string) {
        if (character === character.toUpperCase()) {
            let splittedArray = newString.split(character, 2);

            newString = `${splittedArray[0]} ${character}${splittedArray[1]}`;
        }
    }

    return Capitalize(newString);
};

/**
 * Function to remove the schema prefixes from a JSON path
 * @param jsonPath The provided JSON path
 * @returns JSON path string without the schema prefixes
 */
const RemoveSchemaPrefixes = (jsonPath: string): string => {
    return jsonPath.replaceAll('has', '')
        .replaceAll('ods:', '')
        .replaceAll('dwc:', '')
        .replaceAll('dwciri:', '')
        .replaceAll('chrono:', '')
        .replaceAll('dcterms:', '')
        .replaceAll('schema:', '')
        .replaceAll('eco:', '')
        .replaceAll('ltc:', '');
};

/* Function that takes a readable string and returns a CamelCase version of it */
const ReparseString = (string: string) => {
    let newString: string = '';

    /* Remove all spaces from string */
    const stringSegments: string[] = string.split(' ');

    stringSegments.forEach((segment: string, index: number) => {
        if (index > 0) {
            newString += Capitalize(segment);
        } else {
            newString += segment.toLowerCase();
        }
    });

    return newString;
};

/**
 * Function for retieving an environment variable by name
 * @param name The name of the environment variable
 */
const RetrieveEnvVariable = (name: string) => {
    return import.meta.env[`VITE_${toUpper(name)}`];
};

/* Function to convert frontend format (objects with IDs) to backend array of strings */
const ExtractValues = (input: { id: string; val: string }[] = []): string[] =>
    input.map(item => item.val);

/* Function to convert backend array of strings to frontend format (objects with IDs) */
const MapToFrontendList = (existingValue: string[] | undefined) => {
    const values = existingValue || [];
    return values.map((item) => ({ id: crypto.randomUUID(), val: item }));
};

export {
    Capitalize,
    MakeJsonPathReadableString,
    ParseString,
    ReparseString,
    RetrieveEnvVariable,
    ExtractValues,
    MapToFrontendList
};