import React, {useState, useEffect} from 'react';
import {GlobalStateContext} from 'context/Contexts';
import { GetListFiles } from 'controller/listController';


const GlobalStateProvider = ({children}) => {
    const [files,setFiles] = useState(null);
 
    useEffect(()=>{
        GetListFiles().then(res => setFiles(res.data));
    },[]);
    
    return(
            <GlobalStateContext.Provider
                value={{
                    files,
                }}
            >
                {children}
            </GlobalStateContext.Provider>
    )
    
}

export default GlobalStateProvider; 