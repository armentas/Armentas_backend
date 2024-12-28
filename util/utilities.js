
const formatDate = (input) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const [datePart] = input.split(" ");
  const [year, month, day] = datePart.split("-");

  return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
}

const passGenerator = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123459!@#$%^&*()_+~`|}{[]\:;?><,./-='
  const codeLength = 10;
  let password = '';

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  return password;
};

module.exports = {
  formatDate,
  passGenerator
}