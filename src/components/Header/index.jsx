import React from 'react'
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { useHistory } from 'react-router-dom';

const Header = ({ addPath, title, backPath, ...props }) => {
    let history = useHistory()

    return (
        <AppBar position="static">
            <Toolbar>
                {backPath && (
                    <span onClick={() => history.push(backPath)}>
                        <KeyboardArrowLeft />
                    </span>
                )}
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    {title}
                </Typography>
                {addPath && (
                    <span onClick={() => history.push(addPath)}>
                        <AddIcon />
                    </span>
                )}
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    title: PropTypes.string,
    addPath: PropTypes.string,
    backPath: PropTypes.string,
};

//criando default props:
Header.defaultProps = {
    title: "Escola Amorinha",
    addPath: null,
    backPath: "",
}

export default Header