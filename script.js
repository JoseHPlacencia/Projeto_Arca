const opcoes = Array.from(document.querySelectorAll(".opcao"));
const container = document.querySelector(".contas");
const reveals = Array.from(document.querySelectorAll(".reveal"));
const nav = document.querySelector("nav");
const heroCta = document.querySelector(".hero-cta");

function ativarOpcao(opcao) {
    opcoes.forEach(item => item.classList.toggle("ativa", item === opcao));
}

opcoes.forEach(opcao => {
    opcao.addEventListener("mouseenter", () => ativarOpcao(opcao));
    opcao.addEventListener("focus", () => ativarOpcao(opcao));
});

container?.addEventListener("mouseleave", () => {
    ativarOpcao(opcoes[1]);
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;

        setTimeout(() => {
            entry.target.classList.add("visible");
        }, index * 80);

        revealObserver.unobserve(entry.target);
    });
}, { threshold: 0.12 });

reveals.forEach(element => revealObserver.observe(element));

window.addEventListener("scroll", () => {
    nav?.classList.toggle("scrolled", window.scrollY > 30);
}, { passive: true });

heroCta?.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#contas")?.scrollIntoView({ behavior: "smooth", block: "start" });
});
