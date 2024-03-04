/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { SourceSystem } from 'app/Types';


export interface SourceSystemState {
    sourceSystem: SourceSystem | undefined;
    sourceSystems: SourceSystem[];
}

const initialState: SourceSystemState = {
    sourceSystem: undefined,
    sourceSystems: []
};

export const SourceSystemSlice = createSlice({
    name: 'sourceSystem',
    initialState,
    reducers: {
        setSourceSystem: (state, action: PayloadAction<SourceSystem>) => {
            state.sourceSystem = action.payload;
        },
        setSourceSystems: (state, action: PayloadAction<SourceSystem[]>) => {
            state.sourceSystems = action.payload;
        }
    }
})

/* Action Creators */
export const {
    setSourceSystem,
    setSourceSystems
} = SourceSystemSlice.actions;

/* Connect with Root State */
export const getSourceSystem = (state: RootState) => state.sourceSystem.sourceSystem;
export const getSourceSystems = (state: RootState) => state.sourceSystem.sourceSystems;

export default SourceSystemSlice.reducer;