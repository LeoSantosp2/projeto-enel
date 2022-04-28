const kwh = document.getElementById('kwh')
const res = document.querySelector('.resultado')
const opcao = document.getElementsByName('cliente')

class Clientes{
    constructor(kwh, titulo){
        this.te = 0.25588
        this.tuds = 0.25971
        this.consumoMinimo = 50
        this.pis = 0.0095
        this.cofins = 0.0439
        this.cosip = 9.70
        this.icms = 0
        this.kwh = kwh
        this.titulo = titulo
    }

    valorBase(){
        return this.kwh.value * (this.te + this.tuds)
    }

    valorPis(){
        return this.valorBase() * this.pis
    }

    valorCofins(){
        return this.valorBase() * this.cofins
    }

    valorIcms(){
        return this.valorBase() * this.icms
    }

    totalImpostos(){
        return this.valorPis() + this.valorCofins() + this.cosip + this.valorIcms()
    }

    valorTotal(){
        return this.valorBase() + this.totalImpostos()
    }

    resultado(){
        res.innerHTML = `<h1>${this.titulo}</h1>
        <ul>

            <li>kwh: ${this.kwh.value}</li>
            <li>Tarifa de Energia: R$${this.te.toFixed(5)}</li>
            <li>Tarifa de Distribuição R$${this.tuds.toFixed(5)}</li>
            <li>Valor Base: R$${this.valorBase().toFixed(2)}</li>
            <li>Valor do Pis: R$${this.valorPis().toFixed(2)}</li>
            <li>Valor do Cofins: R$${this.valorCofins().toFixed(2)}</li>
            <li>Valor do Cosip: R$${this.cosip.toFixed(2)}</li>
            <li>Valor do Icms: R$${this.valorIcms().toFixed(2)}</li>
            <li>Valor Total dos Impostos: R$${this.totalImpostos().toFixed(2)}</li>
            <li>Valor Total: R$${this.valorTotal().toFixed(2)}</li>

        </ul>`
    }
}

class Residencial extends Clientes{
    constructor(kwh, titulo){
        super(kwh, titulo)

        if(this.kwh.value < 50){
            this.kwh.value = this.consumoMinimo
        }

        // Cálculo do ICMS
        if(this.kwh.value < 91){
            this.icms = this.icms
        }
        else if(this.kwh.value < 200){
            this.icms = 0.12
        }
        else{
            this.icms = 0.25
        }
        
    }
}

class BaixaRenda extends Clientes{
    constructor(kwh, titulo){
        super(kwh, titulo)

        this.cosip = 0

        // Descontos nas Tarifas
        if(this.kwh.value <= 30){
            this.te = this.te - (this.te * 0.65)
            this.tuds = this.tuds - (this.tuds * 0.72)
        }
        else if(this.kwh.value <= 100){
            this.te = this.te - (this.te * 0.40)
            this.tuds = this.tuds - (this.tuds * 0.50)
        }
        else if(this.kwh.value <= 220){
            this.te = this.te - (this.te * 0.10)
            this.tuds = this.tuds - (this.tuds * 0.30)
        }
        else{
            this.tuds = this.tuds - (this.tuds * 0.25)
        }
    }
}

class ResidencialRural extends Clientes{
    constructor(kwh, titulo){
        super(kwh, titulo)

        if(this.kwh.value < 50){
            this.kwh.value = this.consumoMinimo
        }

        // Cálculo do ICMS
        if(this.kwh.value < 91){
            this.icms = this.icms
        }
        else if(this.kwh.value < 200){
            this.icms = 0.12
        }
        else{
            this.icms = 0.25
        }

        // Atribuir Valor ao Cosip
        this.cosip = 29.96

        // Descontos nas Tarifas
        this.te = this.te - (this.te * 0.20)
        this.tuds = this.tuds - (this.tuds * 0.30)
    }
}

class ServicoPublico extends Clientes{
    constructor(kwh, titulo){
        super(kwh, titulo)

        if(this.kwh.value < 50){
            this.kwh.value = this.consumoMinimo
        }

        // Atribuir valor ao ICMS
        this.icms = 0.18

        // Reatribuir valor ao Cofins
        this.cofins = 0

        // Reatribuir valor ao Cosip
        this.cosip = 0

        // Desconto nas Tarifas
        this.te = this.te - (this.te * 0.40)
        this.tuds = this.tuds - (this.tuds * 0.40)
    }
}

class Outros extends Clientes{
    constructor(kwh, titulo){
        super(kwh, titulo)

        if(this.kwh.value < 50){
            this.kwh.value = this.consumoMinimo
        }

        // Atribuir Valor ao ICMS
        this.icms = 0.18

        // Atribuir Valor ao Cosip
        this.cosip = 29.96
    }
}

function calcular(){
    document.addEventListener('click', e =>{
        const event = e.target

        if(event.classList.contains('btn-calc')){
            if(this.kwh.value === ''){
                alert('Por favor, insira a quantidade de kwh gasta!')
            }
            else{
                if(opcao[0].checked){
                    const residencial = new Residencial(kwh, 'Residencial')
                    residencial.resultado()
                    this.kwh.value = ''
                }
                else if(opcao[1].checked){
                    const baixaRenda = new BaixaRenda(kwh, 'Residencial Baixa Renda')
                    baixaRenda.resultado()
                    this.kwh.value = ''
                }
                else if(opcao[2].checked){
                    const residencialRural = new ResidencialRural(kwh, 'Residencial Rural')
                    residencialRural.resultado()
                    this.kwh.value = ''
                }
                else if(opcao[3].checked){
                    const servicoPublico = new ServicoPublico(kwh, 'Serviço Público')
                    servicoPublico.resultado()
                    this.kwh.value = ''
                }
                else if(opcao[4].checked){
                    const outros = new Outros(kwh, 'Outros')
                    outros.resultado()
                    this.kwh.value = ''
                }
                else{
                    alert('Por favor, selecione uma opção!')
                }
            }
        }
    })
}

calcular()