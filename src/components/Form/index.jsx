import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import InputCheckbox from '../InputCheckbox';
import Box from '@material-ui/core/Box'

const Form = ({ student, buttonText, onClick, }) => {

    const [id] = useState(student.id)
    const [nome, setNome] = useState(student.nome)
    const [nascimento, setNascimento] = useState(student.nascimento)
    const [nomeresponsavel, setNomeResponsavel] = useState(student.nomeresponsavel)
    const [telresponsavel, setTelResponsavel] = useState(student.telresponsavel)
    const [turma, setTurma] = useState(student.turma)
    const [telemergencia, setTelEmergencia] = useState(student.telemergencia)
    const [nomeemergencia, setNomeEmergencia] = useState(student.nomeemergencia)
    const [restricaoalim, setRestricaoAlim] = useState(student.restricaoalim)
    const [descricaorestricao, setDescricaoRestricao] = useState(student.descricaorestricao)
    const [autorizacaofotos, setAutorizacaoFotos] = useState(student.autorizacaofotos)
    const [listaautorizados, setListaAutorizados] = useState(student.listaautorizados)
    const [obsadicionais, setObsAdicionais] = useState(student.obsadicionais)
    const [errorMessage, setErrorMessage] = useState("")


    const checkName = (name) => {
        const letters = /^[A-Za-z]+$/
        return name.match(letters) ? true : false;
    }

    const onSubmit = (event) => {
        event.preventDefault()
        const validName = checkName(nome)
        if (validName) {
            setErrorMessage("")
            onClick(student)  // passando o student pra página pai 
        } else {
            setErrorMessage("Digite apenas letras")
        }
        console.log("check validity: ", event.target.checkValidity())
    }

    const onInvalid = (event) => {
        event.target.setCustomValidity("Por favor digite um nome")
    }

    const phoneMask = (event) => {
        let text = event.target.value
        let numbers = text.replace(/\D/g, '')
        let mask = [...numbers].map((letter, i) => {
            if (i === 0) return ['(', letter]
            if (i === 2) return [')', letter]
            if (i === 7) return ['-', letter]
            if (i > 10) return ['']
            return letter
        }).flat(1).join('')
        const inputValue = mask
        event.target.value = mask
        return inputValue
    }

    const numberMask = (event) => {
        let text = event.target.value
        let numbers = text.replace(/\D/g, '')
        const inputValue = numbers
        event.target.value = numbers
        return inputValue
    }

    const handleCheck = (event) => {
        const inputValue = event.target.checked
        let checkValue = ""
        if (inputValue === true) {
            checkValue = "checked"
        }
        return checkValue
    }

    student = {
        id, nome, nascimento, nomeresponsavel, telresponsavel, turma,
        telemergencia, nomeemergencia, restricaoalim, descricaorestricao,
        autorizacaofotos, listaautorizados, obsadicionais
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <Box display="flex" gridGap={20} width="50%">
                    <TextField
                        fullWidth
                        required
                        margin="normal"
                        id="nome"
                        //type="text"
                        label="Nome do Aluno"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        onInvalid={onInvalid}
                        placeholder="Digite o nome do aluno"
                        helperText="Digite apenas letras"
                        error={!!errorMessage}
                    />
                    <TextField
                        fullWidth
                        required
                        margin="normal"
                        id="nascimento"
                        type="date"
                        label="Data de nascimento: "
                        value={nascimento}
                        onChange={(e) => setNascimento(e.target.value)}
                        InputLabelProps={{ shrink: true, }}
                    />
                    <br />
                </Box>
                <Box display="flex" gridGap={20} width="50%">
                    <TextField
                        fullWidth
                        margin="normal"
                        id="nomeresponsavel"
                        //type="text"
                        label="Nome do responsável: "
                        value={nomeresponsavel}
                        onChange={(e) => setNomeResponsavel(e.target.value)}
                        placeholder="Digite o nome do responsável"
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        id="telresponsavel"
                        type="text"
                        label="Telefone do responsável: "
                        value={telresponsavel}
                        onChange={(e) => setTelResponsavel(phoneMask(e))}
                        placeholder="(xx)xxxxx-xxxx"
                    />
                    <br />
                </Box>
                <Box display="flex" gridGap={20} width="50%">
                    <TextField
                        fullWidth
                        required
                        margin="normal"
                        id="nomeemergencia"
                        type="text"
                        label="Nome do contato de emergência: "
                        value={nomeemergencia}
                        onChange={(e) => setNomeEmergencia(e.target.value)}
                        placeholder="Digite o nome do contato de emergência"
                    />
                    <TextField
                        fullWidth
                        required
                        margin="normal"
                        id="telemergencia"
                        type="text"
                        label="Telefone de emergência: "
                        value={telemergencia}
                        onChange={(e) => setTelEmergencia(phoneMask(e))}
                        placeholder="(xx)xxxxx-xxxx"
                    />
                    <br />
                </Box>
                <Box display="flex" gridGap={20} width="50%">
                    <InputCheckbox
                        margin="normal"
                        id="restricaoalim"
                        type="checkbox"
                        label="Possui restrição alimentar?"
                        onChange={(e) => setRestricaoAlim(handleCheck(e))}
                        checked={restricaoalim}
                    />
                    <br />
                </Box>
                <Box display="flex" gridGap={20} width="50%">
                    {restricaoalim &&
                        <TextField
                            fullWidth
                            margin="normal"
                            id="descricaorestricao"
                            type="text"
                            label="Descrição das restrições alimentares"
                            value={descricaorestricao}
                            placeholder="Descreva as restrições alimentares"
                            onChange={(e) => setDescricaoRestricao(e.target.value)}
                        />}
                    <br />
                </Box>
                <Box display="flex" gridGap={20} width="50%">
                    <InputCheckbox
                        margin="normal"
                        id="autorizacaofotos"
                        type="checkbox"
                        label="Autorização de fotos e vídeos da criança"
                        onChange={(e) => setAutorizacaoFotos(handleCheck(e))}
                        checked={autorizacaofotos}
                    />
                    <br />
                </Box>
                <Box display="flex" gridGap={20} width="50%">
                    <TextField
                        fullWidth
                        margin="normal"
                        id="listaautorizados"
                        label="Lista de autorizados a buscar a criança "
                        value={listaautorizados}
                        onChange={(e) => setListaAutorizados(e.target.value)}
                        placeholder="Digite o nome e o parentesco das pessoas autorizadas"
                    />
                    {/* <label>Lista de autorizados a buscar a criança</label>
                        <select>
                            <option value="mae">Mãe</option>
                            <option value="pai">Pai</option>
                            <option value="tio">Tio</option>
                            <option value="avo">Avó</option>
                            <option value="padrinho">Padrinho</option>
                        </select>
                        <br /> */}
                </Box>
                <Box display="flex" gridGap={20} width="50%">
                    <TextField
                        fullWidth
                        required
                        margin="normal"
                        id="turma"
                        type="text"
                        label="Turma: "
                        value={turma}
                        onChange={(e) => setTurma(numberMask(e))}
                        placeholder="Número da turma"
                    />
                    <br />
                </Box>
                <Box display="flex" gridGap={20} width="50%">
                    <TextField
                        fullWidth
                        margin="normal"
                        id="obsadicionais"
                        label="Observações adicionais "
                        value={obsadicionais}
                        onChange={(e) => setObsAdicionais(e.target.value)}
                        placeholder="Escreva aqui qualquer observação adicional"
                    />
                    <br />
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    id="submit"
                >{buttonText}</Button>
            </form>
        </>
    );
}


export default Form

