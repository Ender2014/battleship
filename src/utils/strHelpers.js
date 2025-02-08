export function capitalize(string = "") {
  if (typeof string !== "string") throw new TypeError("Expected a string.");
  return string.charAt(0).toUpperCase();
}

export function reverseString(string = "") {
  if (typeof string !== "string") throw new TypeError("Expected a string.");
  return string.split("").reverse().join("");
}

export function caesarCipher(plaintext = "", key = 0) {
  const alphabet = ".,?!abcdefghijklmnopqrstuvwxyz0123456789 ";
  const mod = key % alphabet.length;
  const shiftFactor = mod < 0 ? mod + alphabet.length : mod;

  let shiftedAlphabet = "";
  let ciphertext = "";

  let temp1 = "";
  let temp2 = "";

  alphabet.split("").forEach((char, index) => {
    const newIndex = index - shiftFactor;
    if (newIndex < 0) {
      temp1 = `${temp1}${char}`;
    } else {
      temp2 = `${temp2}${char}`;
    }
  });
  shiftedAlphabet = `${temp2}${temp1}`;
  plaintext.split("").forEach((char) => {
    const index = alphabet.indexOf(char.toLowerCase());
    ciphertext = `${ciphertext}${shiftedAlphabet.charAt(index)}`;
  });

  return ciphertext.toUpperCase();
}
