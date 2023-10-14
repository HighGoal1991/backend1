/**
 * @packageDocumentation
 * @module api.functional.monitors.system
 * @nestia Generated by Nestia - https://github.com/samchon/nestia 
 */
//================================================================
import type { IConnection, Primitive } from "@nestia/fetcher";
import { PlainFetcher } from "@nestia/fetcher/lib/PlainFetcher";
import typia from "typia";

import type { ISystem } from "../../../structures/monitors/ISystem";

/**
 * @controller SystemController.get
 * @path GET /monitors/system
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function get(
    connection: IConnection,
): Promise<get.Output> {
    return !!connection.simulate
        ? get.simulate(
              connection,
          )
        : PlainFetcher.fetch(
              connection,
              {
                  ...get.METADATA,
                  path: get.path(),
              } as const,
          );
}
export namespace get {
    export type Output = Primitive<ISystem>;

    export const METADATA = {
        method: "GET",
        path: "/monitors/system",
        request: null,
        response: {
            type: "application/json",
            encrypted: false,
        },
        status: null,
    } as const;

    export const path = (): string => {
        return `/monitors/system`;
    }
    export const random = (g?: Partial<typia.IRandomGenerator>): Primitive<ISystem> =>
        typia.random<Primitive<ISystem>>(g);
    export const simulate = async (
        connection: IConnection,
    ): Promise<Output> => {
        return random(
            typeof connection.simulate === 'object' &&
                connection.simulate !== null
                ? connection.simulate
                : undefined
        );
    }
}

/**
 * 
 * @internal
 * 
 * @controller SystemController.internal_server_error
 * @path GET /monitors/system/internal_server_error
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function internal_server_error(
    connection: IConnection,
): Promise<void> {
    return !!connection.simulate
        ? internal_server_error.simulate(
              connection,
          )
        : PlainFetcher.fetch(
              connection,
              {
                  ...internal_server_error.METADATA,
                  path: internal_server_error.path(),
              } as const,
          );
}
export namespace internal_server_error {

    export const METADATA = {
        method: "GET",
        path: "/monitors/system/internal_server_error",
        request: null,
        response: {
            type: "application/json",
            encrypted: false,
        },
        status: null,
    } as const;

    export const path = (): string => {
        return `/monitors/system/internal_server_error`;
    }
    export const simulate = async (
        _connection: IConnection,
    ): Promise<void> => {
    }
}

/**
 * 
 * @internal
 * 
 * @controller SystemController.uncaught_exception
 * @path GET /monitors/system/uncaught_exception
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function uncaught_exception(
    connection: IConnection,
): Promise<void> {
    return !!connection.simulate
        ? uncaught_exception.simulate(
              connection,
          )
        : PlainFetcher.fetch(
              connection,
              {
                  ...uncaught_exception.METADATA,
                  path: uncaught_exception.path(),
              } as const,
          );
}
export namespace uncaught_exception {

    export const METADATA = {
        method: "GET",
        path: "/monitors/system/uncaught_exception",
        request: null,
        response: {
            type: "application/json",
            encrypted: false,
        },
        status: null,
    } as const;

    export const path = (): string => {
        return `/monitors/system/uncaught_exception`;
    }
    export const simulate = async (
        _connection: IConnection,
    ): Promise<void> => {
    }
}