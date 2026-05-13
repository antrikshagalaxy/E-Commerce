import { createContext, useState } from "react";
import { products } from "../assets/assets";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {

    const delivery_fee = 10;
    const currency = "$";
    const [search, setSearch] = useState("");
    const [showsearch, setShowsearch] = useState(false);

    const contextValue = { products, delivery_fee, currency, search, setSearch, showsearch, setShowsearch }
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}