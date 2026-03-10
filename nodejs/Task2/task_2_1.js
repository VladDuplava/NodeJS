/**
 * Створіть функцію, яка приймає масив чисел
 * і повертає проміс з сумою цих чисел
 * * @param {number[]} numbers
 * @returns {Promise<number>}
 */
function sumNumbers(numbers) {
    // 1. Рахуємо суму за допомогою reduce
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);

    // 2. Повертаємо вже резолвнутий проміс із результатом
    return Promise.resolve(sum);
}

// Перевірка:
sumNumbers([1, 2, 3, 4, 5])
    .then(sum => console.log('✅ Тест 2.2 (сума):', sum)); // Очікується: 15