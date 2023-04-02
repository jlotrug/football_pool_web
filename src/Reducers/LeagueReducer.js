export const LeagueReducer = (state, action) =>{
    switch(action.type){
        case 'LEAGUE_FETCH_INIT':
            return{
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'LEAGUE_FETCH_SUCCESS':
            return{
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            }
        case 'LEAGUE_FETCH_FAILURE':
            return{
                ...state,
                isLoading: false,
                isError: true,
            }
        default:
            throw new Error();
    }
}