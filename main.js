var EMAIL = "pedrohcifuentes0022@gmail.com";
var WHATSAPP = "5531993981532";

var botaoTema = document.getElementById("theme-toggle");

function aplicarTema(tema) {
  document.documentElement.setAttribute("data-theme", tema);
  if (botaoTema) {
    botaoTema.textContent = tema === "dark" ? "Modo claro" : "Modo escuro";
  }
}

var temaSalvo = null;
try {
  temaSalvo = localStorage.getItem("theme");
} catch (e) {}
aplicarTema(temaSalvo === "dark" ? "dark" : "light");

if (botaoTema) {
  botaoTema.addEventListener("click", function () {
    var novo = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    aplicarTema(novo);
    try {
      localStorage.setItem("theme", novo);
    } catch (e) {}
  });
}

var botaoMenu = document.getElementById("menu-toggle");
var menu = document.getElementById("nav");

if (botaoMenu && menu) {
  botaoMenu.addEventListener("click", function () {
    menu.classList.toggle("aberto");
  });
}

var digitado = document.getElementById("typed");

if (digitado) {
  var frases = [
    "Estudante de Técnico em Informática",
    "Aprendendo programação na prática",
    "Em busca do primeiro estágio",
  ];
  var fraseAtual = 0;
  var letra = 0;
  var apagando = false;

  function digitar() {
    var frase = frases[fraseAtual];
    digitado.textContent = frase.slice(0, letra);
    var tempo = apagando ? 35 : 75;

    if (!apagando && letra === frase.length) {
      apagando = true;
      tempo = 1500;
    } else if (apagando && letra === 0) {
      apagando = false;
      fraseAtual = (fraseAtual + 1) % frases.length;
      tempo = 400;
    } else {
      letra += apagando ? -1 : 1;
    }
    setTimeout(digitar, tempo);
  }
  digitar();
}

var elementos = document.querySelectorAll(".aparecer");

if ("IntersectionObserver" in window) {
  var observador = new IntersectionObserver(function (itens) {
    itens.forEach(function (item) {
      if (item.isIntersecting) {
        item.target.classList.add("visivel");
        observador.unobserve(item.target);
      }
    });
  }, { threshold: 0.15 });

  elementos.forEach(function (el) {
    observador.observe(el);
  });
} else {
  elementos.forEach(function (el) {
    el.classList.add("visivel");
  });
}

var hero = document.querySelector(".hero");

if (hero) {
  window.addEventListener("scroll", function () {
    hero.style.setProperty("--parallax", window.scrollY);
  });
}

var overlay = document.getElementById("modal-overlay");
var conteudoModal = document.getElementById("modal-body");

function abrirModal(html) {
  conteudoModal.innerHTML = html;
  overlay.classList.add("aberto");
}

function fecharModal() {
  overlay.classList.remove("aberto");
}

if (overlay) {
  overlay.addEventListener("click", function (e) {
    if (e.target === overlay || e.target.closest("[data-fechar]")) {
      fecharModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      fecharModal();
    }
  });
}

var projetos = {
  todo: {
    titulo: "To-Do List",
    texto: "Meu primeiro projeto focado em lógica de programação. É uma lista de tarefas em que o JavaScript cria e atualiza os elementos da página.",
    itens: [
      "Adicionar tarefas pelo botão ou pela tecla Enter",
      "Editar e excluir tarefas",
      "Salvar as tarefas com LocalStorage, para não sumirem ao atualizar a página",
    ],
    habilidades: "HTML5, CSS3 (Flexbox e animações), JavaScript, manipulação do DOM, LocalStorage",
    link: "https://github.com/pedr01311/to-do-list",
  },
  login: {
    titulo: "Tela de Login",
    texto: "Sistema de cadastro e login de usuários feito com Python (Flask) e banco de dados MySQL.",
    itens: [
      "Cadastro de usuários com confirmação de senha",
      "Login validado no banco de dados",
      "Mensagens de aviso na tela",
    ],
    habilidades: "Python, Flask, MySQL, HTML, CSS, arquivo .env para as configurações",
    link: "https://github.com/pedr01311/telaLogin",
  },
  weather: {
    titulo: "Dashboard de Clima",
    texto: "Projeto que mostra o clima atual de qualquer cidade. O back-end em FastAPI busca os dados na API OpenWeather e o front-end mostra o resultado.",
    itens: [
      "Busca do clima por cidade",
      "API feita com FastAPI (Python)",
      "Front-end que consome a API usando fetch",
    ],
    habilidades: "Python, FastAPI, consumo de API REST, JavaScript (fetch), HTML5, CSS3 (Grid e Flexbox)",
    link: "https://github.com/pedr01311/WeatherAPi",
  },
};

