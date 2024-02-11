import express from 'express'
import caesarCipher from './utils'
const { execSync } = require('child_process');
const app = express()
const port = 3000

app.get('/bac', (req, res) => {
  messages = [
    {
      from: "Alan",
      to: "James",
      content: "sup doggie pup!"
    },
    {
      from: "James",
      to: "Alana",
      content: "heyyy"
    },
    {
      from: "Alana",
      to: "Ashleigh",
      content: "hey there"
    }
  ]
  const user = req.query.user.toLowerCase();
  const inbox = messages.filter(m => [m.from, m.to].includes(user));
  return inbox;
})

app.get('/crypto', (req, res) => {
  const user = req.query.user.toLowerCase();
  sessionToken = caesarCipher(user);
  res.send(sessionToken);
})

// Shell injection
app.get('/inject', (req, res) => {
  const file = req.query.file;
  const output = execSync(`cat ${file}`);
  res.send(output);
})

// app was designed so that every
app.get('/design', (req, res) => {
  const password = '33021fl';
  const attempt = req.query.attempt;
  if (attempt === password) {
    res.send('Access key: 2320932093');
  } else {
    res.send('DENIED')
  }
})

// 1990s style username/password cookie sessions
app.get('/outdated', (req, res) => {
  const username = req.query.username
  const password = req.query.password
  res.cookie(username, password)
})

app.get('/auth', (req, res) => {
  res.send('Hello World!')
})

app.get('/integrity', (req, res) => {
  res.send('Hello World!')
})

app.get('/logging', (req, res) => {
  res.send('Hello World!')
})

app.get('/ssrf', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})