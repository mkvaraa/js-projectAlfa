const STORAGE_KEY = 'volleyballUsers';

export function saveUsers(users) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function loadUsers() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.error('Error while reading localStorage:', e);
        return [];
    }
}
