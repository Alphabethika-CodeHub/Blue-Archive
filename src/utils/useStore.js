import React from 'react';
import { Store } from '../stores';
import { useLocalStore } from 'mobx-react-lite';

const StoreContext = React.createContext(null);

export const store = new Store();
store.setInitialToken(localStorage.getItem("access_token"), localStorage.getItem("refresh_token"));

export const StoreProvider = ({ children }) => {
    const localStore = useLocalStore(() => {
        return store;
    });
    return <StoreContext.Provider value={localStore}>{children}</StoreContext.Provider>
};

export const useStore = () => {
    const store = React.useContext(StoreContext);
    if (!store) {
        throw new Error("useStore Must be Used Within a StoreProvider.")
    }
    return store;
}