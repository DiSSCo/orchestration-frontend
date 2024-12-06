/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { DataMapping } from 'app/types/DataMapping';


export interface DataMappingState {
    dataMapping: DataMapping | undefined;
    dataMappings: DataMapping[];
}

const initialState: DataMappingState = {
    dataMapping: undefined,
    dataMappings: <DataMapping[]>[]
};

export const DataMappingSlice = createSlice({
    name: 'dataMapping',
    initialState,
    reducers: {
        setDataMapping: (state, action: PayloadAction<DataMapping>) => {
            state.dataMapping = action.payload;
        },
        setDataMappings: (state, action: PayloadAction<DataMapping[]>) => {
            state.dataMappings = action.payload;
        }
    }
});

/* Action Creators */
export const { setDataMapping, setDataMappings } = DataMappingSlice.actions;

/* Connect with Root State */
export const getDataMapping = (state: RootState) => state.dataMapping.dataMapping;
export const getDataMappings = (state: RootState) => state.dataMapping.dataMappings;

export default DataMappingSlice.reducer;