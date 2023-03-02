
import {
	get,
	btn,
	click,
	set_output,
	set_output_innerHTML,
}
from "./utils.js";
import {custom_prompt} from "./custom_prompt_dialog.js"

(function do_alert(){
	let node = get("custom_Alert");
	let dialog = node.querySelector("dialog");
	let on_dialog_close = () => {};
	click(btn(node))(() => {
		// console.log("custom Alert 1");
		dialog.showModal();
	});
	let form = dialog.querySelector("form");
	click(form.querySelector("button.ok"))(() => {
		// console.log("custom Alert ok");
		dialog.close();
		on_dialog_close();
	});
	dialog.addEventListener("close", () => {
		on_dialog_close();
	});
}());

import {confirmation_dialog} from "./confirm_dialog.js"

(function do_confirm(){
	let node = get("custom_Confirm");
	function on_dialog_close(user_clicked_ok){
		if (!user_clicked_ok){ return; }
		let v = node.querySelector("textarea").value;
		set_output(node,
			`The value returned by the confirm method is : ${v}`,
		);
	};
	confirmation_dialog(node, on_dialog_close);
}());


(function do_prompt(){
	let node = get("custom_Prompt");
	let dialog = node.querySelector("dialog");
	let input = dialog.querySelector("input");
	let on_exit_prompt = (did_confirm) => {
		if (!did_confirm){ return; }
		let user_data = input.value;
		set_output_innerHTML(node,
			user_data,
		);
	};
	custom_prompt(node, on_exit_prompt, () => {});
	input.addEventListener("keydown", (e)=>{
		if (e.key == "Enter"){
			on_exit_prompt(true);
		}
	});
}());



(function do_safer_prompt(){
	let node = get("custom_Safer_Prompt");
	let dialog = node.querySelector("dialog");
	let input = dialog.querySelector("input");
	let on_exit_prompt = (did_confirm) => {
		if (!did_confirm){ return; }
		let user_data = input.value;
		set_output_innerHTML(node,
			DOMPurify.sanitize(user_data),
		);
	};
	custom_prompt(node, on_exit_prompt, () => {});
	input.addEventListener("keydown", (e)=>{
		if (e.key == "Enter"){
			on_exit_prompt(true);
		}
	});
}());