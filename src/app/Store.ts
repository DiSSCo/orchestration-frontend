/* Import Dependencies */
import { combineReducers, configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import type { PreloadedStateShapeFromReducersMapObject } from '@reduxjs/toolkit';

/* Import Redux Slices */
import GeneralReducer from 'redux-store/GeneralSlice';
import SourceSystemReducer from 'redux-store/SourceSystemSlice';
import DataMappingReducer from 'redux-store/DataMappingSlice';
import MASReducer from 'redux-store/MasSlice';
import EditReducer from 'redux-store/EditSlice';


const rootReducer = combineReducers({
  general: GeneralReducer,
  sourceSystem: SourceSystemReducer,
  dataMapping: DataMappingReducer,
  machineAnnotationServices: MASReducer,
  edit: EditReducer
});

export const setupStore = (preloadedState?: PreloadedStateShapeFromReducersMapObject<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
