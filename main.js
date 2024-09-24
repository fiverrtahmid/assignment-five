const initialBalance = document.querySelector(".balance");
//const noakhaliDonateAmount = document.querySelector(".noakhali-donate-amount");
const donateForm = document.querySelectorAll("form");

// get submit buttons for donation
const submitBtnForNoakhali = document.querySelector(".noakhali-donate-btn");
const submitBtnForFeni = document.querySelector(".feni-donate-btn");
const submitBtnForQuota = document.querySelector(".quota-donate-btn");

// get doante amount element
const noakhaliDonateAmount = document.querySelector(".noakhali-donate-amount");
const feniDonateAnout = document.querySelector(".feni-donate-amount");
const quotaDonateAmount = document.querySelector(".quota-donate-amount");

// get input element from form
const dAmount = document.querySelectorAll(".input-amount");
const donateBtn = document.querySelectorAll(".donate-btn");

// donation card container
const cardContainer = document.querySelector(".donate-card-section");

// get donation history section
const donationHistory = document.querySelector(".donation-history");

// get button for donation page
const donationPageBtn = document.querySelector(".donation-page");

// get button for history page
const historyPageBtn = document.querySelector(".history-page");

// function for showing the error msg
function showMsg(e, msg, action = "bg-green-400", cursor = "cursor-pointer") {
	let getBtn = e.target.parentElement.children[0][1];
	getBtn.textContent = msg;
	getBtn.classList.add(action, cursor);
	alert(msg);
}

// receiving the donate amount
function getTheDonateAmount(e) {
	let donateAmount = Number(e.target.parentElement.children[0][0].value);
	return donateAmount;
}

// validate the recieving donate amount
function validateDonateAmount(e, recievedAmount) {
	//console.log(recievedAmount);
	let isValid;
	if (recievedAmount <= 0) {
		showMsg(
			e,
			"Donate amount should be a positive number",
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
function makeDonate(recievedAmount, donateFor = "") {
	let totalDonate;

	if (donateFor === "noakhali") {
		totalDonate = Number(noakhaliDonateAmount.textContent) + recievedAmount;
		noakhaliDonateAmount.textContent = totalDonate;
	}
	if (donateFor === "feni") {
		totalDonate = Number(feniDonateAnout.textContent) + recievedAmount;
		feniDonateAnout.textContent = totalDonate;
	}
	if (donateFor === "quota") {
		totalDonate = Number(quotaDonateAmount.textContent) + recievedAmount;
		quotaDonateAmount.textContent = totalDonate;
	}

	return totalDonate;
}

// minus taka from main or initial balance
function minusFromInitialBalance(recievedAmount) {
	let balance = Number(initialBalance.textContent) - recievedAmount;
	initialBalance.textContent = balance;
}

// reset input
function resetInput(e) {
	e.target.parentElement.children[0][0].value = "";
}
// make donation history
function makeDonationHistory(e, amount) {
	let date = new Date();
	let historyCard = `<div
				class="history-card border-2 rounded-md p-4 flex flex-col gap-4"
			>
				<h2 class="font-bold text-2xl">
					<span>${amount} </span> Taka ${e.target.parentElement.parentElement.children[1].textContent},
					
				</h2>
				<p>
					Date: ${date}
				</p>
			</div>`;
	donationHistory.insertAdjacentHTML("afterbegin", historyCard);
}

function showAlert() {
	const modalContainer = document.querySelector(".modal-container");
	modalContainer.classList.add("flex");
	modalContainer.classList.remove("hidden");

	const closeBtn = document.querySelector(".close");
	closeBtn.addEventListener("click", () => {
		modalContainer.classList.remove("flex");
		modalContainer.classList.add("hidden");
	});
}

// handle the donation form submit

function donateFormHadler(e) {
	e.preventDefault();

	// do the donate for noakhali

	if (e.target.children[1].classList.contains("noakhali-donate-btn")) {
		// recieved amount
		const recievedAmount = getTheDonateAmount(e, "noakhali");

		// checking validity
		const isValid = validateDonateAmount(e, recievedAmount);

		// if valid got to next otherwise return
		if (!isValid) return;

		resetInput(e);

		minusFromInitialBalance(recievedAmount);
		const totalDonate = makeDonate(recievedAmount, "noakhali");

		makeDonationHistory(e, recievedAmount);
		showAlert();
	}
	if (e.target.children[1].classList.contains("feni-donate-btn")) {
		// recieved amount
		const recievedAmount = getTheDonateAmount(e, "feni");

		// checking validity
		const isValid = validateDonateAmount(e, recievedAmount);

		// if valid got to next otherwise return
		if (!isValid) return;
		resetInput(e);
		minusFromInitialBalance(recievedAmount);
		const totalDonate = makeDonate(recievedAmount, "feni");
		makeDonationHistory(e, recievedAmount);
		showAlert();
	}
	if (e.target.children[1].classList.contains("quota-donate-btn")) {
		// recieved amount
		const recievedAmount = getTheDonateAmount(e, "quota");

		// checking validity
		const isValid = validateDonateAmount(e, recievedAmount);

		// if valid got to next otherwise return
		if (!isValid) return;
		resetInput(e);
		minusFromInitialBalance(recievedAmount);
		const totalDonate = makeDonate(recievedAmount, "quota");
		makeDonationHistory(e, recievedAmount);
		showAlert();
	}
}

// show error on submit button when input is not valid
function handleSubmitBtn(e) {
	let getBtn = e.target.parentElement.children[1];
	getBtn.classList.remove("bg-red-400", "cursor-not-allowed");
	getBtn.textContent = "Donate Now";
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
		donationHistory.classList.add("flex");
		historyPageBtn.classList.add("bg-green-400");
		donationPageBtn.classList.add("bg-gray-200");
		donationPageBtn.classList.remove("bg-green-400");
	}
}
donateForm.forEach((form) => {
	form.addEventListener("submit", donateFormHadler);
});
dAmount.forEach((resetBtn) => {
	resetBtn.addEventListener("focus", handleSubmitBtn);
});
document.addEventListener("click", documentBtnHandler);
