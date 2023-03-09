// Create header with user token
export const getTokenHeaders = () => {

    const tokenHeaders = {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage['session']
            }
    }
    return tokenHeaders
}