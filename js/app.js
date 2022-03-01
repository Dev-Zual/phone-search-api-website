// get input value
// add button event
const loadPhones = async () => {
  // get input
  const searchInput = document.getElementById('search-input');
  const searchInputText = searchInput.value;
  // get emty search input
  searchInput.value = '';

  /* validation if search input is emty */
  const errorMsg = document.getElementById('error-msg');
  if (searchInputText == '') {
    errorMsg.innerText = 'Please Input A Phone Name';
    errorMsg.style.display = 'block';
  } else {
    /* fetching the api */
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchInputText}`;
    const res = await fetch(url);
    const data = await res.json();
    // call the display function
    displayPhones(data.data);
    // console.log(data.data[0].phone_name);
    errorMsg.style.display = 'none';
  }
};
// display phones function
const displayPhones = (phones) => {
  /* get the search results div */
  /* call the phone details div */
  const detailsDiv = document.getElementById('phone-details');
  /* emty the phone details div */
  detailsDiv.textContent = '';
  const phonesDiv = document.getElementById('phones');
  /* emty the full element after get results */
  phonesDiv.innerHTML = '';
  // foreach loop in the all phones
  phones.forEach((phone) => {
    const div = document.createElement('div');
    div.className = 'col';
    div.innerHTML = `
    <div class="card h-100">
        <img src="${phone.image}" class="card-img-top w-50 mx-auto mt-3" alt="..." />
        <div class="card-body">
        <h5 class="card-title">Model: ${phone.phone_name}</h5>
        <p><strong>Brand:</strong> ${phone.brand}</p>
        <p class="card-text">
            This is a wider card with supporting text below as a
            natural lead-in to additional content. This content is a
            little bit longer.
        </p>
        </div>
        <div class="card-footer">
        <button onclick="phonesDetails('${phone.slug}')" class="btn btn-success">See Details</button>
        </div>
    </div>
    `;
    phonesDiv.appendChild(div);
  });
};
/* load phone details function */
const phonesDetails = async (id) => {
  // call the dynamically id api
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  // call display details function
  displayPhonesDetails(data);
};
// display phone details function
const displayPhonesDetails = (phones) => {
  // store data in phone variable
  const phone = phones.data;

  // store mainFeatures data into features variable
  const features = phone.mainFeatures;

  // store sensors data in sensor variable
  const sensor = features.sensors;

  // store others data in other variable
  const other = phone.others;
  /* call the phone details div */

  const detailsDiv = document.getElementById('phone-details');
  /* emty the phone details div */
  detailsDiv.textContent = '';
  /* creating a div */
  const div = document.createElement('div');
  div.className = 'col';
  div.innerHTML = `
      <div class="card h-100">
          <img src="${phone.image}" class="card-img-top w-25 mx-auto mt-3" alt="..." />
          <div class="card-body">
          <h5 class="card-title">Model: ${phone.name}</h5>
          <p><strong>Brand:</strong> ${phone.brand}</p>
          <p id="date"><strong>Release Date:</strong> ${phone.releaseDate}</p>
          <h5></h5>
          <ul class="list-group">
          <li class="list-group-item list-group-item-danger"><h5>This Product Specification.</h5></li>
        
          <li class="list-group-item list-group-item-success"><p>1. <strong>Storage:</strong> ${features.storage}</p></li>
          <li class="list-group-item list-group-item-success"><p>2. <strong>Display:</strong> ${features.displaySize}</p></li>
          <li class="list-group-item list-group-item-success"><p>3. <strong>Chip Set:</strong> ${features.chipSet}</p></li>
          <li class="list-group-item list-group-item-success"><p>4. <strong>RAM:</strong> ${features.memory}</p></li>
          <li class="list-group-item list-group-item-success"><p>5. <strong>Sensors:</strong> ${sensor}</p></li>
          <li class="list-group-item list-group-item-success"><p>6. <strong>WLAN:</strong> ${other.WLAN}</p></li>
          <li class="list-group-item list-group-item-success"><p>7. <strong>Bluetooth:</strong> ${other.Bluetooth}</p></li>
          <li class="list-group-item list-group-item-success"><p>7. <strong>Bluetooth:</strong> ${other.Bluetooth}</p></li>
          <li class="list-group-item list-group-item-success"><p>8. <strong>GPS:</strong> ${other.GPS}</p></li>
          <li class="list-group-item list-group-item-success"><p>9. <strong>NFC:</strong> ${other.NFC}</p></li>
          <li class="list-group-item list-group-item-success"><p>10. <strong>Radio:</strong> ${other.Radio}</p></li>
          <li class="list-group-item list-group-item-success"><p>11. <strong>USB:</strong> ${other.USB}</p></li>
          
        </ul>   
          </div>
         
      </div>
  `;
  detailsDiv.appendChild(div);
};
