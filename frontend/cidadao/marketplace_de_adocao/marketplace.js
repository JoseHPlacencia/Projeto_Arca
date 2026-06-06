const DOG_VIDEO = "https://huggingface.co/datasets/Lightricks/Squish-Dataset/resolve/main/videos/dog.mp4";
const CAT_VIDEO = "https://upload.wikimedia.org/wikipedia/commons/transcoded/f/f7/Cat-on-bed.webm/Cat-on-bed.webm.480p.vp9.webm";

const animals = [
    {
        id: "nina",
        name: "Nina",
        type: "Cão",
        sex: "Fêmea",
        ageGroup: "Jovem",
        ageMonths: 18,
        ageLabel: "1 ano e 6 meses",
        size: "Médio",
        energy: "Média",
        neighborhood: "Jardim Camburi",
        city: "Vitória",
        distance: 3,
        ong: "Associação Patas Unidas",
        status: "Disponível",
        match: 94,
        vaccinated: true,
        castrated: true,
        apartment: true,
        kids: true,
        tags: ["carinhosa", "aprende rápido", "passeios leves"],
        story: "Foi acolhida depois de um resgate em dia de chuva. Gosta de rotina previsível, companhia e passeios tranquilos.",
        details: "Nina combina com famílias que querem presença sem agitação. Ela caminha bem de guia e descansa perto da janela depois do almoço.",
        health: "Vacinada, castrada, vermifugada e sem uso contínuo de medicamentos.",
        timeline: [
            ["Março", "Resgate e acolhimento inicial."],
            ["Abril", "Vacinação e adaptação em lar temporário."],
            ["Maio", "Liberada para visitas com adotantes."]
        ],
        images: [
            "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=82",
            "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=1200&q=82",
            "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=1200&q=82"
        ],
        video: { src: DOG_VIDEO, type: "video/mp4" }
    },
    {
        id: "tom",
        name: "Tom",
        type: "Gato",
        sex: "Macho",
        ageGroup: "Adulto",
        ageMonths: 42,
        ageLabel: "3 anos e 6 meses",
        size: "Pequeno",
        energy: "Baixa",
        neighborhood: "Praia da Costa",
        city: "Vila Velha",
        distance: 6,
        ong: "Instituto Gato Seguro",
        status: "Pronto para visita",
        match: 89,
        vaccinated: true,
        castrated: true,
        apartment: true,
        kids: false,
        tags: ["silencioso", "gosta de altura", "independente"],
        story: "Tom é observador e tranquilo. Prefere chegar devagar, mas cria vínculo quando ganha tempo para se adaptar.",
        details: "Ideal para apartamento telado e pessoas que respeitam tempo de adaptação. Ele gosta de caixas, janelas e brincadeiras curtas com vareta.",
        health: "Vacinado, castrado, FIV/FELV negativo e com exames recentes.",
        timeline: [
            ["Fevereiro", "Encontrado próximo a uma obra."],
            ["Março", "Triagem veterinária e castração."],
            ["Maio", "Socialização concluída."]
        ],
        images: [
            "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=82",
            "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=1200&q=82",
            "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=1200&q=82"
        ],
        video: { src: CAT_VIDEO, type: "video/webm" }
    },
    {
        id: "luma",
        name: "Luma",
        type: "Cão",
        sex: "Fêmea",
        ageGroup: "Filhote",
        ageMonths: 7,
        ageLabel: "7 meses",
        size: "Pequeno",
        energy: "Alta",
        neighborhood: "Laranjeiras",
        city: "Serra",
        distance: 9,
        ong: "Projeto Lar Temporário",
        status: "Em socialização",
        match: 86,
        vaccinated: true,
        castrated: false,
        apartment: true,
        kids: true,
        tags: ["brincalhona", "curiosa", "boa com crianças"],
        story: "Luma é pequena no tamanho e enorme na vontade de descobrir o mundo. Aprende comandos por petiscos e elogios.",
        details: "Precisa de família com tempo para educação positiva e brincadeiras diárias. Funciona bem em apartamento com enriquecimento ambiental.",
        health: "Vacinada, vermifugada e com castração programada pela ONG.",
        timeline: [
            ["Abril", "Acolhida com a ninhada."],
            ["Maio", "Primeiras vacinas concluídas."],
            ["Junho", "Previsão de castração."]
        ],
        images: [
            "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=82",
            "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=82",
            "https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=1200&q=82"
        ],
        video: { src: DOG_VIDEO, type: "video/mp4" }
    },
    {
        id: "brisa",
        name: "Brisa",
        type: "Gato",
        sex: "Fêmea",
        ageGroup: "Jovem",
        ageMonths: 14,
        ageLabel: "1 ano e 2 meses",
        size: "Pequeno",
        energy: "Média",
        neighborhood: "Campo Grande",
        city: "Cariacica",
        distance: 12,
        ong: "Rede de Proteção Animal",
        status: "Disponível",
        match: 92,
        vaccinated: true,
        castrated: true,
        apartment: true,
        kids: true,
        tags: ["ronrona", "sociável", "adora janela"],
        story: "Brisa chegou tímida, mas virou especialista em cochilos ensolarados e recepção de visitas.",
        details: "Boa opção para quem busca uma gata sociável, com adaptação rápida e energia equilibrada.",
        health: "Vacinada, castrada, vermifugada e sem histórico de alergias.",
        timeline: [
            ["Janeiro", "Entrada na rede de lares temporários."],
            ["Março", "Castração realizada."],
            ["Maio", "Liberada para adoção responsável."]
        ],
        images: [
            "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=1200&q=82",
            "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=82",
            "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=1200&q=82"
        ],
        video: { src: CAT_VIDEO, type: "video/webm" }
    },
    {
        id: "atlas",
        name: "Atlas",
        type: "Cão",
        sex: "Macho",
        ageGroup: "Adulto",
        ageMonths: 60,
        ageLabel: "5 anos",
        size: "Grande",
        energy: "Média",
        neighborhood: "Centro",
        city: "Linhares",
        distance: 15,
        ong: "Abrigo São Francisco",
        status: "Disponível",
        match: 81,
        vaccinated: true,
        castrated: true,
        apartment: false,
        kids: true,
        tags: ["protetor", "calmo", "ama quintal"],
        story: "Atlas tem presença de guardião e coração de sofá. Responde bem a rotina e gosta de acompanhar adultos em caminhadas.",
        details: "Combina com casa, quintal seguro e tutores que apreciem cães grandes. É tranquilo com crianças em encontros supervisionados.",
        health: "Vacinado, castrado, controle articular preventivo recomendado.",
        timeline: [
            ["Dezembro", "Resgate em avenida movimentada."],
            ["Janeiro", "Tratamento de pele concluído."],
            ["Maio", "Disponível para entrevistas."]
        ],
        images: [
            "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=1200&q=82",
            "https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=1200&q=82",
            "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=82"
        ],
        video: { src: DOG_VIDEO, type: "video/mp4" }
    },
    {
        id: "sushi",
        name: "Theo",
        type: "Gato",
        sex: "Macho",
        ageGroup: "Filhote",
        ageMonths: 5,
        ageLabel: "5 meses",
        size: "Pequeno",
        energy: "Alta",
        neighborhood: "Itapuã",
        city: "Vila Velha",
        distance: 4,
        ong: "Coletivo Gatos do Bairro",
        status: "Pré-adoção",
        match: 87,
        vaccinated: true,
        castrated: false,
        apartment: true,
        kids: true,
        tags: ["brincalhão", "social", "adora brinquedo"],
        story: "Theo é ativo, curioso e responde bem a brincadeiras curtas. Precisa de rotina segura e casa telada.",
        details: "Pede casa telada e disponibilidade para brincadeiras. Pode conviver com outro gato sociável após adaptação gradual.",
        health: "Primeiras vacinas aplicadas, castração programada pelo termo de adoção.",
        timeline: [
            ["Abril", "Resgatado com irmãos."],
            ["Maio", "Primeira rodada de vacinas."],
            ["Junho", "Retorno veterinário agendado."]
        ],
        images: [
            "https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?auto=format&fit=crop&w=1200&q=82",
            "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?auto=format&fit=crop&w=1200&q=82",
            "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=1200&q=82"
        ],
        video: { src: CAT_VIDEO, type: "video/webm" }
    },
    {
        id: "gaia",
        name: "Gaia",
        type: "Cão",
        sex: "Fêmea",
        ageGroup: "Idoso",
        ageMonths: 108,
        ageLabel: "9 anos",
        size: "Médio",
        energy: "Baixa",
        neighborhood: "Meaípe",
        city: "Guarapari",
        distance: 18,
        ong: "Instituto Animais Sênior",
        status: "Adoção especial",
        match: 78,
        vaccinated: true,
        castrated: true,
        apartment: true,
        kids: false,
        tags: ["serena", "companheira", "pouco passeio"],
        story: "Gaia é para quem entende o luxo de uma companhia calma. Ela pede pouco, mas devolve presença constante.",
        details: "Ideal para uma casa tranquila, sem muita escada, com caminhadas curtas e carinho paciente.",
        health: "Vacinada, castrada e com check-up geriátrico em dia. Usa suplemento articular.",
        timeline: [
            ["Novembro", "Tutor anterior faleceu."],
            ["Dezembro", "Acolhida por lar temporário."],
            ["Maio", "Procura adoção especial."]
        ],
        images: [
            "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=1200&q=82",
            "https://images.unsplash.com/photo-1546238232-20216dec9f72?auto=format&fit=crop&w=1200&q=82",
            "https://images.unsplash.com/photo-1504595403659-9088ce801e29?auto=format&fit=crop&w=1200&q=82"
        ],
        video: { src: DOG_VIDEO, type: "video/mp4" }
    },
    {
        id: "pixel",
        name: "Chico",
        type: "Gato",
        sex: "Macho",
        ageGroup: "Idoso",
        ageMonths: 96,
        ageLabel: "8 anos",
        size: "Pequeno",
        energy: "Baixa",
        neighborhood: "Gilberto Machado",
        city: "Cachoeiro de Itapemirim",
        distance: 10,
        ong: "Associação Recomeço Animal",
        status: "Disponível",
        match: 84,
        vaccinated: true,
        castrated: true,
        apartment: true,
        kids: false,
        tags: ["calmo", "muito limpo", "gosta de colo"],
        story: "Chico é um gato idoso e calmo. Gosta de colo no fim do dia e de lugares macios perto de gente tranquila.",
        details: "Combina com apartamento telado, rotina tranquila e adotante que queira companhia afetuosa sem correria.",
        health: "Vacinado, castrado, exames renais acompanhados preventivamente.",
        timeline: [
            ["Janeiro", "Entrada após despejo coletivo."],
            ["Fevereiro", "Exames completos."],
            ["Maio", "Perfil aprovado para adoção."]
        ],
        images: [
            "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=1200&q=82",
            "https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=1200&q=82",
            "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?auto=format&fit=crop&w=1200&q=82"
        ],
        video: { src: CAT_VIDEO, type: "video/webm" }
    }
];

