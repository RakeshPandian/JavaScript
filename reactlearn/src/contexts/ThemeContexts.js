import { useState, createContext } from "react";

export const LanguageContext = createContext();

export function LanguageProvider(props){
    const[language,setLanguage] = useState("Tamil");
    function changeLanguage(e){
        setLanguage(e);
        console.log("LanguageProvider - " + e);
    }

    return(
<LanguageContext.Provider value={{language, changeLanguage}}>
    {props.children}
</LanguageContext.Provider>
    );
}