import { Conta } from "./Conta.js";
import { Pj } from "./Pj.js";

const conta1 = new Conta('Joquebede', 28000, 'PF');
const conta2 = new Conta('Moshé', 68000, 'PF');
const conta3 = new Pj('Alabastre', 180000, 25000, 'PJ');
const conta4 = new Pj('DataBusiness Technologies', 1325000, 32500, 'PJ');

const banco = [conta1, conta2, conta3, conta4];

const tbody = document.getElementById('tbody');

window.onload = () => renderizar(banco);

const hamburguer = document.querySelector('.hamburguer');
const aside = document.querySelector('aside');
const menuLateral = document.querySelector('.menu-lateral');

hamburguer.addEventListener('click', () => {
    hamburguer.classList.toggle('clicked');
    aside.classList.toggle('opened');
    menuLateral.classList.toggle('opened');
})

document.addEventListener('click', (e) => {
    if(e.target === aside){
        hamburguer.classList.remove('clicked');
        aside.classList.remove('opened');
        menuLateral.classList.remove('opened');
    }
})

function renderizar(array){
    tbody.innerHTML = '';    
    for(let conta of array){
        if(conta.tipo == 'PJ'){
            tbody.innerHTML +=   `<tr>
                                    <th class="dataTable" id="th1">${conta.numero}</th>
                                    <th class="dataTable" id="th1">${conta.tipo}</th>
                                    <th class="dataTable" id="th2">${conta.titular}</th>
                                </tr>`
        } else {
            tbody.innerHTML +=   `<tr>
                                    <th class="dataTable" id="th1">${conta.numero}</th>
                                    <th class="dataTable" id="th1">${conta.tipo}</th>
                                    <th class="dataTable" id="th2">${conta.titular}</th>
                                </tr>`
        }
    }
}

const initialView = document.querySelector('.initialView');
const secondView = document.querySelector('.secondView');
const telaContaSelecionada = document.querySelector('.tela-conta-selecionada')
const formPesquisaConta = document.getElementById('pesquisaConta');
const formChangingData = document.getElementById('formChangingData');
const numContaPesquisado = document.getElementById('num-conta');
const btnPesquisar = document.getElementById('pesquisar');
const btnToInitialView = document.getElementById('toInitialView');
const modalCharging = document.querySelector('.modalCharging');

formPesquisaConta.addEventListener('submit', (e) => e.preventDefault());
formChangingData.addEventListener('submit', (e) => e.preventDefault());

btnPesquisar.addEventListener('click', () => {
    if(initialView.classList.contains('hidden')){
        modalCharging.classList.remove('visible');
        if(numContaPesquisado.value.length > 0 && numContaPesquisado.value > 0){
            obterConta(numContaPesquisado.value, banco, apresentaConta);
        }
    } else {
        if(numContaPesquisado.value.length > 0 && numContaPesquisado.value > 0){
            modalCharging.classList.add('visible');
            setTimeout(() => {
                modalCharging.classList.remove('visible');
                obterConta(numContaPesquisado.value, banco, apresentaConta);
            }, 2500);
        }
    }
})

const chargingBar = document.querySelector('.chargingBar');

btnToInitialView.addEventListener('click', () => {
    chargingBar.classList.add('visible');
    setTimeout(() => telaContaSelecionada.classList.remove('visible'), 1200);

    setTimeout(() => {
        chargingBar.classList.remove('visible');
        secondView.classList.remove('visible');
        initialView.classList.remove('hidden');
        ulAction.style.display = 'block';
        links.classList.remove('only');
    }, 1700);
})

function obterConta(numero, contas, apresentaConta){    
    for(let conta of contas){
        if(numero == conta.numero){
            let correntista = {
                numero: conta.numero,
                titular: conta.titular,
                saldo: conta.saldo,
                tipo: conta.tipo,
                investimento: conta.investimento
            }
            apresentaConta(true, numero, correntista);
            return;
        }        
    }
    apresentaConta(false, numero);
}

