// MENU
const btn = document.querySelector(".dbaction");
const menu = document.querySelector(".lishe");

btn.addEventListener("click", function () {
  btn.classList.toggle("active");
  menu.classList.toggle("active");
});

menu.addEventListener("click", function () {
  btn.classList.remove("active");
  menu.classList.remove("active");
});

// ROLAGEM HORIZONTAL
const cards = document.querySelector(".boxsabores");
const esq = document.querySelector(".setleft");
const dir = document.querySelector(".setright");

dir.addEventListener("click", function () {
  cards.scrollLeft += 300;
});

esq.addEventListener("click", function () {
  cards.scrollLeft -= 300;
});

// BANNER
const slider = document.querySelector(".imgbnn");
const totalSlides = document.querySelectorAll(".imgsbox").length;
const dots = document.querySelectorAll(".dot");

let index = 0;

setInterval(function () {
  index++;

  if (index >= totalSlides) {
    index = 0;
  }

  slider.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(function (dot) {
    dot.classList.remove("active");
  });

  dots[index].classList.add("active");
}, 3000);

// CONFIGURACOES DA LOJA
const whatsappLoja = "55759"; // troque pelo numero da loja com 55 + DDD + numero
const chavePix = "SUA-CHAVE-PIX-AQUI"; // troque pela sua chave Pix

// MODAL PRODUTO
const addBtns = document.querySelectorAll(".addprod");
const modal = document.getElementById("modalpedido");
const fecharModal = document.getElementById("fecharmodal");

const nomeProdutoModal = document.getElementById("nomeProdutoModal");
const preco300El = document.getElementById("preco300");
const preco500El = document.getElementById("preco500");

const qtd300El = document.getElementById("qtd300");
const qtd500El = document.getElementById("qtd500");
const totalPedidoEl = document.getElementById("totalPedido");

const menos300 = document.getElementById("menos300");
const mais300 = document.getElementById("mais300");
const menos500 = document.getElementById("menos500");
const mais500 = document.getElementById("mais500");

const btnAddCarrinho = document.getElementById("btnAddCarrinho");

// CARRINHO
const carrinhoBar = document.getElementById("carrinhoBar");
const carrinhoResumo = document.getElementById("carrinhoResumo");
const btnVerCarrinho = document.getElementById("btnVerCarrinho");

const modalCarrinho = document.getElementById("modalCarrinho");
const fecharCarrinho = document.getElementById("fecharCarrinho");
const listaCarrinho = document.getElementById("listaCarrinho");
const totalCarrinhoEl = document.getElementById("totalCarrinho");
const btnFinalizarPedido = document.getElementById("btnFinalizarPedido");

// DADOS DO CLIENTE
const modalDados = document.getElementById("modalDados");
const fecharDados = document.getElementById("fecharDados");
const formDadosCliente = document.getElementById("formDadosCliente");

// PAGAMENTO
const modalPagamento = document.getElementById("modalPagamento");
const fecharPagamento = document.getElementById("fecharPagamento");
const formPagamento = document.getElementById("formPagamento");
const detalhesPagamento = document.getElementById("detalhesPagamento");
const totalPagamento = document.getElementById("totalPagamento");

let produtoAtual = null;
let qtd300 = 0;
let qtd500 = 0;
let preco300 = 15;
let preco500 = 20;
let carrinho = [];
let dadosCliente = null;

