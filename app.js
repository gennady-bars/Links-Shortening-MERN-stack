const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

const PORT = config.get('port') || 5000

async function start() {
  try {
    
  } catch (error) {
    console.log(`Server Error ${e.message}`);
    process.exit(1)
  }
}








app.listen(PORT, () => {
  console.log(`App has been started on port ${PORT}...`);
})