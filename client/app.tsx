import { React } from "../deps.ts";

const App = () => {
    return (
        <>
            <p>Hello World</p>
            <button
                onClick={() => {
                    console.log("WEEEE");
                }}
            >
                Click Me
            </button>
        </>
    );
};

export default App;
