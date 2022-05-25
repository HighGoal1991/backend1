const EXTENSION = __filename.substr(-2);
if (EXTENSION === "js") require("source-map-support").install();

import helper from "nestia-helper";
import nest from "@modules/nestjs";
import orm from "@modules/typeorm";
import pg from "pg";
import safe from "safe-typeorm";
import { IEncryptionPassword } from "nestia-fetcher";

import { DomainError } from "tstl/exception/DomainError";
import { InvalidArgument } from "tstl/exception/InvalidArgument";
import { OutOfRange } from "tstl/exception/OutOfRange";

import { SGlobal } from "./SGlobal";

export class Configuration {
    public static get MASTER_IP(): string {
        if (SGlobal.mode === "LOCAL") return "127.0.0.1";
        else if (SGlobal.mode === "DEV") return "YOUR-DEV-SERVER-HOST";
        else return "YOUR-REAL-SERVER-HOST";
    }

    public static get DB_CONFIG() {
        pg.types.setTypeParser(20, parseInt);
        return {
            // CONNECTION INFO
            type: "postgres" as const,
            host: SGlobal.mode === "REAL" ? "YOUR-REAL-DB-HOST" : "127.0.0.1",
            username: "${DB_ACCOUNT}_w",
            readonlyUsername: "${DB_ACCOUNT}_r",
            password: Configuration.SYSTEM_PASSWORD,
            database: "${DB_NAME}",
            schema: "${DB_SCHEMA}",

            // OPTIONS
            namingStrategy: new safe.SnakeCaseStrategy(),
            entities: [`${__dirname}/models/**/*.${EXTENSION}`],
        };
    }
}

export namespace Configuration {
    export const API_PORT = 37001;
    export const UPDATOR_PORT = 37000;

    export const ENCRYPTION_PASSWORD: Readonly<IEncryptionPassword> = {
        key: "pJXhbHlYfzkC1CBK8R67faaBgJWB9Myu",
        iv: "IXJBt4MflFxvxKkn",
    };

    export const ASSETS = __dirname + "/../assets";
    export const CREATED_AT: Date = new Date();
    export const SYSTEM_PASSWORD: string = "https://github.com/samchon";
}

// CUSTOM EXCEPTIION CONVERSION
helper.ExceptionManager.insert(
    orm.EntityNotFoundError,
    (exp) => new nest.NotFoundException(exp.message),
);
helper.ExceptionManager.insert(
    OutOfRange,
    (exp) => new nest.NotFoundException(exp.message),
);
helper.ExceptionManager.insert(
    InvalidArgument,
    (exp) => new nest.ConflictException(exp.message),
);
helper.ExceptionManager.insert(
    DomainError,
    (exp) => new nest.UnprocessableEntityException(exp.message),
);

// TRACE EXACT SERVER INTERNAL ERROR
helper.ExceptionManager.insert(
    Error,
    (exp) =>
        new nest.InternalServerErrorException({
            message: exp.message,
            name: exp.name,
            stack: exp.stack,
        }),
);
