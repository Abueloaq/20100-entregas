
// Un poco de buena suerte nunca viene mal
console.log(`Hola mundo`)

const monedasAceptadas = [`USDT`, `BTC`, `LUNA`]

const wallet1 = new WALLET (`Jorge Willebald`, 13, 5, 500)
//wallet1.comprarMoneda();
//wallet1.transferirMoneda();


function WALLET(usuario, saldoBitcoin = 0, saldoLuna = 0, saldoUsdt = 0) {
    this.usuario = usuario;
    this.saldoBitcoin = saldoBitcoin;
    this.saldoLuna = saldoLuna;
    this.saldoUsdt = saldoUsdt;
    this.comprarMoneda = function () {
        let currency = prompt(`Ingrese moneda a comprar`).toUpperCase();
        let compraMoneda = 0
        
        if (monedasAceptadas.includes(currency)) {
            compraMoneda = Number(prompt(`Ingrese cantidad a comprar en ${currency}`));
        } else {
            currency = prompt(`Moneda ingresada inválida, por favor ingrese una de las siguientes: USDT, BTC, LUNA`)
        }
        
        switch (currency) {
            case `BTC`:
                this.saldoBitcoin += compraMoneda;
            break;
            case `LUNA`:
                this.saldoLuna += compraMoneda;
            break;
            case `USDT`:
                this.saldoUsdt += compraMoneda;
            break;
        }
        console.log(`El saldo de ${wallet1.usuario} es: /${wallet1.saldoBitcoin} Bitcoin /${wallet1.saldoLuna} LUNA /${wallet1.saldoUsdt} USDT`);
    }
    this.transferirMoneda = function () {
        let currency = prompt(`Ingrese moneda a transferir`).toUpperCase();
        let transfiereMoneda = 0
        
        if (monedasAceptadas.includes(currency)) {
            transfiereMoneda = Number(prompt(`Ingrese cantidad a transferir en ${currency}`));
        } else {
            currency = prompt(`Moneda ingresada inválida, por favor ingrese una de las siguientes: USDT, BTC, LUNA`)
        }
        
        switch (currency) {
            case `BTC`:
                if (this.saldoBitcoin < transfiereMoneda) {
                    alert(`Saldo insuficiente`)
                } else {
                this.saldoBitcoin -= transfiereMoneda;
                }
            break;
            case `LUNA`:
                if (this.saldoLuna < transfiereMoneda) {
                    alert(`Saldo insuficiente`)
                } else {
                this.saldoLuna -= transfiereMoneda;
                }
            break;
            case `USDT`:
                if (this.saldoUsdt < transfiereMoneda) {
                    alert(`Saldo insuficiente`)
                } else {
                this.saldoUsdt -= transfiereMoneda;
                }
            break;
        }
        console.log(`El saldo de ${wallet1.usuario} es: /${wallet1.saldoBitcoin} Bitcoin /${wallet1.saldoLuna} LUNA /${wallet1.saldoUsdt} USDT`);
    }
}




