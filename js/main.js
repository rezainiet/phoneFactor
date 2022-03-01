const searchPhone = () => {
    const textValue = document.getElementById('text-input');
    const textInput = textValue.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${textInput}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data.slice(0, 20)));

    textValue.value = '';
}

const displayPhone = (phones) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    if (phones.length === 0) {
        alert('Please input at least One character...')
    }
    // console.log(phones);
    else {
        phones.forEach(phone => {
            // console.log(phone.brand);
            const article = document.createElement('article');
            article.innerHTML = `<img src="${phone.image}" alt="">
                <div class="text">
                    <h3>${phone.brand}</h3>
                    <p>${phone.phone_name}</p>
                    <button onclick="phoneDetails('${phone.slug}')" >More Details</button>
                </div>`
            phoneContainer.appendChild(article);
        })
    }
}

const phoneDetails = (detailsId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${detailsId}`
    fetch(url)
        .then(res => res.json())
        .then(data => showPhonedetails(data.data))
        .then(console.log(url));
}

const showPhonedetails = (phoneSLug) => {
    const phoneDetailsContainer = document.getElementById('phone-details-container');
    phoneDetailsContainer.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `<div class="phone-details-container">
            <div class="image-container">
                <img src="./images/1.jpg" alt="">
            </div>
            <div class="details-container">
                <h2>Name: ${phoneSLug.name}.</h2>
                <h2>Brand: ${phoneSLug.brand}.</h2>
                <h3>Release Date: ${phoneSLug.releaseDate}.</h3>
                <h3 style="text-decoration: underline;">Main Features:</h3>
                <div class="main-features-wrapper">
                    <p>Storage: ${phoneSLug.mainFeatures.storage}.</p>
                    <p>Display Size: ${phoneSLug.mainFeatures.displaySize}. </p>
                    <p>Chipset: ${phoneSLug.mainFeatures.chipSet}. </p>
                    <p>Memory: ${phoneSLug.mainFeatures.memory}. </p>
                    <h4 style="text-decoration: underline;">Sensors:</h4>
                    <p>i. ${phoneSLug.mainFeatures.sensors[0]}, ${phoneSLug.mainFeatures.sensors[1]}</p>
                    <p>ii. ${phoneSLug.mainFeatures.sensors[2]}</p>
                    <p>iii. ${phoneSLug.mainFeatures.sensors[3]}</p>
                    <p>iv. ${phoneSLug.mainFeatures.sensors[4]}</p>
                    <p>v. ${phoneSLug.mainFeatures.sensors[5]}</p>
                </div>
            </div>
        </div>`
    phoneDetailsContainer.appendChild(div);
    console.log(phoneSLug.mainFeatures.sensors);
}