function apresentaConta(resultado, numero, correntista){
    secondTable.innerHTML = '';
    messageError.innerText = '';
    if(resultado){
        if(correntista.tipo == 'PJ'){
            showAcountTableFunction(true, correntista);
        } else {
            showAcountTableFunction(false, correntista);
        }
        initialView.classList.add('hidden');
        secondView.classList.add('visible');
        setTimeout(() => {
            telaContaSelecionada.classList.add('visible');
        }, 100);
        ulAction.style.display = 'none';
        links.classList.add('only');
        numContaPesquisado.value = numero;       
    } else {
        numContaPesquisado.blur();
        modalError.classList.add('visible');
        messageError.innerText = `Conta de número "${numero}" não existe. Tente outra.`;
    }
}

// ADD NEW ACCOUNT
const btnAddAccount = document.getElementById('addAccount');
const ulAction = document.querySelector('.ulAction');
const links = document.querySelectorAll('.links')[1];
const spanAddAccount = document.querySelector('.spanAddAccount');
const newAccountView = document.querySelector('.newAccountView');
const screenNewAccount = document.querySelector('.screenNewAccount');
const titularAdd = document.getElementById('titularAdd');
const saldoAdd = document.getElementById('saldoAdd');
const investimentoAdd = document.getElementById('investimentoAdd');
const btnGoHome = document.getElementById('goHome');
const btnSaveNewAccount = document.getElementById('saveNewAccount');

btnAddAccount.addEventListener('click', () => {
    spanAddAccount.classList.add('clicked');
    setTimeout(()=>{
            hamburguer.click();
        setTimeout(() => {
            initialView.classList.add('hidden');
            newAccountView.classList.add('visible');
        }, 400);
        setTimeout(() => {
            ulAction.style.display = 'none';
            links.classList.add('only');
            screenNewAccount.classList.add('visible');
            toTop();
            spanAddAccount.classList.remove('clicked');
        }, 500);
    }, 400)
})

btnGoHome.addEventListener('click', () => {
    screenNewAccount.classList.remove('visible');
    setTimeout(() => {
        initialView.classList.remove('hidden');
        newAccountView.classList.remove('visible');
        titularAdd.value = '';
        saldoAdd.value = '';
        investimentoAdd.value = '';
        ulAction.style.display = 'block';
        links.classList.remove('only');
        if(checkboxPJ.checked){
            checkboxPJ.click();
        }
        toTop();
    }, 400)
})

const checkboxPJ = document.querySelector('.checkboxPJ');

checkboxPJ.addEventListener('click', () => {
    if(checkboxPJ.checked){
        investimentoAdd.setAttribute('required', 'required');
        legendNewAccount.classList.add('clicked');
        setTimeout(() => {
            legendNewAccount.innerText = 'Nova Conta PJ';
            legendNewAccount.classList.remove('clicked');
        }, 900);
    } else {
        investimentoAdd.removeAttribute('required');
        legendNewAccount.classList.add('clicked');
        setTimeout(() => {
            legendNewAccount.innerText = 'Nova Conta PF';
            legendNewAccount.classList.remove('clicked');
        }, 900);
    }
})

const legendNewAccount = document.getElementById('legendNewAccount');

function addAccountFunction(nome, saldo, investimento, dataForSaving){
    if(checkboxPJ.checked){
        dataForSaving(true, nome, saldo, investimento, 'PJ');
    } else {
        dataForSaving(false, nome, saldo, 'PF');
    }
}

const modalConfirmedNewAccount = document.querySelector('.modalConfirmedNewAccount');
const btnOkConfirmedNewAccount = document.getElementById('okConfirmedNewAccount');

function dataForSaving(resultado, nome, saldo, investimento, tipo){
    if(resultado){
        if(nome && saldo && saldo >= 0 && investimento && investimento >= 0){
            const correntistaPJ = new Pj(nome, Number(saldo), Number(investimento), tipo);
            let numContaNova = correntistaPJ.numero;
            const hasAccount = banco.some((account) => account.numero == numContaNova);
            if(hasAccount){
                correntistaPJ.numero++;
            }
            banco.push(correntistaPJ);
            renderizar(banco);
            modalConfirmedNewAccount.classList.add('visible');
        }
        
    } else {
        if(nome && saldo && saldo >= 0){
            const correntista = new Conta(nome, Number(saldo), 'PF');
            let numContaNova = correntista.numero;
            const hasAccount = banco.some((account) => account.numero == numContaNova);
            if(hasAccount){
                correntista.numero++;
            }        
            banco.push(correntista);
            renderizar(banco);
            modalConfirmedNewAccount.classList.add('visible');
        }        
    }
}

