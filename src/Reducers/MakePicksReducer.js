export const makePicksReducer = (state, action) => {
    if(action.payload) action.payload = action.payload.filter(element => element != undefined)
    
    switch(action.type){
        case 'POOLS_FETCH_INIT':
            return{
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'POOLS_FETCH_SUCCESS':
            return{
                ...state,
                isLoading: false,
                isError: false,
                pools: action.payload,
            }
        case 'POOLS_FETCH_FAILURE':
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
        default:
            throw new Error();
    }
}