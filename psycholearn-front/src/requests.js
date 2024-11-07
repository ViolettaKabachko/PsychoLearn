export const serverUrl = "http://localhost:5000";

export const HttpPost = async (path, body) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(body),
        credentials: "include"
    }
        const res = await fetch(serverUrl + path, options)
        return await res.json()
    
}

export const HttpGet = async (path, headers) => {
    const options = {
        method: "GET",
        credentials: "include",
        headers: {...headers}
    }
    console.log(options)
    const res = await fetch(serverUrl + path, options)
    return await res.json()
}