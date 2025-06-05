import { isUserUnique, calculateExpirationDate } from './utils.js';

export function handleFormSubmit(e, state, elements, saveUsers, renderUsers) {
    e.preventDefault();
    if (!state.isAuthenticated) return;

    const name = elements.nameInput.value.trim();
    const telegram = elements.telegramInput.value.trim();

    if (!isUserUnique(telegram, state.users, state.editIndex)) {
        alert('User with this Telegram nickname already exists!');
        return;
    }

    const userData = {
        id: state.editIndex !== null ? state.users[state.editIndex].id : Date.now(),
        name,
        telegram,
        lessons: parseInt(document.getElementById('lessons').value),
        purchaseDate: document.getElementById('purchase-date').value,
        category: document.getElementById('category').value,
        expirationDate: calculateExpirationDate(document.getElementById('purchase-date').value)
    };

    if (state.editIndex !== null) {
        state.users[state.editIndex] = userData;
        state.editIndex = null;
        elements.addButton.textContent = 'Add';
    } else {
        state.users.push(userData);
    }

    saveUsers();
    renderUsers();
    elements.form.reset();
}

export function editUser(index, state, elements) {
    const user = state.users[index];
    elements.nameInput.value = user.name;
    elements.telegramInput.value = user.telegram;
    document.getElementById('lessons').value = user.lessons;
    document.getElementById('purchase-date').value = user.purchaseDate;
    document.getElementById('category').value = user.category;

    state.editIndex = index;
    elements.addButton.textContent = 'Save';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}