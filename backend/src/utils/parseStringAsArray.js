module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(',').map(tech => tech.trim());
}

//exportou função já diretamente portanto o modulo em si ja é uma função quando chamado 