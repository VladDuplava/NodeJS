/**
 * Створіть проміс з валідацією email
 * Якщо email містить @ та . - resolve з email
 * Інакше - reject з повідомленням про помилку
 * * @param {string} email
 * @returns {Promise<string>}
 */
function validateEmail(email) {
    return new Promise((resolve, reject) => {
        // Перевіряємо наявність символів '@' та '.'
        if (email.includes('@') && email.includes('.')) {
            // Якщо валідація пройдена, повертаємо email через resolve
            resolve(email);
        } else {
            // Якщо умови не виконані, повертаємо помилку через reject
            reject(`Помилка: "${email}" не є коректним email (має містити @ та .)`);
        }
    });
}

// Перевірка:
validateEmail('test@example.com')
    .then(email => console.log('✅ Тест 1.3 (валідний):', email))
    .catch(err => console.log('   Помилка:', err));

validateEmail('invalid-email')
    .then(email => console.log('   Не повинно виконатися'))
    .catch(err => console.log('✅ Тест 1.3 (невалідний):', err));