import { useEffect } from 'react';
import { useFormikContext } from 'formik';

/** 
 * Revalidates the form when the number of rows changes.
 * Uses Formik's validateForm to trigger validation after adding or removing a row.
 */
export const useRevalidateOnAddRemoveRow = (length: number) => {
    const { validateForm } = useFormikContext();

    useEffect(() => {
        validateForm();
    }, [length, validateForm]);
};