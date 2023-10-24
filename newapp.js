const express = require('express')();
const app = express();
const PORT = 8080;

app.listen(
    PORT,
    () => console.log(`it's alive on http://localhost:${PORT}`)
)

app.use(express.json())


app.get('/ti', (req, res) => {
    res.status(200).send({
        tshirt: '👕',
        size: 'XS'
    })
});
