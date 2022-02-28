const loadPhoneData = () => {
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    inputField.value = '';

    fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => displayphone(data.data))
}

const displayphone = phones => {
    const searchResult = document.getElementById('search-result')

    searchResult.textContent = '';

    phones.forEach(phone => {
        // console.log(phone);

        const div = document.createElement('div')
        div.classList.add(...['col-xl-3', 'col-lg-3', 'col-md-6', 'col-md-12', 'g-4'])

        div.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${phone.image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">${phone.brand}</p>
          <a href="#" class="btn btn-primary">Details</a>
        </div>
      </div>
        
        `
        searchResult.appendChild(div);

    })
}