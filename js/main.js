
// Un poco de buena suerte nunca viene mal
console.log(`Hola mundo`)

const KEYAPI = `5b49ef6e1625780dd5cf98781e9e012ba5297556`

let cotizacionMonedas = [];

const monedasAceptadas = [`BTC`, `LUNA`, `USDT`]

const wallet1 = new WALLET (``, 1, 5, 100)

let divWallet = document.getElementById("wallet");

let divComprar = document.getElementById("comprarMoneda");

let divTransferir = document.getElementById("transferirMoneda");

let divPagar = document.getElementById("pagarMoneda");

let divUsuario = document.getElementById("registroUsuario");

let compraMoneda = 0

let nombreUsuario = ``;

const validarUsuario = function () {
    if((localStorage.getItem("usuario") == null) || (localStorage.getItem("password") == null)){
        ingresarNuevoUsuario();
    } else if ((localStorage.getItem("usuario") === document.getElementById(`nombreUsuario`).value) && (localStorage.getItem("password") === document.getElementById(`passPersonal`).value)){
        document.getElementById(`sesionMarcada`).innerHTML = `  Cerrar Sesión`;
        document.getElementById(`usuarioMostrado`).innerHTML = localStorage.getItem("usuario");
        divWallet.className = "row";
        divUsuario.className = "col-md-12 testimonial noDisplay";
    } else {
        (swal({ title: "Usuario o Contraseña Incorrectos",text: "Por favor ingrese nuevamente sus datos", icon: "error", button: "Aceptar",}));
    }
}

const ingresarNuevoUsuario = function () {
    localStorage.setItem("usuario", document.getElementById(`nombreUsuario`).value);
    localStorage.setItem("password", document.getElementById(`passPersonal`).value);
    wallet1.usuario = localStorage.getItem("usuario");
    document.getElementById(`usuarioMostrado`).innerHTML = `${wallet1.usuario}`;
    console.log(wallet1);
    divWallet.className = "row";
    divUsuario.className = "col-md-12 testimonial noDisplay";
}


const pedirCotizacion = async () => {
    const resp = await fetch(`https://api.nomics.com/v1/currencies/ticker?key=${KEYAPI}&ids=BTC,LUNA,USDT`, {mode: 'no-cors'});
    const data = await resp.json();
    data.forEach((post) => {
        cotizacionMonedas.push(Number(post.price))
    })
    function mostrarSaldos () {
        document.getElementById(`saldoBitcoinMostrado`).innerHTML = `<span>${wallet1.saldoBitcoin}</span>`;
        document.getElementById(`saldoLunaMostrado`).innerHTML = `<span>${wallet1.saldoLuna}</span>`;
        document.getElementById(`saldoUsdtMostrado`).innerHTML = `<span>${wallet1.saldoUsdt}</span>`;
        acumuladorSaldoTotal = (((cotizacionMonedas[0]) * (wallet1.saldoBitcoin)) + ((cotizacionMonedas[2]) * (wallet1.saldoLuna)) + ((cotizacionMonedas[1]) * (wallet1.saldoUsdt)));
        document.getElementById(`saldoTotalUsd`).innerHTML = `<span>${acumuladorSaldoTotal.toFixed(4)}</span>`;
    }
    mostrarSaldos ();
}

pedirCotizacion ();

function mostrarSaldos () {
    document.getElementById(`saldoBitcoinMostrado`).innerHTML = `<span>${wallet1.saldoBitcoin}</span>`;
    document.getElementById(`saldoLunaMostrado`).innerHTML = `<span>${wallet1.saldoLuna}</span>`;
    document.getElementById(`saldoUsdtMostrado`).innerHTML = `<span>${wallet1.saldoUsdt}</span>`;
    acumuladorSaldoTotal = (((cotizacionMonedas[0]) * (wallet1.saldoBitcoin)) + ((cotizacionMonedas[2]) * (wallet1.saldoLuna)) + ((cotizacionMonedas[1]) * (wallet1.saldoUsdt)));
    document.getElementById(`saldoTotalUsd`).innerHTML = `<span>${acumuladorSaldoTotal.toFixed(4)}</span>`;
}

let acumuladorSaldoTotal = 0;

let elemento = document.getElementById("capa-variable");

const validarPersonalizacion = validarStoragePersonalizado();

