const express = require('express')
const config = require('./config')
const app = express()

app.use(express.json())

app.use('/', require('./src/routes'));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

app.listen(config.PORT, () =>
  console.log(`Server ready at: http://localhost:${config.PORT}`),
)