import type { Color, ToDoType } from "./ContentContainer";
import ToDo from "./ToDo";


type ToDoContainerProps = {
	toDos: ToDoType[],
	onSelect: (toDo: ToDoType) => void,
	onColorSelect: (toDo: ToDoType, color: Color) => void,

}

function DayToDoContainer({ toDos, onSelect, onColorSelect }: ToDoContainerProps) {

	return (
		<>
			<div className="w-1/2 box-border pr-4 h-full">
				{toDos.map((todo) => (
					<ToDo
						key={todo.id}
						toDo={todo}
						onSelect={onSelect}
						onColorSelect={onColorSelect}
					/>
				))}

			</div>
		</>
	)
}

export default DayToDoContainer;
