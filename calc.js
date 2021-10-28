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
		if (isNaN(value)) {
			handleSymbol(value);
		} else {
			handleNumber(value);
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
		} else {
			buffer += value;
		}
	}

	function handleSymbol(value) {
		switch (value) {
			case "Clear":
				buffer = "0";
				total = 0;
				overwrite = true;
				break;

			case "←":
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
			if (preOp) {
				total = Math.round(eval(total + preOp + buffer));
			} else {
				total = buffer;
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
