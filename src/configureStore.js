import {createStore , applyMiddleware} from "redux";
import rootReducer from "./shared/reducers/index";

import thunk from "redux-thunk";


//cofigute store

export default function configureStore () {
    let store = createStore(rootReducer, applyMiddleware(thunk))
    return store;
}