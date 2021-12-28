import {createContext, useState} from "react";
import PropTypes from "prop-types";

const PopupContext = createContext();

class Callable {
    constructor(callback) {
        this.callback = callback;
    }

    call(...args) {
        this.callback(...args);
    }
}

const PopupContextProvider = (props) => {
    const [popup, setPopup] = useState(false);
    const [popupData, setPopupData] = useState({});
    const [onClose, setOnClose] = useState(new Callable(() => {
    }));

    const openPopup = (newPopupData) => {
        setPopupData(newPopupData);
        setPopup(true);
    }

    const getPopupData = () => {
        return popupData;
    }

    const closePopup = () => {
        setPopup(false);
        onClose.call();
    }

    const onCloseCallback = (callback) => {
        setOnClose(callback);
    }
    return (
        <PopupContext.Provider value={
            {
                popup,
                getPopupData,
                openPopup,
                closePopup,
                onCloseCallback
            }
        }>
            {props.children}
        </PopupContext.Provider>
    )
}

PopupContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
export {PopupContext, Callable};
export default PopupContextProvider;