// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

//userput values. const valuse, not to be changed
const passwordLengthElement = document.querySelector("#passwordLength");
const upperCaseElement = document.querySelector("#upperCase");
const lowerCaseElement = document.querySelector("#lowerCase");
const numbersElement = document.querySelector("#numbers");
const specialCharactersElement = document.querySelector("#specialCharacters");

//password generation code
function generatePassword() {

  // build up of resulting password
  var passwordResult = "";

  // charactor selectors and length
  const upperCase = upperCaseElement.checked;
  const lowerCase = lowerCaseElement.checked;
  const numbers = numbersElement.checked;
  const specialCharacters = specialCharactersElement.checked;
  const passwordLength = passwordLengthElement.value;

  // Return if user unticks all check boxes.
  if (!upperCase && !lowerCase && !numbers && !specialCharacters) {
    alert("Please select at least one charactor selector.");
    return "";
  }

  // declaring the list of elements to use.
  // list of characters, will control upper and lower with lowerCase and upperCase variables
  var characterList = "abcdefghijklmnopqrstuvwyxz"; // could use String.fromCharCode(Math.floor(Math.random() * 26) + 97); and return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  // list for special characters !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
  var specialCharactersCaseList = "\u0020!\u0022#$%&'()*+,-./:;<=>?@[\u005C\u005D^_`{|}~";
  // list of numbers characters
  var numberList = "0123456789"; // could use return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);

  // confirm list fill correctly
  console.log("characterList: " + characterList);
  console.log("specialCharactersCaseList: " + specialCharactersCaseList);
  console.log("numberList: " + numberList);

  // console log all variables gathered
  console.log("passwordLength: " + passwordLength);
  console.log("lowerCase: " + lowerCase);
  console.log("upperCase: " + upperCase);
  console.log("specialCharacters: " + specialCharacters);
  console.log("numbers: " + numbers);

  // create a list to randomly select characters, similar to the if and push method, this method has fewer lines
  const characterSelections = [
    (lowerCase ? 'l' : undefined),
    (upperCase ? 'u' : undefined),
    (specialCharacters ? 's' : undefined),
    (numbers ? 'n' : undefined),
  ].filter(x => x !== undefined);

  //checking the user selections
  console.log("Character Selections: " + characterSelections);

  // Loop the length of the password.
  for (var i = 0; i < passwordLength; i += characterSelections.length) {
    // loop through the character selectors
    for (var j = 0; j < characterSelections.length; j++) {
      var characterSelector = characterSelections[j];
      // switch between the character selectors
      switch (characterSelector) {
        case ("l"):
          passwordResult += characterList[Math.floor(Math.random() * characterList.length)];
          break;
        case ("u"):
          passwordResult += characterList[Math.floor(Math.random() * characterList.length)].toUpperCase();
          break;
        case ("s"):
          passwordResult += specialCharactersCaseList[Math.floor(Math.random() * specialCharactersCaseList.length)];
          break;
        default:// must be n
          passwordResult += numberList[Math.floor(Math.random() * numberList.length)];
      }
    }
  }
  // ensure the result is less not over
  var finalPassword = passwordResult.slice(0, passwordLength);
  // randomise the result to shuffle the character selectors
  var shuffled = finalPassword.split('').sort(() => (Math.random() - 0.5)).join('');
  return shuffled;
}