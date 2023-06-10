// export const GamesReducer = (state, action) =>{
//     switch(action.type){
//         case 'CREATE_GAME_INIT':
//             return {
//                 ...state,
//                 isLoading: true,
//                 isError: false,
//             }
//         case 'CREATE_GAME_SUCCESS':
//             return {
//                 ...state,
//                 isLoading: false,
//                 isError: false,
//                 data: action.payload,
//             }
//         case 'CREATE_GAME_FAILURE':
//             return{
//                 ...state,
//                 isLoading: false,
//                 isError: true,
//             }
//         default:
//             throw new Error();
//     }
// }

