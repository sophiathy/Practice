import { useEffect, useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Menu from "./components/Menu";
import RightBar from "./components/RightBar";

function App() {
	const [items, setItems] = useState([]);
	const [preview, setPreview] = useState(false); //  To-do: not global
	const [isSelected, setSelected] = useState(false); //  To-do: not global

	useEffect(() => {
		fetch("data.json")
			.then((response) => response.json()) // can be refactor to async await -Kevin
			.then((json) => {
				console.log(json.products);
				setItems(json.products);
			}).catch((e) =>
        //TODO: Alert empty data / fail response
        console.log("Empty Data / Fail to Get Response: " + e)
      );
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
						{/* <p>No Data</p> */}

						<div className="grid grid-cols-3 my-2 space-x-8 space-y-4">
              {items.map((item) => {
                // return <p>{JSON.stringify(item)}</p>
                return (
                  isSelected ? (
                    <div className="flex flex-col items-center bg-gray-300 rounded-xl p-4 space-y-8">
                      {/* {SkuContents(item["images"][0]["url"], item["name"], item["code"], item["price"]["formattedValue"], preview, togglePreview, isSelected, toggleSelected)} */}
                      {SkuContents("image", item["name"], item["code"], "price", preview, togglePreview, isSelected, toggleSelected)}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center bg-white rounded-xl p-4 space-y-8">
                      {/* {SkuContents(item["images"][0]["url"], item["name"], item["code"], item["price"]["formattedValue"], preview, togglePreview, isSelected, toggleSelected)} */}
                      {SkuContents("image", item["name"], item["code"], "price", preview, togglePreview, isSelected, toggleSelected)}
                    </div>
                  )
                )
              })}
						</div>
					</div>

					<Footer />
				</div>

				<RightBar />
			</div>
		</>
	);
}

export default App;



function SkuContents(imageUrl: string, skuName: string, skuCode: string, skuPrice: string, preview: boolean, togglePreview: () => void, isSelected: boolean, toggleSelected: () => void) {
  return (
    <>
      <img className="shrink-0 h-50 w-50" src={imageUrl} />
      <p className="font-semibold">{skuName}</p>
      <div className="flex-row space-x-12">
        {WhiteButton("Preview", togglePreview)}
        {WhiteButton("Details", () => console.log("Clicked Details"))}
      </div>

      {preview ? (
        PreviewSection(toggleSelected, isSelected, skuCode, skuPrice)
      ) : (
        <></>
      )}
    </>
  );
}

function WhiteButton(buttonName: string, userAction: () => void) {
  return <button
    className="bg-transparent text-cyan-300 text-base font-semibold px-3 py-2 border border-cyan-300 rounded-2xl"
    onClick={userAction}
  >
    {buttonName}
  </button>;
}

function PreviewSection(toggleSelected: () => void, isSelected: boolean, code: string, price: string) {
  //TODO: Add selected useState here
  return <div className="py-4 space-y-8">
    <p className="font-bold">{code}</p>
    <p className="font-bold">{price}</p>
    <button
      className="bg-red-200 text-cyan-300 text-base font-semibold px-3 py-2 border border-cyan-300 rounded-2xl"
      onClick={toggleSelected}
    >
      {isSelected ? "Cancel" : "Select"}
    </button>
  </div>;
}

