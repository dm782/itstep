function debug (obj = { }) {
    return JSON.stringify(obj, null, 4); // Делает JSON файл передаваемый в бот более красивым
}

module.exports = debug;