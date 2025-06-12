import { checkAuth, handleLogin, logout, updateUI } from './auth.js';
import { handleFormSubmit } from './userForm.js';
import { renderUsers } from './userList.js';
import { saveUsers, loadUsers } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        form: document.getElementById('user-form'),
        usersList: document.getElementById('users-list'),
        loginModal: document.getElementById('login-modal'),
        loginSubmit: document.getElementById('login-submit'),
        loginUsername: document.getElementById('login-username'),
        loginPassword: document.getElementById('login-password'),
        loginError: document.getElementById('login-error'),
        loginButton: document.querySelector('.login-button'),
        addButton: document.querySelector('.add-button'),
        categoryFilter: document.getElementById('category-filter'),
        resetFiltersBtn: document.getElementById('reset-filters'),
        searchInput: document.getElementById('search-input'),
        nameInput: document.getElementById('name'),
        telegramInput: document.getElementById('telegram')
    };

    const state = {
        users: [],
        editIndex: null,
        currentFilter: 'all',
        searchQuery: '',
        isAuthenticated: false
    };

    checkAuth(state);
    updateUI(state, elements, () => renderUsers(state, elements));

    elements.loginButton.addEventListener('click', e => {
        e.stopPropagation();
        if (state.isAuthenticated) {
            logout(state, () => updateUI(state, elements, () => renderUsers(state, elements)));
        } else {
            elements.loginModal.style.display = 'block';
        }
    });

    elements.loginSubmit.addEventListener('click', () => handleLogin(state, elements, () => updateUI(state, elements, () => renderUsers(state, elements))));
    elements.loginPassword.addEventListener('keypress', e => e.key === 'Enter' && handleLogin(state, elements, () => updateUI(state, elements, () => renderUsers(state, elements))));

    elements.form.addEventListener('submit', e => {
        handleFormSubmit(
            e,
            state,
            elements,
            () => saveUsers(state.users),
            () => renderUsers(state, elements)
        );
    });

    elements.categoryFilter.addEventListener('change', function () {
        state.currentFilter = this.value;
        renderUsers(state, elements);
    });

    elements.resetFiltersBtn.addEventListener('click', () => {
        elements.categoryFilter.value = 'all';
        elements.searchInput.value = '';
        state.currentFilter = 'all';
        state.searchQuery = '';
        renderUsers(state, elements);
    });

    elements.searchInput.addEventListener('input', function () {
        state.searchQuery = this.value.toLowerCase();
        renderUsers(state, elements);
    });

    document.addEventListener('mousedown', function (e) {
        const modal = elements.loginModal;
        const isInside = modal.querySelector('.modal-content')?.contains(e.target);
        const isLoginBtn = elements.loginButton.contains(e.target);
        if (!isInside && !isLoginBtn) {
            modal.style.display = 'none';
        }
    });

    elements.loginModal.addEventListener('click', e => e.stopPropagation());

    state.users = loadUsers(); // заменили прямую работу с localStorage
    renderUsers(state, elements);
});
