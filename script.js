const today = new Date();
const options = { year: 'numeric'};
const formattedDate = today.toLocaleDateString('sv-SE', options);

document.getElementById('stamp').textContent = `@Gräddö Trädgård ${formattedDate}`;

document.querySelector('#form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission
  alert('Formuläret har skickats!'); // Show a confirmation message

  this.reset(); // Reset the form fields
});