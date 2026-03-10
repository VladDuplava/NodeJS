/**
 * Спробуйте отримати дані з кількох джерел
 * Поверніть перше успішне
 * @returns {Promise<{source: string, data: string}>}
 */
function getDataFromAnySource() {
    const sourceA = unreliableSource('Source A', 300, true);
    const sourceB = unreliableSource('Source B', 500, false);
    const sourceC = unreliableSource('Source C', 200, true);

    // ВАРІАНТ 1: Сучасний і правильний (Promise.any)
    // Він автоматично ігнорує Source A та C, бо вони падають,
    // і чекає на перший успіх (Source B)
    return Promise.any([sourceA, sourceB, sourceC]);

    /* ВАРІАНТ 2: Якщо вчити саме Promise.race (трюк з ігноруванням помилок):
    return Promise.race([
        sourceA.catch(() => new Promise(() => {})), // перетворюємо помилку на вічне очікування
        sourceB.catch(() => new Promise(() => {})),
        sourceC.catch(() => new Promise(() => {}))
    ]);
    */
}

// Допоміжна функція (вже надана у вашому коді)
function unreliableSource(name, delay, shouldFail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`${name} failed`));
            } else {
                resolve({ source: name, data: 'Success!' });
            }
        }, delay);
    });
}

// Перевірка:
getDataFromAnySource()
    .then(result => console.log('✅ Тест 10.4 (Перший успішний):', result))
    .catch(err => console.error('❌ Всі джерела впали:', err));
// Очікується: { source: 'Source B', data: 'Success!' }