import React, { useContext } from 'react'
import Header from '../../components/Header'
import Form from '../../components/Form'
import { UserContext } from '../../providers/user'


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

  const { user } = useContext(UserContext)

  let token

  (user.cargo === "Diretor") ? token = true : token = false

  if (token) {
    return (
      <>
        <Header title="Formulário de Cadastro de Aluno" backPath={"/list"} exitPath={"/"} />
        <Form
          buttonText="Cadastrar"
          student={{}}
          onClick={adicionarAluno}
        />
      </>
    )
  }

  return (
    <>
      <Header title="Formulário de Cadastro de Aluno" />
      <br />
      No content
    </>
  );

}

export default FormPage


