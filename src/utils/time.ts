import type { ToDoDate } from "../components/ContentContainer";


export function addDates(d1: ToDoDate, d2: ToDoDate): number | null {
	if (!d1 || !d2) return null;
	return d1.getTime() + d2.getTime();
}

export function subtractDates(d1: ToDoDate, d2: ToDoDate): number | null {
	if (!d1 || !d2) return null;
	return d1.getTime() - d2.getTime();
}

export function dateToString(d: ToDoDate): string {
	if (!d) return "";
	const pad = (n: number) => n.toString().padStart(2, "0");

	const year = d.getFullYear();
	const month = pad(d.getMonth() + 1);
	const day = pad(d.getDate());
	const hours = pad(d.getHours());
	const minutes = pad(d.getMinutes());

	return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export function numberToDate(ms: number | null): ToDoDate {
	return ms !== null ? new Date(ms) : null;
}

export function stringToDate(value: string | Date | null): Date | null {
	if (value instanceof Date) return value;
	if (typeof value === "string" && value.length >= 16) {
		// Parse YYYY-MM-DDTHH:mm as local time
		const [datePart, timePart] = value.split("T");
		if (!datePart || !timePart) return null;
		const [year, month, day] = datePart.split("-").map(Number);
		const [hour, minute] = timePart.split(":").map(Number);
		return new Date(year, month - 1, day, hour, minute);
	}
	return null;
}

export function todoDatetoDate(d: ToDoDate, fallback: Date): Date {
	if (d) {
		const date: Date = d
		return date
	}

	return fallback
}
