import { Conta } from "./Conta.js";

export class Pj extends Conta{
    constructor(titular, saldo, investimento, tipo){
        super(titular, saldo, tipo);
        this.investimento = investimento;
    }

    investir(valor){
        this.investimento += valor;
        this.saldo -= valor;
    }

    resgatar(valor){
            this.investimento -= valor;
            this.saldo += valor;
    }
}