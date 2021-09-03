import React from "react";
import Header from "../../components/Header";
import Form from "../../components/Form";
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';

class EditPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aluno: null,
        }
    }


    // student vem da chamada do onClick no Form
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

    async componentDidMount() {
        try {
            const {
                location: { state, search },
                match: { params }
            } = this.props

            console.log("didmount state: ", state)

            if (state) {
                this.setState({ aluno: state })
            } else {
                const response = await fetch(`/api/students/${params.id}`)
                console.log(response)
                const student = await response.json()
                this.setState({ aluno: student })
            }
        } catch (error) {
            console.error(error)
        }
    }

    render() {
        const { student } = this.props

        console.log("props location", this.props)
        console.log("state", this.state)


        if (this.state.aluno) {
            console.log("state aluno: ", this.state.aluno)
            return (<>
                <Header title="Edição de Informações" backPath={"/"} />
                <Form
                    buttonText="Salvar Alterações"
                    //student={this.props.location.state}
                    student={this.state.aluno}
                    onClick={this.salvarAluno}
                />
                <Link to="/" >
                    <Button variant="contained" color="primary" onClick={this.voltar}>Descartar Alterações</Button>
                </Link>
            </>);
        } 

        return (<>
            <Header title="Edição de Informações" backPath={"/"} />
            <br />
            No content
        </>);

    }
}

export default EditPage;