import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        console.log("getToken", userToken)
        return userToken?.token
    }

    console.log("passou aqui")
    const [token, setToken] = useState(getToken())
    console.log("dpois aqui")


    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken));
        console.log("saveToken", userToken)
        setToken(userToken);
    }

    return {
        setToken: saveToken,
        token
    }
}