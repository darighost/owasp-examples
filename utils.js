function caesarCipher(text, shift) {
  let result = '';

  for (let i = 0; i < text.length; i++) {
    let charCode = text.charCodeAt(i);

    // Check if character is a letter
    if (charCode >= 65 && charCode <= 90) { // Uppercase letters (A-Z)
      result += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
    } else if (charCode >= 97 && charCode <= 122) { // Lowercase letters (a-z)
      result += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
    } else {
      // If not a letter, keep the character unchanged
      result += text.charAt(i);
    }
  }

  return result;
}

const https = require('https');
const fs = require('fs');

function downloadTarFile(fileUrl, outputFile) {
  const file = fs.createWriteStream(outputFile);

  return new Promise((resolve, reject) => {
    const request = https.get(fileUrl, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => {
          resolve(outputFile);
        });
      });
    }).on('error', err => {
      fs.unlink(outputFile, () => {}); // Delete the file if any error occurs
      reject(err);
    });
  });
}

function makeGetRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        resolve(data);
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

