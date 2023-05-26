// Create header with user token
export const GetTokenHeaders = (token) => {
    const tokenHeaders = {      
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            }
    }
    return tokenHeaders
}