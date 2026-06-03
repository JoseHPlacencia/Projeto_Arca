const videos = document.querySelectorAll(".icone_login");

videos.forEach((video) => {
  video.addEventListener("error", () => {
    const wrap = video.closest(".opcao-icon-wrap");
    if (!wrap) return;
    video.style.display = "none";
    const fallback = wrap.querySelector(".opcao-icon-fallback");
    if (fallback) fallback.style.display = "flex";
  });

  video.closest(".opcao")?.addEventListener("mouseenter", () => {
    video.play().catch(() => {});
  });
});

const opcoes = document.querySelectorAll(".opcao");
const container = document.querySelector(".contas");

opcoes.forEach((opcao) => {
  const ativar = () => {
    opcoes.forEach((o) => o.classList.remove("ativa"));
    opcao.classList.add("ativa");
  };

  opcao.addEventListener("mouseenter", ativar);
  opcao.addEventListener("focus", ativar);
});

container?.addEventListener("mouseleave", () => {
  opcoes.forEach((o) => o.classList.remove("ativa"));
  if (opcoes[1]) opcoes[1].classList.add("ativa");
});

const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), index * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach((el) => revealObserver.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("visible"));
}

const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  nav?.classList.toggle("scrolled", window.scrollY > 30);
}, { passive: true });

document.querySelector(".hero-cta")?.addEventListener("click", (event) => {
  event.preventDefault();
  document.querySelector("#contas")?.scrollIntoView({ behavior: "smooth", block: "start" });
});
