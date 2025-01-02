import { css, cx } from "hono/css";
import { resolve } from "./resolve.js";
import type { Definition, Style } from "./types.js";

type CssReturn = ReturnType<typeof css>;

export function createUtilityClassesComposer<T extends Definition<CssReturn>>(
	config: (c: typeof css) => T,
) {
	const definition = config(css);
	return (...classNames: Style<CssReturn, T>[]): CssReturn =>
		cx(...classNames.map((className) => resolve(className, definition)));
}

export * from "./symbols.js";
