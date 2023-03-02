

export let get = (id) => document.getElementById(id);
export let btn = (node) => node.querySelector(":scope > button");
export let click = (node) => (f) => node.addEventListener('click', f);
export let set_output = (node, s) => node.querySelector("output").value = s;
export let set_output_innerHTML = (node, s) => node.querySelector("output").innerHTML = s;
