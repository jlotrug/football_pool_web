export const NewPoolReducer = (state, action) => {
    console.log(action)
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
                data: action.payload,
            }
        case 'NEW_POOL_EDIT_SUCCESS':
            return{
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload.slice(-1)
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
        default:
            throw new Error();
    }
}