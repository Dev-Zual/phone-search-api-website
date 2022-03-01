/* function toggle spiner */
const toggleSpiner = (spinerStyle) => {
  document.getElementById('spiners').style.display = spinerStyle;
};
/* function toggle toggle the phone div */
const togglePhonesDiv = (detailsStyle) => {
  document.getElementById('phones').style.opacity = detailsStyle;
};

/********************
   load the api
  **********************/
const loadPhones = async () => {
  /*************************************************
   get the input field value & call the spiner function & show get emty search input
  **************************************************/
  const searchInput = document.getElementById('search-input');
  toggleSpiner('block');
  togglePhonesDiv(0);
  detailsToggle('none');
  const searchInputText = searchInput.value;
  searchInput.value = '';

  /*************************************************
  validation if search input is emty or a number then get a error msg & hide the all content
      call the spiner function hide 
  **************************************************/
  const errorMsg = document.getElementById('error-msg');
  if (searchInputText == '') {
    errorMsg.innerText = 'Please Input A Phone Name';
    errorMsg.style.display = 'block';
    /* call the spiner function hide */
    toggleSpiner('none');
  } else if (!isNaN(searchInputText)) {
    errorMsg.innerText = 'Number is not a phone name';
    errorMsg.style.display = 'block';
    toggleSpiner('none');
    togglePhonesDiv(0);
  } else {
    /* fetching the api */
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchInputText}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.data[0] == undefined) {
      /********************************
       if input is undefined then get a error msg & hide the all content
      call the spiner function hide 
      ********************************/
      errorMsg.innerText = 'Your Phone Is Not Found';
      errorMsg.style.display = 'block';
      toggleSpiner('none');
      togglePhonesDiv(0);
    } else {
      // call the display function
      displayPhones(data.data);
      errorMsg.style.display = 'none';
      togglePhonesDiv(1);
    }
  }
};
// display phones function
const displayPhones = (phones) => {
  /* call the phone details div */
  const detailsDiv = document.getElementById('phone-details');
  /* emty the phone details div */
  detailsDiv.textContent = '';

  const phonesDiv = document.getElementById('phones');
  /* emty the full element after get results */
  phonesDiv.innerHTML = '';

  if (phones.length > 20) {
    const get20 = phones.slice(0, 20);

    // foreach loop in the all phones
    get20.forEach((phone) => {
      console.log(phone);
      const div = document.createElement('div');
      div.className = 'col';
      div.innerHTML = `
    <div class="card h-100">
        <img src="${phone.image}" class="card-img-top w-50 mx-auto mt-3" alt="..." />
        <div class="card-body">
        <h5 class="card-title">Model: ${phone.phone_name}</h5>
        <p><strong>Brand:</strong> ${phone.brand}</p>
        <p class="card-text">
            If You Want To Know <strong>${phone.phone_name}</strong> Full Specification, Please Click The See Details Button.
        </p>
        </div>
        <div class="card-footer">
            <div class="d-grid gap-2 col-8 mx-auto">
                <button onclick="phonesDetails('${phone.slug}')" class="btn btn-success">See Details</button>
            </div>
        </div>
    </div>
    `;
      phonesDiv.appendChild(div);
    });
    /* call the spiner function hide
  and the show all div content  */
    toggleSpiner('none');
    togglePhonesDiv(1);
  }
};
/************************
 load phone details function 
 ****************************/
/*********************** 
 toggle function of display phoe details
***********************/
const detailsToggle = (detailsStyle) => {
  document.getElementById('phone-details').style.display = detailsStyle;
};
const phonesDetails = async (id) => {
  /* call the spiner function show and details div hide*/
  toggleSpiner('block');
  detailsToggle('none');
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
          <li class="list-group-item list-group-item-danger"><h5>${phone.name} Full Specification.</h5></li>
        
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
  /* call the spiner function hide & details div block*/
  toggleSpiner('none');
  detailsToggle('block');
};
