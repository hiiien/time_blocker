import { ColorMap } from "../constants/ColorMap";
import type { ToDoType } from "./ContentContainer";

type CalenderProps = {
	toDos: ToDoType[]
}


type CalenderItemProps = {
	todo: ToDoType,
}



function ToDoCalender({ toDos }: CalenderProps) {
	const height = "1000px"
	const containerHeight = "h-[" + height + "] "


	return (
		<div className={containerHeight + "w-1/2 flex flex-col items-center"} >
			{
				toDos.map((todo) => (
					todo.text.length > 0 && <Calender todo={todo} />
				))
			}

		</ div>
	)
}


function Calender({ todo }: CalenderItemProps) {
	const backgroundColor = ColorMap[todo.color] || ColorMap.blue;
	return (
		<div className={backgroundColor + " w-3/4 h-20 rounded-4xl box-border px-5"}>
			<p>{todo.text}</p>
		</div>
	)
}

export default ToDoCalender;
