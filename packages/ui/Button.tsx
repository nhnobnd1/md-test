import { createContext } from "react";

const TestContext = createContext(undefined);

export const Button = () => {
	return <TestContext.Provider value={undefined}>Boop</TestContext.Provider>;
};