btnSaveNewAccount.addEventListener('click', () => {
    let nome = titularAdd.value.trim();
    let saldo = saldoAdd.value;
    let investimento = investimentoAdd.value;
    addAccountFunction(nome, saldo, investimento, dataForSaving);
})

btnOkConfirmedNewAccount.addEventListener('click', () => {
    modalConfirmedNewAccount.classList.remove('visible');    
    btnGoHome.click();
})

const formNewAccount = document.querySelector('.formNewAccount');
formNewAccount.addEventListener('submit', e => e.preventDefault());

const secondTable = document.querySelector('.ShowAcountTable');
const modalError = document.querySelector('.modalError');
const messageError = document.getElementById('messageError');
const closeError = document.getElementById('closeError');

closeError.addEventListener('click', () => {
    setTimeout(() => {
        modalError.classList.remove('visible');
        numContaPesquisado.focus();
    }, 500)
});

const btnAlterar = document.getElementById('alterar');
const btnDeleteAccount = document.getElementById('delete');
const modalDeleteAccount = document.querySelector('.modalDeleteAccount');
const popupDeleteAccount = document.querySelector('.popupDeleteAccount');
const btnCancelDeleteAccount = document.getElementById('cancelDelete');
const btnConfirmDeleteAccount = document.getElementById('confirmDelete');
const popupDeleteAccountConfirmed = document.querySelector('.popupDeleteAccountConfirmed');
const btnDeleteConfirmed = document.getElementById('deleteConfirmed');

btnDeleteAccount.addEventListener('click', () => {
    modalDeleteAccount.classList.add('visible');
})

btnCancelDeleteAccount.addEventListener('click', () => {
    modalDeleteAccount.classList.remove('visible');
})

btnConfirmDeleteAccount.addEventListener('click', () => {
    popupDeleteAccount.classList.add('hidden');
    popupDeleteAccountConfirmed.classList.add('visible');
    ulAction.style.display = 'block';
    links.classList.remove('only');
})

btnDeleteConfirmed.addEventListener('click', () => {
    setTimeout(() => {
        btnToInitialView.click();
    }, 500);
    setTimeout(() => {
        popupDeleteAccountConfirmed.classList.remove('visible');
        modalDeleteAccount.classList.remove('visible');
    }, 700)
    setTimeout(() => popupDeleteAccount.classList.remove('hidden'), 900);
    deleteAccount();
    renderizar(banco);
    ulAction.style.display = 'block';
    links.classList.remove('only');
})

let position;
let numeroContaDigitado;

function catchIndex(array){
    numeroContaDigitado = numContaPesquisado.value;
    array.forEach((account, index) => {
        if(account.numero == numeroContaDigitado){
            position = index;
        }
    })
}

function deleteAccount(){
    catchIndex(banco);
    banco.splice(position, 1);
}

const thirdView = document.querySelector('.thirdView');
const screenChangingData = document.querySelector('.screenChangingData');
const btnCancelChanges = document.getElementById('cancelChanges');
const btnSaveChanges = document.getElementById('saveChanges');

const inputNovoNome = document.getElementById('novoNome');
const inputNovaConta = document.getElementById('novaConta');

function catchData(){
    catchIndex(banco);
    inputNovoNome.value = banco[position].titular;
    inputNovaConta.value = banco[position].numero;
}

btnAlterar.addEventListener('click', ()=>{
    secondView.classList.remove('visible');
    thirdView.classList.add('visible');
    setTimeout(() => {
        screenChangingData.classList.add('visible');
        catchData();
    }, 100);
})

btnCancelChanges.addEventListener('click', () => {
    screenChangingData.classList.remove('visible');
    setTimeout(() => {
        thirdView.classList.remove('visible');
        secondView.classList.add('visible');
    }, 500)
})

const modalNoConfirmedChanges = document.querySelector('.modalNoConfirmedChanges');
const infoChangesNotConfirmed = document.querySelector('.infoChangesNotConfirmed');
const okChangesNotConfirmed = document.getElementById('okChangesNotConfirmed');

// VARIAVEL NUMERO DIGITADO PARA ALTERAÇÃO DOS DADOS
let numeroDaConta;