// FUNCOES
function formatarMoeda(valor) {
  return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

function atualizarTotal() {
  qtd300El.textContent = qtd300;
  qtd500El.textContent = qtd500;

  const total = (qtd300 * preco300) + (qtd500 * preco500);
  totalPedidoEl.textContent = formatarMoeda(total);
}

function resetarModalProduto() {
  qtd300 = 0;
  qtd500 = 0;
  preco300 = 15;
  preco500 = 20;
  atualizarTotal();
}

function atualizarCarrinhoBar() {
  let totalItens = 0;

  carrinho.forEach(function (item) {
    totalItens += item.quantidadeTotal;
  });

  if (carrinho.length > 0) {
    carrinhoBar.classList.add("ativo");
    carrinhoResumo.textContent = `${totalItens} item(ns)`;
  } else {
    carrinhoBar.classList.remove("ativo");
    carrinhoResumo.textContent = "0 itens";
  }
}

function renderizarCarrinho() {
  listaCarrinho.innerHTML = "";

  let totalGeral = 0;

  carrinho.forEach(function (item) {
    totalGeral += item.total;

    listaCarrinho.innerHTML += `
      <div class="item-carrinho">
        <h4>${item.produto.nome}</h4>
        ${item.qtd300 > 0 ? `<p>300ml x ${item.qtd300} = ${formatarMoeda(item.qtd300 * item.preco300)}</p>` : ""}
        ${item.qtd500 > 0 ? `<p>500ml x ${item.qtd500} = ${formatarMoeda(item.qtd500 * item.preco500)}</p>` : ""}
        <p><strong>Total do item: ${formatarMoeda(item.total)}</strong></p>
      </div>
    `;
  });

  totalCarrinhoEl.textContent = formatarMoeda(totalGeral);
  totalPagamento.textContent = formatarMoeda(totalGeral);
}

function calcularTotalCarrinho() {
  let total = 0;

  carrinho.forEach(function (item) {
    total += item.total;
  });

  return total;
}

function limparTelefone(valor) {
  return valor.replace(/\D/g, "");
}

function gerarResumoPedido() {
  return carrinho.map(function (item) {
    return {
      produtoId: item.produto.id,
      sabor: item.produto.nome,
      tamanhos: [
        item.qtd300 > 0 ? {
          tamanho: "300ml",
          quantidade: item.qtd300,
          valorUnitario: item.preco300,
          subtotal: item.qtd300 * item.preco300
        } : null,
        item.qtd500 > 0 ? {
          tamanho: "500ml",
          quantidade: item.qtd500,
          valorUnitario: item.preco500,
          subtotal: item.qtd500 * item.preco500
        } : null
      ].filter(Boolean),
      totalItem: item.total
    };
  });
}

function montarTextoItensCarrinho() {
  let texto = "";

  carrinho.forEach(function (item) {
    texto += `*${item.produto.nome}*\n`;

    if (item.qtd300 > 0) {
      texto += `- 300ml x ${item.qtd300} = ${formatarMoeda(item.qtd300 * item.preco300)}\n`;
    }

    if (item.qtd500 > 0) {
      texto += `- 500ml x ${item.qtd500} = ${formatarMoeda(item.qtd500 * item.preco500)}\n`;
    }

    texto += `Subtotal: ${formatarMoeda(item.total)}\n\n`;
  });

  return texto;
}

// ABRIR PRODUTO
addBtns.forEach(function (botao) {
  botao.addEventListener("click", function (e) {
    e.preventDefault();

    const card = botao.closest(".uni-box-sab");

    produtoAtual = {
      id: card.dataset.id,
      nome: card.dataset.nome,
      preco300: Number(card.dataset.preco300),
      preco500: Number(card.dataset.preco500)
    };

    preco300 = produtoAtual.preco300;
    preco500 = produtoAtual.preco500;

    nomeProdutoModal.textContent = produtoAtual.nome;
    preco300El.textContent = preco300.toFixed(2).replace(".", ",");
    preco500El.textContent = preco500.toFixed(2).replace(".", ",");

    resetarModalProduto();
    modal.classList.add("ativo");
  });
});

fecharModal.addEventListener("click", function () {
  modal.classList.remove("ativo");
});

// QUANTIDADES
menos300.addEventListener("click", function () {
  if (qtd300 > 0) {
    qtd300--;
    atualizarTotal();
  }
});

mais300.addEventListener("click", function () {
  qtd300++;
  atualizarTotal();
});

menos500.addEventListener("click", function () {
  if (qtd500 > 0) {
    qtd500--;
    atualizarTotal();
  }
});

mais500.addEventListener("click", function () {
  qtd500++;
  atualizarTotal();
});

// ADICIONAR AO CARRINHO
btnAddCarrinho.addEventListener("click", function () {
  if (qtd300 === 0 && qtd500 === 0) {
    alert("Selecione pelo menos 1 item.");
    return;
  }

  const itemCarrinho = {
    produto: {
      id: produtoAtual.id,
      nome: produtoAtual.nome
    },
    preco300: preco300,
    preco500: preco500,
    qtd300: qtd300,
    qtd500: qtd500,
    quantidadeTotal: qtd300 + qtd500,
    total: (qtd300 * preco300) + (qtd500 * preco500)
  };

  carrinho.push(itemCarrinho);

  atualizarCarrinhoBar();
  renderizarCarrinho();

  modal.classList.remove("ativo");
});

// CARRINHO
btnVerCarrinho.addEventListener("click", function () {
  renderizarCarrinho();
  modalCarrinho.classList.add("ativo");
});

fecharCarrinho.addEventListener("click", function () {
  modalCarrinho.classList.remove("ativo");
});

// IR PARA DADOS
btnFinalizarPedido.addEventListener("click", function () {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  localStorage.setItem("carrinhoPedido", JSON.stringify(carrinho));
  modalCarrinho.classList.remove("ativo");
  modalDados.classList.add("ativo");
});

fecharDados.addEventListener("click", function () {
  modalDados.classList.remove("ativo");
});

// FORMULARIO DE DADOS
formDadosCliente.addEventListener("submit", function (e) {
  e.preventDefault();

  const telefoneDigitado = document.getElementById("telefoneCliente").value;
  const telefoneLimpo = limparTelefone(telefoneDigitado);

  if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
    alert("Digite um telefone válido com DDD.");
    return;
  }

  dadosCliente = {
    nome: document.getElementById("nomeCliente").value,
    apelido: document.getElementById("apelidoCliente").value,
    telefone: telefoneLimpo,
    rua: document.getElementById("ruaCliente").value,
    bairro: document.getElementById("bairroCliente").value,
    numero: document.getElementById("numeroCasa").value,
    referencia: document.getElementById("referenciaCliente").value
  };

  localStorage.setItem("dadosCliente", JSON.stringify(dadosCliente));

  modalDados.classList.remove("ativo");
  modalPagamento.classList.add("ativo");

  renderizarCarrinho();
});

