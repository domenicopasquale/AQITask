// API KEY
const apiKey = process.env.API_KEY;

// SELECTOR
let locationElement = document.querySelector('#location p');
let qualityIcon=document.querySelector('#quality #quality-icon');
let qualityDescription = document.querySelector('#quality-description p');
let indexValue=document.querySelector('#index-value p');
const searchInput=document.querySelector("#search-input");
const searchButton=document.querySelector("#search-button");
const geoButton=document.querySelector("#geo-button");

// MANUAL SEARCH
searchButton.addEventListener('click', (e)=> {
    getQuality(searchInput.value);
    e.preventDefault();
});
searchButton.addEventListener('keypress', (e)=> {
    getQuality(searchInput.value);
    e.preventDefault();
});

const getQuality = async (city) => {
    try{
        const response = await fetch(`https://api.waqi.info/search/?token=${apiKey}&keyword=${city}`);
        const qualityData = await response.json();

        locationElement.innerHTML = `${searchInput.value}<br>Stazione di ` + _.get(qualityData, 'data[0].station.name');
        indexValue.innerHTML = `Indice Qualità dell'Aria = ` + _.get(qualityData, 'data[0].aqi');

        if(`${qualityData.data[0].aqi}` === '-'){
            qualityDescription.innerHTML = 'Dati non Disponibili';
            qualityIcon.innerHTML = '❌';
        }
        else if(_.get(qualityData, 'data[0].aqi') >= 0 && _.get(qualityData, 'data[0].aqi') <= 50){
            qualityDescription.innerHTML = 'Ottima';
            qualityIcon.innerHTML = '🤩';
        }
        else  if(_.get(qualityData, 'data[0].aqi') >= 51 && _.get(qualityData, 'data[0].aqi') <= 100){
            qualityDescription.innerHTML = 'Moderata';
            qualityIcon.innerHTML = '😕';
        }
        else if(_.get(qualityData, 'data[0].aqi') >= 101 && _.get(qualityData, 'data[0].aqi') <= 150){
            qualityDescription.innerHTML = 'Malsana';
            qualityIcon.innerHTML = '🥴';
        }
        else  if(_.get(qualityData, 'data[0].aqi') >= 151 && _.get(qualityData, 'data[0].aqi') <= 200){
            qualityDescription.innerHTML = 'Nociva';
            qualityIcon.innerHTML = '😷';
        }
        else  if(_.get(qualityData, 'data[0].aqi') >= 201 && _.get(qualityData, 'data[0].aqi') <= 300){
            qualityDescription.innerHTML = 'Terribile';
            qualityIcon.innerHTML = '🤮';
        }
        else if(_.get(qualityData, 'data[0].aqi') >= 300){
            qualityDescription.innerHTML = 'Pericolosa';
            qualityIcon.innerHTML = '🤯';
        }
    }
    catch(error){
        locationElement.innerHTML = `${searchInput.value}<br>Stazione Non Trovata`;
        indexValue.innerHTML = `Indice Qualità dell'Aria = Non Disponibile`;
        qualityIcon.innerHTML = '❌';
    }
};

// GEOLOCATION
geoButton.addEventListener("click" ,(e) => {
    e.preventDefault();
let longitude;
let latitude;

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=> {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;
        const api =`https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${apiKey}`;

        fetch(api).then((response) => {
            return response.json();
        }).then (aqi => {
                    locationElement.innerHTML = `Stazione di ` + _.get(aqi, 'data.city.name');
                    indexValue.innerHTML = `Indice Qualità dell'Aria = ` + _.get(aqi, 'data.aqi');

                    if(_.get(aqi, 'data.aqi') === '-'){
                        qualityDescription.innerHTML = 'Dati non disponibili';
                        qualityIcon.innerHTML = '❌';
                    }
                    else if(_.get(aqi, 'data.aqi') >= 0 && _.get(aqi, 'data.aqi') <= 50){
                        qualityDescription.innerHTML = 'Ottima';
                        qualityIcon.innerHTML = '🤩';
                    }
                    else  if(_.get(aqi, 'data.aqi') >= 51 && _.get(aqi, 'data.aqi') <= 100){
                        qualityDescription.innerHTML = 'Moderata';
                        qualityIcon.innerHTML = '😕';
                    }
                    else if(_.get(aqi, 'data.aqi') >= 101 && _.get(aqi, 'data.aqi') <= 150){
                        qualityDescription.innerHTML = 'Malsana';
                        qualityIcon.innerHTML = '🥴';
                    }
                    else  if(_.get(aqi, 'data.aqi') >= 151 && _.get(aqi, 'data.aqi') <= 200){
                        qualityDescription.innerHTML = 'Nociva';
                        qualityIcon.innerHTML = '😷';
                    }
                    else  if(_.get(aqi, 'data.aqi') >= 201 && _.get(aqi, 'data.aqi') <= 300){
                        qualityDescription.innerHTML = 'Terribile';
                        qualityIcon.innerHTML = '🤮';
                    }
                    else if(_.get(aqi, 'data.aqi') >= 300){
                        qualityDescription.innerHTML = 'Pericolosa';
                        qualityIcon.innerHTML = '🤯';
                    }
            }   )
        })
    }  
});