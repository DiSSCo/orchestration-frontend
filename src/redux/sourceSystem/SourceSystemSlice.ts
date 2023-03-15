/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types 
import { SourceSystem } from 'global/Types'; */


export interface SourceSystemState {
    test: string
}

const initialState: SourceSystemState = {
    test: ''
};

export const SourceSystemSlice = createSlice({
    name: 'sourceSystem',
    initialState,
    reducers: {
        setTest: (state, action: PayloadAction<string>) => {
            state.test = action.payload;
        }
    }
})

/* Action Creators */
export const { setTest } = SourceSystemSlice.actions;

/* Connect with Root State */
export const getTest = (state: RootState) => state.sourceSystem.test;

export default SourceSystemSlice.reducer;