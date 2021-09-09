import React, { useEffect, useState, useContext } from "react";
import Header from "../../components/Header";
import Form from "../../components/Form";
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from "@material-ui/core";
import { APIContext } from "../../providers/api";

const EditPage = ({ location: { state, search }, match: { params }, student }) => {

    const [aluno, setAluno] = useState(null)

    let history = useHistory()
    const location = useLocation()

    console.log("location", location)

    const { api } = useContext(APIContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (state) {
                    setAluno(state)
                } else {
                    console.log("params id", params.id)
                    const response = await fetch(`/api/students/${params.id}`)
                    const student = await response.json()
                    setAluno(student)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    }, [state, params.id])

    // student vem da chamada do onClick no Form
    const salvarAluno = async (student) => {
        await fetch("/api/add", {
            method: 'POST',
            body: JSON.stringify(student)
        })
        history.push('/list')
    }

    const voltar = async () => {
        const student = await api.get("api/selected")
        console.log("voltar", student)
        salvarAluno(student[0])
    }

    if (aluno) {
        return (<>
            <Header title="Edição de Informações" backPath={"/list"} exitPath={"/"}/>
            <Form
                buttonText="Salvar Alterações"
                student={aluno}
                onClick={salvarAluno}
            />
            <Button variant="contained" color="primary" onClick={voltar}>Descartar Alterações</Button>
        </>);
    }

    return (<>
        <Header title="Edição de Informações" />
        <br />
        No content
    </>);

}


export default EditPage;