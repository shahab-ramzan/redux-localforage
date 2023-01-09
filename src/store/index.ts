import { createStore, Store } from "redux";
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from "redux-persist";
// import storage from "redux-persist/lib/storage";
import localForage from 'localforage';


// reducers


import TopicSlice from "./slices/topicSlice";
// reducers

let combinedReducer = combineReducers({
  
  topic: TopicSlice,

  
});

const rootReducer = (state, action) => {
  if (action.type === "auth/setLogout") {
    state.filters = undefined;
  }
  return combinedReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage: localForage,

  whitelist: [

    "filters",
    "topic",

  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  // .concat(logger),
});

const makeStore = (context: Context) => createStore(persistedReducer);
const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export interface State {
  tree: string;
}
export { persistor, store };

export const wrapper = createWrapper(makeStore, { debug: true });
