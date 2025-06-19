
const today = new Date();
const options = { year: 'numeric'};
const formattedDate = today.toLocaleDateString('sv-SE', options);

const send = async() => {
  const form = document.querySelector('#form').elements;
  const checkedItems = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(item => item.name).toString().replace(/,/g, ', ');

  const res = await fetch('https://mail-server-graddo-777025418952.europe-north2.run.app', {
    method: 'POST',
    body: JSON.stringify({
      "subject":"Kundförfrågan",
      "text":`
        <div>
          <p>${form.adress.value}</p>
          <p>${form.email.value}</p>
          ${checkedItems ? `<p>Valda tjänster: ${checkedItems}</p>` : ''}
          ${form.message.value ? `<p>Meddelande: ${form.message.value}</p>` : ''}
        </div>`
      }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      }
    });

  if (res.ok) {
    return await res.json();
  } else {
    console.error(res.status, res.statusText);
  }
}

document.getElementById('stamp').textContent = `@Gräddö Trädgård ${formattedDate}`;

document.querySelector('#form').addEventListener('submit', function(event) {
  event.preventDefault();

  send().then(() => {
    event.target.reset();
    document.querySelector('#success-message').style.display = 'block'; 
  }).catch((error) => {
    console.error('Error:', error);
    const errorMessage = document.querySelector('#error-message');
    errorMessage.style.display = 'block'; 
    errorMessage.style.color = '#ff0000'; 
  }); 
});
