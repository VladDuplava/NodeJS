/**
 * Створіть функцію, яка виконує безпечні обчислення
 * @param {number} number
 * @returns {Promise<{original?: number, result?: number, error?: string}>}
 */
function safeCalculation(number) {
    return Promise.resolve(number)
        .then(num => {
            // 1. Валідуємо число (може кинути Error)
            const validated = validateNumber(num);

            // 2. Множимо на 2 та 3. Додаємо 5
            const calculatedResult = (validated * 2) + 5;

            // 4. Повертаємо успішний результат
            return {
                original: num,
                result: calculatedResult
            };
        })
        .catch(err => {
            // 5. Обробляємо помилку (з validateNumber або іншу)
            // Повертаємо об'єкт з текстом помилки
            return {
                error: err.message
            };
        });
}

// Функція валідації (вже надана тобою)
function validateNumber(number) {
    if (number < 0) {
        throw new Error('Number must be positive');
    }
    return number;
}

// Перевірка:
safeCalculation(10)
    .then(result => console.log('✅ Тест 7.4a (успіх):', result));
// Очікується: { original: 10, result: 25 }

safeCalculation(-5)
    .then(result => console.log('✅ Тест 7.4b (помилка):', result));
// Очікується: { error: 'Number must be positive' }