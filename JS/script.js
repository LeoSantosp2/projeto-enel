function calcular(){
    var te = 0.25588
    var tusd = 0.25971
    var b = window.document.getElementById('kwh')
    var c = window.document.getElementById('resultado')
    var soma = te + tusd + Number(b.value)

    c.innerHTML = `<h2>Tarifas</h2>
    <ul>
        <li>Energia: R$${te}</li>
        <li>Uso de Sistema de Distribuição: R$${tusd}</li>
        <li>Valor Base: R$${soma.toFixed(2)}</li>
    </ul>`
}