const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => res.send({"msg":"test"}));
app.get('/math', (req, res) => res.send({"answer": parseInt(req.query.var1) + parseInt(req.query.var2)}))

app.listen(port, () => {
    console.log(`running on port ${port}`);
})