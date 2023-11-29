const removeAcentos = (str: string): string => {
    if (typeof str !== 'string') {
        throw new TypeError('Esperado uma string');
    }
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\s/g, "");
}

export default removeAcentos;