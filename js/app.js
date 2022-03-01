// get input value
// add button event
const loadPhones = async () => {
  // get input
  const searchInput = document.getElementById('search-input');
  const searchInputText = searchInput.value;
  // get emty search input
  searchInput.value = '';
  /* 
    fetching the api
  */
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchInputText}`;
  const res = await fetch(url);
  const data = await res.json();
  // call the display function
  displayPhones(data.data);
  //   console.log(data.data);
};
// display phones function
const displayPhones = (phones) => {
  // foreach loop in the all phones
  phones.forEach((phone) => {
    const phonesDiv = document.getElementById('phones');
    /* emty the full element after get results */
    const div = document.createElement('div');
    phonesDiv.innerHTML = '';
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
// load phone details function
const phonesDetails = async (id) => {
  //   console.log(id);
  // call the dynamically id api
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  // call display details function
  displayPhonesDetails(data);
};
