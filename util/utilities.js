
const formatDate = (input) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    const [datePart] = input.split(" ");
    const [year, month, day] = datePart.split("-");
  
    return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
  }

module.exports = {
    formatDate
}