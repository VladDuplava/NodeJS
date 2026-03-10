/**
 * Створіть retry з експоненційною затримкою (exponential backoff)
 * @param {Function} fn
 * @param {number} maxRetries
 * @param {number} initialDelay
 * @returns {Promise}
 */
function retryWithBackoff(fn, maxRetries, initialDelay = 100) {
    return fn().catch(error => {
        // Якщо спроб більше немає — остаточно відхиляємо проміс
        if (maxRetries <= 0) {
            return Promise.reject(error);
        }

        console.log(`    ⚠️  Retrying in ${initialDelay}ms... (Remaining retries: ${maxRetries})`);

        // Створюємо затримку перед наступною спробою
        return new Promise(resolve => setTimeout(resolve, initialDelay))
            .then(() => {
                // Рекурсивний виклик: зменшуємо кількість спроб, подвоюємо затримку
                return retryWithBackoff(fn, maxRetries - 1, initialDelay * 2);
            });
    });
}

// --- Перевірка ---
let attempt2 = 0;
function unstableAPI() {
    attempt2++;
    console.log(`  Attempt ${attempt2} at ${new Date().toLocaleTimeString()}`);
    if (attempt2 < 3) {
        return Promise.reject(new Error('API Error'));
    }
    return Promise.resolve('API Success');
}

console.log('🚀 Starting retryWithBackoff at', new Date().toLocaleTimeString());

retryWithBackoff(unstableAPI, 5, 100)
    .then(result => console.log('✅ Тест 19.2:', result))
    .catch(err => console.error('❌ Failed after all retries:', err.message));