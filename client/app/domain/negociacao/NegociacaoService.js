class NegociacaoService{

    constructor(){
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana(){
        return this._http
                .get('negociacoes/semana')
                .then(
                    dados =>
                        dados.map(objeto => 
                            new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    ,
                    err => {
                        throw new Error('Não foi possivel obter as negociações!');
                    }
                )
    }

    obterNegociacoesDaSemanaAnterior(){
        return this._http
                .get('negociacoes/anterior')
                .then(
                    dados => 
                        dados.map(objeto => 
                            new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    ,
                    err => {
                        throw new Error('Não foi possivel obter as negociações da semana anterior!');
                    }
                )
    }

    obterNegociacoesDaSemanaRetrasada(){
        return this._http
                .get('negociacoes/retrasada')
                .then(
                    dados =>
                        dados.map(objeto => 
                            new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    ,
                    err => {
                        throw new Error('Não foi possivel obter as negociações da semana retrasada!');
                    }
                )
    }

    obtemNegociacoesDoPeriodo(){
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodo => periodo
                .reduce((novoArray, item) => novoArray.concat(item), [])
                .sort((a,b) => a.data.getTime() - b.data.getTime())
        )
        .catch(err => {
            console.log(err);
            throw new Error('Não foi possivel obter as negociações do período');
        });
    }
}