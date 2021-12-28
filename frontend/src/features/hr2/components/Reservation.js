
import * as React from "react";
import PopupContextProvider, {PopupContext} from "../../../common/contexts/PopupContext";

import SearchableTable from "../../../common/components/SearchableTable";
import {SearchableTableContextProvider} from "../../../common/contexts/SearchableTableContext";


const Reservation = () => {

    return <PopupContextProvider>
        <SearchableTableContextProvider>
            <SearchableTable/>
        </SearchableTableContextProvider>
    </PopupContextProvider>

}
export default Reservation;