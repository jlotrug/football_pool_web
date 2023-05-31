export const poolsReducer = (state, action) => {
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
                data: action.payload,
            }
        case 'POOLS_FETCH_FAILURE':
            return{
                ...state,
                isLoading: false,
                isError: true,
            }
        default:
            throw new Error();
    }
}
export const selectedGamesReducer = (state, action) => {
    switch(action.type){
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
                data: action.payload,
            }
        case 'GAMES_FETCH_FAILURE':
            return{
                ...state,
                isLoading: false,
                isError: true,
            }
        default:
            console.log(state)
            console.log(action)
            throw new Error();
    }
}