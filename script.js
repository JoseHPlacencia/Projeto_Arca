

const videos = document.querySelectorAll(".icone_login");

videos.forEach(video => {

    video.addEventListener("error", () => {
        const wrap = video.closest(".opcao-icon-wrap");
        if (wrap) {
            video.style.display = "none";
            const fallback = wrap.querySelector(".opcao-icon-fallback");
            if (fallback) fallback.style.display = "flex";
        }
    });

    video.closest(".opcao")?.addEventListener("mouseenter", () => {
        video.play().catch(() => {}); 
    });

    video.closest(".opcao")?.addEventListener("mouseleave", () => {

    });
});

const opcoes = document.querySelectorAll(".opcao");
const container = document.querySelector(".contas");

opcoes.forEach(opcao => {
    opcao.addEventListener("mouseenter", () => {
        opcoes.forEach(o => o.classList.remove("ativa"));
        opcao.classList.add("ativa");
    });

    opcao.addEventListener("focus", () => {
        opcoes.forEach(o => o.classList.remove("ativa"));
        opcao.classList.add("ativa");
    });
});

if (container) {
    container.addEventListener("mouseleave", () => {
        opcoes.forEach(o => o.classList.remove("ativa"));
        if (opcoes[1]) opcoes[1].classList.add("ativa"); 
    });
}

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {

            setTimeout(() => {
                entry.target.classList.add("visible");
            }, i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        nav?.classList.add("scrolled");
    } else {
        nav?.classList.remove("scrolled");
    }
}, { passive: true });

document.querySelector(".hero-cta")?.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector("
    if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });

        setTimeout(() => {
            const cards = document.querySelector(".contas");
            if (cards) cards.style.animationPlayState = "running";
        }, 600);
    }
});