btnSaveChanges.addEventListener('click', () => {
    catchIndex(banco);
    let titular = inputNovoNome.value.trim();
    let conta = inputNovaConta.value;
    const hasAccount = banco.some((account) => account.numero == conta);
    if(titular == banco[position].titular && conta == banco[position].numero){
        popupNoChangesConfirmed(false);
        infoChangesNotConfirmed.textContent = 'Nenhuma alteração feita';
    } else if(conta.length > 0 && conta > 0 && conta != banco[position].numero && titular.length > 0){
        if(hasAccount){
            popupNoChangesConfirmed(true);
            infoChangesNotConfirmed.textContent = `Essa conta já existe.`;
        } else {
            banco[position].titular = titular;
            banco[position].numero = conta;
            modalConfirmChangesData.classList.add('visible');
        }
    } else if(titular.length > 0 && titular != banco[position].titular && conta.length > 0 && conta > 0){
        banco[position].titular = titular;
        banco[position].numero = conta;
        modalConfirmChangesData.classList.add('visible');
        ulAction.style.display = 'block';
        links.classList.remove('only');
    }
    numeroDaConta = conta;
    inputNovoNome.blur();
    inputNovaConta.blur();
})

function popupNoChangesConfirmed(result){
    modalNoConfirmedChanges.classList.add('visible');
    okChangesNotConfirmed.addEventListener('click', () => {
        modalNoConfirmedChanges.classList.remove('visible');
        if(result){
            inputNovaConta.focus();
        } else {
            inputNovaConta.blur();
        }
    })    
}

const btnChangesOk = document.getElementById('changesOk');
const modalConfirmChangesData = document.querySelector('.modalConfirmChangesData');

btnChangesOk.addEventListener('click', () => {
    renderizar(banco);
    screenChangingData.classList.remove('visible');
    setTimeout(() => {
        modalConfirmChangesData.classList.remove('visible');
        numContaPesquisado.value = '';
        thirdView.classList.remove('visible');

        numContaPesquisado.value = numeroDaConta;
        btnPesquisar.click();

        secondView.classList.add('visible');
    }, 500);
})

