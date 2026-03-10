/**
 * @param {Function} fn
 * @param {Object} options - {maxRetries, maxTime, initialDelay}
 * @returns {Promise}
 */
function retryWithTimeout(fn, options = {}) {
    const {
        maxRetries = 3,
        maxTime = 5000,
        initialDelay = 100
    } = options;

    const startTime = Date.now();

    function attempt(retryCount = 0) {
        const elapsedTime = Date.now() - startTime;

        // Перевірка умов зупинки перед виконанням функції
        if (elapsedTime >= maxTime) {
            return Promise.reject(new Error('Deadline exceeded'));
        }
        if (retryCount >= maxRetries) {
            return Promise.reject(new Error('Max retries reached'));
        }

        return fn().catch(error => {
            const currentElapsed = Date.now() - startTime;

            // Перевірка ліміту часу після невдалої спроби
            if (currentElapsed >= maxTime) {
                return Promise.reject(new Error('Deadline exceeded after failure'));
            }

            console.log(`  [Retry] Attempt ${retryCount + 1} failed. Elapsed: ${currentElapsed}ms`);

            return new Promise(resolve => setTimeout(resolve, initialDelay))
                .then(() => attempt(retryCount + 1));
        });
    }

    return attempt();
}

// --- Перевірка ---
let attempt5 = 0;
function slowFunction() {
    attempt5++;
    return new Promise((resolve, reject) => {
        // Кожна спроба займає 200мс
        setTimeout(() => {
            if (attempt5 < 10) {
                reject(new Error(`Attempt ${attempt5}`));
            } else {
                resolve('Success');
            }
        }, 200);
    });
}

console.log('🚀 Starting retryWithTimeout at', new Date().toLocaleTimeString());

retryWithTimeout(slowFunction, {
    maxRetries: 20,
    maxTime: 1000, // Маємо лише 1 секунду на все
    initialDelay: 100
})
    .then(result => console.log('✅ Успіх:', result))
    .catch(error => {
        console.log('❌ Тест 19.5: Stopped');
        console.log('  Reason:', error.message);
        console.log('  Total attempts made:', attempt5);
    });