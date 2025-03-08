import { getMessage } from "./message.util";

export const TYPE_JSON = "application/json";
export const STATUS_CODE_OK = 200;
export const STATUS_CODE_BAD_REQUEST = 400;
export const STATUS_CODE_UNAUTHORIZED = 401;
export const STATUS_CODE_NOT_FOUND = 404;
export const STATUS_CODE_UNPROCESSABLE_ENTITY = 422;
export const STATUS_CODE_SERVER_ERROR = 500;

export class CustomException extends Error {
    status = STATUS_CODE_SERVER_ERROR;
    name = this.constructor.name;
    constructor(message: string) {
        super(message);
    }
}

export class UnprocessableEntityException extends CustomException {
    constructor(message: string = getMessage("default.unprocessibleEntity") || "Unprocessable Entity") {
        super(message);
        this.name = this.constructor.name;
        this.status = STATUS_CODE_UNPROCESSABLE_ENTITY;
    }
}

export class InternalServerErrorException extends CustomException {
    constructor(message: string = getMessage("default.server.error") || "Internal Server Error") {
        super(message);
        this.name = this.constructor.name;
        this.status = STATUS_CODE_SERVER_ERROR;
    }
}

export class BadRequestException extends CustomException {
    constructor(message: string = getMessage("default.badRequest") || "Bad Request") {
        super(message);
        this.name = this.constructor.name;
        this.status = STATUS_CODE_BAD_REQUEST;
    }
}

export class UnauthorisedException extends CustomException {
    constructor(message: string = getMessage("default.unauthorized") || "Unauthorised") {
        super(message);
        this.name = this.constructor.name;
        this.status = STATUS_CODE_UNAUTHORIZED;
    }
}

export class NotFoundException extends CustomException {
    constructor(message: string = getMessage("default.notfound") || "Not Found") {
        super(message);
        this.name = this.constructor.name;
        this.status = STATUS_CODE_NOT_FOUND;
    }
}