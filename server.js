const express = require('express');
const crypto = require('crypto');
const {
  caesarCipher,
  downloadTarFile,
  makeGetRequest
} = require('./utils');
const { execSync } = require('child_process');
const app = express()
const port = 3000

app.get('/bac', (req, res) => {
  messages = [
    {
      from: "alan",
      to: "james",
      content: "sup doggie pup!"
    },
    {
      from: "james",
      to: "alan",
      content: "heyyy"
    },
    {
      from: "alana",
      to: "ashleigh",
      content: "hey there"
    }
  ]
  const user = req.query.user.toLowerCase();
  const inbox = messages.filter(m => {
    return [m.from, m.to].includes(user)
  });
  res.json(inbox)
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

// Ancient 1990s style username/password cookie sessions
app.get('/outdated', (req, res) => {
  const username = req.query.username
  const password = req.query.password
  res.cookie(username, password)
})

// doesn't check whether the password is correct!
app.get('/auth', (req, res) => {
  const username = req.query.username
  const password = req.query.password
  let uuid = crypto.randomUUID();
  res.send({ 'sessionCookie': uuid })
})

app.get('/integrity', (req, res) => {
  // Example usage:
  const fileUrl = 'http://badapisite.example/';
  const outputFile = 'download.tar';

  try {
    const downloadedFile = downloadTarFile(fileUrl, outputFile);
    console.log('Downloaded file:', downloadedFile);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
})

app.get('/logging', (req, res) => {
  const username = req.query.username
  const password = req.query.password
  fs.appendFile(
    'authlog', 
    `User logged in: ${username}:${password}`, 
    (err) => {
      if (err) {
        console.error('Error appending data to the file:', err);
      } else {
        console.log('Data was appended to the file successfully.');
      }
  });
  res.end('You have logged in!')
})

app.get('/ssrf', (req, res) => {
  const url = req.query.url
  makeGetRequest(url)
  res.send('request made')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})