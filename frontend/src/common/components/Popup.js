import React, {useContext} from "react";
import {PopupContext} from "../contexts/PopupContext";
import {IconButton} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";

const Pop2up = (props) => {
    const {closePopup,popup} = useContext(PopupContext);
    return (
        <div style={
        (popup ? {
            zIndex: "1",
            padding: "10px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
            backgroundColor: "white",
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
            overflow: 'auto'
        } : {
            display: 'none'
        })
        }>
            <IconButton onClick={(e) => closePopup()}>
                <CloseIcon/>
            </IconButton>
            {props.children}
        </div>

    );
}

export default Pop2up;