/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { MachineAnnotationService } from 'app/types/MachineAnnotationService';


export interface MASState {
    machineAnnotationService: MachineAnnotationService | undefined,
    machineAnnotationServices: MachineAnnotationService[];
}

const initialState: MASState = {
    machineAnnotationService: undefined,
    machineAnnotationServices: <MachineAnnotationService[]>[]
};

export const MASSlice = createSlice({
    name: 'machineAnnotationServices',
    initialState,
    reducers: {
        setMachineAnnotationService: (state, action: PayloadAction<MachineAnnotationService>) => {
            state.machineAnnotationService = action.payload;
        },
        setMachineAnnotationServices: (state, action: PayloadAction<MachineAnnotationService[]>) => {
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