function validarStoragePersonalizado() {
        if((localStorage.getItem("personalizado") == null) || (localStorage.getItem("personalizado") == `azul`)){
            elemento.className = "main-layout";
            localStorage.setItem("personalizado", `azul`)
        }else if (localStorage.getItem("personalizado") == `verde`){
            elemento.className = "main-layout-green";
        }else {
            elemento.className = "main-layout-red";
        }
    };

const personalizarBilletera = function () {
    if (elemento.className == "main-layout") {
        elemento.className = "main-layout-green";
        localStorage.setItem("personalizado", `verde`)
    } else if (elemento.className == "main-layout-green"){
        elemento.className = "main-layout-red";
        localStorage.setItem("personalizado", `rojo`)
    }else if (elemento.className == "main-layout-red"){
        elemento.className = "main-layout"
        localStorage.setItem("personalizado", `azul`);    
    }
}


const displayBody = (value) => {
    switch (value) {
        case `comprar`:
            divWallet.className = "row noDisplay";
            divComprar.className = "col-md-12 testimonial";
        break;
        case `transferir`:
            divWallet.className = "row noDisplay";
            divTransferir.className = "col-md-12 testimonial";
        break;
        case `cancelar`:
            divWallet.className = "row";
            divComprar.className = "col-md-12 testimonial noDisplay";
            divTransferir.className = "col-md-12 testimonial noDisplay";
            divPagar.className = "col-md-12 testimonial noDisplay";
            divUsuario.classname = "col-md-12 testimonial noDisplay";
            document.getElementById('monedaAComprar').value = ``;
            document.getElementById('cantidadAComprar').value = ``;
            document.getElementById('billeteraDestino').value = ``;
            document.getElementById('monedaATransferir').value = ``;
            document.getElementById('cantidadATransferir').value = ``;
        break;
        case `pagar`:
            let currency = document.getElementById(`monedaAComprar`).value.toUpperCase();
            if (monedasAceptadas.includes(currency)) {
                compraMoneda = Number(document.getElementById(`cantidadAComprar`).value);
            divPagar.className = "col-md-12 testimonial";
            divComprar.className = "col-md-12 testimonial noDisplay";
            } else {
                (swal({ title: "Moneda Inválida",text: "Por favor ingrese una de las siguientes: USDT, BTC, LUNA", icon: "error", button: "Aceptar",}))
            };
        break;
        case `usuario`:
            document.getElementById(`sesionMarcada`).innerHTML = `  Registrate o Inicia Sesión`;
            document.getElementById(`nombreUsuario`).value = ``;
            document.getElementById(`passPersonal`).value = ``;
            divWallet.className = "row noDisplay";
            divUsuario.className = "col-md-12 testimonial";
        break;
    }
}


const comprarTrue = () => {
    wallet1.comprarMoneda();
    divWallet.className = "row"
    divPagar.className = "col-md-12 testimonial noDisplay"
};


let submitComprar = document.getElementById("form");

submitComprar.addEventListener("submit", comprarTrue);



function WALLET(usuario, saldoBitcoin = 0, saldoLuna = 0, saldoUsdt = 0) {
    this.usuario = usuario;
    this.saldoBitcoin = saldoBitcoin;
    this.saldoLuna = saldoLuna;
    this.saldoUsdt = saldoUsdt;
    this.comprarMoneda = function () {
        let currency = document.getElementById(`monedaAComprar`).value.toUpperCase();

        switch (currency) {
            case `BTC`:
                this.saldoBitcoin += compraMoneda;
                Toastify({
                    text: "Saldo Actualizado",
                    offset: {
                        x: 50,
                        y: 50
                        },
                    duration: 2500
                    }).showToast();
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
                    duration: 2500
                    }).showToast();
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
                    duration: 2500
                    }).showToast();
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
                    duration: 2500
                    }).showToast();
                divWallet.className = "row";
                divTransferir.className = "col-md-12 testimonial noDisplay";
                document.getElementById('billeteraDestino').value = ``;
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
                    duration: 2500
                    }).showToast();
                divWallet.className = "row";
                divTransferir.className = "col-md-12 testimonial noDisplay";
                document.getElementById('billeteraDestino').value = ``;
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
                    duration: 2500
                    }).showToast();
                divWallet.className = "row";
                divTransferir.className = "col-md-12 testimonial noDisplay";
                document.getElementById('billeteraDestino').value = ``;
                document.getElementById('monedaATransferir').value = ``;
                document.getElementById('cantidadATransferir').value = ``;
                }
            break;
        }
        mostrarSaldos ();
    }
}


////////////////////////////////////////////////////////////////////////





