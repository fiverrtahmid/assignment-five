const initialBalance = document.querySelector(".balance");
console.log(initialBalance.textContent);
const noakhaliDonateAmount = document.querySelector(".noakhali-donate-amount");
const donateForm = document.querySelector("form");
const donateForNoakhali = document.querySelector(".noakhali-donate-amount");
const dAmount = document.getElementById("donat-amount");

function showMsg(msg) {
	console.log(msg);
}

function getTheDonateAmount(e) {
	let donateAmount = Number(dAmount.value);
	//console.log(typeof donateAmount);
	return donateAmount;
}

function validateDonateAmount(recievedAmount) {
	//console.log(recievedAmount);
	let isValid;
	if (recievedAmount <= 0) {
		showMsg("Donate amount should be positive a number");
		isValid = false;
	} else if (recievedAmount === "") {
		showMsg("Donate amount should not be empty!");
		isValid = false;
	} else {
		isValid = true;
	}

	return isValid;
}

function makeDonate(recievedAmount) {
	let totalDonate;

	totalDonate = Number(donateForNoakhali.textContent) + recievedAmount;

	donateForNoakhali.textContent = totalDonate;
}

function minusFromInitialBalance(recievedAmount) {
	let balance = Number(initialBalance.textContent) - recievedAmount;
	initialBalance.textContent = balance;
}

function donateFormHadler(e) {
	e.preventDefault();
	const recievedAmount = getTheDonateAmount(e);

	const isValid = validateDonateAmount(recievedAmount);

	if (!isValid) return;

	if (e.target.children[1].classList.contains("noakhali-donate-btn")) {
		minusFromInitialBalance(recievedAmount);
		makeDonate(recievedAmount);
	}
}
donateForm.addEventListener("submit", donateFormHadler);

// console.log(noakhaliDonateAmount.textContent);
// console.log(typeof Number(noakhaliDonateAmount.textContent));
