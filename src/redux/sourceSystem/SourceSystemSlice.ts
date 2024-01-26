/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { SourceSystem } from 'app/Types';


export interface SourceSystemState {
    sourceSystems: SourceSystem[];
}

const initialState: SourceSystemState = {
    sourceSystems: <SourceSystem[]>[]
};

export const SourceSystemSlice = createSlice({
    name: 'sourceSystem',
    initialState,
    reducers: {
        setSourceSystems: (state, action: PayloadAction<SourceSystem[]>) => {
            state.sourceSystems = action.payload;
        }
    }
})

/* Action Creators */
export const { setSourceSystems } = SourceSystemSlice.actions;

/* Connect with Root State */
export const getSourceSystems = (state: RootState) => state.sourceSystem.sourceSystems;

export default SourceSystemSlice.reducer;