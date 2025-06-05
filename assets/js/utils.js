export function isUserUnique(telegram, users, excludeIndex = null) {
    return !users.some((user, index) => {
        if (excludeIndex !== null && index === excludeIndex) return false;
        return (user.telegram || '').trim().toLowerCase() === (telegram || '').trim().toLowerCase();
    });
}

export function calculateExpirationDate(purchaseDate) {
    if (!purchaseDate) return '';
    const date = new Date(purchaseDate);
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
}

export function formatDate(dateString) {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

export function getCategoryName(category) {
    const categories = {
        'child_male': 'Chd.Boy',
        'child_female': 'Chd.Girl',
        'general': 'General gr.',
        'amateurs': 'Amateur',
        'advanced': 'Advanced'
    };
    return categories[category] || '—';
}
