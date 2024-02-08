/* Function to capitalize the first character of a string */
const Capitalize = (string: string) => {
    if (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } else {
        return '';
    }
}

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
}

export {
    Capitalize,
    ParseString
};