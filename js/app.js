// get input value
// add button event
const loadPhones = async () => {
  // get input
  const searchInput = document.getElementById('search-input');
  const searchInputText = searchInput.value;
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
  //   console.log(phones);
  // foreach loop in the all phones
  phones.forEach((phone) => {
    console.log(phone.brand);
  });
};