const favoriteKey = "arcaMarketplaceFavorites";
const page = document.body.dataset.page;

function qs(selector, root = document) {
    return root.querySelector(selector);
}

function qsa(selector, root = document) {
    return Array.from(root.querySelectorAll(selector));
}

function readMarketSession() {
    try {
        return JSON.parse(localStorage.getItem("arcaSession"));
    } catch {
        return null;
    }
}

function marketRootUrl() {
    const scriptUrl = document.currentScript?.src || new URL("./marketplace.js", window.location.href).href;
    return new URL("../../../", scriptUrl);
}

function marketAppUrl(path) {
    return new URL(path, marketRootUrl()).href;
}

function marketSamePath(urlA, urlB) {
    return new URL(urlA, window.location.href).pathname.replace(/\/$/, "") ===
        new URL(urlB, window.location.href).pathname.replace(/\/$/, "");
}

function marketNavItems(profile) {
    const byProfile = {
        Tutor: [
            { label: "Tutor", icon: "bi-person-heart", path: "cidadao/index.html" },
            { label: "Meus animais", icon: "bi-house-heart", path: "cidadao/meus_animais/index.html" },
            { label: "Carteira", icon: "bi-file-earmark-medical", path: "cidadao/carteira_digital/index.html" },
            { label: "Denúncias", icon: "bi-megaphone", path: "cidadao/denuncias/index.html" },
            { label: "Adoção", icon: "bi-search-heart", path: "cidadao/marketplace_de_adocao/index.html" },
            { label: "Favoritos", icon: "bi-heart", path: "cidadao/marketplace_de_adocao/favoritos.html", badge: true }
        ],
        Candidato: [
            { label: "Adoção", icon: "bi-search-heart", path: "cidadao/marketplace_de_adocao/index.html" },
            { label: "Favoritos", icon: "bi-heart", path: "cidadao/marketplace_de_adocao/favoritos.html", badge: true },
            { label: "Denúncias", icon: "bi-megaphone", path: "cidadao/denuncias/index.html" }
        ],
        ONG: [
            { label: "Painel ONG", icon: "bi-building-heart", path: "ong/dashboard.html" },
            { label: "Estoque", icon: "bi-box-seam", path: "ong/estoque.html" },
            { label: "Marketplace", icon: "bi-search-heart", path: "cidadao/marketplace_de_adocao/index.html" },
            { label: "Agenda", icon: "bi-calendar2-check", path: "clinica/agenda.html" },
            { label: "Prontuário", icon: "bi-journal-medical", path: "clinica/prontuario.html" }
        ],
        Prefeitura: [
            { label: "Prefeitura", icon: "bi-bank", path: "prefeitura/home_prefeitura.html" },
            { label: "Denúncias", icon: "bi-megaphone", path: "cidadao/denuncias/index.html" },
            { label: "ONGs", icon: "bi-building-heart", path: "ong/dashboard.html" },
            { label: "Relatórios", icon: "bi-clipboard-data", path: "prefeitura/home_prefeitura.html" }
        ]
    };

    return byProfile[profile] || [
        { label: "Adoção", icon: "bi-search-heart", path: "cidadao/marketplace_de_adocao/index.html" },
        { label: "Favoritos", icon: "bi-heart", path: "cidadao/marketplace_de_adocao/favoritos.html", badge: true },
        { label: "Tutor", icon: "bi-person", path: "cidadao/index.html" },
        { label: "Login", icon: "bi-box-arrow-in-right", path: "login/index.html" }
    ];
}

