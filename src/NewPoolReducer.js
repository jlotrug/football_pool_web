export const NewPoolReducer = (state, action) => {

    switch(action.type){

        case 'NEW_POOL_INIT':
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
                data: action.payload,
            }
        case 'NEW_POOL_FAILURE':
            return{
                ...state,
                isLoading: false,
                isError: true,
            }
        default:
            throw new Error();
    }
}