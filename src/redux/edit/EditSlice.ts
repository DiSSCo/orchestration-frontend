/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { EditTarget } from 'app/Types';


export interface EditState {
    target: EditTarget | undefined;
}

const initialState: EditState = {
    target: undefined
};

export const EditSlice = createSlice({
    name: 'edit',
    initialState,
    reducers: {
        setEditTarget: (state, action: PayloadAction<EditTarget>) => {
            state.target = action.payload;
        }
    }
})

/* Action Creators */
export const { setEditTarget } = EditSlice.actions;

/* Connect with Root State */
export const getEditTarget = (state: RootState) => state.edit.target;

export default EditSlice.reducer;