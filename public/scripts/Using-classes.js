let timeOut;

class ValidaCPF {
    constructor(cpfLimpo) {
        this.cpf = cpfLimpo;
    }
    valida(cpfString) {
        if (!cpfString) return false;
        if (typeof this.cpf !== 'object') return false;
        if (this.cpf.length > 11) return false;
        if (this.isSequencia(cpfString)) return false;

        const nineFirst = this.cpf.slice(0, -2);
        const withFirstCheckDigit = ValidaCPF.criaDigito(nineFirst, 1);
        const withSecondCheckDigit = ValidaCPF.criaDigito(withFirstCheckDigit, 0);
        return withSecondCheckDigit.join('') === this.cpf.join('');
    }
    isSequencia(cpfString) {
        const sequence = cpfString[0].repeat(cpfString.length);
        return sequence === this.cpf.join('');
    }
    static criaDigito(cpf, sumToWeight) {
        const reduce = cpf.reduce((accumulator, currentValue, index) => {
            currentValue *= index + sumToWeight;
            return accumulator + currentValue;
        }, 0);
        const digit = reduce % 11 === 10 ? 0 : reduce % 11;
        cpf.push(digit);
        return cpf;
    }
}

window.addEventListener("submit", e => {
    e.preventDefault();
    const cpfString = document.getElementById("cpfInput").value;
    let cpfArray = cpfString.replace(/\-|\./g, "").split("");
    cpfArray = cpfArray.map(element => {
        return Number(element);
    });
    const cpfInObject = new ValidaCPF(cpfArray);
    const cpfCheked = cpfInObject.valida(cpfString);
    check(cpfCheked);
});

function check(cpfCheked) {
    const section = document.querySelector('section');
    let p = document.querySelector('section > p');
    const message = cpfCheked ? "Este cpf é válido" : "Este cpf não é válido";
    const pClass = cpfCheked ? "valid" : "invalid";

    if (!p) p = document.createElement('p');

    p.className = pClass;
    p.innerHTML = message;
    section.appendChild(p);
    timeOut = setTimeout(() => {
        section.removeChild(p);
    }, 5000)
}

window.addEventListener('load', () => {
    const linkedIn = document.querySelector('.linkedIn');
    const github = document.querySelector('.github');
    setTimeout(() => {
        github.classList.remove('load')
        linkedIn.classList.remove('load')
    }, 500)
});

const input = document.querySelector('#cpfInput');
input.addEventListener('focus', () => {
    clearTimeout(timeOut);
    input.addEventListener('input', event => {
        document.addEventListener('keydown', e => {
            if (e.key === 'Backspace') return;
            if (event.target.value.length === 11) { event.target.value += '-'; return; }
            if (event.target.value.length === 7) { event.target.value += '.'; return; }
            if (event.target.value.length === 3) { event.target.value += '.'; return; }
        })
    });
});