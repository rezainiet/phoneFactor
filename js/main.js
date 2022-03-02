let loadingGif = document.getElementById('loading-gif');
let displayError = document.getElementById('hints');
let phoneDetailsContainer = document.getElementById('phone-details-container');
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
    displayError.textContent = '';
    phoneDetailsContainer.textContent = '';

    loadingGif.style.display = 'block';
    if (phones.length === 0) {
        const div = document.createElement('div');
        loadingGif.style.display = 'none';
        div.innerHTML = `<p>No phone found! Try again...</p>`
        displayError.appendChild(div);
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
                    <button onclick="phoneDetails('${phone.slug}'); scrollToTop()" >More Details</button>
                </div>`
            phoneContainer.appendChild(article);
        })
    }
    loadingGif.style.display = 'none';
}

const phoneDetails = (detailsId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${detailsId}`
    fetch(url)
        .then(res => res.json())
        .then(data => showPhonedetails(data.data))
        .then(console.log(url));
}

const showPhonedetails = (phoneSLug) => {
    phoneDetailsContainer.textContent = '';
    loadingGif.style.display = 'block';
    const div = document.createElement('div');
    div.innerHTML = `<div class="phone-details-container">
            <div class="image-container">
                <img src="./images/1.jpg" alt="">
            </div>
            <div class="details-container">
                <h2>Name: ${phoneSLug.name}.</h2>
                <h2>Brand: <span class="font-weight">${phoneSLug.brand}.</span></h2>
                <h3>Release Date: <span class="font-weight">${phoneSLug.releaseDate ? phoneSLug.releaseDate : "No release date found!"}.</span></h3>
                <h4>ID: <span class="font-weight">${phoneSLug.slug}.</span></h4>
                    <br>
                <h3 style="text-decoration: underline;">Main Features:</h3>
                    <br>
                <div class="main-features-wrapper">
                    <p><span class="bold-text">Storage:</span> ${phoneSLug.mainFeatures.storage}.</p>
                    <p><span class="bold-text">Display Size:</span> ${phoneSLug.mainFeatures.displaySize}. </p>
                    <p><span class="bold-text">Chipset:</span> ${phoneSLug.mainFeatures.chipSet}. </p>
                    <p><span class="bold-text">Memory:</span> ${phoneSLug.mainFeatures.memory}. </p>
                    <br>
                    <h4 style="text-decoration: underline;">Sensors:</h4>
                    <br>
                    <p>i. ${phoneSLug.mainFeatures.sensors[0]}, ${phoneSLug.mainFeatures.sensors[1]}</p>
                    <p>ii. ${phoneSLug.mainFeatures.sensors[2]}</p>
                    <p>iii. ${phoneSLug.mainFeatures.sensors[3]}</p>
                    <p>iv. ${phoneSLug.mainFeatures.sensors[4]}</p>
                    <p>v. ${phoneSLug.mainFeatures.sensors[5]}</p>
                    <br>
                    <h4 style="text-decoration: underline;">Other Features:</h4>
                    <br>
                    <p><span class="bold-text">WLAN:</span> ${phoneSLug.others ? phoneSLug.others.WLAN : "WLAN Not Found"}</p>
                    <p><span class="bold-text">Bluetooth:</span> ${phoneSLug.others ? phoneSLug.others.Bluetooth : "Bluetooth Not Found"}.</p>
                    <p><span class="bold-text">GPS:</span> ${phoneSLug.others ? phoneSLug.others.GPS : "GPS Not Found"}.</p>
                    <p><span class="bold-text">NFC:</span> ${phoneSLug.others ? phoneSLug.others.NFC : "NFC Not Found"}.</p>
                    <p><span class="bold-text">Radio:</span> ${phoneSLug.others ? phoneSLug.others.Radio : "Radio Not Found"}.</p>
                    <p><span class="bold-text">USB:</span> ${phoneSLug.others ? phoneSLug.others.USB : "USB Not Found"}</p>
                    
                </div>
            </div>
        </div>`
    phoneDetailsContainer.appendChild(div);
    loadingGif.style.display = 'none';
    console.log(phoneSLug.others);
}

const scrollToTop = () => {
    window.scrollTo(0, 190);
}