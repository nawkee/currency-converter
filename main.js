console.log(1);
const fromCurrency = document.querySelector('#from');
const toCurrency = document.querySelector('#to');
const resultFrom = document.querySelector('.result-from');
const resultTo = document.querySelector('.result-to');
const input = document.querySelector('#number-input');

window.onload = () => {
    fetch('https://v6.exchangerate-api.com/v6/f4a736e6d64825d44a6e7015/latest/USD')
        .then(response => response.json())
        .then(data => {
            for (const property in data.conversion_rates) {
                fromCurrency.innerHTML += `
                <option value="${property}">${property}</option>
                `;
                toCurrency.innerHTML += `
                <option value="${property}">${property}</option>
                `;
            }
        })
        .catch(err => console.log(err));
};

input.addEventListener('input', () => convert());
fromCurrency.addEventListener('change', () => convert());
toCurrency.addEventListener('change', () => convert());

function convert() {
    fetch(`https://v6.exchangerate-api.com/v6/f4a736e6d64825d44a6e7015/latest/${fromCurrency.options[fromCurrency.selectedIndex].text.toUpperCase()}`)
        .then(response => response.json())
        .then(data => {
            if (input.value === '' || +input.value === 0) {
                resultFrom.innerHTML = '';
                resultTo.innerHTML = '';
            } else {
                for (let property in data.conversion_rates) {
                    let fromC = fromCurrency.options[fromCurrency.selectedIndex].text.toUpperCase(),
                        toC = toCurrency.options[toCurrency.selectedIndex].text.toUpperCase();
                    if (property === fromC) {
                        resultFrom.innerHTML = `${+input.value} ${fromC}`;
                    }
                    if (property === toC) {
                        resultTo.innerHTML = `${Math.round(100 * (+input.value * data.conversion_rates[property])) / 100} ${toC}`;
                    }
                }
            }
        })
        .catch(err => console.log(err));
}
