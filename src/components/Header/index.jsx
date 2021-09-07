import React from 'react'
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import { Link } from 'react-router-dom';

const Header = ({ addPath, title, backPath, ...props }) => {
    return (
        <AppBar position="static">
            <Toolbar>
                {backPath && (
                    <Link to={backPath}>
                        <KeyboardArrowLeft />
                    </Link>
                )}
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    {title}
                </Typography>
                {addPath && (
                    <Link to={addPath}>
                        <AddIcon />
                    </Link>
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