// 123.456.789-09
const body = document.body;
let timeOut;
body.addEventListener("submit", e => {
	e.preventDefault();
	const cpf = document.getElementById("cpfInput").value;
	let cpfArray = cpf.replace(/\-|\./g, "").split("");
	cpfArray = cpfArray.map(element => {
		return Number(element);
	});
	check(cpf, cpfArray);
});

const CPF = {
	first(cpf) {
		let index = 1;
		const cpfMap = cpf.map(element => {
			if (index <= 9) {
				element *= index;
				index++;
			}
			return element;
		});
		cpfMap.splice(-2, 2);

		const reduced = cpfMap.reduce((result, element) => {
			return (result += element);
		}, 0);

		if (reduced % 11 === 10) {
			return 0;
		} else {
			return reduced % 11;
		}
	},
	second(cpf) {
		let index = 0;
		cpf.push(this.first(cpf));
		cpf.splice(-3, 2);

		const cpfMap = cpf.map(element => {
			if (index <= 9) {
				element *= index;
				index++;
			}
			return element;
		});

		const reduced = cpfMap.reduce((result, element) => {
			return (result += element);
		}, 0);

		if (reduced % 11 === 10) {
			return 0;
		} else {
			return reduced % 11;
		}
	},
};

function check(cpf, cpfArray) {
	const section = document.querySelector('section');
	let p = document.querySelector('section > p');
	const valid = `${cpf.split("-").splice(0, 1)}-${CPF.first(
		cpfArray
	)}${CPF.second(cpfArray)}`;
	const message = valid === cpf ? "Este cpf é válido" : "Este cpf não é válido";
	const pClass = valid === cpf ? "valid" : "invalid";

	if(!p){
		p = document.createElement('p');
	}
	
	p.className = pClass;
	p.innerHTML = message;
	section.appendChild(p);
	timeOut = setTimeout(() => {
		section.removeChild(p);
	},5000)
}

const input = document.querySelector('#cpfInput');
input.addEventListener('focus',e => {
	input.addEventListener('input', event => {
		clearTimeout(timeOut);
		document.addEventListener('keydown',(e)=>{
		if (e.key === 'Backspace') {
			return;
		}else if (event.target.value.length === 11) {
			event.target.value += '-'
		}else if (event.target.value.length === 7) {
			event.target.value += '.'
		}else if (event.target.value.length === 3) {
			event.target.value += '.'
		}
		})
	});
});