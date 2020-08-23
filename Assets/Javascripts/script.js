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

//password generation code
function generatePassword() {
  // build up of resulting password
  var passwordResult = "";

  // declaring the variables required.
  var lowerCase = true;
  var upperCase = true;
  var specialCharacters = true;
  var numbers = true;
  var passwordLength = getInteger(); // call a function to get and valid the input
  // if password length = -1 then cancel was click, return... abort.
  if (passwordLength === -1) {
    alert("Cancel clicked!");
    return "";
  }

  // function to get charactor selectors
  var characterSelectors = getCharacterSelectors();
  // return if the users fails to select at least one after 5 attempts.
  if (characterSelectors.cancelled) {
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

  // create a list to randomly select characters
  const characterSelections = [];
  if (characterSelectors.lowerCase) {
    characterSelections.push("l");
  }
  if (characterSelectors.upperCase) {
    characterSelections.push("u");
  }
  if (characterSelectors.specialCharacters) {
    characterSelections.push("s");
  }
  if (characterSelectors.numbers) {
    characterSelections.push("n");
  }
  //checking the user selections
  console.log("Character Selections: " + characterSelections);

  //Loop the length of the password.
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

// function to get an integer from the user between 8 and 128
function getInteger() {
  // initially set to true to enter the while loop to ensure an integer is inputted by the user.
  var isAnInteger = false;
  var passwordLength = 8;
  while (!isAnInteger) {
    var userInput = prompt("Please enter a number between 8 and 128", "8");
    // if an invalid integer was entered then NaN will be returned.
    passwordLength = parseInt(userInput);

    // console log all variables
    console.log("userInput: " + userInput, "passwordLength: " + passwordLength); // check user value

    // check if cancel was hit, i.e. null, return -1 to break the while and password creation
    if (userInput === null) {
      isAnInteger = true;
      passwordLength = -1;
    }
    // check the passwordLength is not NaN and is between 8 and 128
    else if (isNaN(passwordLength) || passwordLength < 8 || passwordLength > 128) {
      alert("Please enter an integer between 8 and 128.");
    }
    else {
      // an integer between 8 and 128 has been entered, set notAnInteger to true to break while loop.
      isAnInteger = true;
    }
  }
  return passwordLength;
}

function getCharacterSelectors() {
  // valid integer was entered, continue
  // using a while loop to ensure at least one character type is selected.
  // Looping no more than 5 times, exist a potential endless loop.
  var characterSelectors = {
    lowerCase: false,
    upperCase: false,
    specialCharacters: false,
    numbers: false,
    cancelled: false,
  };
  var loopCounter = 1;
  var breakLoop = false;
  // loop until a user selects one or fails after 5 attempts
  while (!breakLoop) {
    characterSelectors.lowerCase = confirm("Use lowercase characters? i.e. abcd... z");
    characterSelectors.upperCase = confirm("Use UPPERCASE characters? i.e. ABCD... Z");
    characterSelectors.specialCharacters = confirm("Use special characters? i.e. !\u0022#$... ]");
    characterSelectors.numbers = confirm("Use numbers characters? i.e. 1234... 9");

    // check at least one is true, i.e. if all are false then not one can be true
    if (!(
      !characterSelectors.lowerCase && 
      !characterSelectors.upperCase && 
      !characterSelectors.specialCharacters && 
      !characterSelectors.numbers)) {
      breakLoop = true;
    }
    else {
      console.log("loopCounter: " + loopCounter);
      if (loopCounter === 5) {
        characterSelectors.cancelled = true;
        breakLoop = true;
      }
      else {
        alert("You must select at least one character option.");
      }
    }
    loopCounter++;
  }
  return characterSelectors;
}