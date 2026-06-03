// ============================================
//  PROGRAMA ARCA — script.js
//  Lógica original preservada + melhorias
// ============================================

// ---- Ícones animados (vídeos) ----
const videos = document.querySelectorAll(".icone_login");

videos.forEach(video => {
    // Tenta mostrar o fallback SVG enquanto o vídeo não carrega
    video.addEventListener("error", () => {
        const wrap = video.closest(".opcao-icon-wrap");
        if (wrap) {
            video.style.display = "none";
            const fallback = wrap.querySelector(".opcao-icon-fallback");
            if (fallback) fallback.style.display = "flex";
        }
    });

    // Ao passar o mouse, toca o vídeo
    video.closest(".opcao")?.addEventListener("mouseenter", () => {
        video.play().catch(() => {}); // silencia erros de autoplay
    });

    // Ao sair, pausa e volta ao início (opcional, suave)
    video.closest(".opcao")?.addEventListener("mouseleave", () => {
        // Deixa rodando para suavidade — pausa se quiser:
        // video.pause(); video.currentTime = 0;
    });
});

// ---- Controle das caixas de perfil ----
const opcoes = document.querySelectorAll(".opcao");
const container = document.querySelector(".contas");

opcoes.forEach(opcao => {
    opcao.addEventListener("mouseenter", () => {
        opcoes.forEach(o => o.classList.remove("ativa"));
        opcao.classList.add("ativa");
    });

    // Acessibilidade: suporte a teclado
    opcao.addEventListener("focus", () => {
        opcoes.forEach(o => o.classList.remove("ativa"));
        opcao.classList.add("ativa");
    });
});

// Ao sair do container, volta o estado padrão (cidadão = meio)
if (container) {
    container.addEventListener("mouseleave", () => {
        opcoes.forEach(o => o.classList.remove("ativa"));
        if (opcoes[1]) opcoes[1].classList.add("ativa"); // cidadão
    });
}

// ---- Animação de reveal ao rolar ----
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Pequeno delay escalonado para cada elemento
            setTimeout(() => {
                entry.target.classList.add("visible");
            }, i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

// ---- Nav com sombra ao rolar ----
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        nav?.classList.add("scrolled");
    } else {
        nav?.classList.remove("scrolled");
    }
}, { passive: true });

// ---- Ativação suave do link do hero ----
document.querySelector(".hero-cta")?.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector("#contas");
    if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // Pequeno delay antes de ativar animação das cards
        setTimeout(() => {
            const cards = document.querySelector(".contas");
            if (cards) cards.style.animationPlayState = "running";
        }, 600);
    }
});
