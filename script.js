let carrinho = [];
const carrinhoSidebar = document.getElementById("carrinho");
const toggleCarrinho = document.getElementById("toggle-carrinho");

// Abrir carrinho
toggleCarrinho.addEventListener("click", () => {
  carrinhoSidebar.classList.add("open");
});

// Fechar carrinho
function fecharCarrinho() {
  carrinhoSidebar.classList.remove("open");
}

// Adicionar produto
function adicionarProduto(nome, preco) {
  const itemExistente = carrinho.find(item => item.nome === nome);
  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({ nome, preco, quantidade: 1 });
  }
  atualizarCarrinho();
}

// Alterar quantidade (+ ou -)
function alterarQuantidade(index, valor) {
  carrinho[index].quantidade += valor;
  if (carrinho[index].quantidade <= 0) {
    carrinho.splice(index, 1);
  }
  atualizarCarrinho();
}

// Atualizar carrinho
function atualizarCarrinho() {
  const lista = document.getElementById("carrinho-lista");
  const count = document.getElementById("carrinho-count");
  const totalElement = document.getElementById("carrinho-total");

  lista.innerHTML = "";
  let totalItens = 0;
  let totalValor = 0;

  carrinho.forEach((item, index) => {
    totalItens += item.quantidade;
    totalValor += parseFloat(item.preco.replace("R$", "").replace(",", ".").trim()) * item.quantidade;

    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nome} - ${item.preco} x${item.quantidade}
      <div class="quantidade-controle">
        <button onclick="alterarQuantidade(${index}, -1)">-</button>
        <button onclick="alterarQuantidade(${index}, 1)">+</button>
      </div>
    `;
    lista.appendChild(li);
  });

  // Atualiza contador e total
  count.textContent = totalItens;
  totalElement.textContent = `Total: R$ ${totalValor.toFixed(2).replace(".", ",")}`;
}

const images = [
  "lettering craft.jpg",
  "lettering 2.jpeg",
  "lettering 3.jpeg",
  "Lettering 4.webp"
];
let currentIndex = 0;

// Abrir modal
function openModal(index) {
  currentIndex = index;
  document.getElementById("modalImg").src = images[currentIndex];
  const modal = document.getElementById("imageModal");
  modal.classList.add("active");

  // Esconde botão carrinho atrás do modal
  document.getElementById("toggle-carrinho").style.zIndex = "0";
}

// Fechar modal
function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.classList.remove("active");

  // Restaura botão carrinho
  document.getElementById("toggle-carrinho").style.zIndex = "1000";
}

// Navegar imagens
function changeImage(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;
  document.getElementById("modalImg").src = images[currentIndex];
}

// Fechar modal clicando fora da imagem
document.getElementById("imageModal").addEventListener("click", (e) => {
  if (e.target.id === "imageModal") {
    closeModal();
  }
});


// Finalizar compra via WhatsApp
function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  const numero = "5599999999999"; // seu número
  const mensagem = carrinho.map(item => `${item.nome} - ${item.preco} x${item.quantidade}`).join("\n");
  const url = `https://wa.me/${numero}?text=${encodeURIComponent("Olá, gostaria de comprar:\n" + mensagem)}`;
  window.open(url, "_blank");
}
