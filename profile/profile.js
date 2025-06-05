document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = parseInt(urlParams.get('userId'));

    console.log(userId)
    if (isNaN(userId)) {
        document.querySelector('.profile-info').innerHTML = '<p>User not found :( </p>';
        return;
    }

    const users = JSON.parse(localStorage.getItem('volleyballUsers')) || [];
    const user = users.find(u => u.id === userId);

    if (!user) {
        document.querySelector('.profile-info').innerHTML = '<p>User not found :( </p>';
        return;
    }

    
    document.querySelector('.profile-info').innerHTML = `
        <h2>${user.name}</h2>
        <p><strong>Telegram:</strong> ${user.telegram}</p>
        <p><strong>Category:</strong> ${getCategoryName(user.category)}</p>
        <p><strong>Sessions:</strong> ${user.lessons}</p>
        <p><strong>Purchase date:</strong> ${formatDate(user.purchaseDate)}</p>
        <p><strong>Valid until:</strong> ${formatDate(user.expirationDate)}</p>
    `;
});

function getCategoryName(category) {
    const categories = {
        'child_male': 'Chd.Boy',
        'child_female': 'Chd.Girl',
        'general': 'General gr.',
        'amateurs': 'Amateur',
        'advanced': 'Advanced'
    };
    return categories[category] || '—';
}

function formatDate(dateString) {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
}
