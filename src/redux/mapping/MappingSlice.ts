/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { Mapping } from 'global/Types';


export interface MappingState {
    mappings: Mapping[];
}

const initialState: MappingState = {
    mappings: <Mapping[]>[]
};

export const SourceSystemSlice = createSlice({
    name: 'mapping',
    initialState,
    reducers: {
        setMappings: (state, action: PayloadAction<Mapping[]>) => {
            state.mappings = action.payload;
        }
    }
})

/* Action Creators */
export const { setMappings } = SourceSystemSlice.actions;

/* Connect with Root State */
export const getMappings = (state: RootState) => state.mapping.mappings;

export default SourceSystemSlice.reducer;