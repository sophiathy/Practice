import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Menu from "./components/Menu";
import RightBar from "./components/RightBar";
import { SkuContents } from "./components/content/SkuContents";

type Image = {
	url: string;
};
type Price = {
	formattedValue: string;
};

type Products = {
	code: string;
	name?: string;
	images?: Image[];
	price?: Price;
};

function App() {
	const [items, setItems] = useState<Products[]>([]);
	const [preview, setPreview] = useState(false); //  To-do: not global
	const [isSelected, setSelected] = useState(false); //  To-do: not global

	const fetchData = async () => {
		try {
			const response = await fetch("/data.json");

			if (response.status === 200) {
				const jsonData = await response.json();
				console.log(jsonData.products);
				setItems(jsonData.products as Products[]);
			} else {
				console.log("Fail to get data: " + response.status);
			}
		} catch (e) {
			console.log("ERROR: " + e);
		}
	};

	useEffect(() => {
		// fetch("/data.json")
		// 	.then((response) => response.json()) // can be refactor to async await -Kevin
		// 	.then((json) => {
		// 		console.log(json.products);
		// 		setItems(json.products as Products[]);
		// 	}).catch((e) =>
		//     console.log("Empty Data / Fail to Get Response: " + e)
		//   );

		fetchData();
	}, []);

	const togglePreview = () => setPreview((previewAction) => !previewAction);
	const toggleSelected = () => setSelected((selectAction) => !selectAction);

	return (
		<>
			<Header />

			<div className="flex flex-row">
				<Menu />

				{/* ContentSection */}
				<div className="mx-4 grow">
					<div className="mb-4 bg-gray-200 rounded-xl text-xl p-2">
						{items.length ? (
							<div className="grid grid-cols-3 my-2 space-x-8 space-y-4">
								{items.map((item) => {
									return isSelected ? (
										<div
											className="flex flex-col items-center bg-gray-300 rounded-xl p-4 space-y-8"
											key={item.code}
										>
											<SkuContents
												imageUrl={item.images ? item.images[0].url : ""}
												skuName={item.name ? item.name : "N/A"}
												skuCode={item.code}
												skuPrice={
													item.price ? item.price.formattedValue : "$ N/A"
												}
												preview={preview}
												togglePreview={togglePreview}
												isSelected={isSelected}
												toggleSelected={toggleSelected}
											/>
										</div>
									) : (
										<div
											className="flex flex-col items-center bg-white rounded-xl p-4 space-y-8"
											key={item.code}
										>
											<SkuContents
												imageUrl={item.images ? item.images[0].url : ""}
												skuName={item.name ? item.name : "N/A"}
												skuCode={item.code}
												skuPrice={
													item.price ? item.price.formattedValue : "$ N/A"
												}
												preview={preview}
												togglePreview={togglePreview}
												isSelected={isSelected}
												toggleSelected={toggleSelected}
											/>
										</div>
									);
								})}
							</div>
						) : (
							<div className="bg-white justify-center rounded-xl p-4 space-y-8">
								No Data
							</div>
						)}
					</div>

					<Footer />
				</div>

				<RightBar />
			</div>
		</>
	);
}

export default App;
