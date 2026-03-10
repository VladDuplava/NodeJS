/**
 * Створіть функцію, яка повертає найшвидшу відповідь
 * * @param {number[]} delays - Масив затримок в мілісекундах
 * @returns {Promise<number>} - Найменша затримка
 */
function getFastestResponse(delays) {
    // 1. Створюємо масив промісів за допомогою .map()
    // Кожен проміс резолвиться через вказаний час delay
    const promises = delays.map(delay => {
        return new Promise(resolve => {
            setTimeout(() => resolve(delay), delay);
        });
    });

    // 2. Використовуємо Promise.race(), щоб "виграв" найшвидший
    return Promise.race(promises);
}

// Перевірка:
getFastestResponse([1000, 500, 2000, 300])
    .then(result => console.log('✅ Тест 10.1 (найшвидший):', result)); // Очікується: 300