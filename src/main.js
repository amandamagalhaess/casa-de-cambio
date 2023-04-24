// import Swal from 'sweetalert2';

const searchButton = document.getElementById('search-button');
const currencyField = document.getElementById('currency');
const currencySection = document.getElementById('currency-section');
const BASE_URL = 'https://api.exchangerate.host/latest?base=';

const createElements = (item) => {
  const tableSection = document.getElementsByClassName('tableSection')[0];

  const coinBase = document.createElement('div');
  coinBase.className = 'coinBase';
  tableSection.appendChild(coinBase);

  const coin = document.createElement('img');
  coin.setAttribute('src', './src/icon/coins.svg');
  coinBase.appendChild(coin);

  const [first, second] = item;
  const coinName = document.createElement('p');
  coinName.innerHTML = first;
  coinBase.appendChild(coinName);

  const coinValue = document.createElement('p');
  coinValue.innerHTML = second.toFixed(3);
  coinBase.appendChild(coinValue);
};

searchButton.addEventListener('click', (event) => {
  currencySection.innerHTML = '';
  event.preventDefault();

  const currencyName = currencyField.value.toUpperCase();

  if (!currencyName) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Você precisa passar uma moeda',
      background: 'rgb(50, 50, 50)',
      color: 'white',
    });
    return;
  }

  const currencyURL = `${BASE_URL}${currencyName}`;
  fetch(currencyURL)
    .then((response) => response.json())
    .then(({ rates }) => {
      const data = Object.entries(rates);

      if (!data.some((element) => element.includes(currencyName))) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Moeda não existente!',
          background: 'rgb(50, 50, 50)',
          color: 'white',
        });
        return;
      }

      const sectionTitle = document.createElement('h2');
      sectionTitle.innerHTML = `Valores referentes a 1 ${currencyName}`;
      sectionTitle.className = 'section-title';
      currencySection.appendChild(sectionTitle);

      const tableSection = document.createElement('div');
      tableSection.className = 'tableSection';
      currencySection.appendChild(tableSection);

      data.forEach((item) => {
        createElements(item);
      });
    });
});
