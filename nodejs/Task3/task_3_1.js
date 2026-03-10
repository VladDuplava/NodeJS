/**
 * Створіть ланцюжок обробки даних користувача
 * @param {{name: string, age: number}} user
 * @returns {Promise<{name: string, age: number, isAdult: boolean, nameLength: number}>}
 */
function processUser(user) {
    return Promise.resolve(user)
        // 1. Конвертуємо name у верхній регістр
        .then(u => {
            return { ...u, name: u.name.toUpperCase() };
        })
        // 2. Додаємо поле isAdult (age >= 18)
        .then(u => {
            return { ...u, isAdult: u.age >= 18 };
        })
        // 3. Додаємо поле nameLength
        .then(u => {
            return { ...u, nameLength: u.name.length };
        });
}

// Перевірка:
processUser({ name: 'john doe', age: 25 })
    .then(result => console.log('✅ Тест 7.2 (обробка):', result));
// Очікується: { name: 'JOHN DOE', age: 25, isAdult: true, nameLength: 8 }