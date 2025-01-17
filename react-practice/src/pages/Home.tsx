import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import RightBar from "../components/RightBar";
import SkuCard from "../components/content/SkuCard";
import PageButtonSection from "../components/content/PageButtonSection";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

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

const SKU_PER_PAGE: number = 3 as const;

function Home() {
	const navigate = useNavigate();

	const [items, setItems] = useState<Products[]>([]);
	const [selectedList, setSelected] = useState<string[]>(
		JSON.parse(localStorage.getItem("selected") ?? "[]")
	);

	const [totalPages, setTotalPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(
		parseInt(localStorage.getItem("pageNumber") ?? "1")
	);
	const currentSkuTable = useMemo(() => {
		const firstSkuIndex: number = (currentPage - 1) * SKU_PER_PAGE;
		const lastSkuIndex: number = firstSkuIndex + SKU_PER_PAGE;
		return items.length ? items.slice(firstSkuIndex, lastSkuIndex) : [];
	}, [items, currentPage]);

	// Fetch data
	useEffect(() => {
		// fetch("/data.json")
		// 	.then((response) => response.json()) // can be refactor to async await -Kevin
		// 	.then((json) => {
		// 		console.log(json.products);
		// 		setItems(json.products as Products[]);
		// 	}).catch((e) =>
		//     console.log("Empty Data / Fail to Get Response: " + e)
		//   );

		const fetchData = async () => {
			try {
				const response = await fetch("/data.json");

				if (response.status === 200) {
					const jsonData = await response.json();
					console.log(jsonData.products);
					setItems(jsonData.products as Products[]);
					setTotalPages(() =>
						Math.ceil(jsonData.products.length / SKU_PER_PAGE)
					);
				} else {
					console.log("Fail to get data: " + response.status);
				}
			} catch (e) {
				console.log("ERROR: " + e);
			}
		};
		fetchData();
		// totalPages = Math.ceil(items.length / skuPerPage);
	}, []);

	// Update Home path based on Page Number
	useEffect(() => {
		navigate(`/?page=${currentPage}`);
	}, [currentPage, navigate]);

	function toggleSelected(skuCode: string) {
		setSelected((currentList) => {
			if (currentList.includes(skuCode)) {
				const current = [...currentList];
				current.splice(current.indexOf(skuCode), 1);

				localStorage.setItem("selected", JSON.stringify(current));

				return current;
			} else {
				const newList: string[] = [...currentList, skuCode];

				localStorage.setItem("selected", JSON.stringify(newList));

				return newList;
			}
		});
	}

	function previousPage() {
		setCurrentPage((current) => {
			const newPage: number = current > 1 ? current - 1 : 1;
			localStorage.setItem("pageNumber", JSON.stringify(newPage));
			return newPage;
		});
	}

	function nextPage() {
		setCurrentPage((current) => {
			const newPage: number = current < totalPages ? current + 1 : totalPages;
			localStorage.setItem("pageNumber", JSON.stringify(newPage));
			return newPage;
		});
	}

	function jumpPage(page: number) {
		setCurrentPage(() => {
			localStorage.setItem("pageNumber", JSON.stringify(page));
			return page;
		});
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
										const isSelected = selectedList.includes(item.code);
										return (
											<div
												className={clsx(
													"flex flex-col items-center rounded-xl p-4 space-y-8",
													isSelected ? "bg-gray-300" : "bg-white"
												)}
												key={item.code}
											>
												<SkuCard
													imageUrl={item.images ? item.images[0].url : ""}
													skuName={item.name ? item.name : "N/A"}
													skuCode={item.code}
													skuPrice={
														item.price ? item.price.formattedValue : "$ N/A"
													}
													isSelected={isSelected}
													toggleSelected={() => toggleSelected(item.code)}
												/>
											</div>
										);
									})}
								</div>

								{/* Pagination */}
								<PageButtonSection
									totalPages={totalPages}
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
