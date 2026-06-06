const now = new Date();
document.getElementById('topbar-date').textContent =
    now.toLocaleDateString('pt-BR', { weekday:'long', day:'numeric', month:'long', year:'numeric' });

function showPanel(name) {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
    const panel = document.getElementById('panel-' + name);
    const link  = document.querySelector('[data-panel="' + name + '"]');
    if (panel) panel.classList.add('active');
    if (link)  link.classList.add('active');

    const titles = {
        dashboard:  'Visão <em>Geral</em>',
        ongs:       'Gestão de <em>ONGs</em>',
        acoes:      'Ações e <em>Eventos</em>',
        demandas:   'Demandas <em>Recebidas</em>',
        recursos:   'Gestão de <em>Recursos</em>',
        relatorios: 'Relatórios e <em>Indicadores</em>',
        comunicados:'Comunicados <em>Oficiais</em>',
    };
    document.getElementById('topbar-title').innerHTML = titles[name] || name;
}

document.querySelectorAll('.sidebar-link[data-panel]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        showPanel(link.dataset.panel);
    });
});

document.getElementById('prefeituraLogout')?.addEventListener('click', () => {
    localStorage.removeItem('arcaSession');
});

function openModal(id)  { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
});

function handleModal(e, modalId, msg) {
    e.preventDefault();
    closeModal(modalId);
    showToast(msg);
}

function showToast(msg) {
    const t = document.getElementById('toast');
    document.getElementById('toast-msg').textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3500);
}
