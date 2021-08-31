import React from 'react'
import TextField from '@material-ui/core/TextField'
import { withStyles } from "@material-ui/core/styles";
import { Button } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';
import InputCheckbox from '../InputCheckbox';
import Box from '@material-ui/core/Box'

// const useStyles = (theme) => ({
//     root: {
//         '& > *': {
//             margin: theme.spacing(1, 4),
//             width: '60ch',
//             color: "red",
//         },
//     },
// });



class Form extends React.Component {

    render() {

        const { classes, value, student, onChange, onSubmit } = this.props

        return (
            <>
                <form>
                    <Box display="flex" gridGap={20} width="50%">
                        <TextField
                            fullWidth
                            required
                            margin="normal"
                            id="nome"
                            //type="text"
                            label="Nome do Aluno"
                            value={student.nome}
                            onChange={onChange}
                            placeholder="Digite o nome do aluno"
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="nascimento"
                            type="date"
                            label="Data de nascimento: "
                            value={student.nascimento}
                            onChange={onChange}
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
                            value={student.nomeresponsavel}
                            onChange={onChange}
                            placeholder="Digite o nome do responsável"
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="telresponsavel"
                            type="text"
                            label="Telefone do responsável: "
                            value={student.telresponsavel}
                            onChange={onChange}
                            placeholder="(xx)xxxxx-xxxx"
                        />
                        <br />
                    </Box>
                    <Box display="flex" gridGap={20} width="50%">
                        <TextField
                            fullWidth
                            margin="normal"
                            id="nomeemergencia"
                            type="text"
                            label="Nome do contato de emergência: "
                            value={student.nomeemergencia}
                            onChange={onChange}
                            placeholder="Digite o nome do contato de emergência"
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="telemergencia"
                            type="text"
                            label="Telefone de emergência: "
                            value={student.telemergencia}
                            onChange={onChange}
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
                            onChange={onChange}
                            checked={student.restricaoalim}
                        />
                        <br />
                    </Box>
                    <Box display="flex" gridGap={20} width="50%">
                        {student.restricaoalim &&
                            <TextField
                                fullWidth
                                margin="normal"
                                id="descricaorestricao"
                                type="text"
                                label="Descrição das restrições alimentares"
                                value={student.descricaorestricao}
                                placeholder="Descreva as restrições alimentares"
                                onChange={onChange}
                            />}
                        <br />
                    </Box>
                    <Box display="flex" gridGap={20} width="50%">
                        <InputCheckbox
                            margin="normal"
                            id="autorizacaofotos"
                            type="checkbox"
                            label="Autorização de fotos e vídeos da criança"
                            onChange={onChange}
                            checked={student.autorizacaofotos}
                        />
                        <br />
                    </Box>
                    <Box display="flex" gridGap={20} width="50%">
                        <TextField
                            fullWidth
                            margin="normal"
                            id="listaautorizados"
                            label="Lista de autorizados a buscar a criança "
                            value={student.listaautorizados}
                            onChange={onChange}
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
                            margin="normal"
                            id="turma"
                            type="text"
                            label="Turma: "
                            value={student.turma}
                            onChange={onChange}
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
                            value={student.obsadicionais}
                            onChange={onChange}
                            placeholder="Escreva aqui qualquer observação adicional"
                        />
                        <br />
                    </Box>

                </form>
                <Button
                    variant="contained"
                    color="primary"
                    id="submit"
                    value={value}
                    onClick={onSubmit}
                >Salvar</Button>

            </>
        );
    }
}

{/* </Box>export default withStyles(useStyles, { withTheme: true })(Form) */ }
export default Form

