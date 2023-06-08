export const PoolDetailsReducer = (state, action) =>{
    switch(action.type){
        case 'PLAYERS_FETCH_INIT':
            return{
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'PLAYERS_FETCH_SUCCESS':
            return{
                ...state,
                isLoading: false,
                isError: false,
                players: action.payload,
            }
        case 'PLAYERS_FETCH_FAILURE':
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
        case 'GAMECARD_FETCH_INIT':
            return{
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'GAMECARD_FETCH_SUCCESS':
            return{
                ...state,
                isLoading: false,
                isError: false,
                gamecards: action.payload,
            }
        case 'GAMECARD_FETCH_FAILURE':
            return{
                ...state,
                isLoading: false,
                isError: true,
            }            
        default:
            throw new Error();
    }
}