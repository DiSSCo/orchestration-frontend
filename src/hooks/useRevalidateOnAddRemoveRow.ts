import { useEffect } from 'react';
import { useFormikContext } from 'formik';


export const useRevalidateOnAddRemoveRow = (length: number) => {
    /** Formik hook that gives access to the helper functions, in order to control the state and the validation of the form. */
    const { validateForm } = useFormikContext();

    useEffect(() => {
        validateForm();
    }, [length, validateForm]);
};