export const NewPickReducer = (state, action) => {
    // console.log(action)

    switch(action.type){

        case 'NEW_PICK_INIT':
            return{
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'NEW_PICK_SUCCESS':
            return{
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload,
            }
        case 'EDIT_PICK_SUCCESS':
            return{
                ...state,
                isLoading: false,
                isError: false,
                data: action.payload
            }
        case 'NEW_PICK_FAILURE':
            return{
                ...state,
                isLoading: false,
                isError: true,
            }
        case 'PICK_FETCH_INIT':
            return{
                ...state,
                isLoading: true,
                isError: false,
            }
        case 'PICK_FETCH_SUCCESS':
            return{
                ...state,
                isLoading: false,
                isError: false,
                pick: action.payload.length > 0 ? action.payload[0] : false,
            }
        case 'PICK_FETCH_FAILURE':
            return{
                ...state,
                isLoading: false,
                isError: true,
            }
        default:
            throw new Error();
    }
}