function showAcountTableFunction(isPJ, correntista){
    let largura = window.innerWidth;
    if(isPJ){
        if(largura > 420){
            secondTable.innerHTML = `<thead>
                                        <tr>
                                            <th colspan="5" class="thTitle">Conta PJ</th>
                                        </tr>
                                        <tr>
                                            <th class="thSecundary">Conta</th>
                                            <th class="thSecundary">Titular</th>
                                            <th class="thSecundary">Saldo</th>
                                            <th class="thSecundary">Investimento</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td id="td1">${correntista.numero}</td>
                                            <td id="td2">${correntista.titular}</td>
                                            <td id="td3">R$${correntista.saldo.toFixed(2).replace('.', ',')}</td>
                                            <td id="td4">R$${correntista.investimento.toFixed(2).replace('.', ',')}</td>
                                        </tr>              
                                    </tbody>`
        } else {
            secondTable.innerHTML = `<thead>
                                        <tr>
                                            <th colspan="2" class="thTitle">Conta PJ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th class="thSecundary">Conta</th>
                                            <td id="td1">${correntista.numero}</td>
                                        </tr>
                                        <tr>
                                            <th class="thSecundary">Titular</th>
                                            <td id="td2">${correntista.titular}</td>
                                        </tr>
                                        <tr>
                                        <th class="thSecundary">Saldo</th>
                                            <td id="td3">R$${correntista.saldo.toFixed(2).replace('.', ',')}</td>
                                        </tr>
                                        <tr>
                                            <th class="thSecundary">Investimento</th>
                                            <td id="td4">R$${correntista.investimento.toFixed(2).replace('.', ',')}</td>
                                        </tr>
                                    </tbody>`
        }
        // Caso haja redimensionamento de tela durante a exibição da tabela PJ
        window.addEventListener('resize', () => {
            largura = window.innerWidth;
            if(largura > 420){
                secondTable.innerHTML = `<thead>
                                            <tr>
                                                <th colspan="5" class="thTitle">Conta PJ</th>
                                            </tr>
                                            <tr>
                                                <th class="thSecundary">Conta</th>
                                                <th class="thSecundary">Titular</th>
                                                <th class="thSecundary">Saldo</th>
                                                <th class="thSecundary">Investimento</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td id="td1">${correntista.numero}</td>
                                                <td id="td2">${correntista.titular}</td>
                                                <td id="td3">R$${correntista.saldo.toFixed(2).replace('.', ',')}</td>
                                                <td id="td4">R$${correntista.investimento.toFixed(2).replace('.', ',')}</td>
                                            </tr>                                                    
                                        </tbody>`
            } else {
                secondTable.innerHTML = `<thead>
                                            <tr>
                                                <th colspan="2" class="thTitle">Conta PJ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th class="thSecundary">Conta</th>
                                                <td id="td1">${correntista.numero}</td>
                                            </tr>
                                            <tr>
                                                <th class="thSecundary">Titular</th>
                                                <td id="td2">${correntista.titular}</td>
                                            </tr>
                                            <tr>
                                            <th class="thSecundary">Saldo</th>
                                                <td id="td3">R$${correntista.saldo.toFixed(2).replace('.', ',')}</td>
                                            </tr>
                                            <tr>
                                                <th class="thSecundary">Investimento</th>
                                                <td id="td4">R$${correntista.investimento.toFixed(2).replace('.', ',')}</td>
                                            </tr>
                                        </tbody>`
            }
        });            
    } else {
        if(largura > 420){
            secondTable.innerHTML = `<thead>
                                        <tr>
                                            <th colspan="3" class="thTitle">Conta PF</th>
                                        </tr>
                                        <tr>
                                            <th class="thSecundary">Número</th>
                                            <th class="thSecundary">Titular</th>
                                            <th class="thSecundary">Saldo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td id="td1">${correntista.numero}</td>
                                            <td id="td2">${correntista.titular} </td>
                                            <td id="td3">R$${correntista.saldo.toFixed(2).replace('.', ',')}</td>
                                        </tr>
                                    </tbody>`
        } else {
            secondTable.innerHTML = `<thead>
                                        <tr>
                                            <th colspan="2" class="thTitle">Conta PJ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th class="thSecundary">Conta</th>
                                            <td id="td1">${correntista.numero}</td>
                                        </tr>
                                        <tr>
                                            <th class="thSecundary">Titular</th>
                                            <td id="td2">${correntista.titular}</td>
                                        </tr>
                                        <tr>
                                        <th class="thSecundary">Saldo</th>
                                            <td id="td3">R$${correntista.saldo.toFixed(2).replace('.', ',')}</td>
                                        </tr>
                                    </tbody>`
        }
        // Caso haja redimensionamento de tela durante a exibição da tabela PF
        window.addEventListener('resize', () => {
            largura = window.innerWidth;
            if(largura > 420){
                secondTable.innerHTML = `<thead>
                                            <tr>
                                                <th colspan="3" class="thTitle">Conta PJ</th>
                                            </tr>
                                            <tr>
                                                <th class="thSecundary">Conta</th>
                                                <th class="thSecundary">Titular</th>
                                                <th class="thSecundary">Saldo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td id="td1">${correntista.numero}</td>
                                                <td id="td2">${correntista.titular}</td>
                                                <td id="td3">R$${correntista.saldo.toFixed(2).replace('.', ',')}</td>
                                            </tr>                                                                
                                        </tbody>`
            } else {
                secondTable.innerHTML = `<thead>
                                            <tr>
                                                <th colspan="2" class="thTitle">Conta PJ</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th class="thSecundary">Conta</th>
                                                <td id="td1">${correntista.numero}</td>
                                            </tr>
                                            <tr>
                                                <th class="thSecundary">Titular</th>
                                                <td id="td2">${correntista.titular}</td>
                                            </tr>
                                            <tr>
                                            <th class="thSecundary">Saldo</th>
                                                <td id="td3">R$${correntista.saldo.toFixed(2).replace('.', ',')}</td>
                                            </tr>
                                        </tbody>`
            }
        });
    }
}

// MOVIMENTAÇÃO
const btnMovimentar = document.getElementById('movimentar');
const screenMovimentView = document.querySelector('.screenMovimentView');
const screenMoviment = document.querySelector('.screenMoviment');
const btnBackToSecondView = document.getElementById('backToSecondView');
const infoTitular = document.getElementById('infoTitular');
const infoNumConta = document.getElementById('infoNumConta');
const infoSaldoConta = document.getElementById('infoSaldoConta');

