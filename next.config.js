require('dotenv').config();

//нужно установить пакет dotenv чтобы он подтягивал переменные окружения из .env файла, а мне менять вручую

module.exports = (phase, { defaultConfig }) => {
    console.log(defaultConfig);
    return {
        env: { // переменные окружения
            API_URL: process.env.API_URL
        }
        /* config options here */
    }
}

