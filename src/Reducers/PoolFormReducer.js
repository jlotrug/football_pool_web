export const poolFormReducer = (state, action) => {
    if(action.payload) action.payload = action.payload.filter(element => element != undefined)
    
    switch(action.type){
        case 'NEW_POOL_INIT':
            return{
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'NEW_POOL_EDIT_INIT':
            return{
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'NEW_POOL_SUCCESS':
            return{
                ...state,
                isLoading: false,
                isError: false,
                pool: action.payload[0],
            }
        case 'NEW_POOL_EDIT_SUCCESS':
            return{
                ...state,
                isLoading: false,
                isError: false,
                pool: action.payload.slice(-1)
            }
        case 'NEW_POOL_FAILURE':
            return{
                ...state,
                isLoading: false,
                isError: true,
            }
        case 'NEW_POOL_EDIT_FAILURE':
            return{
                ...state,
                isLoading: false,
                isError: true,
            }
        case 'GAMES_FETCH_INIT':
            return{
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'GAMES_FETCH_SUCCESS':
            return{
                ...state,
                isLoading: false,
                isError: false,
                games: action.payload,
            }
        case 'GAMES_FETCH_FAILURE':
            return{
                ...state,
                isLoading: false,
                isError: true,
            }
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
                games: [...action.payload].flat(),
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