btnMovimentar.addEventListener('click', () => {
    telaContaSelecionada.classList.remove('visible');

    showValuesOfAccount();   

    setTimeout(() => {
        secondView.classList.remove('visible');        
        screenMovimentView.classList.add('visible');
    }, 500);
    setTimeout(() => {
        screenMoviment.classList.add('visible');
    }, 600);
})

const fieldInfoPJ = document.querySelector('.fieldInfoPJ');
const infoInvestimento = document.getElementById('infoInvestimento');
const infoSaldoTotal = document.getElementById('infoSaldoTotal');
const btnInvestir = document.getElementById('investir');
const btnResgatar = document.getElementById('resgatar');


function showValuesOfAccount(){
    let titular = '';
    let conta = numContaPesquisado.value;
    let saldo = 0;
    banco.forEach((account) => {
        if(account.numero == conta){
            titular = account.titular;
            saldo = account.saldo;
        }
    })

    infoTitular.innerHTML = `Titular: <span class="dadosParagrafo">${titular}</span>`
    infoNumConta.innerHTML = `Conta: <span class="dadosParagrafo">${conta}</span>`;
    infoSaldoConta.innerHTML = `Saldo Disponível: <span class="dadosParagrafo">R$${saldo.toFixed(2).replace('.',',')}</span>`;

    let investimento = 0;
    banco.forEach(account => {
        if(account.numero == conta && account.tipo == 'PJ'){
            fieldInfoPJ.classList.add('visible');
            btnInvestir.classList.add('visible');
            btnResgatar.classList.add('visible');
            investimento = account.investimento;
            let total = saldo + investimento;
            infoInvestimento.innerHTML = `Valor investido: <span class="dadosParagrafo">R$${investimento.toFixed(2).replace('.', ',')}</span>`;
            infoSaldoTotal.innerHTML = `Saldo Agregado: <span class="dadosParagrafo">R$${total.toFixed(2).replace('.',',')}</span> `
        }
    })
}

btnBackToSecondView.addEventListener('click', () => {
    btnBackToSecondView.classList.add('clicked');
    setTimeout(() => {
        screenMoviment.classList.remove('visible');
    }, 400)
    setTimeout(() => {
        screenMovimentView.classList.remove('visible');
        btnPesquisar.click();
        secondView.classList.add('visible');
    }, 800)
    setTimeout(() => {
        telaContaSelecionada.classList.add('visible');
        btnCancelTransation.click();
        btnBackToSecondView.classList.remove('clicked');
        fieldInfoPJ.classList.remove('visible');
        btnInvestir.classList.remove('visible');
        btnResgatar.classList.remove('visible');
        infoInvestimento.classList.remove('visible');
    }, 900);
})

const fieldButtonTransation = document.getElementById('fieldButtonTransation');
const btnDeposito = document.getElementById('deposito');
const btnSaque = document.getElementById('saque');

const formDeposito = document.querySelector('.formDeposito');
formDeposito.addEventListener('submit', e => e.preventDefault());

const fieldsetDeposito = document.querySelector('.fieldsetDeposito');

const labelTransation = document.getElementById('labelTransation');
const inpTransation = document.getElementById('inpTransation');

let optionIsDeposit = true;

btnDeposito.addEventListener('click', () => {
    btnDeposito.classList.add('clicked');
    setTimeout(()=>{
        labelTransation.innerText = 'Informe o valor do depósito:';
        optionIsDeposit = true;
        mostrarTelaTransacional();
        btnDeposito.classList.remove('clicked');
    }, 200);
})

btnSaque.addEventListener('click', () => {
    btnSaque.classList.add('clicked');
    setTimeout(() => {
        labelTransation.innerHTML = 'Qual o valor do saque?';
        optionIsDeposit = false;
        mostrarTelaTransacional();
        btnSaque.classList.remove('clicked');
    }, 200);
})

let optionIsDepositIsPJ = false;

btnInvestir.addEventListener('click', () => {
    labelTransation.innerHTML = 'Qual o valor que deseja investir?';
    optionIsDeposit = true;
    optionIsDepositIsPJ = true;
    mostrarTelaTransacional();
})

