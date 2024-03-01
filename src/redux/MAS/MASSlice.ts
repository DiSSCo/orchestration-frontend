/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { MAS } from 'app/Types';


export interface MASState {
    machineAnnotationService: MAS | undefined,
    machineAnnotationServices: MAS[];
}

const initialState: MASState = {
    machineAnnotationService: undefined,
    machineAnnotationServices: <MAS[]>[]
};

export const MASSlice = createSlice({
    name: 'machineAnnotationServices',
    initialState,
    reducers: {
        setMachineAnnotationService: (state, action: PayloadAction<MAS>) => {
            state.machineAnnotationService = action.payload;
        },
        setMachineAnnotationServices: (state, action: PayloadAction<MAS[]>) => {
            state.machineAnnotationServices = action.payload;
        }
    }
})

/* Action Creators */
export const { 
    setMachineAnnotationService,
    setMachineAnnotationServices
} = MASSlice.actions;

/* Connect with Root State */
export const getMachineAnnotationService = (state: RootState) => state.machineAnnotationServices.machineAnnotationService;
export const getMachineAnnotationServices = (state: RootState) => state.machineAnnotationServices.machineAnnotationServices;

export default MASSlice.reducer;