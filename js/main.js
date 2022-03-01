const searchPhone = () => {
    const textValue = document.getElementById('text-input');
    const textInput = textValue.value;

    const url = `https://openapi.programming-hero.com/api/phones?search=${textInput}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhone(data.data));
}

const displayPhone = (phones) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
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

const phoneDetails = (detailsId) => {
    const url = `https://openapi.programming-hero.com/api/phone/${detailsId}`
    fetch(url)
        .then(res => res.json())
        .then(data => console.log(data.data.brand));
    // console.log(detailsId);
}