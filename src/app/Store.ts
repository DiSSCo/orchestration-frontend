/* Import Dependencies */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

/* Import Redux Slices */
import SourceSystemReducer from 'redux/sourceSystem/SourceSystemSlice';


export const store = configureStore({
  reducer: {
    sourceSystem: SourceSystemReducer
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
