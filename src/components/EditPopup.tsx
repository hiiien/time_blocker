import { useEffect, useRef, useState } from "react";
import type { ToDoType } from "./ContentContainer";


type EditPopupProps = {
	todo: ToDoType,
	onCancel: () => void,
	onSave: (s: string) => void,
};

function EditPopup({ todo, onCancel, onSave }: EditPopupProps) {
	const divRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const [inputValue, setInputValue] = useState<string>(todo.text)

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
		setInputValue(todo.text)
	}, [todo.text])

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
			onSave(inputValue)
		}
	}


	return (
		<>
			<div className="fixed inset-0 bg-black/30 z-0 animate-[slide-up_0.1s_ease-out]"> </div>
			<div
				ref={divRef}
				className="edit-input h-64 w-[32rem] rounded-3xl z-10 bg-blue-100 border-0
				absolute top-[50px] left-1/2 transform -translate-x-1/2 
				animate-[slide-up_0.1s_ease-out] flex flex-col p-6">

				<div className="flex flex-row h-10 w-full">
					<input />
					<input />
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
