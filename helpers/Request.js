import xhr from 'superagent'

/**
 * Ex:
 * Request.post('/users', user).then(data => console.log(data))
 */
class Request {
    static get = (url, query) => promise(xhr.get(url).query(query))
    static post = (url, data) => promise(xhr.post(url).send(data))
    static put = (url, data) => promise(xhr.put(url).send(data))
    static del = url => promise(xhr.del(url))
}

const promise = xhr =>
    new Promise((resolve, reject) => {
        xhr.end((err, res) => err ? reject(err) : resolve(res.body) )
    })

export default Request
