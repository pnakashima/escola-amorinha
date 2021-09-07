import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Form from "../../components/Form";
//import { Link } from 'react-router-dom';

const EditPage = ({ location: { state, search }, match: { params }, student }) => {

    const [aluno, setAluno] = useState(null)

    // student vem da chamada do onClick no Form
    const salvarAluno = async (student) => {
        await fetch("/api/add", {
            method: 'POST',
            body: JSON.stringify(student)
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (state) {
                    setAluno(state)
                } else {
                    const response = await fetch(`/api/students/${params.id}`)
                    const student = await response.json()
                    setAluno(student)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
    })

    if (aluno) {
        return (<>
            <Header title="Edição de Informações" backPath={"/list"} />
            <Form
                buttonText="Salvar Alterações"
                student={aluno}
                onClick={salvarAluno}
            />
            {/* <Link to="/" >
                    <Button variant="contained" color="primary" onClick={this.voltar}>Descartar Alterações</Button>
                </Link> */}
        </>);
    }

    return (<>
        <Header title="Edição de Informações" backPath={"/"} />
        <br />
        No content
    </>);

}


export default EditPage;