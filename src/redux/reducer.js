const initialState = {
    username : '',
    profile_pic : ''
}

const UPDATE_USER = 'UPDATE_USER'
const LOG_OUT = 'LOG_OUT'


export function updateUser (username, profile_pic){
    return{
        type: UPDATE_USER,
        payload: {
            username:username,
            profile_pic: profile_pic
    }
    }
}

export function logout (){
    return{
        type: LOG_OUT
    }
}

export default function reducer (state = initialState, action) {
    switch (action.type){
        
        case UPDATE_USER :
            return{
                ...state, ... action.payload 
            };

        case LOG_OUT :
            return initialState;

        default: return state 
    }

}

