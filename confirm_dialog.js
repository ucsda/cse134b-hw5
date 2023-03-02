
import {
	click,
}
from "./utils.js";
export function confirmation_dialog(
	div_surrounding_button_and_dialog,
	on_dialog_close,
){
	let node = div_surrounding_button_and_dialog;
	let dialog = node.querySelector("dialog");
	let btn = node.querySelector(":scope > button.makes_confirm_dialog");
	click(btn)(() => {
		// console.log("custom Confirm 1");
		dialog.showModal();
	});
	// let form = dialog.querySelector("form");
	click(dialog.querySelector("button.ok"))(() => {
		// console.log("custom Confirm ok");
		dialog.close();
		on_dialog_close(true);
	});
	click(dialog.querySelector("button.cancel"))(() => {
		// console.log("custom Confirm cancel");
		dialog.close();
		on_dialog_close(false);
	});
	dialog.addEventListener("cancel", () => {
		on_dialog_close(false);
	});
}
