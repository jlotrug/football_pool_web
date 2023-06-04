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
                pools: action.payload,
            }
        case 'PLAYERS_FETCH_FAILURE':
            return{
                ...state,
                isLoading: false,
                isError: true,
            }
        default:
            throw new Error();
    }
}