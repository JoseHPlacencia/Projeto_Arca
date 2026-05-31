const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function initCarousels() {
    qsa("[data-arca-carousel]").forEach((carousel) => {
        const slides = qsa("[data-slide]", carousel);
        const dots = qsa("[data-carousel-dot]", carousel);
        let current = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));

        const show = (index) => {
            current = (index + slides.length) % slides.length;
            slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === current));
            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle("is-active", dotIndex === current);
                dot.setAttribute("aria-pressed", dotIndex === current ? "true" : "false");
            });
        };

        qsa("[data-carousel-prev]", carousel).forEach((button) => {
            button.addEventListener("click", () => show(current - 1));
        });

        qsa("[data-carousel-next]", carousel).forEach((button) => {
            button.addEventListener("click", () => show(current + 1));
        });

        dots.forEach((dot, index) => dot.addEventListener("click", () => show(index)));

        if (slides.length > 1 && carousel.dataset.autoplay === "true") {
            window.setInterval(() => show(current + 1), 5200);
        }

        show(current);
    });
}

function initTabs() {
    qsa("[data-tabs]").forEach((tabs) => {
        const buttons = qsa("[data-tab]", tabs);
        const panels = qsa("[data-tab-panel]", tabs);

        const activate = (name) => {
            buttons.forEach((button) => {
                const active = button.dataset.tab === name;
                button.classList.toggle("is-active", active);
                button.setAttribute("aria-selected", active ? "true" : "false");
            });

            panels.forEach((panel) => {
                panel.classList.toggle("is-hidden", panel.dataset.tabPanel !== name);
            });
        };

        buttons.forEach((button) => {
            button.addEventListener("click", () => activate(button.dataset.tab));
        });

        activate(buttons[0]?.dataset.tab || panels[0]?.dataset.tabPanel);
    });
}

function initListFilters() {
    qsa("[data-filter-scope]").forEach((scope) => {
        const buttons = qsa("[data-filter-button]", scope);
        const items = qsa("[data-filter-item]", scope);
        const countTarget = qs("[data-filter-count]", scope);

        const apply = (value) => {
            let visible = 0;
            buttons.forEach((button) => button.classList.toggle("is-active", button.dataset.filterButton === value));
            items.forEach((item) => {
                const tags = (item.dataset.filterTags || "").split(" ");
                const show = value === "todos" || tags.includes(value);
                item.classList.toggle("is-hidden", !show);
                if (show) visible += 1;
            });
            if (countTarget) countTarget.textContent = visible;
        };

        buttons.forEach((button) => {
            button.addEventListener("click", () => apply(button.dataset.filterButton));
        });

        apply(buttons[0]?.dataset.filterButton || "todos");
    });
}

function initPrototypeForms() {
    qsa("[data-prototype-form]").forEach((form) => {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const note = qs(".form-note", form) || qs(`[data-form-note="${form.id}"]`);
            if (note) {
                note.textContent = "Registro salvo para a apresentação desta tela.";
                note.classList.add("is-visible");
            }
            form.reset();
        });
    });
}

function initToggleRows() {
    qsa("[data-toggle-done]").forEach((button) => {
        button.addEventListener("click", () => {
            const target = button.closest("[data-filter-item], .task-card, .calendar-slot, .inventory-row, .feed-row");
            target?.classList.toggle("opacity-75");
            button.classList.toggle("btn-primary");
            button.classList.toggle("btn-outline-primary");
            button.innerHTML = target?.classList.contains("opacity-75")
                ? '<i class="bi bi-check2-circle"></i> Feito'
                : '<i class="bi bi-circle"></i> Marcar';
        });
    });
}

function initSearchFilters() {
    qsa("[data-live-search]").forEach((input) => {
        const root = document.querySelector(input.dataset.liveSearch);
        if (!root) return;

        input.addEventListener("input", () => {
            const term = input.value.trim().toLowerCase();
            qsa("[data-search-text]", root).forEach((item) => {
                item.classList.toggle("is-hidden", term && !item.dataset.searchText.toLowerCase().includes(term));
            });
        });
    });
}

const arcaCredentials = {
    tutor: {
        password: "123456",
        profile: "Tutor",
        target: "../cidadao/index.html"
    },
    candidato: {
        password: "cand!098",
        profile: "Candidato",
        target: "../cidadao/marketplace_de_adocao/index.html"
    },
    ong: {
        password: "ong$-135",
        profile: "ONG",
        target: "../ong/dashboard.html"
    }
};

const accountProfiles = {
    tutor: {
        profile: "Tutor",
        target: "../cidadao/index.html"
    },
    candidato: {
        profile: "Candidato",
        target: "../cidadao/marketplace_de_adocao/index.html"
    },
    ong: {
        profile: "ONG",
        target: "../ong/dashboard.html"
    }
};

