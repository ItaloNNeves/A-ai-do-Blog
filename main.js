// MENU
const btn = document.querySelector(".dbaction");
const menu = document.querySelector(".lishe");

function telaMaior() {
  return window.innerWidth >= 750;
}

if (btn) {
  btn.addEventListener("click", function () {
    if (telaMaior()) return;
    btn.classList.toggle("active");
    menu.classList.toggle("active");
  });
}

if (menu) {
  menu.addEventListener("click", function () {
    if (telaMaior()) return;
    btn.classList.remove("active");
    menu.classList.remove("active");
  });
}

window.addEventListener("resize", function () {
  if (telaMaior()) {
    btn.classList.remove("active");
    menu.classList.remove("active");
  }
});

// ROLAGEM HORIZONTAL
const cards = document.querySelector(".boxsabores");
const esq = document.querySelector(".setleft");
const dir = document.querySelector(".setright");

if (dir) {
  dir.addEventListener("click", function () {
    cards.scrollLeft += 300;
  });
}

if (esq) {
  esq.addEventListener("click", function () {
    cards.scrollLeft -= 300;
  });
}

// BANNER
const slider = document.querySelector(".imgbnn");
const totalSlides = document.querySelectorAll(".imgsbox").length;
const dots = document.querySelectorAll(".dot");

let index = 0;

if (slider && totalSlides > 0 && dots.length > 0) {
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
}

// CONFIGURACOES DA LOJA
const whatsappLoja = "5575981449511";
const chavePix = "75982988444";
const nomeRecebedorPix = "ACAI DO BLOG";
const cidadeRecebedorPix = "SALVADOR";
const enderecoRetirada = {
  bairro: "Santo Antônio",
  rua: "Rua São Pedro",
  numero: "25"
};

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

const nomeClienteEl = document.getElementById("nomeCliente");
const apelidoClienteEl = document.getElementById("apelidoCliente");
const telefoneClienteEl = document.getElementById("telefoneCliente");
const ruaClienteEl = document.getElementById("ruaCliente");
const bairroClienteEl = document.getElementById("bairroCliente");
const numeroCasaEl = document.getElementById("numeroCasa");
const referenciaClienteEl = document.getElementById("referenciaCliente");

