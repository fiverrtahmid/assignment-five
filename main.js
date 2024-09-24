const initialBalance = document.querySelector(".balance");
//const noakhaliDonateAmount = document.querySelector(".noakhali-donate-amount");
const donateForm = document.querySelector("form");
const donateForNoakhali = document.querySelector(".noakhali-donate-amount");
const dAmount = document.getElementById("donat-amount");
const donateBtn = document.querySelector(".donate-btn");
const cardContainer = document.querySelector(".donate-card-section");
const donationHistory = document.querySelector(".donation-history");

function showMsg(msg, action = "bg-green-400", cursor = "cursor-pointer") {
	donateBtn.textContent = msg;
	donateBtn.classList.add(action, cursor);
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
		showMsg(
			"Donate amount should be positive a number",
			"bg-red-400",
			"cursor-not-allowed"
		);
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

function handleSubmitBtn(e) {
	donateBtn.classList.remove("bg-red-400", "cursor-not-allowed");
	donateBtn.textContent = "Donate Now";
}

function documentBtnHandler(e) {
	if (e.target.classList.contains("donation-page")) {
		cardContainer.classList.remove("hidden");
		donationHistory.classList.add("hidden");
	}
	if (e.target.classList.contains("history-page")) {
		cardContainer.classList.add("hidden");
		donationHistory.classList.remove("hidden");
	}
}

donateForm.addEventListener("submit", donateFormHadler);
dAmount.addEventListener("focus", handleSubmitBtn);
document.addEventListener("click", documentBtnHandler);

// console.log(noakhaliDonateAmount.textContent);
// console.log(typeof Number(noakhaliDonateAmount.textContent));