document.querySelectorAll("[data-projeto]").forEach(function (botao) {
  botao.addEventListener("click", function () {
    var p = projetos[botao.dataset.projeto];
    var lista = "";
    p.itens.forEach(function (item) {
      lista += "<li>" + item + "</li>";
    });

    abrirModal(
      '<button class="fechar-x" data-fechar aria-label="Fechar">✕</button>' +
        "<h3>" + p.titulo + "</h3>" +
        "<p>" + p.texto + "</p>" +
        "<ul>" + lista + "</ul>" +
        "<p><strong>Habilidades usadas:</strong> " + p.habilidades + "</p>" +
        '<div class="botoes">' +
        '<a class="btn" href="' + p.link + '" target="_blank" rel="noopener">Ver no GitHub</a>' +
        '<button class="btn outline" data-fechar>Fechar</button>' +
        "</div>"
    );
  });
});

var form = document.getElementById("contact-form");

if (form) {
  var nome = form.elements.nome;
  var telefone = form.elements.telefone;
  var email = form.elements.email;
  var mensagem = form.elements.mensagem;
  var contador = document.getElementById("msg-counter");
  var enviar = form.querySelector("button[type=submit]");

  nome.addEventListener("input", function () {
    nome.value = nome.value.replace(/[^A-Za-zÀ-ÿ\s'-]/g, "");
  });

  telefone.addEventListener("input", function () {
    var n = telefone.value.replace(/\D/g, "").slice(0, 11);
    var r = n;
    if (n.length > 10) {
      r = "(" + n.slice(0, 2) + ") " + n.slice(2, 7) + "-" + n.slice(7);
    } else if (n.length > 6) {
      r = "(" + n.slice(0, 2) + ") " + n.slice(2, 6) + "-" + n.slice(6);
    } else if (n.length > 2) {
      r = "(" + n.slice(0, 2) + ") " + n.slice(2);
    } else if (n.length > 0) {
      r = "(" + n;
    }
    telefone.value = r;
  });

  email.addEventListener("input", function () {
    email.value = email.value.replace(/\s/g, "").toLowerCase();
  });

  mensagem.addEventListener("input", function () {
    contador.textContent = mensagem.value.length + " / 500";
  });

  function validar(campo, ok, texto) {
    var div = campo.closest(".campo");
    div.classList.toggle("erro", !ok);
    div.querySelector(".msg-erro").textContent = ok ? "" : texto;
    return ok;
  }

  function validarTudo() {
    var ok1 = validar(nome, nome.value.trim().split(/\s+/).length >= 2, "Digite nome e sobrenome.");
    var ok2 = validar(telefone, telefone.value.replace(/\D/g, "").length === 11, "Digite o telefone completo: (00) 00000-0000.");
    var ok3 = validar(email, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value), "Digite um e-mail válido.");
    var ok4 = validar(mensagem, mensagem.value.trim().length >= 10, "A mensagem precisa ter pelo menos 10 caracteres.");
    return ok1 && ok2 && ok3 && ok4;
  }

  function mostrarSucesso(primeiroNome) {
    abrirModal(
      '<button class="fechar-x" data-fechar aria-label="Fechar">✕</button>' +
        "<h3>Mensagem enviada</h3>" +
        "<p>Obrigado pelo contato, " + primeiroNome + "! Respondo assim que possível, de preferência no período da manhã.</p>" +
        '<div class="botoes"><button class="btn" data-fechar>Fechar</button></div>'
    );
  }

  function mostrarFalha(texto) {
    var zap = "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(texto);
    var mail = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Contato pelo portfólio") + "&body=" + encodeURIComponent(texto);
    abrirModal(
      '<button class="fechar-x" data-fechar aria-label="Fechar">✕</button>' +
        "<h3>Não consegui enviar por aqui</h3>" +
        "<p>Pode ser a conexão ou o serviço de envio. Você ainda pode mandar a mesma mensagem por um dos botões abaixo.</p>" +
        '<div class="botoes">' +
        '<a class="btn" href="' + zap + '" target="_blank" rel="noopener">Enviar pelo WhatsApp</a>' +
        '<a class="btn outline" href="' + mail + '">Enviar por e-mail</a>' +
        "</div>"
    );
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validarTudo()) {
      return;
    }

    var primeiroNome = nome.value.trim().split(" ")[0];
    var texto =
      "Nome: " + nome.value.trim() + "\n" +
      "Telefone: " + telefone.value + "\n" +
      "E-mail: " + email.value + "\n\n" +
      mensagem.value.trim();

    enviar.disabled = true;
    enviar.textContent = "Enviando...";

    fetch("https://formsubmit.co/ajax/" + EMAIL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        nome: nome.value.trim(),
        telefone: telefone.value,
        email: email.value,
        mensagem: mensagem.value.trim(),
        _subject: "Contato pelo portfólio - " + nome.value.trim(),
        _replyto: email.value,
        _captcha: "false",
        _template: "table",
      }),
    })
      .then(function (resposta) {
        return resposta.json();
      })
      .then(function (dados) {
        if (dados.success === "true" || dados.success === true) {
          mostrarSucesso(primeiroNome);
          form.reset();
          contador.textContent = "0 / 500";
        } else {
          mostrarFalha(texto);
        }
      })
      .catch(function () {
        mostrarFalha(texto);
      })
      .finally(function () {
        enviar.disabled = false;
        enviar.textContent = "Enviar";
      });
  });
}

var ano = document.getElementById("year");
if (ano) {
  ano.textContent = new Date().getFullYear();
}