btnResgatar.addEventListener('click', () => {
    labelTransation.innerHTML = 'Qual o valor que deseja resgatar?';
    optionIsDeposit = false;
    optionIsDepositIsPJ = true;
    mostrarTelaTransacional();
})

function mostrarTelaTransacional(){
    fieldButtonTransation.style.display = 'none';
    formDeposito.classList.add('visible');
    setTimeout(() => {
        fieldsetDeposito.classList.add('visible');
    }, 500);  
}

const btnConfirmTransation = document.getElementById('confirmTransation');
const modalOperacaoConfirmada = document.querySelector('.modalOperacaoConfirmada');
const btnOkOperacaoConfirmada = document.getElementById('okOperacaoConfirmada');
const btnCancelTransation = document.getElementById('cancelTransation');
const modalOperacaoNegada = document.querySelector('.modalOperacaoNegada');
const infoOperacaoNegada = document.getElementById('infoOperacaoNegada');
const btnOkOperacaoNegada = document.getElementById('okOperacaoNegada');

btnConfirmTransation.addEventListener('click', () => {
    let conta = numContaPesquisado.value;
    let valor = Number(inpTransation.value);
    if(valor && valor > 0){
        if(optionIsDeposit){
                banco.forEach((account) => {
                    if(account.numero == conta && account.tipo == 'PJ' && optionIsDepositIsPJ){
                        if(valor <= account.saldo){
                            account.investir(valor);
                            renderizar(banco);
                            optionIsDepositIsPJ = false;
                            modalOperacaoConfirmada.classList.add('visible');
                        } else {
                            infoOperacaoNegada.innerText = 'Valor indisponível!';
                            modalOperacaoNegada.classList.add('visible');
                        }
                    } else if(account.numero == conta){
                        account.depositar(valor);
                        renderizar(banco);
                        modalOperacaoConfirmada.classList.add('visible');
                    }
                })
        } else {
                banco.forEach((account) => {
                    if(account.numero == conta && account.tipo == 'PJ' && optionIsDepositIsPJ){
                        if (valor <= account.investimento){
                            account.resgatar(valor);
                            renderizar(banco);
                            optionIsDepositIsPJ = false;
                            modalOperacaoConfirmada.classList.add('visible');
                        } else {
                            infoOperacaoNegada.innerText = 'Valor solicitado indisponivel';
                            modalOperacaoNegada.classList.add('visible');
                        }
                    } else if(account.numero == conta){
                        if(valor <= account.saldo){
                            account.sacar(valor);
                            renderizar(banco);
                            modalOperacaoConfirmada.classList.add('visible');
                        } else {
                            infoOperacaoNegada.innerText = 'Saldo insuficiente';
                            modalOperacaoNegada.classList.add('visible');
                        }
                    }
                })
        }
    }
})

function removeScreenFormDeposito(){
    fieldsetDeposito.classList.remove('visible');
    showValuesOfAccount();
    setTimeout(() => {
        formDeposito.classList.remove('visible');
        inpTransation.value = '';
        fieldButtonTransation.style.display = 'flex';
    }, 500);
}

btnOkOperacaoConfirmada.addEventListener('click', () => {
    modalOperacaoConfirmada.classList.remove('visible');
    removeScreenFormDeposito();
})

btnOkOperacaoNegada.addEventListener('click', () => {
    modalOperacaoNegada.classList.remove('visible');
})

btnCancelTransation.addEventListener('click', () => {
    fieldsetDeposito.classList.remove('visible');
    setTimeout(() => {
        optionIsDepositIsPJ = false;
        fieldButtonTransation.style.display = 'flex';
        formDeposito.classList.remove('visible');
        inpTransation.value = '';
    }, 500);
})

// SCROLL TOP
window.onscroll = () => {
    scrollFunction();
}

const btnToTop = document.getElementById('toTop');

function scrollFunction(){
    if(document.body.scrollTop > 50 || document.documentElement.scrollTop > 50){
        btnToTop.classList.add('show');
    } else {
        btnToTop.classList.remove('show');
        btnToTop.classList.remove('clicked');
    }
}

btnToTop.addEventListener('click', () => {
    btnToTop.classList.add('clicked');
    setTimeout(()=>{
        toTop();
    }, 100)
})

function toTop(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}