function initMarketNavigation() {
    const session = readMarketSession();

    qsa(".arca-nav .navbar-nav").forEach((nav) => {
        const items = marketNavItems(session?.profile);
        nav.innerHTML = items.map((item) => {
            const href = marketAppUrl(item.path);
            const active = marketSamePath(window.location.href, href);
            const badge = item.badge ? '<span class="favorite-count badge rounded-pill">0</span>' : "";
            return `
                <li class="nav-item">
                    <a class="nav-link ${active ? "active" : ""}" href="${href}">
                        <i class="bi ${item.icon}"></i><span>${item.label}</span>${badge}
                    </a>
                </li>
            `;
        }).join("");

        if (session?.profile) {
            nav.insertAdjacentHTML("beforeend", `
                <li class="nav-item">
                    <button class="nav-link nav-link-logout" type="button" data-market-logout>
                        <i class="bi bi-box-arrow-right"></i><span>Sair</span>
                    </button>
                </li>
            `);
        }
    });

    qsa("[data-market-logout]").forEach((button) => {
        button.addEventListener("click", () => {
            localStorage.removeItem("arcaSession");
            window.location.href = marketAppUrl("login/index.html");
        });
    });
}

function getFavorites() {
    try {
        return JSON.parse(localStorage.getItem(favoriteKey)) || [];
    } catch {
        return [];
    }
}

