import {SIDENAV} from '../actions'

const initialState = {navOnOff:false}

export const sidenav = (state=initialState,action)=>{
    switch(action.type){
        case SIDENAV:
            if (action.onClose) {
                return { navOnOff: action.onClose }
            } else {
                return { navOnOff:!state.navOnOff }
            }
        default:
            return state
    }
}