const radiosTipoEntrega = document.querySelectorAll('input[name="tipoEntrega"]');
const avisoEntrega = document.getElementById("avisoEntrega");
const infoRetirada = document.getElementById("infoRetirada");
const camposEntrega = document.getElementById("camposEntrega");

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

  if (carrinho.length === 0) {
    listaCarrinho.innerHTML = `<p class="carrinho-vazio">Seu carrinho está vazio.</p>`;
    totalCarrinhoEl.textContent = formatarMoeda(0);
    totalPagamento.textContent = formatarMoeda(0);
    return;
  }

  carrinho.forEach(function (item, indexItem) {
    totalGeral += item.total;

    listaCarrinho.innerHTML += `
      <div class="item-carrinho">
        <div class="item-topo">
          <h4>${item.produto.nome}</h4>
          <button type="button" class="btn-remover-item" data-index="${indexItem}" title="Remover item">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
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

function removerAcentos(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function somenteNumeros(texto) {
  return texto.replace(/\D/g, "");
}

function formatarCampoPix(id, valor) {
  const tamanho = String(valor.length).padStart(2, "0");
  return id + tamanho + valor;
}

function calcularCRC16(payload) {
  let polinomio = 0x1021;
  let resultado = 0xFFFF;

  for (let i = 0; i < payload.length; i++) {
    resultado ^= payload.charCodeAt(i) << 8;

    for (let j = 0; j < 8; j++) {
      if ((resultado & 0x8000) !== 0) {
        resultado = (resultado << 1) ^ polinomio;
      } else {
        resultado <<= 1;
      }

      resultado &= 0xFFFF;
    }
  }

  return resultado.toString(16).toUpperCase().padStart(4, "0");
}

function gerarPayloadPix(chave, nome, cidade, valor = null) {
  const chaveLimpa = chave.trim();
  const nomeLimpo = removerAcentos(nome).toUpperCase().slice(0, 25);
  const cidadeLimpa = removerAcentos(cidade).toUpperCase().slice(0, 15);

  const gui = formatarCampoPix("00", "BR.GOV.BCB.PIX");
  const chaveCampo = formatarCampoPix("01", chaveLimpa);
  const merchantAccountInfo = formatarCampoPix("26", gui + chaveCampo);

  const payloadFormatIndicator = "000201";
  const pointOfInitiationMethod = "010211";
  const merchantCategoryCode = "52040000";
  const transactionCurrency = "5303986";

  const transactionAmount = valor
    ? formatarCampoPix("54", Number(valor).toFixed(2))
    : "";

  const countryCode = "5802BR";
  const merchantName = formatarCampoPix("59", nomeLimpo);
  const merchantCity = formatarCampoPix("60", cidadeLimpa);
  const additionalDataField = formatarCampoPix("62", formatarCampoPix("05", "***"));

  const semCRC =
    payloadFormatIndicator +
    pointOfInitiationMethod +
    merchantAccountInfo +
    merchantCategoryCode +
    transactionCurrency +
    transactionAmount +
    countryCode +
    merchantName +
    merchantCity +
    additionalDataField +
    "6304";

  const crc = calcularCRC16(semCRC);
  return semCRC + crc;
}

function gerarUrlQrCode(texto) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(texto)}`;
}

function renderizarDetalhesPix() {
  const payloadPix = gerarPayloadPix(chavePix, nomeRecebedorPix, cidadeRecebedorPix);

  detalhesPagamento.innerHTML = `
    <div class="box-pix">
      <p><strong>Pagamento via Pix</strong></p>
      <p>Escaneie o QR Code abaixo ou copie a chave Pix.</p>

      <div class="pix-qrcode-area">
        <img src="${gerarUrlQrCode(payloadPix)}" alt="QR Code Pix">
      </div>

      <div class="pix-chave-box">
        <strong>Chave Pix:</strong><br>
        <span id="textoChavePix">${chavePix}</span>
      </div>

      <button type="button" class="btn-copiar-pix" id="btnCopiarPix">Copiar chave Pix</button>

      <div class="aviso-pix">
        Após o pagamento, envie o comprovante no WhatsApp para agilizar a confirmação do seu pedido.
      </div>
    </div>
  `;

  const btnCopiarPix = document.getElementById("btnCopiarPix");

  btnCopiarPix.addEventListener("click", async function () {
    try {
      await navigator.clipboard.writeText(chavePix);
      btnCopiarPix.textContent = "Chave Pix copiada!";
      setTimeout(function () {
        btnCopiarPix.textContent = "Copiar chave Pix";
      }, 2000);
    } catch (erro) {
      alert("Não foi possível copiar automaticamente. Copie manualmente a chave Pix.");
    }
  });
}

function configurarCamposEntrega(tipo) {
  const isEntrega = tipo === "entrega";

  avisoEntrega.classList.add("hidden");
  infoRetirada.classList.add("hidden");

  if (isEntrega) {
    avisoEntrega.classList.remove("hidden");
    camposEntrega.classList.remove("hidden");

    ruaClienteEl.required = true;
    bairroClienteEl.required = true;
    numeroCasaEl.required = true;
  } else if (tipo === "retirada") {
    infoRetirada.classList.remove("hidden");
    camposEntrega.classList.add("hidden");

    ruaClienteEl.required = false;
    bairroClienteEl.required = false;
    numeroCasaEl.required = false;
    referenciaClienteEl.required = false;

    ruaClienteEl.value = "";
    bairroClienteEl.value = "";
    numeroCasaEl.value = "";
    referenciaClienteEl.value = "";
  }
}

function resetarFormularioDados() {
  formDadosCliente.reset();
  avisoEntrega.classList.add("hidden");
  infoRetirada.classList.add("hidden");
  camposEntrega.classList.remove("hidden");

  ruaClienteEl.required = false;
  bairroClienteEl.required = false;
  numeroCasaEl.required = false;
}

function removerItemCarrinho(indexItem) {
  carrinho.splice(indexItem, 1);
  atualizarCarrinhoBar();
  renderizarCarrinho();

  if (carrinho.length === 0) {
    modalCarrinho.classList.remove("ativo");
  }
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

listaCarrinho.addEventListener("click", function (e) {
  const botaoRemover = e.target.closest(".btn-remover-item");

  if (!botaoRemover) return;

  const indexItem = Number(botaoRemover.dataset.index);
  removerItemCarrinho(indexItem);
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

// ENTREGA OU RETIRADA
radiosTipoEntrega.forEach(function (radio) {
  radio.addEventListener("change", function () {
    configurarCamposEntrega(this.value);
  });
});

// FORMULARIO DE DADOS
formDadosCliente.addEventListener("submit", function (e) {
  e.preventDefault();

  const telefoneDigitado = telefoneClienteEl.value;
  const telefoneLimpo = limparTelefone(telefoneDigitado);
  const tipoSelecionado = document.querySelector('input[name="tipoEntrega"]:checked');

  if (!tipoSelecionado) {
    alert("Selecione entrega ou retirada.");
    return;
  }

  if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
    alert("Digite um telefone válido com DDD.");
    return;
  }

  if (tipoSelecionado.value === "entrega") {
    if (!ruaClienteEl.value.trim() || !bairroClienteEl.value.trim() || !numeroCasaEl.value.trim()) {
      alert("Preencha os dados de endereço para entrega.");
      return;
    }
  }

  dadosCliente = {
    tipoEntrega: tipoSelecionado.value,
    nome: nomeClienteEl.value.trim(),
    apelido: apelidoClienteEl.value.trim(),
    telefone: telefoneLimpo,
    rua: tipoSelecionado.value === "entrega" ? ruaClienteEl.value.trim() : "",
    bairro: tipoSelecionado.value === "entrega" ? bairroClienteEl.value.trim() : "",
    numero: tipoSelecionado.value === "entrega" ? numeroCasaEl.value.trim() : "",
    referencia: tipoSelecionado.value === "entrega" ? referenciaClienteEl.value.trim() : ""
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
      renderizarDetalhesPix();
    }

    if (metodo === "cartao") {
      detalhesPagamento.innerHTML = `
        <div class="box-cartao">
          <p><strong>Pagamento em cartão</strong></p>
          <p>O pagamento será realizado na ${dadosCliente && dadosCliente.tipoEntrega === "retirada" ? "retirada" : "entrega"}.</p>
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
    infoPagamento = `Pix
Chave Pix: ${chavePix}
Enviar comprovante para o WhatsApp: ${whatsappLoja}`;
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

  const blocoEntregaOuRetirada =
    dadosCliente.tipoEntrega === "entrega"
      ? `*Tipo do pedido*
Entrega

*Endereço de entrega*
Rua: ${dadosCliente.rua}
Bairro: ${dadosCliente.bairro}
Número: ${dadosCliente.numero}
Referência: ${dadosCliente.referencia || "-"}

*Atenção*
Tenho ciência de que a taxa de entrega é a partir de R$ 5,00 e o valor exato será enviado no WhatsApp conforme a localização.`
      : `*Tipo do pedido*
Retirada

*Local de retirada*
Bairro: ${enderecoRetirada.bairro}
Rua: ${enderecoRetirada.rua}
Número: ${enderecoRetirada.numero}`;

  const mensagem =
`Olá! Quero fazer este pedido:

${montarTextoItensCarrinho()}*Total do pedido:* ${formatarMoeda(totalPedido)}

*Dados do cliente*
Nome: ${dadosCliente.nome}
Apelido: ${dadosCliente.apelido || "-"}
Telefone: ${dadosCliente.telefone}

${blocoEntregaOuRetirada}

*Forma de pagamento*
${infoPagamento}

${metodoSelecionado.value === "pix" ? "*Aviso:* vou enviar o comprovante do Pix neste WhatsApp." : ""}`;

  const linkWhatsApp = `https://wa.me/${whatsappLoja}?text=${encodeURIComponent(mensagem)}`;

  window.open(linkWhatsApp, "_blank");

  modalPagamento.classList.remove("ativo");
  formDadosCliente.reset();
  formPagamento.reset();
  detalhesPagamento.innerHTML = "";

  resetarFormularioDados();

  carrinho = [];
  dadosCliente = null;
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

// ESTADO INICIAL
renderizarCarrinho();
atualizarCarrinhoBar();
resetarFormularioDados();