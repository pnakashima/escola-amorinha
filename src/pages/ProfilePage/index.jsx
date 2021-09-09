import React, { useContext } from 'react'
import Header from '../../components/Header'
import { UserContext } from '../../providers/user';


const ProfilePage = () => {
    const { user } = useContext(UserContext)
    return (
        <>
            <Header title="Profile Page" backPath={"/list"} exitPath={"/"} />
            <p>Nome: {user.nome} </p>
            <p>E-mail: {user.login} </p>
            <p>Cargo: {user.cargo} </p>
            <p>Turmas:
                <ul>
                    {user.turmas.map(turma => <li> {turma} </li>)}
                </ul>
            </p>
        </>
    );
}

export default ProfilePage