function setFavorites(ids) {
    try {
        localStorage.setItem(favoriteKey, JSON.stringify(ids));
    } catch {
        showToast("Não foi possível salvar favoritos neste navegador.");
    }
    updateFavoriteCount();
}

function isFavorite(id) {
    return getFavorites().includes(id);
}

function toggleFavorite(id) {
    const favorites = getFavorites();
    const next = favorites.includes(id)
        ? favorites.filter((favoriteId) => favoriteId !== id)
        : [...favorites, id];

    setFavorites(next);
    qsa(`[data-favorite-id="${id}"]`).forEach((button) => {
        const active = next.includes(id);
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-label", active ? "Remover dos favoritos" : "Adicionar aos favoritos");
        button.innerHTML = button.classList.contains("favorite-inline")
            ? `<i class="bi ${active ? "bi-heart-fill" : "bi-heart"}"></i> ${active ? "Perfil guardado" : "Guardar perfil"}`
            : `<i class="bi ${active ? "bi-heart-fill" : "bi-heart"}"></i>`;
    });
    showToast(next.includes(id) ? "Adicionado aos favoritos." : "Removido dos favoritos.");

    if (page === "favorites") {
        renderFavorites();
    }

    if (page === "marketplace" && qs("#favoritesOnly")?.classList.contains("active")) {
        renderMarketplace();
    }
}

