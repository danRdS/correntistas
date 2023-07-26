export class Conta{
    static numero = 1;
    constructor(titular, saldo, tipo){
        this.numero = Conta.numero++;
        this.titular = titular;
        this.saldo = saldo;
        this.tipo = tipo;
    }

    depositar(valor){
        this.saldo += valor;
    }

    sacar(valor){
        this.saldo -= valor;
    }

}