// FECHAR PAGAMENTO
fecharPagamento.addEventListener("click", function () {
  modalPagamento.classList.remove("ativo");
});

// ESCOLHA DE PAGAMENTO
document.querySelectorAll('input[name="pagamento"]').forEach(function (radio) {
  radio.addEventListener("change", function () {
    const metodo = this.value;

    if (metodo === "pix") {
      detalhesPagamento.innerHTML = `
        <div class="box-pix">
          <p><strong>Pagamento via Pix</strong></p>
          <p>Chave Pix: ${chavePix}</p>
          <p>Ao enviar o pedido no WhatsApp, a chave Pix também vai junto na mensagem.</p>
        </div>
      `;
    }

    if (metodo === "cartao") {
      detalhesPagamento.innerHTML = `
        <div class="box-cartao">
          <p><strong>Pagamento em cartão</strong></p>
          <p>O pagamento será realizado na entrega ou retirada.</p>
        </div>
      `;
    }

    if (metodo === "dinheiro") {
      detalhesPagamento.innerHTML = `
        <div class="box-dinheiro">
          <p><strong>Pagamento em dinheiro</strong></p>
          <label for="trocoPara">Troco para quanto?</label>
          <input type="text" id="trocoPara" placeholder="Ex: 50,00">
        </div>
      `;
    }
  });
});

// ENVIAR PEDIDO PARA O WHATSAPP
formPagamento.addEventListener("submit", function (e) {
  e.preventDefault();

  const metodoSelecionado = document.querySelector('input[name="pagamento"]:checked');

  if (!metodoSelecionado) {
    alert("Selecione uma forma de pagamento.");
    return;
  }

  let trocoPara = "";
  let infoPagamento = "";

  if (metodoSelecionado.value === "pix") {
    infoPagamento = `Pix\nChave Pix: ${chavePix}`;
  }

  if (metodoSelecionado.value === "cartao") {
    infoPagamento = "Cartão";
  }

  if (metodoSelecionado.value === "dinheiro") {
    const campoTroco = document.getElementById("trocoPara");
    trocoPara = campoTroco ? campoTroco.value.trim() : "";

    infoPagamento = "Dinheiro";

    if (trocoPara !== "") {
      infoPagamento += `\nTroco para: ${trocoPara}`;
    }
  }

  const totalPedido = calcularTotalCarrinho();

  const pedidoFinal = {
    idPedido: "PED-" + Date.now(),
    data: new Date().toISOString(),
    cliente: dadosCliente,
    itens: gerarResumoPedido(),
    total: totalPedido,
    pagamento: {
      metodo: metodoSelecionado.value,
      trocoPara: trocoPara || null,
      status: metodoSelecionado.value === "pix" ? "pendente" : "aguardando"
    },
    statusPedido: "novo"
  };

  localStorage.setItem("pedidoFinal", JSON.stringify(pedidoFinal));

  const mensagem =
`Olá! Quero fazer este pedido:

${montarTextoItensCarrinho()}*Total do pedido:* ${formatarMoeda(totalPedido)}

*Dados do cliente*
Nome: ${dadosCliente.nome}
Apelido: ${dadosCliente.apelido || "-"}
Telefone: ${dadosCliente.telefone}
Rua: ${dadosCliente.rua}
Bairro: ${dadosCliente.bairro}
Número: ${dadosCliente.numero}
Referência: ${dadosCliente.referencia || "-"}

*Forma de pagamento*
${infoPagamento}`;

  const linkWhatsApp = `https://wa.me/${whatsappLoja}?text=${encodeURIComponent(mensagem)}`;

  window.open(linkWhatsApp, "_blank");

  modalPagamento.classList.remove("ativo");
  formDadosCliente.reset();
  formPagamento.reset();
  detalhesPagamento.innerHTML = "";

  carrinho = [];
  atualizarCarrinhoBar();
  renderizarCarrinho();
});
// MODAIS DE INFORMACAO
const abrirBeneficios = document.getElementById("abrirBeneficios");
const abrirHistoria = document.getElementById("abrirHistoria");

const modalBeneficios = document.getElementById("modalBeneficios");
const modalHistoria = document.getElementById("modalHistoria");

const fecharBeneficios = document.getElementById("fecharBeneficios");
const fecharHistoria = document.getElementById("fecharHistoria");

abrirBeneficios.addEventListener("click", function (e) {
  e.preventDefault();
  menu.classList.remove("active");
  btn.classList.remove("active");
  modalBeneficios.classList.add("ativo");
});

abrirHistoria.addEventListener("click", function (e) {
  e.preventDefault();
  menu.classList.remove("active");
  btn.classList.remove("active");
  modalHistoria.classList.add("ativo");
});

fecharBeneficios.addEventListener("click", function () {
  modalBeneficios.classList.remove("ativo");
});

fecharHistoria.addEventListener("click", function () {
  modalHistoria.classList.remove("ativo");
});