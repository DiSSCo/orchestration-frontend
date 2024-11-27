/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { DataMapping } from 'app/types/DataMapping';


export interface MappingState {
    mapping: DataMapping | undefined;
    mappings: DataMapping[];
}

const initialState: MappingState = {
    mapping: undefined,
    mappings: <DataMapping[]>[]
};

export const MappingSlice = createSlice({
    name: 'mapping',
    initialState,
    reducers: {
        setMapping: (state, action: PayloadAction<DataMapping>) => {
            state.mapping = action.payload;
        },
        setMappings: (state, action: PayloadAction<DataMapping[]>) => {
            state.mappings = action.payload;
        }
    }
});

/* Action Creators */
export const { setMapping, setMappings } = MappingSlice.actions;

/* Connect with Root State */
export const getMapping = (state: RootState) => state.mapping.mapping;
export const getMappings = (state: RootState) => state.mapping.mappings;

export default MappingSlice.reducer;