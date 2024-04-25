import { createContext,useState } from "react";

export const SectionContext = createContext();
export const UserContext = createContext();

const SectionContextValue = (props) =>{
    const [section,setSection] = useState();
    return(
        <SectionContext.Provider value={[section,setSection]}>
            {props.children}
        </SectionContext.Provider>
    );
}
const UserContextValue = (props) => {
    const [user,setUser] = useState();
    return(
        <UserContext.Provider value={[user,setUser]}>
            {props.children}
        </UserContext.Provider>
    );
}

export  {SectionContextValue};
export {UserContextValue}