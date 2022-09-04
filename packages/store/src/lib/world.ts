import { Injectable } from "@jest-automation/shared-utilities";

/**
 * Simple storage cache containing name:value pairs.
 *
 * Example:
 * ```
 * World.userCount = 1;
 * expect(World.userCount).toBe(1)
 * ```
 */
@Injectable()
export class World {
  [key: string]: unknown;
}
