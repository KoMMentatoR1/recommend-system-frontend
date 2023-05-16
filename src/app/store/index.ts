import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'
import { authSlice } from './slices/authSlice'
import { bookApi } from './api/bookApi'
import { authorsApi } from './api/authorsApi'
import { reviewApi } from './api/reviewApi'
import { recommendApi } from './api/recommendApi'
import { categoriesApi } from './api/categoriesApi'

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [bookApi.reducerPath]: bookApi.reducer,
  [authorsApi.reducerPath]: authorsApi.reducer,
  [reviewApi.reducerPath]: reviewApi.reducer,
  [recommendApi.reducerPath]: recommendApi.reducer,
  [categoriesApi.reducerPath]: categoriesApi.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: etDefaultMiddleware =>
      getDefaultMiddleware().concat(
        bookApi.middleware,
        authorsApi.middleware,
        reviewApi.middleware,
        recommendApi.middleware,
        categoriesApi.middleware
      ),
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
