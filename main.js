const blocoOcupado = "has-background-danger";
const blocoDesocupado = "has-background-grey-lighter";

this.criarBloco = function(tamanho) {
    let novo = document.createElement("a");
   
    novo.classList.add("bloco");
    novo.classList.add(blocoOcupado);

    novo.style.width = tamanho + "px";
    novo.style.height = tamanho + "px";

    novo.addEventListener('click', this.manterBloco);

    document.querySelector('.forma').appendChild(novo);

    return novo;
}

this.manterBloco = function() {
    if (this.classList.contains(blocoOcupado)) {
        this.classList.remove(blocoOcupado);
        this.classList.add(blocoDesocupado);
    } else {
        this.classList.remove(blocoDesocupado);
        this.classList.add(blocoOcupado);
    }    

    totalizar();
}

this.novaAreaDeTrabalho = function(largura, altura) {
    let forma = document.querySelector('.forma');

    while (forma.lastElementChild) {
        forma.removeChild(forma.lastElementChild);
    }    

    forma.style.width = largura + "px";
    forma.style.height = altura + "px";
}

this.definir = function() {
    
    let tamanhoBloco  = document.querySelector('#menu-area-bloco').value;
    
    let largura = document.querySelector('#menu-area-largura').value * tamanhoBloco;
    let altura = document.querySelector('#menu-area-altura').value * tamanhoBloco;
    
    novaAreaDeTrabalho(largura, altura);    

    let areaTotal = largura * altura;
    let areaOcupada = 0;

    while (areaOcupada < areaTotal) {
        let bloco = criarBloco(tamanhoBloco);
        areaOcupada += bloco.clientWidth * bloco.clientHeight;
    }

    totalizar();
}

this.ocupar = function() {
    let forma = document.querySelector('.forma');

    for (bloco of forma.children) {
        bloco.classList.remove(blocoDesocupado);
        bloco.classList.add(blocoOcupado);
    }

    totalizar();
}

this.desocupar = function() {
    let forma = document.querySelector('.forma');

    for (bloco of forma.children) {
        bloco.classList.remove(blocoOcupado);
        bloco.classList.add(blocoDesocupado);
    }

    totalizar();
}

this.totalizar = function() {
    let forma = document.querySelector('.forma');
    let total = 0;

    for (bloco of forma.children) {
        if (bloco.classList.contains(blocoOcupado)) {
            total++;
        }
    }

    document.querySelector('#totalizador-total').innerHTML = total + 'm²';
}

this.inicializar = function() {
    document.querySelector('#menu-acoes-definir').addEventListener('click', definir);
    document.querySelector('#menu-acoes-ocupar').addEventListener('click', ocupar);
    document.querySelector('#menu-acoes-desocupar').addEventListener('click', desocupar);

    if (navigator.userAgent.toLowerCase().match(/mobile/i)) {
        document.querySelector("#menu-area-bloco").value = 45
        
    } else {
        document.querySelector("#menu-area-bloco").value = 100
    }   

    document.querySelector("#menu-area-largura").value = 7;
    document.querySelector("#menu-area-altura").value = 4;

    definir();
}

inicializar();