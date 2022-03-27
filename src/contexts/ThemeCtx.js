import { createContext, useState } from 'react'

const ThemeCtx = createContext({})

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState();



    return <ThemeCtx.Provider value={{
        theme
    }}>
        {children}
    </ThemeCtx.Provider>
}


export { ThemeProvider, ThemeCtx }