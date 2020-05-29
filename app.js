const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require('path')
const authRouter = require('./routes/auth.routes')
const linkRouter = require('./routes/link.routes')
const redirectRouter = require('./routes/redirect.routes')

const app = express();

app.use(express.json({extended: true}))

app.use('/api/auth', authRouter)
app.use('/api/link', linkRouter)
app.use('/t', redirectRouter)

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = config.get("port") || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () => {
      console.log(`App has been started on port ${PORT}...`);
    });
  } catch (error) {
    console.log(`Server Error ${error.message}`);
    process.exit(1);
  }
}

start();
