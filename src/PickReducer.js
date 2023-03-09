export const NewPickReducer = (state, action) => {

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
        default:
            throw new Error();
    }
}