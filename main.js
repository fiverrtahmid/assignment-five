const initialBalance = document.querySelector(".balance");
//const noakhaliDonateAmount = document.querySelector(".noakhali-donate-amount");
const donateForm = document.querySelector("form");
const donateForNoakhali = document.querySelector(".noakhali-donate-amount");
const dAmount = document.getElementById("donat-amount");
const donateBtn = document.querySelector(".donate-btn");

// donation card container
const cardContainer = document.querySelector(".donate-card-section");

// get donation history section
const donationHistory = document.querySelector(".donation-history");

// get button for donation page
const donationPageBtn = document.querySelector(".donation-page");

// get button for history page
const historyPageBtn = document.querySelector(".history-page");

// function for showing the error msg
function showMsg(msg, action = "bg-green-400", cursor = "cursor-pointer") {
	donateBtn.textContent = msg;
	donateBtn.classList.add(action, cursor);
}

// receiving the donate amount
function getTheDonateAmount(e) {
	let donateAmount = Number(dAmount.value);
	//console.log(typeof donateAmount);
	return donateAmount;
}

// validate the recieving donate amount
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

// get and show total doanate
function makeDonate(recievedAmount) {
	let totalDonate;

	totalDonate = Number(donateForNoakhali.textContent) + recievedAmount;

	donateForNoakhali.textContent = totalDonate;
	return totalDonate;
}

// minus taka from main or initial balance
function minusFromInitialBalance(recievedAmount) {
	let balance = Number(initialBalance.textContent) - recievedAmount;
	initialBalance.textContent = balance;
}

// make donation history
function makeDonationHistory(e, totalDonate) {
	let historyCard = `<div
				class="history-card border-2 rounded-md p-4 flex flex-col gap-4"
			>
				<h2 class="font-bold text-2xl">
					<span>${totalDonate}</span>taka ${e.target.parentElement.parentElement.children[1].textContent},
					
				</h2>
				<p>
					Date: Date : Tue Sep 17 2024 08:39:11 GMT +0600 (Bangladesh
					Standard Time)
				</p>
			</div>`;
	donationHistory.insertAdjacentHTML("afterbegin", historyCard);
}

// handle the donation form submit
function donateFormHadler(e) {
	e.preventDefault();
	const recievedAmount = getTheDonateAmount(e);

	const isValid = validateDonateAmount(recievedAmount);

	if (!isValid) return;

	if (e.target.children[1].classList.contains("noakhali-donate-btn")) {
		minusFromInitialBalance(recievedAmount);
		const totalDonate = makeDonate(recievedAmount);

		makeDonationHistory(e, totalDonate);
	}
}

// show error on submit button when input is not valid
function handleSubmitBtn(e) {
	donateBtn.classList.remove("bg-red-400", "cursor-not-allowed");
	donateBtn.textContent = "Donate Now";
}

// all buttons handler on doucment for routing
function documentBtnHandler(e) {
	if (e.target.classList.contains("donation-page")) {
		cardContainer.classList.remove("hidden");
		donationHistory.classList.add("hidden");
		donationPageBtn.classList.add("bg-green-400");
		historyPageBtn.classList.remove("bg-green-400");
	}
	if (e.target.classList.contains("history-page")) {
		cardContainer.classList.add("hidden");
		donationHistory.classList.remove("hidden");
		historyPageBtn.classList.add("bg-green-400");
		donationPageBtn.classList.add("bg-gray-200");
		donationPageBtn.classList.remove("bg-green-400");
	}
}

donateForm.addEventListener("submit", donateFormHadler);
dAmount.addEventListener("focus", handleSubmitBtn);
document.addEventListener("click", documentBtnHandler);

// console.log(noakhaliDonateAmount.textContent);
// console.log(typeof Number(noakhaliDonateAmount.textContent));
