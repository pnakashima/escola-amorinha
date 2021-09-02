import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

import { TableCell } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { Link } from "react-router-dom";


class ListItem extends React.Component {
  static propTypes = {
    avatar: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.string,
  };



  render() {
    const { index, id, nome, nascimento, turma, telemergencia, nomeemergencia, onEdit, onDelete,
      nomeresponsavel, telresponsavel, restricaoalim, descricaorestricao, autorizacaofotos,
      listaautorizados, obsadicionais, errorMessage, } = this.props

    // const student = {
    //   id,
    //   nome,
    //   nascimento,
    //   nomeresponsavel,
    //   telresponsavel,
    //   turma,
    //   telemergencia,
    //   nomeemergencia,
    //   restricaoalim,
    //   descricaorestricao,
    //   autorizacaofotos,
    //   listaautorizados,
    //   obsadicionais,
    //   errorMessage,
    // }

    // console.log("list item: ", student)

    return (
      <>
        <TableRow key={index} id={id}>
          <TableCell component="th" scope="row">{nome}</TableCell>
          <TableCell align="right">{nascimento}</TableCell>
          <TableCell align="right">{turma}</TableCell>
          <TableCell align="right">{telemergencia}</TableCell>
          <TableCell align="right">{nomeemergencia}</TableCell>
          <TableCell align="right">{id}</TableCell>
          <TableCell align="right">
            {/* <Link
              key={index}
              to={{ pathname: "/edit", state: { } }}> */}
              <EditIcon id={id} localName={id} onClick={onEdit} />
            {/* </Link> */}
          </TableCell>
          <TableCell align="right"><DeleteIcon id={id} localName={id} onClick={onDelete} /></TableCell>
        </TableRow>
      </>
    )
  }
}

export default ListItem;

