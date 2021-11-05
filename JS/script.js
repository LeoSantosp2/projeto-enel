var te = 0.25588
var tusd = 0.25971
var consumo_minimo = 50
var pis = 0.0095
var cofins = 0.0439
var cosip = 9.70

// ICMS Residencial
var icms_91_200_r = 0.12
var icms_200_r = 0.25

//ICMS do Serviço Público / Outros
var icms_sp_o = 0.18

// Descontos do Residencial Baixa Renda
var desc_30_te = te - (te * 0.72) //0.72 = 72%
var desc_30_tuds = tusd - (tusd * 0.65)

var desc_31_100_te = te - (te * 0.50)
var desc_31_100_tusd = tusd - (tusd * 0.40)

var desc_101_220_te = te - (te * 0.30)
var desc_101_220_tusd = tusd - (tusd * 0.10)

var desc_220_te = te - (te * 0.25)

// Descontos do Residencial Rural
var desc_rr_te = te - (te * 0.30)
var desc_rr_tuds = tusd - (tusd * 0.20)

// Descontos do Serviço Público
var desc_sp_te = te - (te * 0.40)
var desc_sp_tusd = tusd - (tusd * 0.40)

function calcular(){
    var k = window.document.getElementById('kwh')
    var opc = window.document.getElementsByName('cliente')
    var res = window.document.getElementById('resultado')
    var converter_kwh = Number(k.value)

    if(opc[0].checked){ // Residencial

        if(converter_kwh < 50){
            converter_kwh = consumo_minimo
        }

        var valor_base_r = te + tusd + converter_kwh

        if(converter_kwh < 91){
            var icms_r = valor_base_r * 0
        }
        else if(converter_kwh < 200){
            var icms_r = valor_base_r * icms_91_200_r
        }
        else{
            var icms_r = valor_base_r * icms_200_r
        }

        var valor_pis = valor_base_r * pis
        var valor_cofins = valor_base_r * cofins
        var total_imposto = valor_pis + valor_cofins + cosip + icms_r
        var valor_total = valor_base_r + total_imposto 

        res.innerHTML = `<h2>Residencial</h2>
    <ul>
        <li>kwh: ${converter_kwh}</li>
        <li>Tarifa de Energia: R$${te}</li>
        <li>Tarifa de Distribuição: R$${tusd}</li>
        <li>Valor Base: R$${valor_base_r.toFixed(2)}</li>
        <li>Valor do Pis: R$${valor_pis.toFixed(2)}</li>
        <li>Valor do Cofins: R$${valor_cofins.toFixed(2)}</li>
        <li>Valor do Cosip: R$${cosip.toFixed(2)}</li>
        <li>Valor do Icms: R$${icms_r.toFixed(2)}</li>
        <li>Valor Total dos Impostos: R$${total_imposto.toFixed(2)}</li>
        <li>Valor Total: R$${valor_total.toFixed(2)}</li>
    </ul>` 
    }
    else if(opc[1].checked){ // Residencial Baixa Renda
        if(converter_kwh <= 30){
            var valor_base_br = desc_30_te + desc_30_tuds + converter_kwh

            var valor_pis = valor_base_br * pis
            var valor_cofins = valor_base_br * cofins
            var total_imposto = valor_pis + valor_cofins
            var valor_total = valor_base_br + total_imposto

            res.innerHTML = `<h2>Residencial Baixa Renda</h2>
        <ul>
            <li>kwh: ${converter_kwh}</li>
            <li>Tarifa de Energia: R$${desc_30_te.toFixed(5)}</li>
            <li>Tarifa de Distribuição: R$${desc_30_tuds.toFixed(5)}</li>
            <li>Valor Base: R$${valor_base_br.toFixed(2)}</li>
            <li>Valor do Pis: R$${valor_pis.toFixed(2)}</li>
            <li>Valor do Cofins: R$${valor_cofins.toFixed(2)}</li>
            <li>Valor Total dos Impostos: R$${total_imposto.toFixed(2)}</li>
            <li>Valor Total R$${valor_total.toFixed(2)}</li>
        </ul>`
        }
        else if(converter_kwh <= 100){
            var valor_base = desc_31_100_te + desc_31_100_tusd + converter_kwh

            res.innerHTML = `<h2>Residencial Baixa Renda</h2>
        <ul>
            <li>Tarifa de Energia: R$${desc_31_100_te.toFixed(5)}</li>
            <li>Tarifa de Distribuição: R$${desc_31_100_tusd.toFixed(5)}</li>
            <li>Valor Base: R$${valor_base.toFixed(2)}</li>
        </ul>`
        }
    }
}