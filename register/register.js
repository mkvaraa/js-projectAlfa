document.getElementById('register-submit').addEventListener('click', function () {
    const firstname = document.getElementById('reg-firstname').value.trim();
    const lastname = document.getElementById('reg-lastname').value.trim();
    const telegram = document.getElementById('reg-telegram').value.trim();
    const category = document.getElementById('reg-category').value;
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;

    const errorEl = document.getElementById('register-error');
    errorEl.textContent = '';

    if (!firstname || !lastname || !telegram || !category || !email || !password || !confirmPassword) {
        errorEl.textContent = 'Please fill in all required fields.';
        return;
    }
    if (password !== confirmPassword) {
        errorEl.textContent = 'Passwords do not match.';
        return;
    }
    if (!telegram.startsWith('@')) {
        errorEl.textContent = 'Telegram nick must start with @.';
        return;
    }

    let users = JSON.parse(localStorage.getItem('volleyballUsers')) || [];

    const exists = users.some(u => u.telegram === telegram || u.email === email);
    if (exists) {
        errorEl.textContent = 'User with this Telegram or email already exists.';
        return;
    }

    const newId = users.length > 0 ? Math.max(...users.map(u => u.id || 0)) + 1 : 1;

    const newUser = {
        id: newId,
        name: firstname + ' ' + lastname, 
        firstname,
        lastname,
        telegram,
        category,
        email,
        password,
        lessons: 0,          
        purchaseDate: null,
        expirationDate: null
    };

    users.push(newUser);

    localStorage.setItem('volleyballUsers', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    window.location.href = `../profile/user_profile.html?userId=${newId}`;
});
