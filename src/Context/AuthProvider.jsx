import { createContext } from "react";

export const AuthContext = createContext()

const AuthPrivider = ({children}) => {
    const name = 'zerin'
    const authInfo = {
        name
    }
    return <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
};

export default AuthPrivider;