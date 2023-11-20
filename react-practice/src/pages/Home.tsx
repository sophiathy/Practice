import { useEffect, useState } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import { SkuContents } from "../components/content/SkuContents";
import Footer from "../components/Footer";
import RightBar from "../components/RightBar";

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

export default function Home (){
    const [items, setItems] = useState<Products[]>([]);
	const [selectedList, setSelected] = useState<string[]>([]);

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

	function toggleSelected(skuCode : string){
		setSelected((currentList) => {
			if(currentList.includes(skuCode)){
				const current = [...currentList]
				current.splice(current.indexOf(skuCode), 1)
				console.log("Cancelled " + skuCode)
				return current
			}else{
				console.log("Selected " + skuCode)
				return [...currentList, skuCode]
			}
		})
	}

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
                                    return selectedList.includes(item.code) ? (
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
                                                isSelected={true}
                                                toggleSelected={() => toggleSelected(item.code)}
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
                                                isSelected={false}
                                                toggleSelected={() => toggleSelected(item.code)}
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