import { useCallback, useState } from "react";
import DayToDoContainer from "./DayContainer";
import ToDoCalender from "./ToDoCalender";
import EditPopup from "./EditPopup";

export type Color = "red" | "blue" | "green";
export type ToDoDate = Date | null

export type ToDoType = {
	id: string,
	text: string,
	color: Color,
	startTime: ToDoDate,
	endTime: ToDoDate,
};

function ContentContainer() {
	const [toDos, setToDos] = useState<ToDoType[]>([{ id: Date.now().toString(), text: "", color: "blue", startTime: null, endTime: null }])
	const [selectedToDo, setSelectedToDo] = useState<ToDoType | null>(null)
	const [lastUsedColor, setLastUsedColor] = useState<Color>("blue")


	const handleSelectedToDo = (toDo: ToDoType) => {
		setSelectedToDo(toDo)
	}

	const handleCancel = useCallback(() => {
		setSelectedToDo(null)
	}, [])

	const handleSave = (updatedText: string, updatedStart: ToDoDate, updatedEnd: ToDoDate) => {
		setToDos(prev => {
			const updated = prev.map(todo => todo.id === selectedToDo!.id ? { ...todo, text: updatedText.trim(), startTime: updatedStart, endTime: updatedEnd } : todo);
			const filtered = updated.filter((todo, i) => todo.text.trim() !== "" || i === updated.length - 1);
			if (filtered.length === 0 || filtered[filtered.length - 1].text !== "") {
				return [...filtered, { id: Date.now().toString(), text: "", color: lastUsedColor, startTime: null, endTime: null }]
			}

			return filtered
		})
		setSelectedToDo(null)
	}

	const handleColorSelect = (todo: ToDoType, updatedColor: ToDoType["color"]) => {
		setLastUsedColor(updatedColor)
		setToDos(prev => {
			const updated = prev.map(t => t.id === todo.id ? { ...t, color: updatedColor } : t);

			return updated
		})
	}
	return (
		<div className="flex flex-row w-full h-full"	>
			{selectedToDo && <EditPopup todo={selectedToDo} onCancel={handleCancel} onSave={handleSave} />}
			<DayToDoContainer toDos={toDos} onSelect={handleSelectedToDo} onColorSelect={handleColorSelect} />
			<ToDoCalender toDos={toDos} />
		</div>
	)
}

export default ContentContainer;