function loadAccounts() {
    try {
        const saved = JSON.parse(localStorage.getItem("arcaAccounts"));
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

function saveAccounts(records) {
    localStorage.setItem("arcaAccounts", JSON.stringify(records));
}

function findAccount(identifier, accounts = loadAccounts()) {
    const normalized = String(identifier || "").trim().toLowerCase();
    return accounts.find((account) => account.user === normalized || account.email === normalized);
}

function resolveCredential(username) {
    const normalized = String(username || "").trim().toLowerCase();
    const demoCredential = arcaCredentials[normalized];

    if (demoCredential) {
        return {
            ...demoCredential,
            user: normalized
        };
    }

    const account = findAccount(normalized);
    if (!account) return null;

    const profile = accountProfiles[account.profileKey] || accountProfiles.tutor;
    return {
        password: account.password,
        profile: profile.profile,
        target: profile.target,
        user: account.user
    };
}

function setLoginFeedback(target, message, type) {
    if (!target) return;
    target.textContent = message;
    target.classList.remove("is-error", "is-success");
    target.classList.add("is-visible", type === "success" ? "is-success" : "is-error");
}

function initLogin() {
    const form = qs("[data-login-form]");
    if (!form) return;

    const feedback = qs("[data-login-feedback]");
    const userInput = qs("#loginUser", form);
    const passwordInput = qs("#loginPassword", form);

    qsa("[data-login-demo]").forEach((button) => {
        button.addEventListener("click", () => {
            const credential = arcaCredentials[button.dataset.loginDemo];
            if (!credential) return;
            userInput.value = button.dataset.loginDemo;
            passwordInput.value = credential.password;
            userInput.focus();
        });
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = userInput.value.trim().toLowerCase();
        const credential = resolveCredential(username);

        if (!credential || passwordInput.value !== credential.password) {
            setLoginFeedback(feedback, "Usuário ou senha inválidos.", "error");
            passwordInput.select();
            return;
        }

        const session = {
            user: credential.user || username,
            profile: credential.profile,
            startedAt: new Date().toISOString()
        };

        localStorage.setItem("arcaSession", JSON.stringify(session));
        setLoginFeedback(feedback, `Acesso liberado para ${credential.profile}. Redirecionando...`, "success");
        window.setTimeout(() => {
            window.location.href = credential.target;
        }, 500);
    });
}

function initAccountForms() {
    const accountForm = qs("[data-account-form]");
    const recoveryForm = qs("[data-recovery-form]");

    if (accountForm) {
        const feedback = qs("[data-account-feedback]", accountForm);

        accountForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(accountForm);
            const user = String(formData.get("user") || "").trim().toLowerCase();
            const email = String(formData.get("email") || "").trim().toLowerCase();
            const password = String(formData.get("password") || "");
            const passwordConfirm = String(formData.get("passwordConfirm") || "");
            const profileKey = formData.get("profile");
            const profile = accountProfiles[profileKey];
            const accounts = loadAccounts();

            if (!profile) {
                setLoginFeedback(feedback, "Escolha um perfil para continuar.", "error");
                return;
            }

            if (password !== passwordConfirm) {
                setLoginFeedback(feedback, "As senhas não conferem.", "error");
                accountForm.elements.passwordConfirm.select();
                return;
            }

            if (arcaCredentials[user] || findAccount(user, accounts) || findAccount(email, accounts)) {
                setLoginFeedback(feedback, "Usuário ou e-mail já cadastrado.", "error");
                return;
            }

            const account = {
                id: `USR-${Date.now().toString().slice(-6)}`,
                name: String(formData.get("name") || "").trim(),
                user,
                email,
                phone: String(formData.get("phone") || "").trim(),
                profileKey,
                profile: profile.profile,
                password,
                createdAt: new Date().toISOString()
            };

            saveAccounts([...accounts, account]);
            localStorage.setItem("arcaSession", JSON.stringify({
                user: account.user,
                profile: account.profile,
                startedAt: new Date().toISOString()
            }));
            setLoginFeedback(feedback, `Conta criada para ${account.profile}. Redirecionando...`, "success");
            window.setTimeout(() => {
                window.location.href = profile.target;
            }, 700);
        });
    }

    if (recoveryForm) {
        const feedback = qs("[data-recovery-feedback]", recoveryForm);

        recoveryForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const formData = new FormData(recoveryForm);
            const identifier = String(formData.get("identifier") || "").trim().toLowerCase();
            const password = String(formData.get("password") || "");
            const passwordConfirm = String(formData.get("passwordConfirm") || "");
            const accounts = loadAccounts();
            const account = findAccount(identifier, accounts);

            if (arcaCredentials[identifier]) {
                setLoginFeedback(feedback, "As credenciais de teste são fixas. Use a tela de login ou crie uma conta local.", "error");
                return;
            }

            if (!account) {
                setLoginFeedback(feedback, "Conta local não encontrada.", "error");
                return;
            }

            if (password !== passwordConfirm) {
                setLoginFeedback(feedback, "As senhas não conferem.", "error");
                recoveryForm.elements.passwordConfirm.select();
                return;
            }

            const updatedAccounts = accounts.map((item) => item.id === account.id
                ? { ...item, password, updatedAt: new Date().toISOString() }
                : item);

            saveAccounts(updatedAccounts);
            setLoginFeedback(feedback, "Senha atualizada. Você já pode voltar ao login.", "success");
            recoveryForm.reset();
        });
    }
}

function readSession() {
    try {
        return JSON.parse(localStorage.getItem("arcaSession"));
    } catch {
        return null;
    }
}

function initSessionLabels() {
    const session = readSession();
    qsa("[data-session-label]").forEach((label) => {
        label.textContent = session?.profile ? `Perfil: ${session.profile}` : "Acesso público";
    });

    qsa("[data-logout]").forEach((button) => {
        button.addEventListener("click", () => {
            localStorage.removeItem("arcaSession");
            window.location.href = button.dataset.logout || "../login/index.html";
        });
    });
}

const inventoryDefaultItems = [
    {
        id: "STK-1001",
        name: "Ração filhote cães",
        category: "alimento",
        status: "baixo",
        quantity: 8,
        minimum: 36,
        unit: "kg",
        notes: "Saco aberto · consumo médio 2,4 kg/dia"
    },
    {
        id: "STK-1002",
        name: "Vermífugo 10 kg",
        category: "medicamento",
        status: "baixo",
        quantity: 9,
        minimum: 50,
        unit: "un.",
        notes: "Lote VF-204 · validade 09/2026"
    },
    {
        id: "STK-1003",
        name: "Tapete higiênico",
        category: "higiene",
        status: "ok",
        quantity: 19,
        minimum: 25,
        unit: "pct.",
        notes: "Pacotes fechados no armário 2"
    },
    {
        id: "STK-1004",
        name: "Vacina V4 felina",
        category: "medicamento",
        status: "atenção",
        quantity: 12,
        minimum: 25,
        unit: "doses",
        notes: "Refrigerada · lote V4-991 · vence em 28 dias"
    },
    {
        id: "STK-1005",
        name: "Ração gatos adultos",
        category: "alimento",
        status: "ok",
        quantity: 46,
        minimum: 50,
        unit: "kg",
        notes: "Doação recebida · separar por validade"
    }
];

function loadInventoryItems(key) {
    try {
        const saved = JSON.parse(localStorage.getItem(key));
        return Array.isArray(saved) ? saved : inventoryDefaultItems;
    } catch {
        return inventoryDefaultItems;
    }
}

