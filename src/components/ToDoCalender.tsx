import { ColorMap } from "../constants/ColorMap";
import { todoDatetoDate } from "../utils/time";
import type { ToDoType } from "./ContentContainer";

type CalenderProps = {
	toDos: ToDoType[]
}


type CalenderItemProps = {
	todo: ToDoType,
	itemHeight: number
	itemOffset: number
}

const height: number = 1000





function ToDoCalender({ toDos }: CalenderProps) {
	const containerHeight = "h-[" + height + "px] "
	const currDate: Date = new Date();

	return (
		<div className={containerHeight + "w-1/2 relative"} >
			{toDos.map((todo) => {
				if (!todo.text.length) return null;

				const start = todoDatetoDate(todo.startTime, currDate).getTime()
				const end = todoDatetoDate(todo.endTime, currDate).getTime()

				const durationHours = (end - start) / (1000 * 60 * 60)
				const offsetHours = (start - currDate.getTime()) / (1000 * 60 * 60)


				const itemHeight = (height / 8) * durationHours
				const topOffset = (height / 8) * offsetHours

				return (
					<CalenderItem
						key={todo.id}
						todo={todo}
						itemHeight={itemHeight}
						itemOffset={topOffset}
					/>
				)
			})}
		</div>
	)
}


function CalenderItem({ todo, itemHeight, itemOffset }: CalenderItemProps) {
	console.log(itemHeight)
	const backgroundColor = ColorMap[todo.color] || ColorMap.blue;
	return (
		<div className={backgroundColor + " w-3/4 rounded-4xl box-border px-5 absolute left-1/2 -translate-x-1/2"}
			style={{
				height: `${itemHeight}px`,
				top: `${itemOffset}px`
			}}>
			<p>{todo.text}</p>
		</div>
	)
}

export default ToDoCalender;
