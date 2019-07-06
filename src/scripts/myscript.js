let selectedRates = ["BTC", "ETC", "ETH", "LTC", "XRP"];

function returnImgName(abr) {
  switch (abr) {
    case "BTC":
      return "btc";
      break;
    case "ETC":
      return "etc";
      break;
    case "ETH":
      return "eth";
      break;
    case "LTC":
      return "ltc";
      break;
    case "XRP":
      return "xrp";
      break;
    default:
      return "btc";
      break;
  }
}

function returnFullName(abr) {
  switch (abr) {
    case "BTC":
      return "Bitcoin";
      break;
    case "ETC":
      return "Etherium Classic";
      break;
    case "ETH":
      return "Etherium";
      break;
    case "LTC":
      return "Litecoin";
      break;
    case "XRP":
      return "Ripple";
      break;
    default:
      return "Bitcoin";
      break;
  }
}

function returnCurrencySymbol(curr) {
  switch (curr) {
    case "BTC":
      return "Ƀ";
      break;
    case "EUR":
      return "€";
      break;
    case "GBP":
      return "£";
      break;
    case "USD":
      return "$";
      break;
    default:
      return "£";
      break;
  }
}

// document.addEventListener("DOMContentLoaded", () => {
//   getRatesData();
// });
//
// function getRatesData() {
//
//   let promises = selectedRates.map((rate) => fetchData(rate));
//
//   Promise.all(promises)
//     .then(result => appendRatesListToBody(result));
// }
//
// function fetchData(rate) {
//   let spotUrl = `https://api.coinbase.com/v2/prices/${rate}-GBP/spot`;
//   return fetch(spotUrl)
//     .then(response => response.json())
//     .then(json => createArticle(json.data))
//     .catch(function(err) {
//       console.log('Fetch Error :-S', err);
//     });
// }
//
// function appendRatesListToBody(data) {
//   let rates = document.getElementById("rates");
//   rates.innerHTML = "";
//   data.map(item => rates.appendChild(item));
// }
//
// function createArticle(data) {
//   let base = data.base;
//   let article = document.createElement("article");
//   article.setAttribute("id", base);
//   article.classList.add('rate');
//
//   let currencySymbol = returnCurrencySymbol(data.currency);
//   let roundUpValue = parseFloat(data.amount).toFixed(2);
//   let valueString = currencySymbol + roundUpValue;
//
//   let bat = "";
//   // bat = base === "BAT" ? "name--bat" : "";
//   article.innerHTML =
//     `<img src="./images/32/color/${returnImgName(base)}.png" class="rate__image"/>
//      <div class='rate__name name'>
//        <h1 class='name--full'><strong>${returnFullName(base)}</strong></h1>
//        <h2 class='name--short'>${base}</h2>
//      </div>
//      <span class='rate__value value'>${valueString}
//      </span>`;
//   return article;
// }

function refreshRates(e) {
  let target = e.target;
  let parent = target.parentElement;

  if (target.id === "refreshRates" || parent.id === "refreshRates") {
    // Refresh those rates
    getRatesData();
    // add feedback once refreshed!! *** TODO ***
  }

  const ratesContainer = document.getElementById("rates");
  if (target.id === "refreshRates") {
    rotateRefreshBtn(target);
    flashWhiteScreen(ratesContainer);
  } else if (parent.id === "refreshRates") {
    rotateRefreshBtn(parent);
    flashWhiteScreen(ratesContainer);
  }

  function rotateRefreshBtn(el) {
    el.classList.add("refresh--rotate");
    setTimeout(function() {
      el.classList.remove("refresh--rotate");
    }, 400);
  }

  function flashWhiteScreen(el) {
    el.classList.add("rates__container--refresh");
    setTimeout(function() {
      el.classList.remove("rates__container--refresh");
    }, 1000);
  }
} // END refreshRates fn

function updateExtensionIcon(e) {
  let pathTo = e.path;
  pathTo.forEach(el => {
    if (el.tagName === "ARTICLE") {
      chrome.browserAction.setIcon({
        path: `./images/32/color/${returnImgName(el.id)}.png`
      });
      chrome.browserAction.setBadgeText({
        text: ""
      });
      chrome.browserAction.setBadgeBackgroundColor({
        color: "#ff3231"
      });
    }
  });
}

function updateBadge(change) {
  const green = "#0A950A";
  const red = "#ff3231";

  change ? priceUp() : priceDown();

  function priceUp(green) {
    setBadgeBGColor(green);
    // setBadgeTxt("UP");
    setBadgeTxt("");
  }

  function priceDown(red) {
    setBadgeBGColor(red);
    // setBadgeTxt("DWN");
    setBadgeTxt("");
  }

  function setBadgeTxt(txt) {
    if (isPriceChange) {
      chrome.browserAction.setBadgeText({
        text: txt
      });
    } else {
      chrome.browserAction.setBadgeText({
        text: ""
      });
    }
  }

  function setBadgeBGColor(col) {
    chrome.browserAction.setBadgeBackgroundColor({
      color: col
    });
  }
}

// Click events
document.addEventListener("click", function(e) {
  // refreshRates(e);
  updateExtensionIcon(e);
});
