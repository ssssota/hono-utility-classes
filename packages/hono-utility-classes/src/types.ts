import type { ARBITRARY, DEFAULT } from "./symbols.js";

export type ClassDefinitionObject<CssReturn, T extends string | number> = {
	[DEFAULT]?: ((value: T) => CssReturn) | undefined;
	[ARBITRARY]?: ((value: string) => CssReturn) | undefined;
	// biome-ignore lint/suspicious/noExplicitAny:
	[key: string]: ClassDefinition<CssReturn, any> | undefined;
};
export type ClassDefinition<CssReturn, T extends string | number> =
	| CssReturn
	| ClassDefinitionObject<CssReturn, T>;

export type Style<CssReturn, Def> = keyof Def extends infer K
	? K extends keyof Def
		? K extends string
			? Def[K] extends CssReturn
				? K
				: // biome-ignore lint/suspicious/noExplicitAny:
					Def[K] extends ClassDefinitionObject<CssReturn, any>
					? StyleFromObject<CssReturn, Def[K]> extends infer S
						? S extends string
							? `${K}-${S}`
							: never
						: never
					: never
			: never
		: never
	: never;

export type StyleFromObject<
	CssReturn,
	// biome-ignore lint/suspicious/noExplicitAny:
	T extends ClassDefinitionObject<CssReturn, any>,
> =
	| StyleFromObjectDefault<CssReturn, T>
	| StyleFromObjectArbitrary<CssReturn, T>
	| StyleFromObjectKey<CssReturn, T>
	| StyleFromObjectNested<CssReturn, T>;
export type StyleFromObjectDefault<
	CssReturn,
	// biome-ignore lint/suspicious/noExplicitAny:
	T extends ClassDefinitionObject<CssReturn, any>,
> = T[typeof DEFAULT] extends (arg: infer Arg) => CssReturn
	? Arg extends string | number
		? `${Arg}`
		: never
	: never;
export type StyleFromObjectArbitrary<
	CssReturn,
	// biome-ignore lint/suspicious/noExplicitAny:
	T extends ClassDefinitionObject<CssReturn, any>,
> = T[typeof ARBITRARY] extends (arg: string) => CssReturn
	? `[${string}]`
	: never;
export type StyleFromObjectKey<
	CssReturn,
	// biome-ignore lint/suspicious/noExplicitAny:
	T extends ClassDefinitionObject<CssReturn, any>,
> = keyof T extends infer K
	? K extends keyof T
		? T[K] extends CssReturn
			? K
			: never
		: never
	: never;
export type StyleFromObjectNested<
	CssReturn,
	// biome-ignore lint/suspicious/noExplicitAny:
	T extends ClassDefinitionObject<CssReturn, any>,
> = keyof T extends infer K
	? K extends keyof T
		? // biome-ignore lint/suspicious/noExplicitAny:
			T[K] extends ClassDefinitionObject<CssReturn, any>
			? StyleFromObject<CssReturn, T[K]>
			: never
		: never
	: never;

// biome-ignore lint/suspicious/noExplicitAny:
export type Definition<CssReturn> = ClassDefinitionObject<CssReturn, any>;
