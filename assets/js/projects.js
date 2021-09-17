---
---

var projects = {{ site.data.projects | jsonify }};
projects.sort((a,b) => {
	let amy = a.date.split(', ').pop().split(' ');
	let bmy = b.date.split(', ').pop().split(' ');
	if (amy[1] > bmy[1]) {
		return -1;
	} else if (bmy[1] > amy[1]) {
		return 1;
	} else {
		let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		return months.indexOf(bmy[0]) - months.indexOf(amy[0]);
	}
});

var listDiv = document.getElementById("list");
for (pro of projects) {
	let itemDiv = document.createElement('div');
	let title = document.createElement('p');
	title.classList.add('project-header');
	title.appendChild(document.createTextNode(pro.name));
	itemDiv.appendChild(title);
	let detail = document.createElement('p');
	if (pro.detail.product) {
		let prodintro = document.createElement('span');
		prodintro.classList.add('project-opener');
		prodintro.appendChild(document.createTextNode("Product: "));
		detail.appendChild(prodintro);
		let prod = document.createElement('a');
		prod.href = pro.detail.product.link;
		prod.appendChild(document.createTextNode(pro.detail.product.name));
		detail.appendChild(prod);
	}
	if (pro.detail.code) {
		if (pro.detail.product) {detail.appendChild(document.createTextNode("; "));}
		let codeintro = document.createElement('span');
		codeintro.classList.add('project-opener');
		codeintro.appendChild(document.createTextNode("Code: "));
		detail.appendChild(codeintro);
		if (pro.detail.code.link) {
			var code = document.createElement('a');
			code.href = pro.detail.code.link;
			code.appendChild(document.createTextNode(pro.detail.code.name));
		} else {
			var code = document.createElement('span');
			code.classList.add('project-special');
			code.appendChild(document.createTextNode(pro.detail.code.name));
		}
		detail.appendChild(code)
	}
	if (pro.detail.additional) {
		detail.appendChild(document.createElement('br'));
		let additional = document.createElement('span');
		additional.classList.add('project-special');
		additional.appendChild(document.createTextNode(pro.detail.additional));
		detail.appendChild(additional);
	}
	itemDiv.appendChild(detail);
	parseMD(itemDiv, pro.date, "Primary Work Done: ");
	parseMD(itemDiv, pro.description, "Goal: ");
	parseMD(itemDiv, pro.technical, "Technical Details: ");
	listDiv.appendChild(itemDiv);
	listDiv.appendChild(document.createElement('hr'));
}

listDiv.removeChild(listDiv.lastElementChild)

function parseMD(el, text, forwardText = null) {
	var toAdd = document.createElement('p');
	
	if (forwardText) {
		let forward = document.createElement('span');
		forward.classList.add('project-opener');
		forward.appendChild(document.createTextNode(forwardText));
		toAdd.appendChild(forward);
	}
	
	var links = [...text.matchAll(/\[.+\]\(.+\)/g)];
	var parts = text.split(/\[.+\]\(.+\)/g);
	const nparts = parts.length;
	toAdd.appendChild(document.createTextNode(parts[0]));
	for (let i=1; i<nparts; i++) {
		let ael = document.createElement('a');
		ael.href = links[i-1][0].match(/\((.+)\)/)[1]
		ael.appendChild(document.createTextNode(links[i-1][0].match(/\[(.+)\]/)[1]));
		toAdd.appendChild(ael);
		toAdd.appendChild(document.createTextNode(parts[i]));
	}
	
	el.appendChild(toAdd);
}