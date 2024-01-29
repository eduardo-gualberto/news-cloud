import { createContext } from "react";
import state from "./state";

const AppState = createContext(state)

export default AppState