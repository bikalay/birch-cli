/*@flow*/
import {ERROR_MESSAGES} from './error-messages';
import {ERROR_TYPES} from './error-types';
export class ValidationError extends Error {
    fieldName: string;
    constructor(message: string=ERROR_MESSAGES.VALIDATION_ERROR, fieldName: string) {
        super(message);
        this.name = ERROR_TYPES.VALIDATION_ERROR;
        this.fieldName = fieldName;
    }
}
