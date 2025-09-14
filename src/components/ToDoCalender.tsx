import { useEffect, useState } from "react";
import { ColorMap } from "../constants/ColorMap";
import { todoDatetoDate } from "../utils/time";
import type { ToDoType } from "./ContentContainer";

type CalenderProps = {
	toDos: ToDoType[]
	onCalenderUpdate: (now: Date) => void
}

type CalenderItemProps = {
	todo: ToDoType,
	itemHeight: number,
	itemOffset: number
}

const height: number = 1000;


function useNow(refreshMs = 60_000) {
	const [now, setNow] = useState(() => Date.now());

	useEffect(() => {
		let intervalId: number | null = null;

		const alignDelay =
			refreshMs === 60_000
				? (60 - new Date().getSeconds()) * 1000 - new Date().getMilliseconds()
				: refreshMs;

		const startInterval = () => {
			intervalId = window.setInterval(() => setNow(Date.now()), refreshMs);
		};

		const timeoutId = window.setTimeout(() => {
			setNow(Date.now());
			startInterval();
		}, Math.max(0, alignDelay));

		const onVis = () => setNow(Date.now());
		document.addEventListener("visibilitychange", onVis);

		return () => {
			if (intervalId) clearInterval(intervalId);
			clearTimeout(timeoutId);
			document.removeEventListener("visibilitychange", onVis);
		};
	}, [refreshMs]);

	return new Date(now);
}

function ToDoCalender({ toDos }: CalenderProps) {
	const containerHeight = "h-[" + height + "px] ";
	const now = useNow(60_000)

	return (
		<div className={containerHeight + "w-1/2 relative"}>
			{toDos.map((todo) => {
				if (!todo.text.length) return null;
				if (todo.endTime && todo.endTime < now) return null;

				const start = todoDatetoDate(todo.startTime, now);
				const end = todoDatetoDate(todo.endTime, now);

				if (!(start instanceof Date) || isNaN(start.getTime())) {
					console.warn("Invalid startTime:", todo.startTime);
					return null;
				}
				if (!(end instanceof Date) || isNaN(end.getTime())) {
					console.warn("Invalid endTime:", todo.endTime);
					return null;
				}

				let durationHours: number
				let offsetHours: number
				if (start < now) {

					durationHours = (end.getTime() - now.getTime()) / (1000 * 60 * 60);
					offsetHours = 0
				} else {
					offsetHours = (start.getTime() - now.getTime()) / (1000 * 60 * 60);
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

function CalenderItem({ todo, itemHeight, itemOffset }: CalenderItemProps) {
	const backgroundColor = ColorMap[todo.color] || ColorMap.blue;
	return (
		<div className={backgroundColor + " w-3/4 rounded-4xl box-border px-5 absolute left-1/2 -translate-x-1/2"}
			style={{
				height: `${itemHeight}px`,
				top: `${itemOffset}px`
			}}>
			<p>{todo.text}</p>
		</div>
	);
}

export default ToDoCalender;
