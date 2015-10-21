import express from 'express'
import server from './fake-server'

const router = express.Router();
router.get('/', (req, res) => {
    server.get(req.originalUrl).then(data => res.json(data));
});

router.post('/', (req, res) => {
    server.post(req.originalUrl, req.params).then(data => res.json(data));
});

router.put('/', (req, res) => {
    server.put(req.originalUrl, req.params).then(data => res.json(data));
});

router.delete('/', (req, res) => {
    server.delete(req.originalUrl).then(data => res.json(data));
});


const app = express();

app.use('/api/*', router);
app.use(express.static(__dirname + '/../'));

app.listen(8000);
