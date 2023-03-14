

function e() { return document.createElement(...arguments) };
function g() { return document.querySelector(...arguments) };
function gx(x) { return x.querySelector(...Array.prototype.slice.call(arguments, 1)) };
class ButtonCount extends HTMLElement {
	constructor(){
		super();
		let x = e("button");
		x.addEventListener("click", () => {
			this.times_clicked += 1;
			this.update_number();
		});
		let label = e("span");
		label.innerText = "Times Clicked: ";
		let num = e("span");
		num.className = "number";
		[label,num].forEach(y => x.appendChild(y));
		let sr = this.attachShadow({mode: "open"});
		sr.appendChild(x);
		this.times_clicked = 0;
		this.update_number();
	}
	update_number(){
		let num = gx(this.shadowRoot, "button span.number");
		num.innerText = this.times_clicked.toString();
	}
}

customElements.define("button-count", ButtonCount);

