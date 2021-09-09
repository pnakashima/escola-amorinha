import React, { useState, useContext } from 'react'
import Header from '../../components/Header'
import { Box, TextField, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import logo from './school.png'
import PropTypes from 'prop-types'
import { UserContext } from '../../providers/user'


const LoginPage = ({ setToken, setInfo }) => {

    const [login, setLogin] = useState()
    const [senha, setSenha] = useState()
    const [errorLogin, setErrorLogin] = useState()
    const [errorSenha, setErrorSenha] = useState()

    let history = useHistory()

    const { setUser } = useContext(UserContext)

    const onSubmit = async (event) => {
        event.preventDefault()

        const { status, employee } = await fetch("/api/employees", {
            method: 'POST',
            body: JSON.stringify({ login, senha })
        })
            .then(response => response.json())
            .then()

        console.log("status ", status)
        console.log("employee ", employee)

        if (status === "SUCCESS") {
            console.log("Login ok")
            setToken(true)
            setUser(employee)
            history.push('/list')

        } else if (status === "PASSWORD") {
            console.log("Senha incorreta")
            setErrorSenha("Senha incorreta")    // NAO TA APARECENDO O ERRO, na 1a vez q digita errado ele recarrega a pagina, na 2a vez n recarrega e aparece
            setToken(false)

        } else if (status === "USER") {
            console.log("Usuário não encontrado")
            setErrorLogin("Usuário não encontrado") // NAO TA APARECENDO O ERRO
            setToken(false)
        }
    }

    // const onSubmit = (event) => {
    //     event.preventDefault()
    //     validateLogin()
    // }

    // const onInvalid = (event) => {
    //     event.target.setCustomValidity("Por favor digite um nome")
    // }

    return (
        <>
            <Header title="Login" />
            <div><img src={logo} alt="logo" width='100' /></div>
            <form onSubmit={onSubmit}>
                <Box display="flex" gridGap={20} width="50%">
                    <TextField
                        fullWidth
                        required
                        margin="normal"
                        id="login"
                        label="Login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        //onInvalid={onInvalid}
                        placeholder="Login"
                        helperText={errorLogin}
                        error={!!errorLogin}
                    />
                </Box>
                <Box display="flex" gridGap={20} width="50%">
                    <TextField
                        fullWidth
                        required
                        margin="normal"
                        id="senha"
                        label="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        //onInvalid={onInvalid}
                        placeholder="Senha"
                        helperText={errorSenha}
                        error={!!errorSenha}
                    />
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    id="submit"
                >Entrar</Button>
            </form>
        </>
    )
}

LoginPage.protoTypes = {
    setToken: PropTypes.func.isRequired
}

export default LoginPage