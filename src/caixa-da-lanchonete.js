import cardapio from "./dados.json";

class CaixaDaLanchonete {
  calcularValorDaCompra(formaDePagamento, itens) {
    const formasDePagamento = ["dinheiro",
                               "debito",
                               "credito"];

    let tCafe      = false;
    let tChantily  = false;
    let tQueijo    = false;
    let tSanduiche = false;
    let vTotal     = 0;
   

    if (itens.length === 0) {
        return "Não há itens no carrinho de compra!";
      }

    if (!formasDePagamento.includes(formaDePagamento)) {
      return "Forma de pagamento inválida!";
    }


    for (const item of itens) {
      const [codigo, quantidade] = item.split(",");
    if (!cardapio[codigo]) {
        return "Item inválido!";
      }

    if (codigo === "cafe") {
        tCafe = true;
      } else if (codigo === "chantily" && formaDePagamento === "dinheiro" || formaDePagamento === "credito") {
    if (!tCafe) {
          return "Item extra não pode ser pedido sem o principal";
        }
        tChantily = true;
      }

    if (codigo === "sanduiche") {
        tSanduiche = true;
      } else if (codigo === "queijo" && formaDePagamento === "debito") {
    if (!tSanduiche) {
          return "Item extra não pode ser pedido sem o principal";
        }
        tQueijo = true;
      }
      
    if (quantidade <= 0) {
        return "Quantidade inválida!";
      }

      vTotal += cardapio[codigo].valor * quantidade;
    }

   if (formaDePagamento  === "dinheiro") {
      vTotal = vTotal * 0.95;
  } else if (formaDePagamento  === "credito") {
      vTotal = vTotal * 1.03;
  }
    
  

    return `R$ ${vTotal.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };