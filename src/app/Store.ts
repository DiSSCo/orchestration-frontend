/* Import Dependencies */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

/* Import Redux Slices */
import GeneralReducer from 'redux/general/GeneralSlice';
import SourceSystemReducer from 'redux/sourceSystem/SourceSystemSlice';
import MappingReducer from 'redux/mapping/MappingSlice';
import MASReducer from 'redux/MAS/MASSlice';
import EditReducer from 'redux/edit/EditSlice';


export const store = configureStore({
  reducer: {
    general: GeneralReducer,
    sourceSystem: SourceSystemReducer,
    mapping: MappingReducer,
    machineAnnotationServices: MASReducer,
    edit: EditReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
