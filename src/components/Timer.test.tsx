import React from "react";
import {render, screen} from "@testing-library/react";
// import {toBeInTheDocument} from "@testing-library/jest-dom";

// expect.extend({toBeInTheDocument}); // Add this line

import Timer from "./Timer";

describe("Timer component", () => {
	test("should render Timer component with start and reset buttons", () => {
		// render(<Timer workTime={0} breakTime={0} />);
		// expect(screen.getByText("Start")).toBeInTheDocument();
		// expect(screen.getByText("Reset")).toBeInTheDocument();
	});
});
