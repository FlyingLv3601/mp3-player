
function loadUsers() {
    if (typeof eel !== 'undefined' && eel.get_all_users) {
        eel.get_all_users()(function (users) {
            displayUsers(users);
        }).catch(function (err) {
            console.error('Ошибка загрузки пользователей:', err);
            showError('Не удалось загрузить список пользователей');
        });
    } else {
        console.warn('Eel или get_all_users не доступны');
        showError('Сервер не доступен');
    }
}

function displayUsers(users) {
    const container = document.getElementById('usersList');
    const countSpan = document.getElementById('usersCount');

    if (!container) return;

    if (!users || users.length === 0) {
        container.innerHTML = '<div class="empty-users"><i class="fas fa-user-slash"></i> Нет пользователей</div>';
        if (countSpan) countSpan.textContent = '(0)';
        return;
    }

    countSpan.textContent = `(${users.length})`;

    let html = '';
    users.forEach(user => {
        const firstLetter = (user.name || user.username || 'U').charAt(0).toUpperCase();
        const userName = user.name || user.username || 'Без имени';
        const userEmail = user.email || 'email не указан';

        html += `
            <div class="user-item">
                <div class="user-avatar">${escapeHtml(firstLetter)}</div>
                <div style="flex: 1">
                    <div class="user-name">${escapeHtml(userName)}</div>
                    <div class="user-email"><i class="fas fa-envelope"></i> ${escapeHtml(userEmail)}</div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

function showError(message) {
    const container = document.getElementById('usersList');
    if (container) {
        container.innerHTML = `<div class="empty-users"><i class="fas fa-exclamation-triangle"></i> ${message}</div>`;
    }
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.addEventListener('DOMContentLoaded', function () {
    loadUsers();
});