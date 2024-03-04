/* Import Utilities */
import { Capitalize, ParseString, ReparseString } from "app/Utilities";


/* Tests for all the custom Utility functions provided within the application */


describe("Capitalize: insert a string to capitalize the first character of that string", () => {
    it("Should return a capitalized version of a given string, meaning the first character gets transformed to higher case", () => {
        const string = Capitalize('source system');

        expect(string).toBe('Source system');
    });

    it("Should return an empty string if no input is given", () => {
        const string = Capitalize('');

        expect(string).toBe('');
    });
});


describe("ParseString: insert a CamelCase string, to transform it to a human readable version, e.g. sourceSystem should become Source System", () => {
    it("Should return a human readable string from a CamelCase string", () => {
        const string = ParseString('sourceSystem');

        expect(string).toBe('Source System');
    });

    it("Should return an empty string if no input is given", () => {
        const string = ParseString('');

        expect(string).toBe('');
    });
});


describe("ReparseString: insert a human readable string, to transform it to a CamelCase version, e.g. Source System should become sourceSystem", () => {
    it ("Should return a CamelCase string from a human readable string", () => {
        const string = ReparseString('Source System');

        expect(string).toBe('sourceSystem');
    });

    it ("Should return an empty string if no input is given", () => {
        const string = ReparseString('');

        expect(string).toBe('');
    });
});