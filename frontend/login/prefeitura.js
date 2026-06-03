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

function handleLogin() {
    const usuarioInput = document.querySelector('#panel-login input[type="text"]').value.trim();
    const senhaInput = document.getElementById('login-senha').value.trim();
    const btn = document.querySelector('#panel-login .btn-submit');

    if (usuarioInput === 'prefeitura' && senhaInput === 'pref@456') {
        btn.disabled = true;
        btn.textContent = 'Verificando credenciais...';
        setTimeout(() => {
            btn.style.display = 'none';
            document.getElementById('success-login').classList.add('show');
            setTimeout(() => { window.location.href = "../prefeitura/home_prefeitura.html"; }, 1000);
        }, 1000);
    } else {
        alert('Usuário ou senha incorretos!');
    }
}

function handleCadastro() {
    const btn = document.querySelector('#panel-cadastro .btn-submit');
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    setTimeout(() => { 
        btn.style.display='none'; 
        document.getElementById('success-cadastro').classList.add('show'); 
    }, 1000);
}