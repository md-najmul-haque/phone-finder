const loadPhoneData = () => {
  const inputField = document.getElementById('input-field');
  const searchText = inputField.value;
  inputField.value = '';

  fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    .then(res => res.json())
    .then(data => displayPhone(data.data))
}

const displayPhone = phones => {
  const searchResult = document.getElementById('search-result')

  // console.log(phones)

  searchResult.textContent = '';

  phones.forEach(phone => {
    // console.log(phone);

    const div = document.createElement('div')
    div.classList.add(...['col-xl-4', 'col-lg-4', 'col-md-6', 'col-md-12', 'g-4', 'mx-auto'])

    div.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${phone.image}" alt="phone image">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">${phone.brand}</p>
          <a onclick="loadDetails('${phone.slug}')" href="#" class="btn btn-primary">Details</a>
        </div>
      </div>
        
        `
    searchResult.appendChild(div);

  })
}

const loadDetails = id => {
  console.log(id)

  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then(res => res.json())
    .then(data => displayDetails(data))

}

const displayDetails = phone => {
  console.log(phone.data.others)
  const viewDetails = document.getElementById('view-details')

  const div = document.createElement('div')

  div.innerHTML = `
        <div class="card" style="width: 22rem;">
        <img class="card-img-top" src="${phone.data.image}" alt="phone image">
        <div class="card-body">
          <h4 class="card-title">Model Name: ${phone.data.name}</h4>
          <p class="card-text">Brand: ${phone.data.brand}</p>
          <p class="card-text">Release Date: ${phone.data.releaseDate}</p>
          <h5>Main Feature</h5>
          <p class="card-text">Chip Set: ${phone.data.mainFeatures.chipSet}</p>
          <p class="card-text">Display Size: ${phone.data.mainFeatures.displaySize}}</p>
          <p class="card-text">Storage: ${phone.data.mainFeatures.storage}</p>
          <p class="card-text">Memory: ${phone.data.mainFeatures.memory}</p>
          <p class="card-text">Sensors: ${phone.data.mainFeatures.sensors[0]}, ${phone.data.mainFeatures.sensors[1]}, ${phone.data.mainFeatures.sensors[2]}, ${phone.data.mainFeatures.sensors[3]}, ${phone.data.mainFeatures.sensors[4]}, ${phone.data.mainFeatures.sensors[5]}</p>
          <h5>Others</h5>
          <p class="card-text">Bluetooth: ${phone.data.others.Bluetooth}</p>
          <p class="card-text">GPS: ${phone.data.others.GPS}</p>
          <p class="card-text">NFC: ${phone.data.others.NFC}</p>
          <p class="card-text">Radio: ${phone.data.others.Radio}</p>
          <p class="card-text">USB: ${phone.data.others.USB}</p>
          <p class="card-text">WLAN: ${phone.data.others.WLAN}</p>
        </div>
      </div>
        
        `
  viewDetails.appendChild(div);


}