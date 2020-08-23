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

  const passwordLength = passwordLengthElement.value;
  const upperCase = upperCaseElement.checked;
  const lowerCase = lowerCaseElement.checked;
  const numbers = numbersElement.checked;
  const specialCharacters = specialCharactersElement.checked;
  console.log("passwordLength: " + passwordLength);
  console.log("upperCase: " + upperCase);
  console.log("lowerCase: " + lowerCase);
  console.log("numbers: " + numbers);
  console.log("specialCharacters: " + specialCharacters);
  console.log(".....................");
  // build up of resulting password
  var passwordResult = "";

  // declaring the list of elements to use.
  // list of characters, will control upper and lower with lowerCase and upperCase variables
  var characterList = "abcdefghijklmnopqrstuvwyxz"; // could use String.fromCharCode(Math.floor(Math.random() * 26) + 97); and return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  // list for special characters !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
  var specialCharactersCaseList = "\u0020!\u0022#$%&'()*+,-./:;<=>?@[\u005C\u005D^_`{|}~";
  // list of numbers characters
  var numberList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // could use return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);

  // confirm list fill correctly
  console.log("characterList: " + characterList);
  console.log("specialCharactersCaseList: " + specialCharactersCaseList);
  console.log("numberList: " + numberList);

  // create a list to randomly select characters
  const characterSelections = [];
  if (lowerCase) {
    characterSelections.push("l");
  }
  if (upperCase) {
    characterSelections.push("u");
  }
  if (specialCharacters) {
    characterSelections.push("s");
  }
  if (numbers) {
    characterSelections.push("n");
  }
  //checking the user selections
  console.log("Character Selections: " + characterSelections);
  // Generate. Loop the length of the password.

  // to ensure there is at least 1 of each character types, I will clone the list a remove the selection and once the cloned list has zero length, repopulate the list.
  var cloneCharacterSelections = [];
  for (var i = 0; i < passwordLength; i++) {
    //first time this will populate the clone list and everytime the clone list length is zero
    if (cloneCharacterSelections.length === 0) {
      cloneCharacterSelections = [...characterSelections];
    }
    // random character selection "position"
    var position = Math.floor(Math.random() * cloneCharacterSelections.length);
    // get the charactor at position x.
    var characterSelector = cloneCharacterSelections[position];

    // remove the selected character.
    cloneCharacterSelections.splice(position, 1);
    // console.log("Temp Chraracter Selections: " + cloneCharacterSelections);

    if (characterSelector === "l" || characterSelector === "u") {
      if (characterSelector === "l") {
        passwordResult += characterList[Math.floor(Math.random() * characterList.length)];
        //  console.log("Password at position: " + i + " " + passwordResult);

      }
      else {
        passwordResult += characterList[Math.floor(Math.random() * characterList.length)].toUpperCase();
        //  console.log("Password at position: " + i + " " + passwordResult);
      }
    }
    else if (characterSelector === "s") {
      passwordResult += specialCharactersCaseList[Math.floor(Math.random() * specialCharactersCaseList.length)];
      //  console.log("Password at position: " + i + " " + passwordResult);
    }
    else { // must be n
      passwordResult += numberList[Math.floor(Math.random() * numberList.length)];
      //  console.log("Password at position: " + i + " " + passwordResult);
    }
  }

  console.log("Password: " + passwordResult);
  return passwordResult;
}