export function checkAuth(state) {
    state.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
}

export function handleLogin(state, elements, updateUI) {
    const username = elements.loginUsername.value.trim();
    const password = elements.loginPassword.value.trim();

    if (username === 'gvc_admin' && password === 'password_gvc') {
        state.isAuthenticated = true;
        localStorage.setItem('isAuthenticated', 'true');
        elements.loginError.textContent = '';
        elements.loginModal.style.display = 'none';
        elements.loginUsername.value = '';
        elements.loginPassword.value = '';
        updateUI();
    } else {
        elements.loginError.textContent = 'Incorrect login or password';
    }
}

export function logout(state, updateUI) {
    state.isAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    updateUI();
}

export function updateUI(state, elements, renderUsers) {
    if (state.isAuthenticated) {
        document.body.classList.add('authenticated');
        document.body.classList.remove('locked');
        elements.loginModal.style.display = 'none';
        elements.loginButton.textContent = 'Log out';
    } else {
        document.body.classList.remove('authenticated');
        document.body.classList.add('locked');
        elements.loginButton.textContent = 'Log in';
    }
    renderUsers();
}