// 123.456.789-09
let timeOut;

function ValidaCPF(cpfEnviado) {
    this.cpfLimpo = cpfEnviado;
}

ValidaCPF.prototype.valida = function(cpfString) {
    if (typeof this.cpfLimpo !== 'object') return false;
    if (this.cpfLimpo.length > 11) return false;
    if (this.isSequencia(cpfString)) return false;

    const cpfParcial = this.cpfLimpo.slice(0, 9);
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial, digito1);

    const novoCpf = [...cpfParcial, digito1, digito2];
    return novoCpf.join('') === this.cpfLimpo.join('');
};

ValidaCPF.prototype.criaDigito = function(cpfParcial, digito1) {
    let regressivo = this.cpfLimpo.length - 10;
    if (typeof digito1 === 'number') {
        regressivo--;
    }
    const total = cpfParcial.reduce((ac, val) => {
        ac += regressivo * val;
        regressivo++;
        return ac;
    }, 0);
    let digito = total % 11;
    digito = digito > 9 ? 0 : digito;
    return digito;
};

ValidaCPF.prototype.isSequencia = function(cpfString) {
    const sequencia = cpfString[0].repeat(this.cpfLimpo.length);
    const comparacao = Number(this.cpfLimpo.join(''));
    return sequencia === comparacao;
};


document.body.addEventListener("submit", e => {
    e.preventDefault();
    const cpfString = document.getElementById("cpfInput").value;
    let cpfArray = cpfString.replace(/\-|\./g, "").split("");
    cpfArray = cpfArray.map(element => {
        return Number(element);
    });
    const cpfDone = new ValidaCPF(cpfArray);
    const cpfCheked = cpfDone.valida(cpfString);
    check(cpfCheked)
});

function check(cpfCheked) {
    const section = document.querySelector('section');
    let p = document.querySelector('section > p');
    const message = cpfCheked ? "Este cpf é válido" : "Este cpf não é válido";
    const pClass = cpfCheked ? "valid" : "invalid";

    if (!p) {
        p = document.createElement('p');
    }

    p.className = pClass;
    p.innerHTML = message;
    section.appendChild(p);
    timeOut = setTimeout(() => {
        section.removeChild(p);
    }, 5000)
}

const input = document.querySelector('#cpfInput');
input.addEventListener('focus', e => {
    input.addEventListener('input', event => {
        clearTimeout(timeOut);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace') {
                return;
            } else if (event.target.value.length === 11) {
                event.target.value += '-'
            } else if (event.target.value.length === 7) {
                event.target.value += '.'
            } else if (event.target.value.length === 3) {
                event.target.value += '.'
            }
        })
    });
});