function saveInventoryItems(key, records) {
    localStorage.setItem(key, JSON.stringify(records));
}

function inventoryStatusClass(status) {
    if (status === "ok") return "mint";
    if (status === "baixo") return "coral";
    return "sun";
}

function inventoryBarClass(item) {
    const ratio = item.minimum ? item.quantity / item.minimum : 1;
    if (ratio < .35) return "low";
    if (ratio < .65) return "mid";
    return "";
}

function inventoryPercent(item) {
    if (!item.minimum) return 100;
    return Math.max(4, Math.min(100, Math.round((item.quantity / item.minimum) * 100)));
}

function makeInventoryId() {
    return `STK-${Date.now().toString().slice(-5)}`;
}

function normalizeText(value) {
    return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    }[char]));
}

function initInventoryCrud() {
    const scope = qs("[data-inventory-crud]");
    const form = qs("[data-inventory-form]");
    const list = qs("#stockList");
    if (!scope || !form || !list) return;

    const storageKey = scope.dataset.storageKey || "arcaInventoryItems";
    const count = qs("[data-inventory-count]", scope);
    const search = qs("[data-inventory-search]", scope);
    const submitLabel = qs("[data-inventory-submit-label]", form);
    let records = loadInventoryItems(storageKey);
    let activeFilter = "todos";

    const resetForm = () => {
        form.reset();
        form.elements.itemId.value = "";
        if (submitLabel) submitLabel.textContent = "Salvar item";
    };

    const fillForm = (record) => {
        form.elements.itemId.value = record.id;
        form.elements.name.value = record.name;
        form.elements.category.value = record.category;
        form.elements.status.value = record.status;
        form.elements.quantity.value = record.quantity;
        form.elements.minimum.value = record.minimum;
        form.elements.unit.value = record.unit;
        form.elements.notes.value = record.notes;
        if (submitLabel) submitLabel.textContent = "Atualizar item";
        form.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const filteredRecords = () => {
        const term = normalizeText(search?.value || "");
        return records.filter((record) => {
            const tags = [record.category, record.status];
            const haystack = normalizeText(`${record.name} ${record.category} ${record.status} ${record.notes}`);
            const matchesFilter = activeFilter === "todos" || tags.includes(activeFilter);
            const matchesSearch = !term || haystack.includes(term);
            return matchesFilter && matchesSearch;
        });
    };

    const render = () => {
        const visibleRecords = filteredRecords().sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
        list.innerHTML = visibleRecords.map((record) => `
            <article class="inventory-row" data-record-id="${record.id}">
                <div>
                    <strong>${record.name}</strong>
                    <span class="d-block">${record.notes}</span>
                </div>
                <div>
                    <span class="badge-soft ${inventoryStatusClass(record.status)}">${record.status}</span>
                    <span class="badge-soft">${record.id}</span>
                </div>
                <div>
                    <div class="stock-bar ${inventoryBarClass(record)}" style="--stock: ${inventoryPercent(record)}%;"><span></span></div>
                    <span class="d-block mt-1">${record.quantity} ${record.unit} de ${record.minimum} ${record.unit} mínimos</span>
                </div>
                <div class="crud-actions">
                    <button class="btn btn-outline-primary" type="button" data-inventory-edit="${record.id}">
                        <i class="bi bi-pencil-square"></i>
                        Editar
                    </button>
                    <button class="btn btn-outline-primary" type="button" data-inventory-delete="${record.id}">
                        <i class="bi bi-trash3"></i>
                        Excluir
                    </button>
                </div>
            </article>
        `).join("");

        if (!visibleRecords.length) {
            list.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-inbox"></i>
                    <h3>Nenhum item encontrado.</h3>
                    <p>Ajuste os filtros ou cadastre um novo item no formulário.</p>
                </div>
            `;
        }

        if (count) count.textContent = visibleRecords.length;

        qsa("[data-inventory-edit]", list).forEach((button) => {
            button.addEventListener("click", () => {
                const record = records.find((item) => item.id === button.dataset.inventoryEdit);
                if (record) fillForm(record);
            });
        });

        qsa("[data-inventory-delete]", list).forEach((button) => {
            button.addEventListener("click", () => {
                const record = records.find((item) => item.id === button.dataset.inventoryDelete);
                if (!record || !window.confirm(`Excluir "${record.name}"?`)) return;
                records = records.filter((item) => item.id !== record.id);
                saveInventoryItems(storageKey, records);
                render();
                resetForm();
            });
        });
    };

    qsa("[data-inventory-filter]", scope).forEach((button) => {
        button.addEventListener("click", () => {
            activeFilter = button.dataset.inventoryFilter;
            qsa("[data-inventory-filter]", scope).forEach((item) => item.classList.toggle("is-active", item === button));
            render();
        });
    });

    search?.addEventListener("input", render);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const id = formData.get("itemId") || makeInventoryId();
        const record = {
            id,
            name: formData.get("name").trim(),
            category: formData.get("category"),
            status: formData.get("status"),
            quantity: Number(formData.get("quantity")),
            minimum: Number(formData.get("minimum")),
            unit: formData.get("unit").trim(),
            notes: formData.get("notes").trim()
        };

        records = records.some((item) => item.id === id)
            ? records.map((item) => item.id === id ? record : item)
            : [...records, record];

        saveInventoryItems(storageKey, records);
        activeFilter = "todos";
        qsa("[data-inventory-filter]", scope).forEach((button) => button.classList.toggle("is-active", button.dataset.inventoryFilter === "todos"));
        render();
        resetForm();
    });

    qsa("[data-inventory-reset]", form).forEach((button) => {
        button.addEventListener("click", resetForm);
    });

    qsa("[data-inventory-filter]", scope).forEach((button) => {
        button.classList.toggle("is-active", button.dataset.inventoryFilter === "todos");
    });

    render();
}

const tutorPetDefaults = [
    {
        id: "PET-1001",
        name: "Thor",
        type: "Cão",
        sex: "Macho",
        age: "3 anos",
        size: "Médio",
        breed: "SRD",
        status: "Em casa",
        health: "Vacina pendente",
        illnesses: "Nenhuma informada",
        allergies: "Sem alergias registradas",
        medicines: "Nenhum uso contínuo",
        photos: [],
        notes: "Dócil, usa guia e precisa atualizar a vacina anual."
    },
    {
        id: "PET-1002",
        name: "Mel",
        type: "Gato",
        sex: "Fêmea",
        age: "1 ano",
        size: "Pequeno",
        breed: "SRD",
        status: "Em casa",
        health: "Castração pendente",
        illnesses: "Nenhuma informada",
        allergies: "Sem alergias registradas",
        medicines: "Nenhum uso contínuo",
        photos: [],
        notes: "Casa telada, sem acesso à rua, boa com transporte em caixa."
    }
];

function loadTutorPets() {
    try {
        const saved = JSON.parse(localStorage.getItem("arcaTutorPets"));
        return Array.isArray(saved) ? saved : tutorPetDefaults;
    } catch {
        return tutorPetDefaults;
    }
}

function saveTutorPets(records) {
    localStorage.setItem("arcaTutorPets", JSON.stringify(records));
}

function loadPetSchedules() {
    try {
        const saved = JSON.parse(localStorage.getItem("arcaTutorSchedules"));
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

function savePetSchedules(records) {
    localStorage.setItem("arcaTutorSchedules", JSON.stringify(records));
}

function makePetId() {
    return `PET-${Date.now().toString().slice(-5)}`;
}

function makeScheduleId() {
    return `AGE-${Date.now().toString().slice(-5)}`;
}

function petBadgeClass(value) {
    const label = String(value || "");
    if (label.includes("pendente") || label.includes("Precisa")) return "sun";
    if (label.includes("Castrado") || label.includes("Vacinado")) return "mint";
    return "";
}

function petStatusClass(value) {
    if (value === "Perdido") return "coral";
    if (value === "Encontrado" || value === "Em casa") return "mint";
    if (value === "Em tratamento") return "sun";
    return "";
}

function petIcon(type) {
    return type === "Gato" ? "bi-emoji-smile" : "bi-heart";
}

function formatPetDate(value) {
    if (!value) return "Sem data";
    return new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR");
}

function initTutorPets() {
    const petForm = qs("[data-pet-form]");
    const scheduleForm = qs("[data-pet-schedule-form]");
    const petList = qs("#tutorPetList");
    const scheduleList = qs("#petScheduleList");
    const petSelect = qs("#schedulePet");
    if (!petForm || !scheduleForm || !petList || !scheduleList || !petSelect) return;

    const petSubmitLabel = qs("[data-pet-submit-label]", petForm);
    let pets = loadTutorPets();
    let schedules = loadPetSchedules();

    const updateCounts = () => {
        qsa("[data-pet-count]").forEach((item) => {
            item.textContent = pets.length;
        });
        qsa("[data-schedule-count]").forEach((item) => {
            item.textContent = schedules.length;
        });
    };

    const renderSelect = (selectedId = petSelect.value) => {
        if (!pets.length) {
            petSelect.innerHTML = '<option value="">Cadastre um animal primeiro</option>';
            petSelect.disabled = true;
            return;
        }

        petSelect.disabled = false;
        petSelect.innerHTML = '<option value="">Selecione</option>' + pets.map((pet) => `
            <option value="${pet.id}" ${pet.id === selectedId ? "selected" : ""}>${pet.name} · ${pet.type}</option>
        `).join("");
    };

    const resetPetForm = () => {
        petForm.reset();
        petForm.elements.petId.value = "";
        if (petSubmitLabel) petSubmitLabel.textContent = "Salvar animal";
    };

    const fillPetForm = (pet) => {
        petForm.elements.petId.value = pet.id;
        petForm.elements.name.value = pet.name;
        petForm.elements.type.value = pet.type;
        petForm.elements.sex.value = pet.sex;
        petForm.elements.age.value = pet.age;
        petForm.elements.size.value = pet.size;
        petForm.elements.breed.value = pet.breed || "";
        petForm.elements.status.value = pet.status || "Em casa";
        petForm.elements.health.value = pet.health;
        petForm.elements.illnesses.value = pet.illnesses || "";
        petForm.elements.allergies.value = pet.allergies || "";
        petForm.elements.medicines.value = pet.medicines || "";
        petForm.elements.notes.value = pet.notes;
        if (petSubmitLabel) petSubmitLabel.textContent = "Atualizar animal";
        petForm.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const renderPets = () => {
        if (!pets.length) {
            petList.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-house-heart"></i>
                    <h3>Nenhum animal cadastrado.</h3>
                    <p>Cadastre seu primeiro pet para solicitar atendimento com os dados completos.</p>
                </div>
            `;
            return;
        }

        petList.innerHTML = pets.map((pet) => {
            const photos = pet.photos?.length ? `${pet.photos.length} foto(s)` : "sem fotos";
            return `
                <article class="crud-row" data-record-id="${pet.id}">
                    <div>
                        <span class="badge-soft ${petBadgeClass(pet.health)}">${escapeHtml(pet.health)}</span>
                        <span class="badge-soft ${petStatusClass(pet.status)}">${escapeHtml(pet.status || "Em casa")}</span>
                        <span class="badge-soft">${escapeHtml(pet.id)}</span>
                        <h3 class="mt-2"><i class="bi ${petIcon(pet.type)}"></i> ${escapeHtml(pet.name)}</h3>
                        <p class="mb-1">${escapeHtml(pet.type)} · ${escapeHtml(pet.sex)} · ${escapeHtml(pet.age)} · ${escapeHtml(pet.size)} · ${escapeHtml(pet.breed || "Raça não informada")}</p>
                        <span>${escapeHtml(pet.notes || "Sem observações.")}</span>
                        <div class="slot-meta">
                            <span class="badge-soft"><i class="bi bi-image"></i> ${escapeHtml(photos)}</span>
                            <span class="badge-soft">Doenças: ${escapeHtml(pet.illnesses || "não informado")}</span>
                            <span class="badge-soft">Alergias: ${escapeHtml(pet.allergies || "não informado")}</span>
                            <span class="badge-soft">Medicamentos: ${escapeHtml(pet.medicines || "não informado")}</span>
                        </div>
                    </div>
                    <div class="crud-actions">
                        <button class="btn btn-primary" type="button" data-pet-schedule="${pet.id}">
                            <i class="bi bi-calendar2-plus"></i>
                            Agendar
                        </button>
                        <a class="btn btn-outline-primary" href="../carteira_digital/index.html?pet=${pet.id}">
                            <i class="bi bi-file-earmark-medical"></i>
                            Carteira
                        </a>
                        <button class="btn btn-outline-primary" type="button" data-pet-edit="${pet.id}">
                            <i class="bi bi-pencil-square"></i>
                            Editar
                        </button>
                        <button class="btn btn-outline-primary" type="button" data-pet-delete="${pet.id}">
                            <i class="bi bi-trash3"></i>
                            Excluir
                        </button>
                    </div>
                </article>
            `;
        }).join("");

        qsa("[data-pet-edit]", petList).forEach((button) => {
            button.addEventListener("click", () => {
                const pet = pets.find((item) => item.id === button.dataset.petEdit);
                if (pet) fillPetForm(pet);
            });
        });

        qsa("[data-pet-delete]", petList).forEach((button) => {
            button.addEventListener("click", () => {
                const pet = pets.find((item) => item.id === button.dataset.petDelete);
                if (!pet || !window.confirm(`Excluir "${pet.name}"?`)) return;
                pets = pets.filter((item) => item.id !== pet.id);
                schedules = schedules.filter((item) => item.petId !== pet.id);
                saveTutorPets(pets);
                savePetSchedules(schedules);
                resetPetForm();
                renderAll();
            });
        });

        qsa("[data-pet-schedule]", petList).forEach((button) => {
            button.addEventListener("click", () => {
                petSelect.value = button.dataset.petSchedule;
                scheduleForm.scrollIntoView({ behavior: "smooth", block: "center" });
                qs("#scheduleService", scheduleForm)?.focus();
            });
        });
    };

    const renderSchedules = () => {
        if (!schedules.length) {
            scheduleList.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-calendar2-plus"></i>
                    <h3>Nenhum agendamento salvo.</h3>
                    <p>Escolha um animal cadastrado e registre o serviço desejado.</p>
                </div>
            `;
            return;
        }

        scheduleList.innerHTML = schedules.map((schedule) => {
            const pet = pets.find((item) => item.id === schedule.petId);
            return `
                <article class="calendar-slot" data-record-id="${schedule.id}">
                    <span class="slot-time">${formatPetDate(schedule.date)}</span>
                    <div>
                        <strong>${schedule.service} · ${pet?.name || "Animal removido"}</strong>
                        <span class="d-block">${schedule.period}${schedule.notes ? ` · ${schedule.notes}` : ""}</span>
                        <div class="slot-meta">
                            <span class="badge-soft mint">solicitado</span>
                            <span class="badge-soft">${schedule.id}</span>
                        </div>
                    </div>
                    <button class="btn btn-outline-primary" type="button" data-schedule-delete="${schedule.id}">
                        <i class="bi bi-trash3"></i>
                        Excluir
                    </button>
                </article>
            `;
        }).join("");

        qsa("[data-schedule-delete]", scheduleList).forEach((button) => {
            button.addEventListener("click", () => {
                schedules = schedules.filter((item) => item.id !== button.dataset.scheduleDelete);
                savePetSchedules(schedules);
                renderAll();
            });
        });
    };

    const renderAll = () => {
        renderSelect();
        renderPets();
        renderSchedules();
        updateCounts();
    };

    petForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(petForm);
        const id = formData.get("petId") || makePetId();
        const existingPet = pets.find((item) => item.id === id);
        const photoInput = petForm.elements.photos;
        const pet = {
            id,
            name: formData.get("name").trim(),
            type: formData.get("type"),
            sex: formData.get("sex"),
            age: formData.get("age").trim(),
            size: formData.get("size"),
            breed: String(formData.get("breed") || "").trim(),
            status: formData.get("status"),
            health: formData.get("health"),
            illnesses: String(formData.get("illnesses") || "").trim(),
            allergies: String(formData.get("allergies") || "").trim(),
            medicines: String(formData.get("medicines") || "").trim(),
            photos: photoInput?.files?.length ? Array.from(photoInput.files).map((file) => file.name) : existingPet?.photos || [],
            notes: formData.get("notes").trim()
        };

        pets = pets.some((item) => item.id === id)
            ? pets.map((item) => item.id === id ? pet : item)
            : [...pets, pet];

        saveTutorPets(pets);
        resetPetForm();
        renderAll();
    });

    scheduleForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!pets.length) return;
        const formData = new FormData(scheduleForm);
        schedules = [
            ...schedules,
            {
                id: makeScheduleId(),
                petId: formData.get("petId"),
                service: formData.get("service"),
                date: formData.get("date"),
                period: formData.get("period"),
                notes: formData.get("notes").trim()
            }
        ];
        savePetSchedules(schedules);
        scheduleForm.reset();
        const note = qs(".form-note", scheduleForm);
        if (note) {
            note.textContent = "Agendamento salvo para acompanhamento.";
            note.classList.add("is-visible");
        }
        renderAll();
    });

    qsa("[data-pet-reset]", petForm).forEach((button) => {
        button.addEventListener("click", resetPetForm);
    });

    renderAll();
}

const reportTypeLabels = {
    "maus-tratos": "Maus-tratos",
    "animal-perdido": "Animal perdido",
    "animal-encontrado": "Animal encontrado",
    resgate: "Resgate ou animal ferido",
    abandono: "Abandono",
    "animal-morto": "Retirada de animal morto"
};

const reportDefaultItems = [
    {
        id: "DEN-2401",
        type: "maus-tratos",
        animal: "Cão",
        urgency: "Alta",
        status: "Triagem",
        address: "Rua das Palmeiras, 120",
        neighborhood: "Centro",
        description: "Animal preso em área sem sombra e com sinais de falta de água.",
        reporterName: "Morador do bairro",
        contact: "contato informado",
        evidence: ["foto-quintal.jpg"],
        createdAt: "2026-05-18T10:20:00.000Z"
    },
    {
        id: "DEN-2402",
        type: "animal-perdido",
        animal: "Gato",
        urgency: "Média",
        status: "Recebido",
        address: "Praça da Matriz",
        neighborhood: "Vila Nova",
        description: "Gato preto com coleira azul visto perto da banca de jornal.",
        reporterName: "Ana",
        contact: "(11) 90000-0000",
        evidence: [],
        createdAt: "2026-05-22T15:45:00.000Z"
    },
    {
        id: "DEN-2403",
        type: "resgate",
        animal: "Cão",
        urgency: "Urgente",
        status: "Encaminhado",
        address: "Avenida Norte, ponto de ônibus 3",
        neighborhood: "Jardim América",
        description: "Cão mancando, assustado e próximo ao trânsito.",
        reporterName: "Denúncia anônima",
        contact: "",
        evidence: ["video-resgate.mp4"],
        createdAt: "2026-05-24T08:10:00.000Z"
    }
];

function loadReports() {
    try {
        const saved = JSON.parse(localStorage.getItem("arcaReports"));
        return Array.isArray(saved) ? saved : reportDefaultItems;
    } catch {
        return reportDefaultItems;
    }
}

function saveReports(records) {
    localStorage.setItem("arcaReports", JSON.stringify(records));
}

function makeReportId() {
    return `DEN-${Date.now().toString().slice(-5)}`;
}

function reportGroup(type) {
    if (type === "animal-perdido" || type === "animal-encontrado") return "perdido";
    if (type === "resgate" || type === "abandono" || type === "animal-morto") return "resgate";
    return "maus-tratos";
}

function reportStatusClass(status) {
    if (status === "Encaminhado" || status === "Concluído") return "mint";
    if (status === "Triagem") return "sun";
    return "";
}

function reportUrgencyClass(urgency) {
    if (urgency === "Urgente" || urgency === "Alta") return "coral";
    if (urgency === "Média") return "sun";
    return "mint";
}

function nextReportStatus(status) {
    if (status === "Recebido") return "Triagem";
    if (status === "Triagem") return "Encaminhado";
    if (status === "Encaminhado") return "Concluído";
    return "Recebido";
}

function formatDateTime(value) {
    if (!value) return "Sem data";
    return new Date(value).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function initReports() {
    const form = qs("[data-report-form]");
    const list = qs("#reportList");
    const scope = qs("[data-report-scope]");
    if (!form || !list || !scope) return;

    const note = qs(".form-note", form);
    const reporterFields = qs("[data-reporter-fields]", form);
    const anonymous = qs("[data-report-anonymous]", form);
    const search = qs("[data-report-search]", scope);
    let records = loadReports();
    let activeFilter = "todos";

    const updateReporterFields = () => {
        const hidden = Boolean(anonymous?.checked);
        reporterFields?.classList.toggle("is-hidden", hidden);
        qsa("input", reporterFields || document.createElement("div")).forEach((input) => {
            input.required = !hidden && input.name === "reporterName";
            if (hidden) input.value = "";
        });
    };

    const filteredRecords = () => {
        const term = normalizeText(search?.value || "");
        return records.filter((record) => {
            const group = reportGroup(record.type);
            const haystack = normalizeText(`${record.id} ${reportTypeLabels[record.type]} ${record.animal} ${record.neighborhood} ${record.address} ${record.description}`);
            const matchesFilter = activeFilter === "todos" || group === activeFilter;
            const matchesSearch = !term || haystack.includes(term);
            return matchesFilter && matchesSearch;
        });
    };

    const renderStats = () => {
        qsa("[data-report-total]").forEach((item) => item.textContent = records.length);
        qsa("[data-report-open]").forEach((item) => {
            item.textContent = records.filter((record) => record.status === "Recebido" || record.status === "Triagem").length;
        });
        qsa("[data-report-rescue]").forEach((item) => {
            item.textContent = records.filter((record) => reportGroup(record.type) === "resgate").length;
        });
        qsa("[data-report-urgent]").forEach((item) => {
            item.textContent = records.filter((record) => record.urgency === "Urgente" || record.urgency === "Alta").length;
        });
    };

    const render = () => {
        const visibleRecords = filteredRecords().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        list.innerHTML = visibleRecords.map((record) => {
            const evidence = record.evidence?.length
                ? `<span class="badge-soft"><i class="bi bi-paperclip"></i> ${record.evidence.length} anexo(s)</span>`
                : "";
            return `
                <article class="crud-row" data-record-id="${escapeHtml(record.id)}">
                    <div>
                        <span class="badge-soft ${reportStatusClass(record.status)}">${escapeHtml(record.status)}</span>
                        <span class="badge-soft ${reportUrgencyClass(record.urgency)}">${escapeHtml(record.urgency)}</span>
                        <span class="badge-soft">${escapeHtml(record.id)}</span>
                        <h3 class="mt-2"><i class="bi bi-megaphone"></i> ${escapeHtml(reportTypeLabels[record.type] || record.type)}</h3>
                        <p class="mb-1">${escapeHtml(record.animal)} · ${escapeHtml(record.neighborhood)} · ${escapeHtml(formatDateTime(record.createdAt))}</p>
                        <span>${escapeHtml(record.address)}</span>
                        <p class="mt-2 mb-2">${escapeHtml(record.description)}</p>
                        <div class="slot-meta">
                            <span class="badge-soft">Responsável: ${escapeHtml(record.reporterName || "Denúncia anônima")}</span>
                            ${evidence}
                        </div>
                    </div>
                    <div class="crud-actions">
                        <button class="btn btn-outline-primary" type="button" data-report-advance="${escapeHtml(record.id)}">
                            <i class="bi bi-arrow-repeat"></i>
                            Status
                        </button>
                        <button class="btn btn-outline-primary" type="button" data-report-delete="${escapeHtml(record.id)}">
                            <i class="bi bi-trash3"></i>
                            Excluir
                        </button>
                    </div>
                </article>
            `;
        }).join("");

        if (!visibleRecords.length) {
            list.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-megaphone"></i>
                    <h3>Nenhum protocolo encontrado.</h3>
                    <p>Use os filtros ou registre uma nova ocorrência.</p>
                </div>
            `;
        }

        qsa("[data-report-count]").forEach((item) => item.textContent = visibleRecords.length);
        renderStats();

        qsa("[data-report-advance]", list).forEach((button) => {
            button.addEventListener("click", () => {
                records = records.map((record) => record.id === button.dataset.reportAdvance
                    ? { ...record, status: nextReportStatus(record.status), updatedAt: new Date().toISOString() }
                    : record);
                saveReports(records);
                render();
            });
        });

        qsa("[data-report-delete]", list).forEach((button) => {
            button.addEventListener("click", () => {
                const record = records.find((item) => item.id === button.dataset.reportDelete);
                if (!record || !window.confirm(`Excluir o protocolo ${record.id}?`)) return;
                records = records.filter((item) => item.id !== record.id);
                saveReports(records);
                render();
            });
        });
    };

    qsa("[data-report-filter]", scope).forEach((button) => {
        button.addEventListener("click", () => {
            activeFilter = button.dataset.reportFilter;
            qsa("[data-report-filter]", scope).forEach((item) => item.classList.toggle("is-active", item === button));
            render();
        });
        button.classList.toggle("is-active", button.dataset.reportFilter === activeFilter);
    });

    anonymous?.addEventListener("change", updateReporterFields);
    search?.addEventListener("input", render);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const fileInput = form.elements.evidence;
        const type = formData.get("type");
        const record = {
            id: makeReportId(),
            type,
            animal: formData.get("animal"),
            urgency: formData.get("urgency"),
            status: formData.get("urgency") === "Urgente" ? "Triagem" : "Recebido",
            address: String(formData.get("address") || "").trim(),
            neighborhood: String(formData.get("neighborhood") || "").trim(),
            description: String(formData.get("description") || "").trim(),
            reporterName: formData.get("anonymous") ? "Denúncia anônima" : String(formData.get("reporterName") || "").trim(),
            contact: formData.get("anonymous") ? "" : String(formData.get("contact") || "").trim(),
            evidence: fileInput?.files ? Array.from(fileInput.files).map((file) => file.name) : [],
            createdAt: new Date().toISOString()
        };

        records = [record, ...records];
        saveReports(records);
        form.reset();
        updateReporterFields();
        if (note) {
            note.textContent = `Protocolo ${record.id} gerado para acompanhamento.`;
            note.classList.add("is-visible");
        }
        activeFilter = reportGroup(type);
        qsa("[data-report-filter]", scope).forEach((button) => button.classList.toggle("is-active", button.dataset.reportFilter === activeFilter));
        render();
    });

    updateReporterFields();
    render();
}

