/**
 * @param {string[]} urls
 * @returns {Promise<{successful: object[], failed: Error[]}>}
 */
async function fetchMultipleAPIs(urls) {
    // 1. Створюємо масив промісів для кожного URL
    const requests = urls.map(url => fetchAPI(url));

    // 2. Чекаємо завершення всіх запитів незалежно від результату
    const results = await Promise.allSettled(requests);

    // 3. Групуємо результати за статусом
    const successful = results
        .filter(res => res.status === 'fulfilled')
        .map(res => res.value);

    const failed = results
        .filter(res => res.status === 'rejected')
        .map(res => res.reason);

    return { successful, failed };
}

// Допоміжна функція (вже надана у вашому коді)
function fetchAPI(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url.includes('broken')) {
                reject(new Error(`API ${url} is down`));
            } else {
                resolve({ url, data: `Data from ${url}` });
            }
        }, Math.random() * 300);
    });
}

// Перевірка:
const apis = [
    'https://api1.com/data',
    'https://api2-broken.com/data',
    'https://api3.com/data',
    'https://api4-broken.com/data',
    'https://api5.com/data'
];

fetchMultipleAPIs(apis)
    .then(result => {
        console.log('✅ Тест 11.3 (Множинні API):');
        console.log('  Успішно завантажено:', result.successful.length); // Очікується: 3
        console.log('  Помилок отримано:', result.failed.length);      // Очікується: 2

        // Можна також вивести самі помилки для логування
        if (result.failed.length > 0) {
            console.log('  Логи помилок:', result.failed.map(e => e.message));
        }
    });