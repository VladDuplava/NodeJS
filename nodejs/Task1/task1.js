/**
 * Створіть проміс, який резолвиться з числом після перевірки
 * Якщо число парне - resolve, якщо непарне - reject
 * * @param {number} number
 * @returns {Promise<number|string>}
 */
function checkEvenNumber(number) {
    return new Promise((resolve, reject) => {
        if (number % 2 === 0) {
            // Якщо число парне, викликаємо resolve
            resolve(number);
        } else {
            // Якщо непарне, викликаємо reject з повідомленням про помилку
            reject(`Число ${number} є непарним`);
        }
    });
}

// Перевірка:
checkEvenNumber(4)
    .then(num => console.log('✅ Тест 1.2 (парне):', num))
    .catch(err => console.log('❌ Помилка:', err));

checkEvenNumber(5)
    .then(num => console.log('   Не повинно виконатися'))
    .catch(err => console.log('✅ Тест 1.2 (непарне):', err));