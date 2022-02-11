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

// !COUNTRIES API JS START
let countryList_El = document.querySelector(".index-counteis-list");
let searchInput_El = document.getElementById("search-input");
let regionSelect_El = document.getElementById("region_select");

const api = `https://restcountries.com/v3.1/all`;

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

requestApi(api);

function showResualt(data) {
  loaderSection_El.classList.add("hidden");
  let allCountry = data;

  allCountry.forEach((country) => {
    let { name, population, region, flags, capital } = country;

    searchInput_El.addEventListener("input", (e) => {
      let searchCountries = e.target.value.toLowerCase();

      for (i = 0; i < countryList_El.childNodes.length; i++) {
        let coun = countryList_El.childNodes[i]
          .getAttribute("id")
          .toLowerCase();
        if (!coun.includes(searchCountries)) {
          countryList_El.childNodes[i].classList.add("hidden");
        } else {
          countryList_El.childNodes[i].classList.remove("hidden");
        }
      }
    });

    regionSelect_El.addEventListener("change", (e)=>{
      let region = e.target.value.toLowerCase();

      for (i = 0; i < countryList_El.childNodes.length; i++) {
        let reg = countryList_El.childNodes[i]
          .getAttribute("data-set")
          .toLowerCase();
        if (!reg.includes(region)) {
          countryList_El.childNodes[i].classList.add("hidden");
        } else {
          countryList_El.childNodes[i].classList.remove("hidden");
        }
      }
    })

    let li = document.createElement("li");
    li.setAttribute("id", `${name.common}`);
    li.setAttribute("data-set", `${region}`);
    li.classList.add("index-counteis-item");
    li.innerHTML = `
        <div class="index-country">
        <img class="index-country-flag" src="${flags.svg}" alt="Germany flag"
            width="264" height="160">
        <div class="index-country-info">
            <h3 class="index-country-name">
                <a class="index-country-link" href="./country.html?${name.common}">
                   ${name.common}
                </a>
            </h3>
            <dl class="index-country-details">
                <div class="index-country-details-item">
                    <dt class="index-country-details-title">Population:</dt>
                    <dd class="index-country-details-value">${population}</dd>
                </div>
                <div class="index-country-details-item">
                    <dt class="index-country-details-title">Region:</dt>
                    <dd class="index-country-details-value">${region}</dd>
                </div>
                <div class="index-country-details-item">
                    <dt class="index-country-details-title">Capital:</dt>
                    <dd class="index-country-details-value">${capital}</dd>
                </div>

                <div class="d-grid gap-2""> 
                <a class="btn btn-dark" href="./country.html?${name.common}">Country About</a>
                </div>
            </dl>
        </div>
    </div>
        `;

    countryList_El.appendChild(li);
  });
}
