//! DARK MODE JS START
let siteHeaderTthemeToggler_El = document.querySelector(
  ".site-header-theme-toggler"
);
let textDark_El = document.getElementById("text-dark");
let loaderSection_El = document.querySelector(".loader-section");

// TOGGLER BUTTON LISTENER
siteHeaderTthemeToggler_El.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  textDark_El.classList.add("text-light");
});

//! COUNTRY ABOUT JS START
let queryString = window.location.search;
let country = queryString.slice(1);

let url = `https://restcountries.com/v3.1/name/${country}`;
let mainCountryPage_El = document.querySelector(".country-page");

async function requestApi(url) {
  try {
    let request = await fetch(url);
    let data = await request.json();

    if (!request.ok) {
      throw new Error("Serverda hatolik mavjud!");
    }
    showResualt(data);
  } catch (err) {
    console.log(err.message);
  }
}

requestApi(url);

function showResualt(data) {
  loaderSection_El.classList.add("hidden");
  let allCountry = data;


  allCountry.forEach((country) => {
    let { 
      name,
      altSpellings,
      population,
      region,
      flags,
      capital,
      currencies,
      languages,
      borders
    } = country;
    console.log(borders);
    

    // //* BORDERS START 
    // let borderDiv = document.createElement("div")
    // borderDiv.classList.add("country-page-border-countries-list");
    // borderDiv.innerHTML = `
    //       <a class="country-page-border-link">${borders[0]}</a>`

    // console.log(borders); 

    let div = document.createElement("div");
    div.classList.add("container");
    div.innerHTML = `
                  
        <div class="country-page-flag-info">
        <img class="country-page-flag" src="${
          flags.svg
        }" alt="Belgium flag" width="560"
            height="400" >

        <div class="country-page-info">
            <h1 class="country-page-title">${name.common}</h1>

            <div class="country-page-dls-wrapper">
                <dl class="counntry-page-details">
          
                    <div class="country-page-details-item">
                        <dt class="country-page-details-title">Name:</dt> 
                        <dd class="country-page-details-value">${altSpellings[1]
                        }</dd>
                    </div>
                    <div class="country-page-details-item">
                        <dt class="country-page-details-title">Population:</dt> 
                        <dd class="country-page-details-value">${population}</dd>
                    </div>
                    <div class="country-page-details-item">
                        <dt class="country-page-details-title">Region:</dt> 
                        <dd class="country-page-details-value">Europe</dd>
                    </div>
                    <div class="country-page-details-item">
                        <dt class="country-page-details-title">Sub Region:</dt> 
                        <dd class="country-page-details-value">${region}</dd>
                    </div>
                    <div class="country-page-details-item">
                        <dt class="country-page-details-title">Capital:</dt> 
                        <dd class="country-page-details-value">${
                          capital[0]
                        }</dd>
                    </div>

                </dl>




                <dl class="counntry-page-details">
          
                    <div class="country-page-details-item">
                        <dt class="country-page-details-title">Top Level Domain:</dt> 
                        <dd class="country-page-details-value">.be</dd>
                    </div>
                    <div class="country-page-details-item">
                        <dt class="country-page-details-title">Currencies:</dt> 
                        <dd class="country-page-details-value">${Object.keys(
                          currencies
                        )}</dd>
                    </div>
                    <div class="country-page-details-item">
                        <dt class="country-page-details-title">Languages:</dt> 
                        <dd class="country-page-details-value">${Object.keys(
                          languages
                        )}</dd>
                    </div>
                   

                </dl>
            </div>


            <section class="country-page-border-countries">
            <h2 class="country-page-border-countries-heading">Border Countries:</h2>
                     <p class="country-page-border-countries-list " > 
                    <a class="country-page-border-link" href="#"> ${borders} </a>
                    </p></section>

        </div>
    </div>
   

    `;

  //  div.appendChild(borderDiv);
    mainCountryPage_El.appendChild(div);
    
  });
}


