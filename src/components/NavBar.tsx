function NavBar() {
	const date = new Date().toLocaleString("en-US", { month: "long" }) + " " + new Date().getDate() + ", " + new Date().getFullYear()
	return (
		<div className="h-12 flex flex-row pt-5 pb-16 mb-5 border-b-black border-b-2">
			<h1 className="font-bold text-4xl">{date}</h1>
		</div>
	)
}

export default NavBar;
