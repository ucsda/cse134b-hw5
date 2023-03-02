

import {
	get,
	btn,
	click,
	set_output,
	set_output_innerHTML,
}
from "./utils.js";

// import {confirmation_dialog} from "./confirm_dialog.js"
import {custom_prompt, custom_prompt_with_button} from "./custom_prompt_dialog.js"

let storage = {
	load: () => JSON.parse(localStorage.getItem("blogs")) || [],
	store: (x) => localStorage.setItem("blogs", JSON.stringify(x)),
	clear: () => localStorage.clear(),
};
let table = get("table_of_blogs");
let add_post_container = get("add_post");
let edit_post_container = get("edit_post");
let make_edit_post_container = () => {
	let c = edit_post_container;
	return c;
	let x = c.cloneNode(/*deep*/true);
	// x.ownerDocument = c.ownerDocument;
	return x;
}

let tbody = table.querySelector(":scope > tbody");


let row_properties = (c) => { return {
	title: c.querySelector(".post_title"),
	date: c.querySelector(".post_date"),
	summary: c.querySelector(".post_summary"),
}};
let blog_row_template = get("blog_row_template");
function add_blog_row(tr, row, i){
	set_blog_row(tr, row, i);
	tbody.appendChild(tr);
}
function set_blog_row(tr, row, i){
	// console.log({row:row});
	{
		function add(i, text){
			// make sure to use children, not childNodes
			// since we want the <td> elements, not the whitespace between
			tr.children[i].innerText = text;
		}
		add(0, row.title);
		add(1, row.date);
		add(2, row.summary);
		function get_x_btn(tr, x){
			return tr.querySelector(`button[data-kind="${x}"]`);
		}
		function set_index(x, i){
			x.setAttribute("data-index", i.toString());
		};

		let delete_btn = get_x_btn(tr, "delete");
		set_index(delete_btn, i);
		function update_indices(start_i, children){
			// update all indices after since otherwise, we'd have
			// e.g. [0,1,2,3,4]
			// then 1 removed, so:
			// [0,2,3,4]
			// so now just go from 1->length
			// and update, so: [0,1,2,3]
			//                    ^ ^ ^
			for(let i = start_i; i < children.length; ++i){
				["delete", "edit"].forEach(x => {
					// console.log({children: children, i: i, x: x});
					set_index(get_x_btn(children[i], x), i);
				});
			}
		}
		delete_btn.onclick = (() => {
			let i = Number(delete_btn.getAttribute("data-index"));
			a.splice(i,1);
			storage.store(a);
			// console.log({i:i,tbody:tbody});
			let x = tbody.children[i];
			tbody.removeChild(x);
			update_indices(i, tbody.children);
		});
		let edit_btn = get_x_btn(tr, "edit");
		set_index(edit_btn, i);
		let c = edit_post_container;
		function edit_onclick(){
			let i = Number(edit_btn.getAttribute("data-index"));
			let row = a[i];
			let rp = row_properties(c);
			for(let key in row){
				rp[key].value = row[key];
			}
			c.querySelector("input.index").value = i.toString();
			// console.log({i:i,tbody:tbody});
			let x = tbody.children[i];
			// console.log({row:row});
		};
		{
			function on_dialog_close(user_clicked_ok){
				if (!user_clicked_ok){ return; }
				// console.log("edited!!!" + Math.random());
				// need to get things
				let row = {};
				let rp = row_properties(c);
				for(let key in rp){
					row[key] = rp[key].value;
				}
				// console.log({row:row});
				// append_blog_row_from_html();
				let i = Number(c.querySelector("input.index").value);
				set_blog_row(tbody.children[i], row, i);
				a[i] = row;
				storage.store(a);
			};
			// console.log("custom_prompt_with_button");
			custom_prompt_with_button(c, on_dialog_close, edit_onclick, edit_btn)
		}
	}
}
let a = storage.load();

let make_tr = () => blog_row_template.content.children[0].cloneNode(true/*deep*/);
a.forEach((row, i) => {
	add_blog_row(make_tr(), row, i)
});

// let add_btn = add_post_container.querySelector("#button_add_post");
function append_blog_row_from_html(){
	let row = {};
	let rp = row_properties(add_post_container);
	for(let key in rp){
		row[key] = rp[key].value;
	}
	add_blog_row(make_tr(), row, a.length);
	a.push(row);
	storage.store(a);
	for(let key in rp){
		rp[key].value = "";
	}
}






{
	function on_dialog_close(user_clicked_ok){
		if (!user_clicked_ok){ return; }
		append_blog_row_from_html();
	};
	custom_prompt(add_post_container, on_dialog_close, () => {})
}
{
	
}
// confirmation_dialog(add_post_container, on_dialog_close);



// storage.store(a);


