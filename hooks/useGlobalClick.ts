import {useContext} from "react";
import {GlobalClickContext} from "../contexts/global-click.context";


export const useGlobalClick = () => useContext(GlobalClickContext);
