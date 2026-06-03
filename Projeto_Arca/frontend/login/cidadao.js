function switchTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.auth-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    document.getElementById('tab-' + tab).setAttribute('aria-selected', 'true');
    document.getElementById('panel-' + tab).classList.add('active');
}

function toggleSenha(id, btn) {
    const inp = document.getElementById(id);
    const show = inp.type === 'password';
    inp.type = show ? 'text' : 'password';
    btn.innerHTML = show ? 'Ocultar' : 'Mostrar';
}

function mascaraCPF(el) {
    let v = el.value.replace(/\D/g, '').slice(0, 11);
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d)/, '$1.$2');
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    el.value = v;
}

function medirSenha(val) {
    const bars = ['sb1','sb2','sb3','sb4'].map(id => document.getElementById(id));
    const label = document.getElementById('strength-label');
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^a-zA-Z0-9]/.test(val)) score++;
    const colors = ['', '
    const labels = ['', 'Fraca', 'Regular', 'Boa', 'Forte'];
    bars.forEach((b, i) => b.style.background = i < score ? colors[score] : '');
    label.textContent = val.length ? labels[score] : '';
    label.style.color = colors[score];
}

function handleLogin() {
    const usuarioInput = document.getElementById('login-cpf').value.trim();
    const senhaInput = document.getElementById('login-senha').value.trim();
    const btn = document.querySelector('

    if ((usuarioInput === 'cidaão' || usuarioInput === 'tutor') && senhaInput === '123456') {
        btn.disabled = true;
        btn.innerHTML = 'Entrando...';
        setTimeout(() => {
            btn.style.display = 'none';
            document.getElementById('success-login').classList.add('show');
            setTimeout(() => { window.location.href = "../cidadao/home_cidadao.html"; }, 1000);
        }, 1000);
    } else {
        alert('Usuário ou senha incorretos!');
    }
}

function handleCadastro() {
    const btn = document.querySelector('
    btn.disabled = true;
    btn.innerHTML = 'Criando conta...';
    setTimeout(() => {
        btn.style.display = 'none';
        document.getElementById('success-cadastro').classList.add('show');
    }, 1000);
}