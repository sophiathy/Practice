import { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import RightBar from "../components/RightBar";
import SkuCard from "../components/content/SkuCard";
import PageButtonSection from "../components/content/PageButtonSection";

type Image = {
	url: string;
};

type Price = {
	formattedValue: string;
};

type Stock = {
	stockLevelStatus: StockLevelStatus;
};

type StockLevelStatus = {
	code: string;
};

type Products = {
	code: string;
	name?: string;
	images?: Image[];
	price?: Price;
	description: string;
	stock: Stock;
};

function Home() {
	const [items, setItems] = useState<Products[]>([]);
	const [selectedList, setSelected] = useState<string[]>([]);

	const skuPerPage: number = 3;
	const totalPages = useRef(1);
	const [currentPage, setCurrentPage] = useState(1);
	const currentSkuTable = useMemo(() => {
		const firstSkuIndex = (currentPage - 1) * skuPerPage;
		const lastSkuIndex = firstSkuIndex + skuPerPage;
		return items.length ? items.slice(firstSkuIndex, lastSkuIndex) : [];
	}, [items, currentPage]);

	const fetchData = async () => {
		try {
			const response = await fetch("/data.json");

			if (response.status === 200) {
				const jsonData = await response.json();
				// console.log(jsonData.products); //called twice by useEffect
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
		totalPages.current = Math.ceil(items.length / skuPerPage);
	}, [items.length]);

	function toggleSelected(skuCode: string) {
		setSelected((currentList) => {
			if (currentList.includes(skuCode)) {
				const current = [...currentList];
				current.splice(current.indexOf(skuCode), 1);
				console.log("Cancelled " + skuCode);
				return current;
			} else {
				console.log("Selected " + skuCode);
				return [...currentList, skuCode];
			}
		});
	}

	function previousPage() {
		setCurrentPage((current) => (current > 1 ? current - 1 : 1));
	}

	function nextPage() {
		setCurrentPage((current) =>
			current < totalPages.current ? current + 1 : totalPages.current
		);
	}

	function jumpPage(page: number) {
		setCurrentPage(() => page);
	}

	return (
		<>
			<Header />

			<div className="flex flex-row">
				<Menu />

				{/* Content Section */}
				<div className="flex flex-col grow mx-4">
					<div className="mb-4 bg-gray-200 rounded-xl text-xl p-2">
						{items.length ? (
							<>
								<div className="grid grid-cols-3 my-2 space-x-8 space-y-4">
									{currentSkuTable.map((item) => {
										return selectedList.includes(item.code) ? (
											<div
												className="flex flex-col items-center bg-gray-300 rounded-xl p-4 space-y-8"
												key={item.code}
											>
												<SkuCard
													imageUrl={item.images ? item.images[0].url : ""}
													skuName={item.name ? item.name : "N/A"}
													skuCode={item.code}
													skuPrice={
														item.price ? item.price.formattedValue : "$ N/A"
													}
													description={item.description}
													stockStatus={item.stock.stockLevelStatus.code}
													isSelected={true}
													toggleSelected={() => toggleSelected(item.code)}
												/>
											</div>
										) : (
											<div
												className="flex flex-col items-center bg-white rounded-xl p-4 space-y-8"
												key={item.code}
											>
												<SkuCard
													imageUrl={item.images ? item.images[0].url : ""}
													skuName={item.name ? item.name : "N/A"}
													skuCode={item.code}
													skuPrice={
														item.price ? item.price.formattedValue : "$ N/A"
													}
													description={item.description}
													stockStatus={item.stock.stockLevelStatus.code}
													isSelected={false}
													toggleSelected={() => toggleSelected(item.code)}
												/>
											</div>
										);
									})}
								</div>

								{/* Pagination */}
								<PageButtonSection
									totalPages={totalPages.current}
									currentPage={currentPage}
									previousPage={previousPage}
									nextPage={nextPage}
									jumpPage={jumpPage}
								/>
							</>
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

export default Home;
