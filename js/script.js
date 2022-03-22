function Calcular(){
    this.kwh = document.getElementById('kwh')
    this.opc = document.getElementsByName('cliente')
    this.res = document.querySelector('.resultado')
    this.icms = 0

    this.te = 0.25588
    this.tuds = 0.25971
    this.consumo_minimo = 50
    this.pis = 0.0095
    this.cofins = 0.0439
    this.cosip = 9.70
    this.cosip_rr_o = 29.96

    // ICMS do Residencial / Residencial Rural
    this.icms_91_200_r = 0.12
    this.icms_200_r = 0.25

    //ICMS do Serviço Público / Outros
    this.icms_sp_o = 0.18

    // Descontos do Residencial Rural
    this.desc_rr_te = () =>{
        return this.te - (this.te * 0.20)
    }
    this.desc_rr_tuds = () =>{
        return this.tuds - (this.tuds * 0.30)
    }

    // Descontos do Serviço Público
    this.desc_sp_te = () =>{
        return this.te - (this.te * 0.40)
    }
    this.desc_sp_tuds = () =>{
        return this.tuds - (this.tuds * 0.40)
    }

    this.iniciar = () =>{
        this.calculo()
    }

    // Conta Residencial
    this.residencial = () =>{
        if(this.kwh.value < 50){
            this.kwh.value = this.consumo_minimo
        }
        else{
            this.kwh.value = this.kwh.value
        }

        const kwh = Number(this.kwh.value)
        const valorBase = kwh + (this.te + this.tuds)

        // Cálculo do ICMS
        if(kwh < 91){
            this.icms = valorBase * 0
        }
        else if(kwh < 200){
            this.icms = valorBase * this.icms_91_200_r
        }
        else{
            this.icms = valorBase * this.icms_200_r
        }

        const valorPis = valorBase * this.pis
        const valorCofins = valorBase * this.cofins
        const totalImpostos = valorPis + valorCofins + this.cosip + this.icms
        const valorTotal = valorBase + totalImpostos

        this.res.innerHTML = `<h1>Residencial</h1>
        <ul>

            <li>Kwh: ${this.kwh.value}</li>
            <li>Tarifa de Energia: R$${this.te}</li>
            <li>Tarifa de Distribuição: R$${this.tuds}</li>
            <li>Valor Base: R$${valorBase.toFixed(2)}</li>
            <li>Valor do Pis: R$${valorPis.toFixed(2)}</li>
            <li>Valor do Cofins: R$${valorCofins.toFixed(2)}</li>
            <li>Valor do Cosip: R$${this.cosip.toFixed(2)}</li>
            <li>Valor do Icms: R$${this.icms.toFixed(2)}</li>
            <li>Valor Total dos Impostos: R$${totalImpostos.toFixed(2)}</li>
            <li>Valor Total: R$${valorTotal.toFixed(2)}</li>

        </ul>`
    }

    // Conta Residencial Baixa Renda
    this.baixaRenda = () =>{
        const kwh = Number(this.kwh.value)

        let valorBase
        let descTe
        let descTuds

        if(kwh <= 30){
            descTe = this.te - (this.te * 0.65)
            descTuds = this.tuds - (this.tuds * 0.72)

            valorBase = kwh + (descTe + descTuds)
        }
        else if(kwh <= 100){
            descTe = this.te - (this.te * 0.40)
            descTuds = this.tuds - (this.tuds * 0.50)

            valorBase = kwh + (descTe + descTuds)
        }
        else if(kwh <= 220){
            descTe = this.te - (this.te * 0.10)
            descTuds = this.tuds - (this.tuds * 0.30)

            valorBase = kwh + (descTe + descTuds)
        }
        else{
            descTe = this.te
            descTuds = this.tuds - (this.tuds * 0.25)

            valorBase = kwh + (descTe + descTuds)
        }

        const valorPis = valorBase * this.pis
        const valorCofins = valorBase * this.cofins
        const totalImpostos = valorPis + valorCofins
        const valorTotal = valorBase + totalImpostos

        this.res.innerHTML = `<h1>Residencial Baixa Renda</h1>
        <ul>

            <li>Kwh: ${kwh}</li>
            <li>Tarifa de Energia: R$${descTe.toFixed(5)}</li>
            <li>Tarifa de Distribuição: R$${descTuds.toFixed(5)}</li>
            <li>Valor Base: R$${valorBase.toFixed(2)}</li>
            <li>Valor do Pis: R$${valorPis.toFixed(2)}</li>
            <li>Valor do Cofins: R$${valorCofins.toFixed(2)}</li>
            <li>Valor Total do Impostos: R$${totalImpostos.toFixed(2)}</li>
            <li>Valor Total: R$${valorTotal.toFixed(2)}</li>

        </ul>`
    }

    // Conta Residencial Rural
    this.residencialRural = () =>{
        if(this.kwh.value < 50){
            this.kwh.value = this.consumo_minimo
        }
        else{
            this.kwh.value = this.kwh.value
        }

        const kwh = Number(this.kwh.value)
        const valorBase = kwh + (this.desc_rr_te() + this.desc_rr_tuds())

        // Cálculo do ICMS
        if(kwh < 91){
            this.icms = valorBase * 0
        }
        else if(kwh < 200){
            this.icms = valorBase * this.icms_91_200_r
        }
        else{
            this.icms = valorBase * this.icms_200_r
        }

        const valorPis = valorBase * this.pis
        const valorCofins = valorBase * this.cofins
        const totalImpostos = valorPis + valorCofins + this.cosip_rr_o + this.icms
        const valorTotal = valorBase + totalImpostos

        this.res.innerHTML = `<h1>Residencial Rural</h1>
        <ul>

            <li>Kwh: ${kwh}</li>
            <li>Tarifa de Energia: R$${this.desc_rr_te().toFixed(5)}</li>
            <li>Tarifa de Distribuição: R$${this.desc_rr_tuds().toFixed(5)}</li>
            <li>Valor Base: R$${valorBase.toFixed(2)}</li>
            <li>Valor do Pis: R$${valorPis.toFixed(2)}</li>
            <li>Valor do Cofins: R$${valorCofins.toFixed(2)}</li>
            <li>Valor do Cosip: R$${this.cosip_rr_o.toFixed(2)}</li>
            <li>Valor do Icms: R$${this.icms.toFixed(2)}</li>
            <li>Valor Total do Impostos: R$${totalImpostos.toFixed(2)}</li>
            <li>Valor Total: R$${valorTotal.toFixed(2)}</li>

        </ul>`
    }

    // Conta Serviço Público
    this.servicoPublico = () =>{
        if(this.kwh.value < 50){
            this.kwh.value = this.consumo_minimo
        }
        else{
            this.kwh.value = this.kwh.value
        }

        const kwh = Number(this.kwh.value)
        const valorBase = kwh + (this.desc_sp_te() + this.desc_sp_tuds())

        const valorPis = valorBase * this.pis
        const valorIcms = valorBase * this.icms_sp_o
        const totalImpostos = valorPis + valorIcms
        const valorTotal = valorBase + totalImpostos

        this.res.innerHTML = `<h1>Serviço Público</h1>
        <ul>

            <li>Kwh: ${kwh}</li>
            <li>Tarifa de Energia: R$${this.desc_sp_te().toFixed(5)}</li>
            <li>Tarifa de Distribuição: R$${this.desc_sp_tuds().toFixed(5)}</li>
            <li>Valor Base: R$${valorBase.toFixed(2)}</li>
            <li>Valor do Pis: R$${valorPis.toFixed(2)}</li>
            <li>Valor do Icms: R$${valorIcms.toFixed(2)}</li>
            <li>Valor Total do Impostos: R$${totalImpostos.toFixed(2)}</li>
            <li>Valor Total: R$${valorTotal.toFixed(2)}</li>

        </ul>`
    }

    // Conta Outros
    this.outros = () =>{
        if(this.kwh.value < 50){
            this.kwh.value = this.consumo_minimo
        }
        else{
            this.kwh.value = this.kwh.value
        }

        const kwh = Number(this.kwh.value)
        const valorBase = kwh + (this.te + this.tuds)

        const valorPis = valorBase * 0.0165
        const valorCofins = valorBase * 0.0760
        const valorIcms = valorBase * this.icms_sp_o
        const totalImpostos = valorPis + valorCofins + this.cosip_rr_o + valorIcms
        const valorTotal = valorBase + totalImpostos

        this.res.innerHTML = `<h1>Outros</h1>
        <ul>

            <li>Kwh: ${kwh}</li>
            <li>Tarifa de Energia: R$${this.te}</li>
            <li>Tarifa de Distribuição: R$${this.tuds}</li>
            <li>Valor Base: R$${valorBase.toFixed(2)}</li>
            <li>Valor do Pis: R$${valorPis.toFixed(2)}</li>
            <li>Valor do Cofins: R$${valorCofins.toFixed(2)}</li>
            <li>Valor do Cosip: R$${this.cosip_rr_o}</li>
            <li>Valor do Icms: R$${valorIcms.toFixed(2)}</li>
            <li>Valor Total do Impostos: R$${totalImpostos.toFixed(2)}</li>
            <li>Valor Total: R$${valorTotal.toFixed(2)}</li>

        </ul>`
    }

    this.calculo = () =>{
        document.addEventListener('click', e =>{
            const event = e.target

            if(event.classList.contains('btn-calc')){
                if(this.kwh.value === ''){
                    alert('[ERRO] Por favor, insira a quantidade gasta de KWH e tente novamente!!!')
                }
                else{
                    if(this.opc[0].checked){
                        this.residencial()
                    }
                    else if(this.opc[1].checked){
                        this.baixaRenda()
                    }
                    else if(this.opc[2].checked){
                        this.residencialRural()
                    }
                    else if(this.opc[3].checked){
                        this.servicoPublico()
                    }
                    else if(this.opc[4].checked){
                        this.outros()
                    }
                    else{
                        alert('Opção inválida')
                    }
                }
            }
        })
    }
}

const c = new Calcular()
c.iniciar()