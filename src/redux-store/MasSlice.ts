/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { MachineAnnotationService } from 'app/types/MachineAnnotationService';


export interface masState {
    machineAnnotationService: MachineAnnotationService | undefined,
    machineAnnotationServices: MachineAnnotationService[];
}

const initialState: masState = {
    machineAnnotationService: undefined,
    machineAnnotationServices: <MachineAnnotationService[]>[]
};

export const MasSlice = createSlice({
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
} = MasSlice.actions;

/* Connect with Root State */
export const getMachineAnnotationService = (state: RootState) => state.machineAnnotationServices.machineAnnotationService;
export const getMachineAnnotationServices = (state: RootState) => state.machineAnnotationServices.machineAnnotationServices;

export default MasSlice.reducer;