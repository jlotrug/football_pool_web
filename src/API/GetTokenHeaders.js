// Create header with user token
export const GetTokenHeaders = () => {

    const tokenHeaders = {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage['session']
            }
    }
    return tokenHeaders
}