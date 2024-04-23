import { createContext,useState } from "react";

export const SectionContext = createContext();
const SectionContextValue = (props) =>{
    const [section,setSection] = useState();
    return(
        <SectionContext.Provider value={[section,setSection]}>
            {props.children}
        </SectionContext.Provider>
    );
}
export  {SectionContextValue};