import type {Config} from "@jest/types";

const config: Config.InitialOptions = {
	testMatch: ["**/*.test.ts", "**/*.test.tsx"],
	moduleFileExtensions: ["ts", "tsx", "js"],
	testEnvironment: "jsdom",
	globals: {
		"ts-jest": {
			tsconfig: "tsconfig.json",
		},
	},
};

export default config;
