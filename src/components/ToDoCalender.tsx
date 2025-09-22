import { useEffect, useState } from "react";
import { ColorMap } from "../constants/ColorMap";
import { todoDatetoDate } from "../utils/time";
import type { ToDoType } from "./ContentContainer";

type CalenderProps = {
	toDos: ToDoType[]
}

type CalenderItemProps = {
	todo: ToDoType,
	itemHeight: number,
	itemOffset: number
}

const height: number = 1000;



function ToDoCalender({ toDos }: CalenderProps) {
	const [, forceUpdate] = useState(Date.now());

	useEffect(() => {
		const id = setInterval(() => forceUpdate(Date.now()), 1000);
		return () => clearInterval(id);
	}, []);

	const containerHeight = "h-[" + height + "px] ";
	const realNow = Date.now();
	const nowDate = new Date(realNow)

	return (
		<div className={containerHeight + "w-1/2 relative h-auto"}>
			{toDos.map((todo) => {
				if (!todo.text.length) return null;

				// ✅ filter using alignedNow (matches parent todo list logic)
				if (todo.endTime && todo.endTime < nowDate) return null;

				const start = todoDatetoDate(todo.startTime, nowDate);
				const end = todoDatetoDate(todo.endTime, nowDate);

				if (!(start instanceof Date) || isNaN(start.getTime())) return null;
				if (!(end instanceof Date) || isNaN(end.getTime())) return null;

				let durationHours: number;
				let offsetHours: number;

				// ✅ size/position using realNow for smoother shrinking
				if (start < nowDate) {
					durationHours = (end.getTime() - nowDate.getTime()) / (1000 * 60 * 60);
					offsetHours = 0;
				} else {
					offsetHours = (start.getTime() - nowDate.getTime()) / (1000 * 60 * 60);
					durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
				}

				const itemHeight = (height / 8) * durationHours;
				const topOffset = (height / 8) * offsetHours;

				return (
					<CalenderItem
						key={todo.id}
						todo={todo}
						itemHeight={itemHeight}
						itemOffset={topOffset}
					/>
				);
			})}
		</div>
	);
}

function formatSmartTime(date: Date) {
	const h = date.getHours();
	const m = date.getMinutes();
	return m === 0 ? `${h}` : `${h}:${m.toString().padStart(2, "0")}`
}

function CalenderItem({ todo, itemHeight, itemOffset }: CalenderItemProps) {
	const backgroundColor = ColorMap[todo.color] || ColorMap.blue;
	if (itemHeight > 60) {
		return (
			<div className={backgroundColor + " w-3/4 rounded-4xl box-border p-5 absolute left-1/2 -translate-x-1/2"}
				style={{
					height: `${itemHeight}px`,
					top: `${itemOffset}px`
				}}>
				<p>{todo.text}</p>
				{todo.startTime && todo.endTime && (
					<p>
						{formatSmartTime(todo.startTime)} - {formatSmartTime(todo.endTime)}
					</p>
				)}
			</div>
		);
	} else {
		return (
			<div className={backgroundColor + " w-3/4 rounded-4xl box-border absolute left-1/2 -translate-x-1/2"}
				style={{
					height: `${itemHeight}px`,
					top: `${itemOffset}px`
				}}>
			</div>
		)

	}
}

export default ToDoCalender;
