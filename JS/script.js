var te = 0.25588
var tusd = 0.25971

var consumo_30_te = (72 / 100) * te
var consumo_30_tuds = 0.65

function calcular(){
    var b = window.document.getElementById('kwh')
    var c = window.document.getElementById('resultado')
    var soma = te + tusd + Number(b.value)

    c.innerHTML = `<h2>Tarifas</h2>
    <ul>
        <li>Energia: R$${te}</li>
        <li>Uso de Sistema de Distribuição: R$${tusd}</li>
        <li>Valor Base: R$${soma.toFixed(2)}</li>
        <li>Teste: R$${consumo_30_te.toFixed(5)}</li>
    </ul>`
}