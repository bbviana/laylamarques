import request from 'superagent'

const xhr = {
    get(url) {
        return new Promise((resolve, reject) => {
            request.get(url).end((err, res) => {
                if(err){
                    reject(err);
                } else {
                    resolve(res.body);
                }
            })
        });
    }
}

export default xhr
