(function () {
  var R = document.body.dataset.root || "";
  var links = [["Equipamentos", "equipamentos.html"], ["Colaboradores", "colaboradores.html"], ["LabTeCog", "labtecog.html"], ["Postagens", "postagens/"], ["Agendamento", "agendamento.html"]];
  var top = document.getElementById("topo");
  if (top) {
    top.innerHTML = '<div class="bar"><a class="brand" href="' + R + 'index.html"><img src="' + R + 'assets/img/logo-sm.png" alt="" width="48" height="45"><span>Espaço Maker<small>UENP – Campus Cornélio Procópio</small></span></a><button class="menu" type="button" aria-expanded="false" aria-controls="nav">Menu</button><nav id="nav" aria-label="Principal">' +
      links.map(function (l) { return '<a href="' + R + l[1] + '">' + l[0] + "</a>"; }).join("") + "</nav></div>";
    var nav = top.querySelector("nav"), btn = top.querySelector(".menu");
    var here = location.pathname.replace(/index\.html$/, "");
    [].forEach.call(nav.children, function (a) {
      var p = a.pathname.replace(/index\.html$/, "");
      if (here.indexOf(p) === 0) a.setAttribute("aria-current", "page");
    });
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
  }
  var foot = document.getElementById("rodape");
  if (foot) foot.innerHTML = '<div class="wrap"><img src="' + R + 'assets/img/logo-cristo.svg" alt="Logo do Espaço Maker UENP, com o Cristo de Cornélio Procópio" width="77" height="96"><div><b style="color:#fff">Espaço Maker – UENP</b><br>Campus Cornélio Procópio · Bloco H, salas H22 e H17<br>PR 160, Km 0 (saída para Leópolis), Cornélio Procópio – PR</div><div><a href="https://www.instagram.com/uenp_maker_ccp/">@uenp_maker_ccp</a><br><a href="mailto:espacomaker.agendamentos.ccp@uenp.edu.br">espacomaker.agendamentos.ccp@uenp.edu.br</a><br><a href="https://uenp.edu.br/ccp">uenp.edu.br/ccp</a></div></div>';

  function fmt(d) { return new Date(d + "T12:00:00").toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" }); }
  function row(p) {
    return '<article class="row"><time datetime="' + p.data + '">' + fmt(p.data) + '</time><div><h3><a href="' + R + "postagens/" + p.arquivo + '">' + p.titulo + "</a></h3><p>" + p.resumo + '</p><span class="tag">' + p.categoria + "</span></div></article>";
  }
  var posts = (window.POSTS || []).slice().sort(function (a, b) { return b.data.localeCompare(a.data); });
  var list = document.getElementById("lista-posts");
  if (list) {
    var limit = parseInt(list.dataset.limit || "0", 10), chips = document.getElementById("filtros");
    var draw = function (cat) {
      var sel = posts.filter(function (p) { return !cat || p.categoria === cat; });
      if (limit) sel = sel.slice(0, limit);
      list.innerHTML = sel.length ? sel.map(row).join("") : "<p>Nenhuma postagem nesta categoria ainda.</p>";
    };
    if (chips) {
      var cats = posts.map(function (p) { return p.categoria; }).filter(function (c, i, a) { return a.indexOf(c) === i; });
      chips.innerHTML = ["Todas"].concat(cats).map(function (c, i) { return '<button type="button" aria-pressed="' + (i === 0) + '">' + c + "</button>"; }).join("");
      chips.addEventListener("click", function (e) {
        if (e.target.tagName !== "BUTTON") return;
        [].forEach.call(chips.children, function (b) { b.setAttribute("aria-pressed", b === e.target); });
        draw(e.target.textContent === "Todas" ? "" : e.target.textContent);
      });
    }
    draw("");
  }

  var f = document.getElementById("agenda");
  if (f) f.addEventListener("submit", function (e) {
    e.preventDefault();
    var d = new FormData(f);
    var corpo = "Nome: " + d.get("nome") + "\nCurso/instituição: " + d.get("inst") + "\nEquipamento: " + d.get("equip") + "\nData desejada: " + d.get("data") + "\n\nDescrição do projeto:\n" + d.get("desc");
    location.href = "mailto:espacomaker.agendamentos.ccp@uenp.edu.br?subject=" + encodeURIComponent("Agendamento – " + d.get("nome")) + "&body=" + encodeURIComponent(corpo);
  });
})();
