import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

import { TableCell } from "@material-ui/core";
import { TableRow } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


class ListItem extends React.Component {
  static propTypes = {
    avatar: PropTypes.string,
    name: PropTypes.string,
    position: PropTypes.string,
  };



  render() {
    const { index, id, nome, nascimento, turma, telemergencia, nomeemergencia, onEdit, onDelete } = this.props

    return (
      <>
        <TableRow key={index} id={id}>
          <TableCell component="th" scope="row">{nome}</TableCell>
          <TableCell align="right">{nascimento}</TableCell>
          <TableCell align="right">{turma}</TableCell>
          <TableCell align="right">{telemergencia}</TableCell>
          <TableCell align="right">{nomeemergencia}</TableCell>
          <TableCell align="right">{id}</TableCell>
          <TableCell align="right"><EditIcon id={id} onClick={onEdit} /></TableCell>
          <TableCell align="right"><DeleteIcon id={id} onClick={onDelete} /></TableCell>
        </TableRow>
      </>
    )
  }
}

export default ListItem;

