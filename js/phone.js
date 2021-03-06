// Load inital data 
const loadPhoneData = () => {
  const inputField = document.getElementById('input-field');
  const searchText = inputField.value;
  inputField.value = '';
  searchResult.textContent = '';
  errorMessage.textContent = '';
  viewDetails.textContent = '';

  if (searchText === '') {
    errorMessage.innerHTML = `<h4 class="text-center text-danger fst-italic">Please search by your favorite phone name or brand name to display the phone.</h4>`
    return;
  }

  spinner.style.display = 'block'

  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(data => displayPhone(data.data))
}

// getting HTML element 
const spinner = document.getElementById('spinner')
const errorMessage = document.getElementById('error-message')
const searchResult = document.getElementById('search-result')
const viewDetails = document.getElementById('view-details')

// display search result 
const displayPhone = phones => {

  searchResult.textContent = '';
  // console.log(phones)

  if (phones.length === 0) {
    errorMessage.innerHTML = `<h3 class="text-center text-danger"> No result found</h3>`
  } else {

    const showPhones = phones.slice(0, 20);
    // console.log(showPhones);

    showPhones.forEach(phone => {
      // console.log(phone);

      const div = document.createElement('div')
      div.classList.add(...['col-xl-4', 'col-lg-4', 'col-md-6', 'col-md-12', 'g-4'])

      div.innerHTML = `
        <div class="d-flex justify-content-center">
        <div class="card" style="width: 20rem;">
        <img class="card-img-top" src="${phone.image}" alt="phone image">
        <div class="card-body">
          <h5 class="card-title"><span style="font-weight: bold">Name: </span>${phone.phone_name}</h5>
          <p class="card-text"><span style="font-weight: bold">Brand: </span>${phone.brand}</p>
          <a onclick="loadDetails('${phone.slug}')" href="#" class="btn btn-info">Details</a>
        </div>
      </div>
        </div>
          
          `
      searchResult.appendChild(div);

    })

  }
  spinner.style.display = 'none'
}

// load details of a phone
const loadDetails = id => {
  // console.log(id)
  spinner.style.display = 'block'
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(data => displayDetails(data))

}

// display details of a phone
const displayDetails = phone => {
  // console.log(phone.data)

  viewDetails.textContent = '';

  const div = document.createElement('div')

  div.innerHTML = `
        <div class="card" style="width: 22rem;">
        <img class="card-img-top" src="${phone.data.image}" alt="phone image">
        <div class="card-body">
          <h4 class="card-title"><span style="font-weight: bold">Model Name: </span> ${phone.data.name}</h4>
          <p class="card-text"><span style="font-weight: bold">Brand: </span> ${phone.data.brand}</p>
         
          <p class="card-text"><span style="font-weight: bold">Release Date: </span> ${phone.data.releaseDate ? phone.data.releaseDate : "No release data found"}</p>
          <h5>Main Feature</h5>
          <p class="card-text"><span style="font-weight: bold">Chip Set: </span> ${phone.data?.mainFeatures?.chipSet}</p>
          <p class="card-text"><span style="font-weight: bold">Display Size: </span> ${phone.data?.mainFeatures?.displaySize}}</p>
          <p class="card-text"><span style="font-weight: bold">Storage: </span> ${phone.data?.mainFeatures?.storage}</p>
          <p class="card-text"><span style="font-weight: bold">Memory: </span> ${phone.data?.mainFeatures?.memory}</p>
          <p class="card-text"><span style="font-weight: bold">Sensors: </span> ${phone.data?.mainFeatures?.sensors[0]}, ${phone.data?.mainFeatures?.sensors[1]}, ${phone.data?.mainFeatures?.sensors[2]}, ${phone.data?.mainFeatures?.sensors[3]}, ${phone.data?.mainFeatures?.sensors[4]}, ${phone.data?.mainFeatures?.sensors[5]}</p>
          <h5>Others</h5>
          <p class="card-text"><span style="font-weight: bold">Bluetooth: </span> ${phone.data?.others?.Bluetooth ? phone.data?.others?.Bluetooth : "no information found"}</p>
          <p class="card-text"><span style="font-weight: bold">GPS: </span> ${phone.data?.others?.GPS ? phone.data?.others?.GPS : "no information found"}</p>
          <p class="card-text"><span style="font-weight: bold">NFC: </span> ${phone.data?.others?.NFC ? phone.data?.others?.NFC : "no information found"}</p>
          <p class="card-text"><span style="font-weight: bold">Radio: </span> ${phone.data?.others?.Radio ? phone.data?.others?.Radio : "no information found"}</p>
          <p class="card-text"><span style="font-weight: bold">USB: </span> ${phone.data?.others?.USB ? phone.data?.others?.USB : "no information found"}</p>
          <p class="card-text"><span style="font-weight: bold">WLAN: </span> ${phone.data?.others?.WLAN ? phone.data?.others?.WLAN : "no information found"}</p>
        </div>
      </div>
        
        `
  viewDetails.appendChild(div);
  spinner.style.display = 'none'

}

