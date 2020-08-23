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

  // declaring the variables required.
  var lowerCase = true;
  var upperCase = true;
  var specialCharacters = true;
  var numbers = true;
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

  // call a function to get and valid the input
  var passwordLength = getInteger();
  if (passwordLength === -1) {
    // cancel was click so abort
    alert("Cancel clicked!");
    return "";
  }
  else {
    // valid integer was entered, continue
    // using a while loop to ensure at least one character type is selected.
    // Looping no more than 5 times, exist a potential endless loop.
    var loopCounter = 1;
    var atLeastOneSelected = false;
    while (!atLeastOneSelected) {
      lowerCase = confirm("Use lowercase characters? i.e. abcd... z");
      upperCase = confirm("Use UPPERCASE characters? i.e. ABCD... Z");
      specialCharacters = confirm("Use special characters? i.e. !\u0022#$... ]");
      numbers = confirm("Use numbers characters? i.e. 1234... 9");

      // check at least one is true, i.e. if all are false then not one can be true
      if (!(!lowerCase && !upperCase && !specialCharacters && !numbers)) {
        atLeastOneSelected = true;
      }
      else {
        console.log("loopCounter: " + loopCounter);
        if (loopCounter === 5) {
          alert("5 failed attempts. Exiting Password Generation.");
          return "";
        }
        else {
          alert("You must select at least one character option.");
        }
      }
      loopCounter++;
    }
    // console log all variables gathered
    console.log("passwordLength: " + passwordLength);
    console.log("lowerCase: " + lowerCase);
    console.log("upperCase: " + upperCase);
    console.log("specialCharacters: " + specialCharacters);
    console.log("numbers: " + numbers);
    console.log(".....................");

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
    console.log("userInput: " + userInput); // check user value
    console.log("passwordLength: " + passwordLength); // check user value
    console.log(".....................");

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