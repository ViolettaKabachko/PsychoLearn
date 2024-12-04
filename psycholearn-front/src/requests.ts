export const serverUrl = "http://localhost:5000";

export const HttpPost = async (path, body, headers = {"Content-Type": "application/json"}) => {
    const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
        credentials: "include"
    }
    console.log(options)
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

export const HttpPostFile = async (path, body, headers = {}) => {
    const options = {
        method: "POST",
        headers: headers,
        body: body,
        credentials: "include"
    }
    console.log(options)
    let res = await fetch(serverUrl + path, options)
    return await res.json()
}

export const HttpGetFile = async (path, headers) => {
    const options = {
        method: "GET",
        credentials: "include",
        headers: {...headers}
    }
    console.log(options)
    return await fetch(serverUrl + path, options)
}