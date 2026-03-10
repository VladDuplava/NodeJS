/**
 * Створіть функцію, яка:
 * 1. Отримує дані користувача
 * 2. Отримує його пости
 * 3. Рахує кількість постів
 * * @param {number} userId
 * @returns {Promise<{id: number, username: string, posts: string[], postCount: number}>}
 */
/**
 * 1. Допоміжні функції (імітація бази даних з затримкою)
 */
function fetchUserData(userId) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id: userId, username: 'user_' + userId });
        }, 100);
    });
}

function fetchUserPosts(user) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                ...user,
                posts: ['Post 1', 'Post 2', 'Post 3']
            });
        }, 100);
    });
}

function countPosts(userData) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                ...userData,
                postCount: userData.posts.length
            });
        }, 100);
    });
}

/**
 * 2. Головна функція ланцюжка
 */
function getUserWithPostCount(userId) {
    // Важливо: return має бути всередині функції
    return fetchUserData(userId)
        .then(user => fetchUserPosts(user))
        .then(userData => countPosts(userData));
}

/**
 * 3. Перевірка результату
 */
getUserWithPostCount(123)
    .then(result => {
        console.log('✅ Тест 7.3 (Асинхронний ланцюжок):');
        console.log(result);
    })
    .catch(err => {
        console.error('❌ Виникла помилка:', err);
    });