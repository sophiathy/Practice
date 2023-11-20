import "./App.css";
import Details from "./pages/Details";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/details" element={<Details />} />
		</Routes>
	);
}

export default App;
