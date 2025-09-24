import type { Color, ToDoType } from "./ContentContainer";
import ToDo from "./ToDo";


type ToDoContainerProps = {
	toDos: ToDoType[],
	onSelect: (toDo: ToDoType) => void,
	onColorSelect: (toDo: ToDoType, color: Color) => void,
	onTodoDone: (todo: ToDoType) => void

}

function DayToDoContainer({ toDos, onSelect, onColorSelect, onTodoDone }: ToDoContainerProps) {
	return (
		<>
			<div className="w-1/2 box-border pr-4 h-auto">
				{toDos.map((todo) => (
					<ToDo
						key={todo.id}
						toDo={todo}
						onSelect={onSelect}
						onColorSelect={onColorSelect}
						onTodoDone={onTodoDone}
					/>
				))}

			</div>
		</>
	)
}

export default DayToDoContainer;
