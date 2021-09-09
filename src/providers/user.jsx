import React from 'react'

export const UserContext = React.createContext({})

export const UserProvider = (user, { children }) => {
    return (
        <UserContext.Provider value={{ user }}>
            {children}
        </UserContext.Provider>
    )
}
