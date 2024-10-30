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
    console.log(options.body)
    try {
        const res = await fetch(serverUrl + path, options)
        return await res.json()
    }
    catch (e) {
        console.log(e)
    }
    //finally
}

export const HttpGet = async (path, body) => {
    const options = {
        method: "GET",
        credentials: "include"
    }
    const res = await fetch(serverUrl + path, options)
    return await res.json()
}