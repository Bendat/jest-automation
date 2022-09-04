import { injectable } from "tsyringe/dist/typings/decorators";

/**
 * Simple storage cache containing name:value pairs.
 * 
 * Example:
 * ```
 * World.userCount = 1;
 * expect(World.userCount).toBe(1)
 * ```
 */
@injectable()
export class World{
    [key: string]: unknown
}