const walletDefaultRecords = [
    {
        id: "CAR-1001",
        petId: "PET-1001",
        type: "Vacina",
        date: "2026-02-12",
        place: "Clínica Norte",
        professional: "Dra. Marina Lopes",
        protocol: "VAC-7781",
        notes: "V10 aplicada. Retorno anual recomendado.",
        evidence: ["carteira-v10.pdf"]
    },
    {
        id: "CAR-1002",
        petId: "PET-1001",
        type: "Microchipagem",
        date: "2026-03-02",
        place: "Mutirão ARCA",
        professional: "Equipe ARCA",
        protocol: "MC-421908",
        notes: "Microchip 985141000421908 implantado e conferido.",
        evidence: ["microchip-thor.pdf"]
    },
    {
        id: "CAR-1003",
        petId: "PET-1002",
        type: "Consulta",
        date: "2026-04-18",
        place: "Clínica Sul",
        professional: "Dr. Renato",
        protocol: "CLI-3390",
        notes: "Avaliação pré-castração sem restrições.",
        evidence: []
    },
    {
        id: "CAR-1004",
        petId: "PET-1002",
        type: "Passagem por ONG",
        date: "2026-04-20",
        place: "Lar Temporário Sol",
        professional: "Equipe de acolhimento",
        protocol: "ONG-4412",
        notes: "Entrada registrada para acompanhamento e socialização.",
        evidence: ["termo-acolhimento.pdf"]
    }
];

