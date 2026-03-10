/**
 * Створіть функцію, яка конвертує об'єкт користувача
 * додаючи йому поле fullName
 * * @param {{firstName: string, lastName: string}} user
 * @returns {Promise<{firstName: string, lastName: string, fullName: string}>}
 */
function addFullName(user) {
    // Створюємо копію об'єкта, щоб не змінювати оригінал (краща практика)
    const updatedUser = {
        ...user,
        fullName: `${user.firstName} ${user.lastName}`
    };

    // Повертаємо новий об'єкт через успішно виконаний проміс
    return Promise.resolve(updatedUser);
}

// Перевірка:
addFullName({ firstName: 'John', lastName: 'Doe' })
    .then(user => console.log('✅ Тест 2.3 (об’єкт):', user));
// Очікується: { firstName: 'John', lastName: 'Doe', fullName: 'John Doe' }