import React from "react";
import Header from "../../components/Header";
import Form from "../../components/Form";
import { Button } from "@material-ui/core";

class EditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    // student vem do onClick do form
    salvarAluno = async (student) => {
        await fetch("/api/add", {
            method: 'POST',
            body: JSON.stringify(student)
        })
    }


    voltar = () => {
        let student = localStorage.getItem("alunoSelecionado")
        student = JSON.parse(student)
        this.salvarAluno(student[0])
    }

    render() {
        const {student} = this.props

        return (<>
            <Header title="Edição de Informações" backPath={"/"} />
            <Form
                buttonText="Salvar Alterações"
                student={student}
                onClick={this.salvarAluno}
            />
            <Button variant="contained" color="primary" onClick={this.voltar}>Descartar Alterações</Button>
        </>);
    }
}

export default EditPage;