function loadWalletRecords() {
    try {
        const saved = JSON.parse(localStorage.getItem("arcaPetWalletRecords"));
        return Array.isArray(saved) ? saved : walletDefaultRecords;
    } catch {
        return walletDefaultRecords;
    }
}

function saveWalletRecords(records) {
    localStorage.setItem("arcaPetWalletRecords", JSON.stringify(records));
}

function makeWalletId(type) {
    const prefix = normalizeText(type).slice(0, 3).toUpperCase() || "CAR";
    return `${prefix}-${Date.now().toString().slice(-5)}`;
}

function walletIcon(type) {
    if (type === "Vacina") return "bi-capsule";
    if (type === "Microchipagem") return "bi-upc-scan";
    if (type === "Castração") return "bi-heart-pulse";
    if (type === "Adoção") return "bi-house-heart";
    return "bi-file-earmark-medical";
}

function formatPetRecordDate(value) {
    if (!value) return "Sem data";
    return new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR");
}

function initWallet() {
    const scope = qs("[data-wallet]");
    const petSelect = qs("#walletPetSelect");
    const formPetSelect = qs("#walletPet");
    const form = qs("[data-wallet-form]");
    const petCard = qs("#walletPetCard");
    const timeline = qs("#walletTimeline");
    if (!scope || !petSelect || !formPetSelect || !form || !petCard || !timeline) return;

    const queryPet = new URLSearchParams(window.location.search).get("pet");
    let pets = loadTutorPets();
    let records = loadWalletRecords();
    let activePetId = pets.some((pet) => pet.id === queryPet) ? queryPet : pets[0]?.id || "";

    const selectedPet = () => pets.find((pet) => pet.id === activePetId);
    const selectedRecords = () => records
        .filter((record) => record.petId === activePetId)
        .sort((a, b) => new Date(`${b.date}T12:00:00`) - new Date(`${a.date}T12:00:00`));

    const renderSelects = () => {
        const options = pets.map((pet) => `<option value="${escapeHtml(pet.id)}" ${pet.id === activePetId ? "selected" : ""}>${escapeHtml(pet.name)} · ${escapeHtml(pet.type)}</option>`).join("");
        petSelect.innerHTML = options || '<option value="">Cadastre um animal</option>';
        formPetSelect.innerHTML = options || '<option value="">Cadastre um animal</option>';
        petSelect.disabled = !pets.length;
        formPetSelect.disabled = !pets.length;
    };

    const renderMetrics = () => {
        const places = new Set(records.map((record) => record.place).filter(Boolean));
        qsa("[data-wallet-total]").forEach((item) => item.textContent = records.length);
        qsa("[data-wallet-vaccines]").forEach((item) => {
            item.textContent = records.filter((record) => record.type === "Vacina").length;
        });
        qsa("[data-wallet-chip]").forEach((item) => {
            item.textContent = records.filter((record) => record.type === "Microchipagem").length;
        });
        qsa("[data-wallet-places]").forEach((item) => item.textContent = places.size);
    };

    const renderPetCard = () => {
        const pet = selectedPet();
        if (!pet) {
            petCard.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-house-heart"></i>
                    <h3>Nenhum animal cadastrado.</h3>
                    <p>Cadastre um pet para montar a carteira digital.</p>
                    <a class="btn btn-primary" href="../meus_animais/index.html">Abrir cadastro</a>
                </div>
            `;
            return;
        }

        const petRecords = selectedRecords();
        const lastRecord = petRecords[0];
        petCard.innerHTML = `
            <div class="wallet-card-head">
                <span class="module-icon"><i class="bi ${petIcon(pet.type)}"></i></span>
                <div>
                    <span class="section-kicker">${escapeHtml(pet.id)}</span>
                    <h3>${escapeHtml(pet.name)}</h3>
                    <p class="mb-0">${escapeHtml(pet.type)} · ${escapeHtml(pet.sex)} · ${escapeHtml(pet.age)} · ${escapeHtml(pet.size)}</p>
                </div>
            </div>
            <div class="wallet-meta-grid">
                <span><strong>${escapeHtml(pet.health)}</strong><small>Saúde</small></span>
                <span><strong>${petRecords.length}</strong><small>Registros</small></span>
                <span><strong>${lastRecord ? escapeHtml(formatPetRecordDate(lastRecord.date)) : "Sem data"}</strong><small>Último movimento</small></span>
                <span><strong>${petRecords.some((record) => record.type === "Microchipagem") ? "Sim" : "Pendente"}</strong><small>Microchip</small></span>
            </div>
        `;
    };

    const renderTimeline = () => {
        const petRecords = selectedRecords();
        if (!petRecords.length) {
            timeline.innerHTML = `
                <div class="empty-state">
                    <i class="bi bi-file-earmark-medical"></i>
                    <h3>Sem registros para este animal.</h3>
                    <p>Adicione vacina, microchipagem, atendimento ou passagem por uma instituição.</p>
                </div>
            `;
            return;
        }

        timeline.innerHTML = petRecords.map((record) => {
            const evidence = record.evidence?.length
                ? record.evidence.map((file) => `<span class="badge-soft"><i class="bi bi-paperclip"></i> ${escapeHtml(file)}</span>`).join("")
                : '<span class="badge-soft">Sem anexo</span>';
            return `
                <article class="timeline-item wallet-record" data-record-id="${escapeHtml(record.id)}">
                    <i class="bi ${walletIcon(record.type)}"></i>
                    <div>
                        <div class="d-flex flex-wrap align-items-start justify-content-between gap-2">
                            <div>
                                <strong>${escapeHtml(record.type)} · ${escapeHtml(formatPetRecordDate(record.date))}</strong>
                                <span class="d-block">${escapeHtml(record.place)}${record.professional ? ` · ${escapeHtml(record.professional)}` : ""}</span>
                            </div>
                            <button class="btn btn-outline-primary btn-sm" type="button" data-wallet-delete="${escapeHtml(record.id)}">
                                <i class="bi bi-trash3"></i>
                                Excluir
                            </button>
                        </div>
                        <p class="mb-2 mt-2">${escapeHtml(record.notes || "Registro sem observações.")}</p>
                        <div class="slot-meta">
                            <span class="badge-soft mint">${escapeHtml(record.protocol)}</span>
                            ${evidence}
                        </div>
                    </div>
                </article>
            `;
        }).join("");

        qsa("[data-wallet-delete]", timeline).forEach((button) => {
            button.addEventListener("click", () => {
                const record = records.find((item) => item.id === button.dataset.walletDelete);
                if (!record || !window.confirm(`Excluir o registro ${record.protocol}?`)) return;
                records = records.filter((item) => item.id !== record.id);
                saveWalletRecords(records);
                renderAll();
            });
        });
    };

    const renderAll = () => {
        renderSelects();
        renderMetrics();
        renderPetCard();
        renderTimeline();
    };

    petSelect.addEventListener("change", () => {
        activePetId = petSelect.value;
        formPetSelect.value = activePetId;
        renderAll();
    });

    formPetSelect.addEventListener("change", () => {
        activePetId = formPetSelect.value;
        petSelect.value = activePetId;
        renderAll();
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!pets.length) return;
        const formData = new FormData(form);
        const fileInput = form.elements.evidence;
        const type = formData.get("type");
        const protocol = String(formData.get("protocol") || "").trim() || makeWalletId(type);
        const record = {
            id: makeWalletId(type),
            petId: formData.get("petId"),
            type,
            date: formData.get("date"),
            place: String(formData.get("place") || "").trim(),
            professional: String(formData.get("professional") || "").trim(),
            protocol,
            notes: String(formData.get("notes") || "").trim(),
            evidence: fileInput?.files ? Array.from(fileInput.files).map((file) => file.name) : []
        };

        activePetId = record.petId;
        records = [record, ...records];
        saveWalletRecords(records);
        form.reset();
        const note = qs(".form-note", form);
        if (note) {
            note.textContent = `Registro ${record.protocol} salvo na carteira.`;
            note.classList.add("is-visible");
        }
        renderAll();
    });

    renderAll();
}

document.addEventListener("DOMContentLoaded", () => {
    initCarousels();
    initTabs();
    initListFilters();
    initPrototypeForms();
    initToggleRows();
    initSearchFilters();
    initLogin();
    initAccountForms();
    initSessionLabels();
    initInventoryCrud();
    initTutorPets();
    initReports();
    initWallet();
});
