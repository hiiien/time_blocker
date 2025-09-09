import { useEffect, useRef } from "react";
import { ColorMap } from "../constants/ColorMap";
import type { Color, ToDoType } from "./ContentContainer";

type ColorPickerProps = {
	todo: ToDoType
	onSelect: (todo: ToDoType, color: Color) => void,
	onCancel: () => void,
}

function ColorPicker({ todo, onSelect, onCancel }: ColorPickerProps) {
	const div = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClickDown = (e: MouseEvent) => {
			if (div.current && !div.current.contains(e.target as Node)) {
				onCancel()
			}
		}

		window.addEventListener("mousedown", handleClickDown);

		return () => window.removeEventListener("mousedown", handleClickDown);
	}, [onCancel])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onCancel()
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [onCancel])

	return (
		<div
			ref={div}
			className="absolute top-full left-1/2 -translate-x-1/2 mt-2 flex gap-2 p-2 border rounded-lg bg-white shadow-lg z-1">
			{(Object.entries(ColorMap) as [Color, string][]).map(([name, classColor]) => (
				<div
					key={name}
					className={classColor + " transition-transform hover:-translate-y-0.5 duration-200 hover:shadow-lg h-4 w-8 rounded-4xl border-black border-1"}
					onClick={() => onSelect(todo, name)}
				/>
			))}
		</div>
	)
}

export default ColorPicker;
