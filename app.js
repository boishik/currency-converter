const BASE_URL =
  //api issue found
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

let i = 0;
for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name == "from" && currCode == "USD") {
      newOption.selected = "selected";
    } else if (select.name == "to" && currCode == "BDT") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  const amountInput = document.querySelector(".amount input");
  let amountVal = parseFloat(amountInput.value);

  if (isNaN(amountVal) || amountVal < 1) {
    amountVal = 1;
    amountInput.value = "1";
  }

  const API_KEY = "cur_live_dyztzh5CXchrVmKy1tIaWNQHscZyNeuQrP8QdnOW"; // replace with your real key
  const from = fromCurr.value;
  const to = toCurr.value;
  const URL = `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&base_currency=${from}&currencies=${to}`;

  try {
    const response = await fetch(URL);
    const data = await response.json();

    const rate = data.data[to].value;
    const finalAmount = (amountVal * rate).toFixed(2);
    document.querySelector(
      ".msg"
    ).innerText = `${amountVal} ${from} = ${finalAmount} ${to}`;
  } catch (err) {
    console.error("Conversion error:", err);
    document.querySelector(".msg").innerText =
      "❌ Failed to Receive exchange rate.";
  }
});
