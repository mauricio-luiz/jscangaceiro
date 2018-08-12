const controller = new NegociacaoController();
const $ = document.querySelector.bind(document);

document
    $('.form')
    .addEventListener('submit', controller.adiciona.bind(controller));

document
    $('#botao-apaga')
    .addEventListener('click', controller.apaga.bind(controller));

document
    $('#botao-importa')
    .addEventListener('click', controller.importaNegociacoes.bind(controller));