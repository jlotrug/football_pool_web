export const NewGameReducer = (state, action) =>{

    switch(action.type){
        case 'NEW_GAME_INIT':
        return{
            ...state,
            isLoading: true,
            isError: false,
        }
    case 'NEW_GAME_SUCCESS':
        return{
            ...state,
            isLoading: false,
            isError: false,
            data: action.payload,
        }
    case 'NEW_GAME_FAILURE':
        return{
            ...state,
            isLoading: false,
            isError: true,
        }
    default:
        throw new Error();

    }
    
}