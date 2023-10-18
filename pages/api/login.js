const post = (req, res) => {
    // validate username password
    const { username, password } = req.body

    

    // get token
}

const get = (req, res) => {

}

const put = (req, res) => {

}

const remove = (req, res) => {

}

const functionMap = {
    "POST" : post,
    "GET" : get,
    "PUT" : put,
    "DELETE" : remove
}

export default (req, res) => {
    return functionMap[req.method](req, res)
}