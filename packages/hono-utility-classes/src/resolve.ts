import { ARBITRARY, DEFAULT } from "./symbols.js";
import type { Definition } from "./types.js";

export function resolve<Ret>(
	className: string,
	definition: Definition<Ret>,
): Ret {
	if (className in definition) return definition[className] as Ret;
	const [first, ...rest] = className.split("-");
	const restString = rest.join("-");
	if (!(first in definition)) throw new Error(`Invalid style: ${className}`);
	const obj = definition[first] as Definition<Ret>;
	const arbitrary = restString.startsWith("[") && restString.endsWith("]");
	if (arbitrary) {
		const arbitraryValue = restString.slice(1, -1);
		const fn = obj[ARBITRARY] as (arg: string) => Ret;
		return fn(arbitraryValue);
	}
	const fn = obj[DEFAULT];
	if (rest.length === 1 && typeof fn === "function") {
		const valueAsNumber = Number(restString);
		if (Number.isNaN(valueAsNumber)) return fn(restString);
		return fn(valueAsNumber);
	}
	return resolve(restString, obj);
}
