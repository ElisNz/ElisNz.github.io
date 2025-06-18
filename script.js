import * as config from './config.js';

const today = new Date();
const options = { year: 'numeric'};
const formattedDate = today.toLocaleDateString('sv-SE', options);

const send = async() => {
  const form = document.querySelector('#form').elements;
  const checkedItems = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(item => item.name).toString().replace(/,/g, ', ');
  console.log(config);

  const response = await fetch(config.API_MAIL_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      "from": {"address": config.ADDRESS},
      "to": [{"email_address": {"address": config.EMAIL_ADDRESS,"name": config.NAME}}],
      "subject":"Kundförfrågan",
      "htmlbody":`
        <div>
          <p>${form.adress.value}</p>
          <p>${form.email.value}</p>
          ${checkedItems ? `<p>Valda tjänster: ${checkedItems}</p>` : ''}
          ${form.message.value ? `<p>Meddelande: ${form.message.value}</p>` : ''}
        </div>`
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'Accept': 'application/json',
      'Authorization': config.AUTH
    }
  });

  if (response.ok) {
    return await response.json();
  } else {
    console.error(response.status, response.statusText);
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
    document.querySelector('#error-message').style.display = 'block'; 
  }); 
});
