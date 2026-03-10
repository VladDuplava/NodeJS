/**
 * @param {Function} fn
 * @param {number} maxRetries
 * @param {Object} options - {initialDelay, maxDelay, onRetry}
 * @returns {Promise}
 */
function retryWithLogging(fn, maxRetries, options = {}, attempt = 1) {
    const {
        initialDelay = 100,
        maxDelay = 5000,
        onRetry = null
    } = options;

    return fn().catch(error => {
        // Якщо ліміт спроб вичерпано
        if (attempt > maxRetries) {
            return Promise.reject(error);
        }

        // Обчислюємо затримку, але не більше maxDelay
        const nextDelay = Math.min(initialDelay * Math.pow(2, attempt - 1), maxDelay);

        // Викликаємо callback для логування, якщо він переданий
        if (typeof onRetry === 'function') {
            onRetry(attempt, error, nextDelay);
        }

        // Чекаємо та повторюємо
        return new Promise(resolve => setTimeout(resolve, nextDelay))
            .then(() => retryWithLogging(fn, maxRetries, options, attempt + 1));
    });
}

// --- Перевірка ---
let attempt4 = 0;
function trackableFunction() {
    attempt4++;
    if (attempt4 < 4) {
        return Promise.reject(new Error(`Fail ${attempt4}`));
    }
    return Promise.resolve('Success!');
}

console.log('🚀 Starting retryWithLogging...');

retryWithLogging(trackableFunction, 5, {
    initialDelay: 50,
    maxDelay: 500,
    onRetry: (attempt, error, delay) => {
        console.log(`  [Log] Retry ${attempt}: ${error.message}, waiting ${delay}ms`);
    }
})
    .then(result => console.log('✅ Тест 19.4 (Результат):', result))
    .catch(err => console.error('❌ Остаточна помилка:', err.message));