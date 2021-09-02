import React from 'react'
import Header from '../../components/Header'
import Form from '../../components/Form'
import { withStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core'


class FormPage extends React.Component {

  idGen = () => Math.floor((1 + Math.random()) * 0x1000000).toString(16)  // gera um id aleatorio

  adicionarAluno = async (student) => {
    let id = this.idGen()
    student.id = id
    await fetch("/api/add", {
      method: 'POST',
      body: JSON.stringify(student)
    })

  }
  
  render() {
    return (
      <>
        <Header title="Formulário de Cadastro de Aluno" backPath="/directory"/>
        <Form
          buttonText="Cadastrar"
          student={{}}
          onClick={this.adicionarAluno.bind(this)}
        />
      </>
    );
  }
}

export default FormPage


