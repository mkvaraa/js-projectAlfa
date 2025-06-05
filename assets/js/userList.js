import { formatDate, getCategoryName } from './utils.js';
import { editUser } from './userForm.js';

export function renderUsers(state, elements) {
    elements.usersList.innerHTML = '';

    const filteredUsers = state.users.filter(user => {
        const matchesCategory = state.currentFilter === 'all' || user.category === state.currentFilter;
        const matchesSearch = state.searchQuery === '' ||
            user.name.toLowerCase().includes(state.searchQuery) ||
            (state.isAuthenticated && user.telegram?.toLowerCase().includes(state.searchQuery));
        return matchesCategory && matchesSearch;
    });

    if (filteredUsers.length === 0) {
        elements.usersList.innerHTML = '<li class="no-results">There are no users matching the selected criteria.</li>';
        return;
    }

    filteredUsers.forEach((user, index) => {
        const li = document.createElement('li');
        li.className = 'user-item';
        li.setAttribute('data-id', user.id);

        li.innerHTML = `
            <div class="user-field"><strong>Name</strong> ${user.name}</div>
            <div class="user-field"><strong>Telegram</strong> ${state.isAuthenticated ? user.telegram : 'Hidden'}</div>
            <div class="user-field"><strong>Sessions</strong> ${user.lessons}</div>
            <div class="user-field"><strong>Purchase date</strong> ${formatDate(user.purchaseDate)}</div>
            <div class="user-field"><strong>Category</strong> ${getCategoryName(user.category)}</div>
            <div class="user-field"><strong>Expires</strong> ${formatDate(user.expirationDate)}</div>
            ${state.isAuthenticated ? `
                <div class="user-actions">
                    <button class="edit-btn" data-index="${index}">✏️</button>
                    <button class="delete-btn" data-index="${index}">🗑️</button>
                </div>
            ` : ''}
        `;

        elements.usersList.appendChild(li);
    });

    if (state.isAuthenticated) {
        setupActionButtons(state, elements);
    }

    setupUserItemClickHandlers();
}

export function setupActionButtons(state, elements) {
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            editUser(parseInt(this.dataset.index), state, elements);
        });
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            deleteUser(parseInt(this.dataset.index), state, elements);
        });
    });
}

export function setupUserItemClickHandlers() {
    document.querySelectorAll('.user-item').forEach(item => {
        item.addEventListener('click', function (e) {
            if (!e.target.closest('.user-actions')) {
                const userId = this.getAttribute('data-id');
                window.location.href = `profile/user_profile.html?userId=${userId}`;
            }
        });
    });
}

export function deleteUser(index, state, elements) {
    if (confirm('ARE YOU SURE YOU WANT DELETE THIS USER?')) {
        state.users.splice(index, 1);
        saveUsers(state);
        renderUsers(state, elements);
    }
}

function saveUsers(state) {
    localStorage.setItem('volleyballUsers', JSON.stringify(state.users));
}
