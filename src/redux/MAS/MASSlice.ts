/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';

/* Import Types */
import { MAS } from 'global/Types';


export interface MASState {
    machineAnnotationServices: MAS[];
}

const initialState: MASState = {
    machineAnnotationServices: <MAS[]>[]
};

export const MASSlice = createSlice({
    name: 'machineAnnotationServices',
    initialState,
    reducers: {
        setMachineAnnotationServices: (state, action: PayloadAction<MAS[]>) => {
            state.machineAnnotationServices = action.payload;
        }
    }
})

/* Action Creators */
export const { setMachineAnnotationServices } = MASSlice.actions;

/* Connect with Root State */
export const getMachineAnnotationServices = (state: RootState) => state.machineAnnotationServices.machineAnnotationServices;

export default MASSlice.reducer;