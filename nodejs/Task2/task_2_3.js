/**
 * Створіть функцію, яка конвертує масив значень в масив промісів
 * Кожен проміс має резолвитися з відповідним значенням
 * * @param {any[]} values
 * @returns {Promise<any>[]}
 */
function valuesToPromises(values) {
    // Використовуємо .map(), щоб перетворити кожен елемент масиву на Promise
    return values.map(value => Promise.resolve(value));
}

// Перевірка:
const promises = valuesToPromises([1, 2, 3]);

// Promise.all чекає, поки всі проміси в масиві виконаються
Promise.all(promises)
    .then(results => console.log('✅ Тест 2.6 (масив промісів):', results));
// Очікується: [1, 2, 3]