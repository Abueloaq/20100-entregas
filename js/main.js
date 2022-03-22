
// Un poco de buena suerte nunca viene mal
console.log(`Hola mundo`)

const monedasAceptadas = [`USDT`, `BTC`, `LUNA`]

const monedas = [
    {id: `BTC`, name: `Bitcoin`, value: 38000},
    {id: `LUNA`, name: `Luna`, value: 87},
    {id: `USDT`, name: `Tether`, value: 1}
];

const wallet1 = new WALLET (`Jorge Willebald`, 13, 5, 500)
//wallet1.comprarMoneda();
//wallet1.transferirMoneda();

//let saldoTotal = 0
mostrarSaldos ();

function mostrarSaldos () {
    document.getElementById(`saldoBitcoinMostrado`).innerHTML = `<span>${wallet1.saldoBitcoin}</span>`;
    document.getElementById(`saldoLunaMostrado`).innerHTML = `<span>${wallet1.saldoLuna}</span>`;
    document.getElementById(`saldoUsdtMostrado`).innerHTML = `<span>${wallet1.saldoUsdt}</span>`;
    //document.getElementById(`saldoTotalUsd`).innerHTML = `<span>${saldoTotal}</span>`;
}

function WALLET(usuario, saldoBitcoin = 0, saldoLuna = 0, saldoUsdt = 0) {
    this.usuario = usuario;
    this.saldoBitcoin = saldoBitcoin;
    this.saldoLuna = saldoLuna;
    this.saldoUsdt = saldoUsdt;
    this.comprarMoneda = function () {
        let currency = document.getElementById(`monedaAComprar`).value.toUpperCase();
        let compraMoneda = 0
        
        if (monedasAceptadas.includes(currency)) {
            compraMoneda = Number(document.getElementById(`cantidadAComprar`).value);
        } else {
            document.getElementById(`monedaInvalida`).innerHTML = `Monéda inválida, por favor ingrese una de las siguientes: BTC, Luna, USDT`;
        }
        
        switch (currency) {
            case `BTC`:
                this.saldoBitcoin += compraMoneda;
                document.getElementById('wallet').scrollIntoView();
                alert(`Saldo actualizado`)
            break;
            case `LUNA`:
                this.saldoLuna += compraMoneda;
                document.getElementById('wallet').scrollIntoView();
                alert(`Saldo actualizado`)
            break;
            case `USDT`:
                this.saldoUsdt += compraMoneda;
                document.getElementById('wallet').scrollIntoView();
                alert(`Saldo actualizado`)
            break;
        }
        mostrarSaldos ();
        document.getElementById(`monedaAComprar`).innerHTML = ``;
        //console.log(`El saldo de ${wallet1.usuario} es: /${wallet1.saldoBitcoin} Bitcoin /${wallet1.saldoLuna} LUNA /${wallet1.saldoUsdt} USDT`);
    }
    this.transferirMoneda = function () {
        let currency = document.getElementById(`monedaATransferir`).value.toUpperCase();
        let transfiereMoneda = 0
        
        if (monedasAceptadas.includes(currency)) {
            transfiereMoneda = Number(document.getElementById(`cantidadATransferir`).value);
        } else {
            currency = alert(`Moneda ingresada inválida, por favor ingrese una de las siguientes: USDT, BTC, LUNA`)
        }
        
        switch (currency) {
            case `BTC`:
                if (this.saldoBitcoin < transfiereMoneda) {
                    alert(`Saldo insuficiente`)
                } else {
                this.saldoBitcoin -= transfiereMoneda;
                document.getElementById('wallet').scrollIntoView();
                alert(`Saldo actualizado`)
                }
            break;
            case `LUNA`:
                if (this.saldoLuna < transfiereMoneda) {
                    alert(`Saldo insuficiente`)
                } else {
                this.saldoLuna -= transfiereMoneda;
                document.getElementById('wallet').scrollIntoView();
                alert(`Saldo actualizado`)
                }
            break;
            case `USDT`:
                if (this.saldoUsdt < transfiereMoneda) {
                    alert(`Saldo insuficiente`)
                } else {
                this.saldoUsdt -= transfiereMoneda;
                document.getElementById('wallet').scrollIntoView();
                alert(`Saldo actualizado`)
                }
            break;
        }
        mostrarSaldos ();
        //console.log(`El saldo de ${wallet1.usuario} es: /${wallet1.saldoBitcoin} Bitcoin /${wallet1.saldoLuna} LUNA /${wallet1.saldoUsdt} USDT`);
    }
}


////////////////////////////////////////////////////////////////////////





