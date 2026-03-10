/**
 * Створіть функцію, яка перевіряє вік користувача
 * @param {number} age
 * @returns {Promise<{age: number, category: string}, string>}
 */
function checkAge(age) {
    return new Promise((resolve, reject) => {
        if (age < 0) {
            // Випадок некоректного віку
            reject('Invalid age');
        } else if (age < 18) {
            // Випадок для неповнолітніх
            reject('Too young');
        } else if (age >= 18 && age < 65) {
            // Повертаємо об'єкт для дорослих
            resolve({ age: age, category: 'adult' });
        } else {
            // Повертаємо об'єкт для літніх людей
            resolve({ age: age, category: 'senior' });
        }
    });
}

// Перевірка:
checkAge(25).then(res => console.log('✅ Тест (adult):', res)).catch(console.error);
checkAge(70).then(res => console.log('✅ Тест (senior):', res)).catch(console.error);
checkAge(15).then(res => console.log('   Успіх не очікується')).catch(err => console.log('❌ Тест (young):', err));
checkAge(-5).then(res => console.log('   Успіх не очікується')).catch(err => console.log('❌ Тест (invalid):', err));