function updateFavoriteCount() {
    const total = getFavorites().length;
    qsa(".favorite-count").forEach((item) => {
        item.textContent = total;
    });

    const statFavorites = qs("#statFavorites");
    if (statFavorites) {
        statFavorites.textContent = total;
    }
}

function showToast(message) {
    const toastEl = qs("#arcaToast");
    if (!toastEl || !window.bootstrap) return;
    qs(".toast-body", toastEl).textContent = message;
    bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 1800 }).show();
}

function uniqueValues(key) {
    return [...new Set(animals.map((animal) => animal[key]))].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

function animalCard(animal) {
    const favorite = isFavorite(animal.id);
    const tags = animal.tags.slice(0, 3).map((tag) => `<span>${tag}</span>`).join("");

    return `
        <article class="animal-card">
            <div class="animal-media">
                <img src="${animal.images[0]}" alt="${animal.name}, ${animal.type.toLowerCase()} para adoção" loading="lazy">
                <span class="animal-status">${animal.status}</span>
                <button class="favorite-toggle ${favorite ? "is-active" : ""}" type="button" data-favorite-id="${animal.id}" aria-label="${favorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}">
                    <i class="bi ${favorite ? "bi-heart-fill" : "bi-heart"}"></i>
                </button>
            </div>
            <div class="animal-content">
                <p class="animal-place mb-1">${animal.neighborhood}, ${animal.city}</p>
                <h3 class="h4 mb-1">${animal.name}</h3>
                <p class="animal-keeper mb-0">${animal.ong}</p>
                <div class="animal-meta">
                    <span>${animal.type}</span>
                    <span>${animal.ageLabel}</span>
                    <span>${animal.size}</span>
                    <span>${animal.sex}</span>
                </div>
                <p class="animal-story">${animal.story}</p>
                <div class="distance-note"><i class="bi bi-geo-alt"></i>${animal.distance} km de distância</div>
                <div class="animal-meta">${tags}</div>
                <div class="card-actions">
                    <a class="btn btn-primary rounded-1" href="./detalhes.html?id=${animal.id}">
                        <i class="bi bi-arrow-right"></i>
                        Ver perfil
                    </a>
                    <button class="btn btn-outline-primary rounded-1" type="button" data-quick-adopt="${animal.id}" title="Conversar com a ONG">
                        <i class="bi bi-send"></i>
                    </button>
                </div>
            </div>
        </article>
    `;
}

function bindCardActions(root = document) {
    qsa("[data-favorite-id]", root).forEach((button) => {
        button.addEventListener("click", () => toggleFavorite(button.dataset.favoriteId));
    });

    qsa("[data-quick-adopt]", root).forEach((button) => {
        button.addEventListener("click", () => {
            const animal = animals.find((item) => item.id === button.dataset.quickAdopt);
            showToast(`Interesse em ${animal.name} registrado.`);
        });
    });
}

function selectedCheckboxValues(group) {
    return qsa(`[data-filter-group="${group}"] input:checked`).map((input) => input.value);
}

function readFilters() {
    return {
        search: qs("#searchInput")?.value.trim().toLowerCase() || "",
        type: qs("#typeFilter")?.value || "todos",
        ages: selectedCheckboxValues("age"),
        sizes: selectedCheckboxValues("size"),
        sex: qs("#sexFilter")?.value || "todos",
        energy: qs("#energyFilter")?.value || "todos",
        neighborhood: qs("#neighborhoodFilter")?.value || "todos",
        distance: Number(qs("#distanceFilter")?.value || 24),
        vaccinated: qs("#vaccinatedFilter")?.checked || false,
        castrated: qs("#castratedFilter")?.checked || false,
        apartment: qs("#apartmentFilter")?.checked || false,
        kids: qs("#kidsFilter")?.checked || false,
        sort: qs("#sortFilter")?.value || "match",
        favoritesOnly: qs("#favoritesOnly")?.classList.contains("active") || false
    };
}

function filterAnimals(filters) {
    const favorites = getFavorites();

    return animals.filter((animal) => {
        const haystack = [animal.name, animal.type, animal.ong, animal.neighborhood, animal.city, animal.tags.join(" "), animal.story].join(" ").toLowerCase();
        if (filters.search && !haystack.includes(filters.search)) return false;
        if (filters.type !== "todos" && animal.type !== filters.type) return false;
        if (filters.ages.length && !filters.ages.includes(animal.ageGroup)) return false;
        if (filters.sizes.length && !filters.sizes.includes(animal.size)) return false;
        if (filters.sex !== "todos" && animal.sex !== filters.sex) return false;
        if (filters.energy !== "todos" && animal.energy !== filters.energy) return false;
        if (filters.neighborhood !== "todos" && animal.neighborhood !== filters.neighborhood) return false;
        if (animal.distance > filters.distance) return false;
        if (filters.vaccinated && !animal.vaccinated) return false;
        if (filters.castrated && !animal.castrated) return false;
        if (filters.apartment && !animal.apartment) return false;
        if (filters.kids && !animal.kids) return false;
        if (filters.favoritesOnly && !favorites.includes(animal.id)) return false;
        return true;
    }).sort((a, b) => {
        if (filters.sort === "distance") return a.distance - b.distance;
        if (filters.sort === "age") return a.ageMonths - b.ageMonths;
        if (filters.sort === "name") return a.name.localeCompare(b.name, "pt-BR");
        return b.match - a.match;
    });
}

function renderActiveFilters(filters) {
    const container = qs("#activeFilters");
    if (!container) return;

    const pills = [];
    if (filters.search) pills.push(`Busca: ${filters.search}`);
    if (filters.type !== "todos") pills.push(filters.type);
    filters.ages.forEach((age) => pills.push(age));
    filters.sizes.forEach((size) => pills.push(size));
    if (filters.sex !== "todos") pills.push(filters.sex);
    if (filters.energy !== "todos") pills.push(`Energia ${filters.energy}`);
    if (filters.neighborhood !== "todos") pills.push(filters.neighborhood);
    pills.push(`Até ${filters.distance} km`);
    if (filters.vaccinated) pills.push("Vacinado");
    if (filters.castrated) pills.push("Castrado");
    if (filters.apartment) pills.push("Apartamento");
    if (filters.kids) pills.push("Crianças");
    if (filters.favoritesOnly) pills.push("Só favoritos");

    container.innerHTML = pills.map((pill) => `<span class="filter-pill"><i class="bi bi-check2"></i>${pill}</span>`).join("");
}

function renderMarketplace() {
    const grid = qs("#animalsGrid");
    if (!grid) return;

    const filters = readFilters();
    const filtered = filterAnimals(filters);
    grid.innerHTML = filtered.map(animalCard).join("");

    qs("#resultCount").textContent = filtered.length;
    qs("#distanceValue").textContent = filters.distance;
    qs("#emptyState").classList.toggle("d-none", filtered.length > 0);
    renderActiveFilters(filters);
    bindCardActions(grid);
}

function populateMarketplace() {
    const neighborhoods = uniqueValues("neighborhood");
    const select = qs("#neighborhoodFilter");
    if (select) {
        select.insertAdjacentHTML("beforeend", neighborhoods.map((name) => `<option value="${name}">${name}</option>`).join(""));
    }

    const onInput = () => renderMarketplace();
    ["#searchInput", "#typeFilter", "#sexFilter", "#energyFilter", "#neighborhoodFilter", "#distanceFilter", "#sortFilter"].forEach((selector) => {
        qs(selector)?.addEventListener("input", onInput);
    });

    qsa(".filter-deck input[type='checkbox']").forEach((input) => {
        input.addEventListener("change", onInput);
    });

    qs("#favoritesOnly")?.addEventListener("click", (event) => {
        event.currentTarget.classList.toggle("active");
        renderMarketplace();
    });

    qsa("#resetFilters, [data-reset-filters]").forEach((button) => {
        button.addEventListener("click", resetFilters);
    });

    renderStats();
    renderMarketplace();
}

function resetFilters() {
    qs("#filterForm")?.reset();
    qs("#favoritesOnly")?.classList.remove("active");
    qs("#distanceFilter").value = 24;
    renderMarketplace();
}

function renderStats() {
    const ongs = new Set(animals.map((animal) => animal.ong));

    if (qs("#statAnimals")) qs("#statAnimals").textContent = animals.length;
    if (qs("#statOngs")) qs("#statOngs").textContent = ongs.size;
    if (qs("#apartmentCount")) qs("#apartmentCount").textContent = animals.filter((animal) => animal.apartment).length;
}

function renderFavorites() {
    const grid = qs("#favoritesGrid");
    if (!grid) return;

    const favorites = getFavorites();
    const favoriteAnimals = animals.filter((animal) => favorites.includes(animal.id));
    grid.innerHTML = favoriteAnimals.map(animalCard).join("");
    qs("#favoritesEmpty").classList.toggle("d-none", favoriteAnimals.length > 0);
    bindCardActions(grid);
}

function detailTemplate(animal) {
    const galleryId = `petGallery-${animal.id}`;
    const gallerySlides = animal.images.map((image, index) => `
        <div class="carousel-item ${index === 0 ? "active" : ""}">
            <img src="${image}" alt="${animal.name} - foto ${index + 1}" loading="${index === 0 ? "eager" : "lazy"}">
        </div>
    `).join("");
    const galleryIndicators = animal.images.map((_, index) => `
        <button type="button" data-bs-target="#${galleryId}" data-bs-slide-to="${index}" class="${index === 0 ? "active" : ""}" aria-label="Foto ${index + 1}" ${index === 0 ? 'aria-current="true"' : ""}></button>
    `).join("");

    const facts = [
        ["bi-calendar3", "Idade", animal.ageLabel],
        ["bi-arrows-angle-expand", "Porte", animal.size],
        ["bi-lightning-charge", "Energia", animal.energy],
        ["bi-geo-alt", "Distância", `${animal.distance} km`],
        ["bi-tag", "Tipo", animal.type],
        ["bi-gender-ambiguous", "Sexo", animal.sex]
    ].map(([icon, label, value]) => `
        <div class="profile-fact">
            <i class="bi ${icon}"></i>
            <div>
                <span>${label}</span>
                <strong>${value}</strong>
            </div>
        </div>
    `).join("");

    const badges = [animal.type, animal.ageLabel, animal.size, animal.sex, `${animal.distance} km`, animal.energy].map((badge) => `<span class="detail-badge">${badge}</span>`).join("");
    const routine = animal.tags.map((tag) => `<span><i class="bi bi-check2"></i>${tag}</span>`).join("");
    const traits = [
        ["bi-shield-check", "Vacinado", animal.vaccinated ? "Sim" : "Em andamento"],
        ["bi-heart-pulse", "Castrado", animal.castrated ? "Sim" : "Programado"],
        ["bi-house-door", "Apartamento", animal.apartment ? "Combina" : "Prefere casa"],
        ["bi-people", "Crianças", animal.kids ? "Convive bem" : "Melhor sem crianças pequenas"]
    ].map(([icon, label, value]) => `
        <div class="trait-item">
            <i class="bi ${icon}"></i>
            <div>
                <strong>${label}</strong>
                <span>${value}</span>
            </div>
        </div>
    `).join("");

    const timeline = animal.timeline.map(([date, text]) => `
        <div class="timeline-item">
            <i class="bi bi-calendar2-week"></i>
            <div>
                <strong>${date}</strong>
                <p class="mb-0">${text}</p>
            </div>
        </div>
    `).join("");

    const favorite = isFavorite(animal.id);

    return `
        <section class="pet-profile">
            <div class="profile-photo profile-gallery">
                <div id="${galleryId}" class="carousel slide" data-bs-ride="false">
                    <div class="carousel-indicators">${galleryIndicators}</div>
                    <div class="carousel-inner">${gallerySlides}</div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#${galleryId}" data-bs-slide="prev" aria-label="Foto anterior">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#${galleryId}" data-bs-slide="next" aria-label="Próxima foto">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>
                </div>
                <div class="profile-caption">
                    <span>${animal.neighborhood}</span>
                    <strong>${animal.city}</strong>
                </div>
            </div>

            <div class="profile-summary">
                <div class="profile-topline">
                    <a class="back-link" href="./index.html">
                        <i class="bi bi-arrow-left"></i>
                        Galeria
                    </a>
                    <span class="profile-status">${animal.status}</span>
                </div>

                <p class="profile-context">${animal.type} em ${animal.city} · cuidado por ${animal.ong}</p>
                <h1>${animal.name}</h1>
                <p class="profile-intro">${animal.details}</p>

                <div class="profile-facts">${facts}</div>

                <div class="routine-strip">
                    <span>Rotina ideal</span>
                    <div>${routine}</div>
                </div>

                <div class="detail-actions">
                    <button class="btn btn-primary rounded-1" type="button" data-bs-toggle="modal" data-bs-target="#adoptionModal">
                        <i class="bi bi-send"></i>
                        Conversar sobre ${animal.name}
                    </button>
                    <button class="btn btn-outline-primary rounded-1 favorite-inline ${favorite ? "is-active" : ""}" type="button" data-favorite-id="${animal.id}">
                        <i class="bi ${favorite ? "bi-heart-fill" : "bi-heart"}"></i>
                        ${favorite ? "Perfil guardado" : "Guardar perfil"}
                    </button>
                </div>

                <div class="shelter-note">
                    <i class="bi bi-geo-alt"></i>
                    <div>
                        <strong>${animal.ong}</strong>
                        <span>${animal.neighborhood}, ${animal.city}</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="detail-grid">
            <div>
                <div class="detail-panel story-panel">
                    <div class="panel-heading">
                        <span class="panel-icon"><i class="bi bi-journal-text"></i></span>
                        <div>
                            <span class="section-kicker">História</span>
                            <h2>Como ${animal.name} chegou até aqui</h2>
                        </div>
                    </div>
                    <p>${animal.story}</p>
                    <p>${animal.health}</p>
                    <div class="animal-meta mt-3">${badges}</div>
                </div>

                <div class="detail-panel">
                    <div class="panel-heading">
                        <span class="panel-icon"><i class="bi bi-clipboard2-check"></i></span>
                        <div>
                            <span class="section-kicker">Antes da visita</span>
                            <h2>O que observar</h2>
                        </div>
                    </div>
                    <div class="trait-list">${traits}</div>
                </div>

            </div>

            <aside>
                <div class="detail-panel">
                    <div class="panel-heading">
                        <span class="panel-icon"><i class="bi bi-sun"></i></span>
                        <div>
                            <span class="section-kicker">Rotina</span>
                            <h2>Combina melhor com</h2>
                        </div>
                    </div>
                    <div class="visual-list">
                        ${animal.tags.map((tag) => `<span><i class="bi bi-check2-circle"></i>${tag}</span>`).join("")}
                    </div>
                </div>

                <div class="detail-panel">
                    <div class="panel-heading">
                        <span class="panel-icon"><i class="bi bi-building"></i></span>
                        <div>
                            <span class="section-kicker">Responsável</span>
                            <h2>${animal.ong}</h2>
                        </div>
                    </div>
                    <div class="ong-note">
                        <span><i class="bi bi-geo-alt"></i>${animal.neighborhood}, ${animal.city}</span>
                        <span><i class="bi bi-chat-dots"></i>Visitas mediante conversa prévia</span>
                        <span><i class="bi bi-calendar-check"></i>Confirmação de disponibilidade</span>
                    </div>
                </div>

                <div class="detail-panel">
                    <div class="panel-heading">
                        <span class="panel-icon"><i class="bi bi-signpost-2"></i></span>
                        <div>
                            <span class="section-kicker">Linha do tempo</span>
                            <h2>Acompanhamento</h2>
                        </div>
                    </div>
                    <div class="timeline">${timeline}</div>
                </div>
            </aside>
        </section>
    `;
}

function renderDetail() {
    const root = qs("#detailContent");
    if (!root) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || animals[0].id;
    const animal = animals.find((item) => item.id === id);

    if (!animal) {
        root.innerHTML = `
            <div class="empty-state">
                <i class="bi bi-question-circle"></i>
                <h1>Perfil não encontrado.</h1>
                <p>Volte para a galeria e escolha outro animal.</p>
                <a class="btn btn-primary rounded-1" href="./index.html">Abrir galeria</a>
            </div>
        `;
        return;
    }

    document.title = `ARCA | ${animal.name}`;
    qs("#adoptionModalLabel").textContent = `Quero adotar ${animal.name}`;
    root.innerHTML = detailTemplate(animal);
    bindCardActions(root);

    qs("#adoptionForm")?.addEventListener("submit", (event) => {
        event.preventDefault();
        qs("#adoptionFeedback").classList.remove("d-none");
        showToast(`Solicitação para ${animal.name} registrada.`);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initMarketNavigation();
    updateFavoriteCount();

    if (page === "marketplace") {
        populateMarketplace();
    }

    if (page === "favorites") {
        renderFavorites();
    }

    if (page === "details") {
        renderDetail();
    }
});
