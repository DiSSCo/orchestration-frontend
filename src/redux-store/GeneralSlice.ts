/* Import Dependencies */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/Store';


export interface GeneralState {
    windowDimensions: {
        vw: number,
        vh: number
    }
}

const initialState: GeneralState = {
    windowDimensions: {vw: 0, vh: 0}
};

export const GeneralSlice = createSlice({
    name: 'edit',
    initialState,
    reducers: {
        setWindowDimensions: (state, action: PayloadAction<{vw: number, vh: number}>) => {
            state.windowDimensions = action.payload;
        }
    }
})

/* Action Creators */
export const { setWindowDimensions } = GeneralSlice.actions;

/* Connect with Root State */
export const getWindowDimensions = (state: RootState) => state.general.windowDimensions;

export default GeneralSlice.reducer;