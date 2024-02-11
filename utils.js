export default function caesarCipher(text, shift) {
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