import { useEffect, useState } from "react";

function MiddleDivider() {
	const [, forceUpdate] = useState(Date.now());

	useEffect(() => {
		const id = setInterval(() => forceUpdate(Date.now()), 1000);
		return () => clearInterval(id);
	}, []);

	const times: Date[] = []
	const now: Date = new Date();
	for (let i = 0; i < 16; i++) {
		const d = new Date(now)
		d.setMinutes(d.getMinutes() + (30 * i))
		times.push(d)
	}
	const height = 1000

	return (

		<div className="h-[1000px] w-0.5 bg-black mb-5 relative">
			{times.map((time, i) => {
				return (<div className="absolute left-1/2 -translate-x-1"
					style={
						{ top: `${height * (i / (times.length - 1))}px` }
					}>

					<div className="flex flex-row gap-2">
						<div className="h-2 w-2 rounded-full bg-black"></div>
						<p>{time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}</p>
					</div>
				</div>
				)
			})}
		</div >
	)
}

export default MiddleDivider;
