const isPalindrom = (string) => {
  const tempString = string
  .toLowerCase()
  .replaceAll(' ', '');

  let reverseString = "";
  for (let i = tempString.length - 1; i >= 0; i--) {
    reverseString += tempString.at(i);
  }
  console.log(reverseString);
  return tempString === reverseString;
};

const extractNumber = (string) => {
  if (typeof string === 'number') {
    return string;
  }

  let result = '';
  for (let i = 0; i < string.length; i++) {
    if (!Number.isNaN(parseInt(string.at(i), 10))) {
      result += string.at(i);
    }
  }

  return parseInt(result, 10);
};

const myPadStart = (string, minLength, pad) => {
  const actualPad = minLength - string.length;

  if (actualPad <= 0) {
    return string;
  }

  return pad.slice(0, actualPad % pad.length) + pad.repeat(actualPad / pad.length) + string;
};
