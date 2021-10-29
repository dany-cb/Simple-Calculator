"use-strict";
(function Calculator() {
	let screen = document.querySelector(".calc-screen");
	let buffer = "0";
	let total = 0;
	let preOp = null;
	let overwrite = true;

	document
		.querySelectorAll(".calc-btn")
		.forEach((btn) => btn.addEventListener("click", (ev) => buttonPress(ev.target.innerText), false));

	document.addEventListener("keydown", (ev) => buttonPress(ev.key), false);

	function buttonPress(value) {
		// console.log(value);

		if (isNaN(value)) {
			handleSymbol(value);
		} else {
			//Space is considered as Number
			if (value !== " ") handleNumber(value);
		}
		reset();
	}

	function reset() {
		if (buffer < 0) {
			screen.innerText = buffer.toString().substring(1, buffer.length) + "-";
		} else {
			screen.innerText = buffer;
		}
	}

	function handleNumber(value) {
		if (overwrite) {
			buffer = value;
			overwrite = false;

			if (value == 0) overwrite = true; //Prevent from Entering 0's when overwrite =>True
		} else {
			buffer += value;
		}
	}

	function handleSymbol(value) {
		switch (value) {
			case "Clear":
			case "c":
				buffer = "0";
				total = 0;
				overwrite = true;
				break;

			case "←":
			case "Backspace":
				buffer = buffer.substring(0, buffer.length - 1);
				if (!buffer) {
					buffer = "0";
					overwrite = true;
				}
				break;

			case "+":
			case "-":
			case "*":
			case "/":
			case "=":
			case "Enter":
				performCalc(value);
				break;
		}
	}

	function performCalc(value) {
		if (!overwrite) {
			let intBuffer = parseInt(buffer, 10);
			if (preOp) {
				total = Math.round(eval(total + preOp + intBuffer));
			} else {
				total = intBuffer;
			}

			buffer = total;
			overwrite = true;
		}
		preOp = value;

		if (value === "=" || value === "Enter") {
			overwrite = false;
			preOp = null;
			// console.log("Equal");
		}
	}
})();
