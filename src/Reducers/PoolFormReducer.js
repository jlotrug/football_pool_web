export const poolFormReducer = (state, action) => {
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
                pool: action.payload,
            }
        case 'NEW_POOL_EDIT_SUCCESS':
            return{
                ...state,
                isLoading: false,
                isError: false,
                pool: action.payload
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
                games: [...state.games, action.payload]
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