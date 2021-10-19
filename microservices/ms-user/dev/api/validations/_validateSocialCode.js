module.exports = (app) => {
    const validation = {};

    validation.cpf = (val) => {
        // only digits
        val = val.replace(/\D/g,"");

        if (!val || val.length != 11) return false;

        if (val == "00000000000"
            || val == "11111111111"
            || val == "22222222222"
            || val == "33333333333"
            || val == "44444444444"
            || val == "55555555555"
            || val == "66666666666"
            || val == "77777777777"
            || val == "88888888888"
            || val == "99999999999") return false

        let sum = 0;
        let rest;

        for (let i = 1; i <= 9; i++) {
            sum = sum + parseInt(val.substring(i - 1, i)) * (11 - i);
        }

        rest = (sum * 10) % 11;

        if ((rest == 10) || (rest == 11)) rest = 0;

        if (rest != parseInt(val.substring(9, 10))) return false;

        sum = 0;

        for (let i = 1; i <= 10; i++) {
            sum = sum + parseInt(val.substring(i - 1, i)) * (12 - i);
        }

        rest = (sum * 10) % 11;

        if ((rest == 10) || (rest == 11)) rest = 0;

        if (rest != parseInt(val.substring(10, 11))) return false;

        return true;
    }

    validation.cnpj = (val) => {
        // only digits
        val = val.replace(/\D/g,"");

        if (!val || val.length != 14) return false;

        if (   val == "00000000000000"
            || val == "11111111111111"
            || val == "22222222222222"
            || val == "33333333333333"
            || val == "44444444444444"
            || val == "55555555555555"
            || val == "66666666666666"
            || val == "77777777777777"
            || val == "88888888888888"
            || val == "99999999999999") return false;

        let length   = val.length - 2;
        let numbers  = val.substring(0, length);
        const digits = val.substring(length);
        let sum      = 0;
        let pos      = length - 7;

        for (var i = length; i >= 1; i--) {
            sum += numbers.charAt(length - i) * pos--;
            if (pos < 2) pos = 9;
        }

        let result = sum % 11 < 2 ? 0 : 11 - sum % 11;

        if (result != digits.charAt(0)) return false

        length = length + 1;
        numbers = val.substring(0, length);
        sum = 0;
        pos = length - 7;

        for (var i = length; i >= 1; i--) {
            sum += numbers.charAt(length - i) * pos--;
            if (pos < 2) pos = 9;
        }

        result = sum % 11 < 2 ? 0 : 11 - sum % 11;

        if (result != digits.charAt(1)) return false;

        return true;
    }

    return validation;
}
