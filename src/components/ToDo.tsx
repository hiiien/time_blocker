import { useCallback, useState } from "react";
import type { Color, ToDoType } from "./ContentContainer";
import { ColorMap } from "../constants/ColorMap";
import ColorPicker from "./ColorPicker";

type ToDoProps = {
	toDo: ToDoType,
	onSelect: (toDo: ToDoType) => void,
	onColorSelect: (todo: ToDoType, color: Color) => void,
}

function ToDo({ toDo, onSelect, onColorSelect }: ToDoProps) {
	const [toDoDone, setToDoToggle] = useState(false)
	const [showPicker, setShowPicker] = useState(false)

	const backgroundColor = ColorMap[toDo.color] || ColorMap["blue"]

	const handleCancel = useCallback(() => {
		setShowPicker(false)
	}, [])


	return (
		<div className="flex py-0 flex-row items-center w-full border-b bg-white h-15 border-b-gray-300">
			<p
				className={toDoDone ? "flex-1 h-full flex items-center line-through text-gray-400" : "flex-1 flex items-center h-full text-black"}
				onClick={() => onSelect(toDo)}
			>
				{toDo.text}
			</p>

			<div className="relative inline-block">
				<div className={backgroundColor + " h-5 w-12 rounded-4xl border-black border-1"}
					onClick={() => setShowPicker(!showPicker)}
				>
				</div>
				{showPicker && <ColorPicker todo={toDo} onSelect={onColorSelect} onCancel={handleCancel} />}

			</div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				className="h-7 w-7 text-black "
				onClick={() => setToDoToggle(!toDoDone)}
			>
				<path d="M7 5c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2H7zm0 12V7h10l.002 10H7z" />
				<path d="M10.996 12.556 9.7 11.285l-1.4 1.43 2.704 2.647 4.699-4.651-1.406-1.422z" />
			</svg>
		</div >
	)
}


export default ToDo;
