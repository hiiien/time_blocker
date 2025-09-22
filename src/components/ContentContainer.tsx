import { useCallback, useState } from "react";
import DayToDoContainer from "./DayContainer";
import ToDoCalender from "./ToDoCalender";
import EditPopup from "./EditPopup";
import MiddleDivider from "./middleDivider";

export type Color = "red" | "blue" | "green";
export type ToDoDate = Date | null;

export type ToDoType = {
	id: string;
	text: string;
	color: Color;
	startTime: ToDoDate;
	endTime: ToDoDate;
};



function ContentContainer() {
	const [toDos, setToDos] = useState<ToDoType[]>(() => {
		const todoArray: ToDoType[] = [];
		for (let i = 0; i < localStorage.length; i++) {
			const item: string = localStorage.key(i)!;
			try {
				const todo = localStorage.getItem(item);
				if (todo) {
					const parsedTodo: ToDoType = JSON.parse(todo);
					parsedTodo.startTime = parsedTodo.startTime ? new Date(parsedTodo.startTime) : null;
					parsedTodo.endTime = parsedTodo.endTime ? new Date(parsedTodo.endTime) : null;
					if (parsedTodo.text.trim() !== "" &&
						((parsedTodo.endTime === null && parsedTodo.startTime === null) ||
							(parsedTodo.endTime && parsedTodo.endTime > new Date()))) {
						todoArray.push(parsedTodo);
					} else {
						localStorage.removeItem(item)
					}
				}
			} catch (error) {
				console.error("Error parsing item from localStorage", error);
			}
		}

		return todoArray.length > 0 && todoArray[todoArray.length - 1].text.trim() === ""
			? todoArray
			: [...todoArray, { id: Date.now().toString(), text: "", color: "blue", startTime: null, endTime: null }];
	});

	const [selectedToDo, setSelectedToDo] = useState<ToDoType | null>(null);
	const [lastUsedColor, setLastUsedColor] = useState<Color>("blue");

	const handleSelectedToDo = (toDo: ToDoType) => {
		setSelectedToDo(toDo);
	};

	const handleCancel = useCallback(() => {
		setSelectedToDo(null);
	}, []);




	const handleSave = (updatedText: string, updatedStart: ToDoDate, updatedEnd: ToDoDate) => {
		setToDos(prev => {
			const updated = prev.map(todo =>
				todo.id === selectedToDo!.id
					? { ...todo, text: updatedText.trim(), startTime: updatedStart, endTime: updatedEnd }
					: todo
			);

			// Filter out empty todos and add a new one if needed
			const filtered = updated.filter((todo, i) => todo.text.trim() !== "" || i === updated.length - 1);
			if (filtered.length === 0 || filtered[filtered.length - 1].text !== "") {
				filtered.push({ id: Date.now().toString(), text: "", color: lastUsedColor, startTime: null, endTime: null });
			}

			localStorage.clear()
			filtered.forEach(todo => {
				try {
					localStorage.setItem(todo.id, JSON.stringify(todo)); // Update individual item in localStorage
				} catch (error) {
					console.error("Error saving to localStorage", error); // Graceful error handling
				}
			});

			return filtered;
		});

		setSelectedToDo(null);
	};

	const handleColorSelect = (todo: ToDoType, updatedColor: ToDoType["color"]) => {
		setLastUsedColor(updatedColor);
		setToDos(prev => {
			const updated = prev.map(t => t.id === todo.id ? { ...t, color: updatedColor } : t);

			updated.forEach(t => {
				try {
					localStorage.setItem(t.id, JSON.stringify(t)); // Update the color in localStorage
				} catch (error) {
					console.error("Error saving color to localStorage", error); // Graceful error handling
				}
			});

			return updated;
		});
	};

	return (
		<div className="flex flex-row w-full flex-1">
			{selectedToDo && <EditPopup todo={selectedToDo} onCancel={handleCancel} onSave={handleSave} />}
			<DayToDoContainer toDos={toDos} onSelect={handleSelectedToDo} onColorSelect={handleColorSelect} />
			<MiddleDivider />
			<ToDoCalender toDos={toDos} />
		</div>
	);
}

export default ContentContainer;

