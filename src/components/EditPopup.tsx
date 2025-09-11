import { useEffect, useRef, useState } from "react";
import type { ToDoDate, ToDoType } from "./ContentContainer";
import { dateToString, stringToDate } from "../utils/time";

type EditPopupProps = {
	todo: ToDoType,
	onCancel: () => void,
	onSave: (s: string, st: ToDoDate, et: ToDoDate) => void,
};

function EditPopup({ todo, onCancel, onSave }: EditPopupProps) {
	const currentTime: Date = new Date();
	const maxTime: Date = new Date(currentTime.getTime() + 60 * 60 * 1000 * 8)
	const divRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const startRef = useRef<HTMLInputElement>(null);
	const endRef = useRef<HTMLInputElement>(null);
	const [inputValue, setInputValue] = useState<string>(todo.text || "")
	const [startTime, setStartTime] = useState<Date | null>(todo.startTime || currentTime);
	const [endTime, setEndTime] = useState<Date | null>(todo.endTime || maxTime);

	useEffect(() => {
		if (inputRef) {
			const inputLength = inputRef.current!.value.length
			inputRef.current!.setSelectionRange(inputLength, inputLength)
			inputRef.current!.focus()
		}

	}, [])

	useEffect(() => {
		const handleClickDown = (e: MouseEvent) => {
			if (divRef.current && !divRef.current.contains(e.target as Node)) {
				onCancel()
			}
		}

		window.addEventListener("mousedown", handleClickDown);

		return () => window.removeEventListener("mousedown", handleClickDown);
	})

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onCancel()
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [onCancel])

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			startRef.current?.blur();
			endRef.current?.blur();

			const startVal = startRef.current?.value ?? "";
			const endVal = endRef.current?.value ?? "";

			const ls = stringToDate(startVal);
			const le = stringToDate(endVal);

			const invalidMsg = "Please enter a valid Start/End time";

			if (!ls || isNaN(ls.getTime()) || !le || isNaN(le.getTime())) {
				alert(invalidMsg);
				return;
			}

			if (ls > maxTime || le > maxTime || le < currentTime || le < ls) {
				alert(invalidMsg);
				return;
			}

			onSave(inputValue, ls, le);
		}
	};



	return (
		<>
			<div className="fixed inset-0 bg-black/30 z-1 animate-[slide-up_0.1s_ease-out]"> </div>
			<div
				ref={divRef}
				className="edit-input h-64 w-[32rem] rounded-3xl z-10 bg-blue-100 border-0
				absolute top-[50px] left-1/2 transform -translate-x-1/2 
				animate-[slide-up_0.1s_ease-out] flex flex-col p-6">

				<div className="flex flex-row h-10 w-full gap-x-2">
					<input
						ref={startRef}
						value={dateToString(startTime)}
						type="datetime-local"
						min={currentTime.toISOString().slice(0, 16)}
						max={maxTime.toISOString().slice(0, 16)}
						onChange={(e) => setStartTime(stringToDate(e.target.value))}
						onKeyDown={handleInputKeyDown}
						className="h-full w-auto focus:outline-none border-b border-black"

					/>
					<input
						ref={endRef}
						value={dateToString(endTime)}
						type="datetime-local"
						min={currentTime.toISOString().slice(0, 16)}
						max={maxTime.toISOString().slice(0, 16)}
						onChange={(e) => setEndTime(stringToDate(e.target.value))}
						onKeyDown={handleInputKeyDown}
						className="h-full w-auto focus:outline-none border-b border-black"
					/>
				</div>
				<input
					ref={inputRef}
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleInputKeyDown}
					className="h-10 w-full mb-auto mt-auto border-b border-black p-2 focus:outline-none"
				/>
			</div>
		</>
	)
}

export default EditPopup;
