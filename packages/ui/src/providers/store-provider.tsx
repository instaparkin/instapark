"use client"

import React from "react";
import { Provider, store } from "@instapark/state";

interface StoreProviderProps {
    children: React.ReactNode
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}