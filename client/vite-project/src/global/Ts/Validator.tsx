export class Validator {
    constructor() {
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
    }

    validateEmail(email: string): boolean {
        // Email regex.
        var validRegex =
            /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*)@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

        return email.match(validRegex) ? true : false;
    }

    validatePassword(password: string): boolean {
        // Password regex (special character, uppercase, lowercase, number).
        var validRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        return password.match(validRegex) ? true : false;
    }

    normalizeString(str: string): string {
        // Turns pinyin into normal characters.
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    }

    formatDefinition(definition: string): string {
        if (!definition) {
            return '';
        }

        const parts = definition.split(/[,;]\s*(?:[,;]\s*){2}/);

        const result = parts[0];

        const formattedResult = result.replace(/[,;]/g, ',');

        return formattedResult;
    }
}
