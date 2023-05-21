import { createContext, useState, useEffect } from "react";

const AuthCotext = createContext()

export default AuthCotext

export const AuthProvider = ({children}) => {
    let [user, setUser] = useState(null)
    let [authTokens, setAuthTokens] = useState(null)

     

    let contextData = {
        
    }

    return(
        <AuthCotext.Provider value={contextData}>
            {children}
            
        </AuthCotext.Provider>
    )
}