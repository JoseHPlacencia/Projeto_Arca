function switchTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
    document.getElementById('panel-' + tab).classList.add('active');
}

function toggleSenha(id, btn) {
    const inp = document.getElementById(id);
    const show = inp.type === 'password';
    inp.type = show ? 'text' : 'password';
    btn.innerHTML = show ? 'Ocultar' : 'Mostrar';
}

function mascaraCNPJ(el) {
    let v = el.value.replace(/\D/g, '').slice(0, 14);
    v = v.replace(/^(\d{2})(\d)/, '$1.$2');
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
    v = v.replace(/(\d{4})(\d)/, '$1-$2');
    el.value = v;
}

function handleLogin() {
    const usuarioInput = document.getElementById('login-cnpj').value.trim();
    const senhaInput = document.getElementById('login-senha').value.trim();
    const btn = document.querySelector('

    if (usuarioInput === 'Ong' && senhaInput === 'ong$-135') {
        btn.disabled = true;
        btn.textContent = 'Verificando acesso...';
        setTimeout(() => {
            btn.style.display = 'none';
            document.getElementById('success-login').classList.add('show');
            setTimeout(() => { window.location.href = "../ong/home_ong.html"; }, 1000);
        }, 1000);
    } else {
        alert('Usuário ou senha incorretos!');
    }
}

function handleCadastro() {
    const btn = document.querySelector('
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    setTimeout(() => { 
        btn.style.display='none'; 
        document.getElementById('success-cadastro').classList.add('show'); 
    }, 1000);
}