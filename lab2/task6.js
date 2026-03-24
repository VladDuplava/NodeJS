const { Transform } = require('stream');

// 1. Стрім для великих літер (не чіпає цифри)
class UpperCaseStream extends Transform {
    _transform(chunk, encoding, callback) {
        const result = chunk.toString().replace(/[^\d]/g, char => char.toUpperCase());
        callback(null, result);
    }
}

// 2. Стрім для підсвітки та статистики
class HighlightStream extends Transform {
    constructor(keywords) {
        super();
        this.keywords = keywords;
        this.wordCount = 0;
        this.charCount = 0;
    }

    _transform(chunk, encoding, callback) {
        let text = chunk.toString();

        // Оновлюємо статистику
        this.charCount += text.length;
        const words = text.trim().split(/\s+/).filter(w => w.length > 0);
        this.wordCount += words.length;

        // Підсвітка чисел (жовтий)
        text = text.replace(/\d+/g, match => `\x1b[33m${match}\x1b[0m`);

        // Підсвітка ключових слів
        for (const [word, color] of Object.entries(this.keywords)) {
            const regex = new RegExp(`\\b${word}\\b`, 'gi');
            text = text.replace(regex, match => `${color}${match}\x1b[0m`);
        }

        callback(null, text);
    }

    _flush(callback) {
        console.log(`\n\x1b[36m--- СТАТИСТИКА: Слів: ${this.wordCount}, Символів: ${this.charCount} ---\x1b[0m`);
        callback();
    }
}

// Налаштування кольорів (ANSI)
const myColors = {
    'node': '\x1b[32m', // зелений
    'js': '\x1b[34m',   // синій
    'error': '\x1b[31m' // червоний
};

const upper = new UpperCaseStream();
const highlighter = new HighlightStream(myColors);

console.log("Вводь текст (для статистики натисни Ctrl+D або Ctrl+C):");

// З'єднуємо: Ввід консолі -> Великі літери -> Підсвітка/Статистика -> Вивід консолі
process.stdin.pipe(upper).pipe(highlighter).pipe(process.stdout);
