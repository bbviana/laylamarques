import express from 'express'
import bodyParser from 'body-parser'
import server from './fake-server'

const router = express.Router();
router
    .get('/:collection', (req, res) => {
        server.get(req.originalUrl).then(data => res.json(data));
    })
    .get('/:collection/:id', (req, res) => {
        server.get(req.originalUrl).then(data => res.json(data));
    })
    .post('/:collection', (req, res) => {
        server.post(req.originalUrl, req.body).then(data => res.json(data));
    })
    .put('/:collection', (req, res) => {
        server.put(req.originalUrl, req.body).then(data => res.json(data));
    })
    .delete('/:collection/:id', (req, res) => {
        server.delete(req.originalUrl).then(data => res.json(data));
    });


const app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', router);
app.use(express.static(__dirname + '/../'));

app.listen(8000);
