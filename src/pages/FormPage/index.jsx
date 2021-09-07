import React from 'react'
import Header from '../../components/Header'
import Form from '../../components/Form'


const idGen = () => Math.floor((1 + Math.random()) * 0x1000000).toString(16)  // gera um id aleatorio

const adicionarAluno = async (student) => {
  let id = idGen()
  student.id = id
  await fetch("/api/add", {
    method: 'POST',
    body: JSON.stringify(student)
  })
}

const FormPage = () => {
  return (
    <>
      <Header title="Formulário de Cadastro de Aluno" backPath={"/list"} />
      <Form
        buttonText="Cadastrar"
        student={{}}
        onClick={adicionarAluno}
      />
    </>
  );
}

export default FormPage


