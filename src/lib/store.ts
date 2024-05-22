import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

type Filter ={
    sub: string,
    cat: string,
    jt: string,
    wp: string,
    wr: string,
    lg: string,
    exp: string,
    wb: string[],
}

const initialFilter: Filter = {
    sub: "",
    cat: "",
    jt: "",
    wp: "",
    wr: "",
    lg: "",
    exp: "",
    wb: [],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState: initialFilter,
  reducers: {
    setFilter: (state:any, action: PayloadAction<Filter>) => {
        console.log('action:',action)
    return ({
      ...state, ...action.payload
    })},
    resetFilter: () => {
       initialFilter
    },
  },
});


export const { setFilter,resetFilter } = filterSlice.actions;

const createNoopStorage = () => {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem(_key: string, value: number) {
        return Promise.resolve(value);
      },
      removeItem() {
        return Promise.resolve();
      },
    };
};
  
const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const filterPersistConfig = {
    key: "filter",
    storage: storage,
    whitelist: ["filter"],
};
  
  



const persistedReducer = persistReducer(filterPersistConfig, filterSlice.reducer);

const rootReducer = combineReducers({
    filter: persistedReducer,
});

export const makeStore =()=>{
  return configureStore({
      reducer: {
        filter:filterSlice.reducer
      },
      middleware: (getDefaultMiddleware:any) =>
          getDefaultMiddleware({ serializableCheck: false }),
  });
}



export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFilter = () => useSelector((state: RootState) => state.filter);


