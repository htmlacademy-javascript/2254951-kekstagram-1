// Функция для проверки, является ли строка палиндромом.
const isPalindrom = (string) => {
  const tempString  = string
  .toLowerCase()
  .replaceAll(' ', '');

  let reverseString = "";
  for (let i = tempString.length - 1; i >= 0; i--) {
    reverseString += tempString.at(i);
  }
  console.log(reverseString);
  return tempString === reverseString;
};

//Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа. Если в строке нет ни одной цифры, функция должна вернуть NaN
