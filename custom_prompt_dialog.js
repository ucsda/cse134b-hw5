

import {
	click,
}
from "./utils.js";
export function custom_prompt(div_surrounding_button_and_dialog, on_exit_prompt, onclick){
	let node = div_surrounding_button_and_dialog;
	return custom_prompt_with_button(div_surrounding_button_and_dialog, on_exit_prompt, onclick, node.querySelector(":scope > button.makes_custom_prompt_dialog"))
}
export function custom_prompt_with_button(div_surrounding_button_and_dialog, on_exit_prompt, onclick, btn){
	
	let node = div_surrounding_button_and_dialog;
	let dialog = node.querySelector("dialog");
	
	btn.onclick = (() => {
		onclick();
		// console.log("custom Prompt 1");
		// let form = dialog.querySelector(":scope > form");
		dialog.querySelector(":scope > button.ok").onclick = (() => {
			// console.log("custom Prompt ok");
			dialog.close();
			on_exit_prompt(true);
		});
		dialog.querySelector(":scope > button.cancel").onclick = (() => {
			// console.log("custom Prompt cancel");
			dialog.close();
			on_exit_prompt(false);
		});
		dialog.oncancel = (() => {
			on_exit_prompt(false);
		});
		dialog.showModal();
	});
}