export const PickWinnersReducer = (state, action) =>{
    switch(action.type){
        case 'NEW_GAME_EDIT_INIT':
            return{
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'NEW_GAME_EDIT_SUCCESS':
            return{
                ...state,
                isLoading: false,
                isError: false,
                games: action.payload
            }
        case 'NEW_GAME_EDIT_FAILURE':
            return{
                ...state,
                isLoading: false,
                isError: true,
            }
        default:
            throw new Error();
    }
}