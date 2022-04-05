
// Un poco de buena suerte nunca viene mal
console.log(`Hola mundo 2`)



const monedasAceptadas = [`BTC`, `LUNA`, `USDT`]

const cotizacionMonedas = [46800, 94, 1];

const wallet1 = new WALLET (`Jorge Willebald`, 3, 5, 500)

let elemento = document.getElementById("capa-variable");

const validar = validarStoragePersonalizado();

function validarStoragePersonalizado(){
        if((localStorage.getItem("personalizado") == null) || (localStorage.getItem("personalizado") == `azul`)){
            elemento.className = "main-layout";
            localStorage.setItem("personalizado", `azul`)
        }else if (localStorage.getItem("personalizado") == `verde`){
            console.log("verde");
            elemento.className = "main-layout-green";
        }else {
            elemento.className = "main-layout-red";
        }
    };

const personalizarBilletera = function () {
    if (elemento.className == "main-layout") {
    elemento.className = "main-layout-green";
    localStorage.setItem("personalizado", `verde`)
    }else if (elemento.className == "main-layout-green"){
    elemento.className = "main-layout-red";
    localStorage.setItem("personalizado", `rojo`)
        elemento.className = "main-layout";
        localStorage.setItem("personalizado", `azul`);    
    }
}

let acumuladorSaldoTotal = 0;

mostrarSaldos ();

function mostrarSaldos () {
    document.getElementById(`saldoBitcoinMostrado`).innerHTML = `<span>${wallet1.saldoBitcoin}</span>`;
    document.getElementById(`saldoLunaMostrado`).innerHTML = `<span>${wallet1.saldoLuna}</span>`;
    document.getElementById(`saldoUsdtMostrado`).innerHTML = `<span>${wallet1.saldoUsdt}</span>`;
    acumuladorSaldoTotal = (((cotizacionMonedas[0]) * (wallet1.saldoBitcoin)) + ((cotizacionMonedas[1]) * (wallet1.saldoLuna)) + ((cotizacionMonedas[2]) * (wallet1.saldoUsdt)));
    document.getElementById(`saldoTotalUsd`).innerHTML = `<span>${acumuladorSaldoTotal}</span>`;
}

function WALLET(usuario, saldoBitcoin = 0, saldoLuna = 0, saldoUsdt = 0) {
    this.usuario = usuario;
    this.saldoBitcoin = saldoBitcoin;
    this.saldoLuna = saldoLuna;
    this.saldoUsdt = saldoUsdt;
    this.comprarMoneda = function () {
        let currency = document.getElementById(`monedaAComprar`).value.toUpperCase();
        let compraMoneda = 0
        
        monedasAceptadas.includes(currency) ?  (compraMoneda = Number(document.getElementById(`cantidadAComprar`).value)) : (swal({ title: "Moneda Inválida",text: "Por favor ingrese una de las siguientes: USDT, BTC, LUNA", icon: "error", button: "Aceptar",}))
        
        switch (currency) {
            case `BTC`:
                this.saldoBitcoin += compraMoneda;
                Toastify({
                    text: "Saldo Actualizado",
                    offset: {
                        x: 50,
                        y: 50
                        },
                    duration: 3000
                    }).showToast();
                document.getElementById('wallet').scrollIntoView();
                document.getElementById('monedaAComprar').value = ``;
                document.getElementById('cantidadAComprar').value = ``;
            break;
            case `LUNA`:
                this.saldoLuna += compraMoneda;
                Toastify({
                    text: "Saldo Actualizado",
                    offset: {
                        x: 50,
                        y: 50
                        },
                    duration: 3000
                    }).showToast();
                document.getElementById('wallet').scrollIntoView();
                document.getElementById('monedaAComprar').value = ``;
                document.getElementById('cantidadAComprar').value = ``;
            break;
            case `USDT`:
                this.saldoUsdt += compraMoneda;
                Toastify({
                    text: "Saldo Actualizado",
                    offset: {
                        x: 50,
                        y: 50
                        },
                    duration: 3000
                    }).showToast();
                document.getElementById('wallet').scrollIntoView();
                document.getElementById('monedaAComprar').value = ``;
                document.getElementById('cantidadAComprar').value = ``;
            break;
        }
        mostrarSaldos ();
        document.getElementById(`monedaAComprar`).innerHTML = ``;
    }
    this.transferirMoneda = function () {
        let currency = document.getElementById(`monedaATransferir`).value.toUpperCase();
        let transfiereMoneda = 0
        
        monedasAceptadas.includes(currency) ? (transfiereMoneda = Number(document.getElementById(`cantidadATransferir`).value)) : (swal({ title: "Moneda Inválida",text: "Por favor ingrese una de las siguientes: USDT, BTC, LUNA", icon: "error", button: "Aceptar",}))
        
        switch (currency) {
            case `BTC`:
                if (this.saldoBitcoin < transfiereMoneda) {
                    swal({
                        title: "Saldo Insuficiente",
                        icon: "error",
                        button: "Aceptar",
                    });
                } else {
                this.saldoBitcoin -= transfiereMoneda;
                Toastify({
                    text: "Saldo Actualizado",
                    offset: {
                        x: 50,
                        y: 50
                        },
                    duration: 3000
                    }).showToast();
                document.getElementById('wallet').scrollIntoView();
                document.getElementById('monedaATransferir').value = ``;
                document.getElementById('cantidadATransferir').value = ``;
                }
            break;
            case `LUNA`:
                if (this.saldoLuna < transfiereMoneda) {
                    swal({
                        title: "Saldo Insuficiente",
                        icon: "error",
                        button: "Aceptar",
                    })
                } else {
                this.saldoLuna -= transfiereMoneda;
                Toastify({
                    text: "Saldo Actualizado",
                    offset: {
                        x: 50,
                        y: 50
                        },
                    duration: 3000
                    }).showToast();
                document.getElementById('wallet').scrollIntoView();
                document.getElementById('monedaATransferir').value = ``;
                document.getElementById('cantidadATransferir').value = ``;
                }
            break;
            case `USDT`:
                if (this.saldoUsdt < transfiereMoneda) {
                    swal({
                        title: "Saldo Insuficiente",
                        icon: "error",
                        button: "Aceptar",
                    })
                } else {
                this.saldoUsdt -= transfiereMoneda;
                Toastify({
                    text: "Saldo Actualizado",
                    offset: {
                        x: 50,
                        y: 50
                        },
                    duration: 3000
                    }).showToast();
                document.getElementById('wallet').scrollIntoView();
                document.getElementById('monedaATransferir').value = ``;
                document.getElementById('cantidadATransferir').value = ``;
                }
            break;
        }
        mostrarSaldos ();
    }
}


////////////////////////////////////////////////////////////////////////





