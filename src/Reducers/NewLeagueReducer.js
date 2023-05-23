export const NewLeagueReducer = (state, action) => {
    switch(action.type){

        case 'NEW_LEAGUE_INIT':
            return{
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'NEW_LEAGUE_EDIT_INIT':
            return{
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'NEW_LEAGUE_SUCCESS':
            return{
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            }
        case 'NEW_LEAGUE_EDIT_SUCCESS':
            return{
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.slice(-1)
            }
        case 'NEW_LEAGUE_FAILURE':
            return{
                ...state,
                isLoading: false,
                isError: true,
            }
        case 'NEW_LEAGUE_EDIT_FAILURE':
            return{
                ...state,
                isLoading: false,
                isError: true,
            }
        default:
            throw new Error();
    }
}