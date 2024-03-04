/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { Mapping } from 'app/Types';


export interface MappingState {
    mapping: Mapping | undefined;
    mappings: Mapping[];
}

const initialState: MappingState = {
    mapping: undefined,
    mappings: <Mapping[]>[]
};

export const MappingSlice = createSlice({
    name: 'mapping',
    initialState,
    reducers: {
        setMapping: (state, action: PayloadAction<Mapping>) => {
            state.mapping = action.payload;
        },
        setMappings: (state, action: PayloadAction<Mapping[]>) => {
            state.mappings = action.payload;
        }
    }
})

/* Action Creators */
export const { setMapping, setMappings } = MappingSlice.actions;

/* Connect with Root State */
export const getMapping = (state: RootState) => state.mapping.mapping;
export const getMappings = (state: RootState) => state.mapping.mappings;

export default MappingSlice.reducer;