/* Import Dependencies */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

/* Import Redux Slices */
import SourceSystemReducer from 'redux/sourceSystem/SourceSystemSlice';
import MappingReducer from 'redux/mapping/MappingSlice';


export const store = configureStore({
  reducer: {
    sourceSystem: SourceSystemReducer,
    mapping: MappingReducer
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
