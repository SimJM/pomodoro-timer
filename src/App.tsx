import React from "react";

import Timer from "./components/Timer";

function App() {
	return (
		<div className="App">
			<Timer workTime={5} breakTime={2} />
		</div>
	);
}

export default App;
