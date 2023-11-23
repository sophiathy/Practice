import { Link, useSearchParams } from "react-router-dom";
import WhiteButton from "../components/content/WhiteButton";
import { useEffect, useState } from "react";

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

function Details() {
	const [searchParams] = useSearchParams();
	const skuCode = searchParams.get("skuCode");

	const [items, setItems] = useState<Products[]>([]);
	const [targetItem, setTargetItem] = useState<Products>();

	useEffect(() => {
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
		fetchData();
	}, []);

	useEffect(() => {
		const result = items.find((sku) => sku.code === skuCode);
		result && setTargetItem(() => result);
	}, [items, skuCode]);

	return (
		<div className="flex flex-col space-y-5 text-justify">
			{targetItem ? (
				<div className="space-y-10">
					<p className="font-bold text-xl">
						{targetItem.name ? targetItem.name : "N/A"}
					</p>
					<div className="flex space-x-24 text-justify">
						{targetItem.images?.length ? (
							<img
								className="shrink-0 h-50 w-50 p-16"
								src={targetItem.images[0].url}
							/>
						) : (
							<div className="container mx-auto border-4 rounded-xl bg-white p-36 text-center">
								No Image
							</div>
						)}
						<div className="flex flex-col space-y-8">
							<p className="font-semibold text-lg">
								{targetItem.price ? targetItem.price.formattedValue : "$ N/A"}
							</p>
							<p className="text-sm">{targetItem.description}</p>
							<p className="text-base">
								{targetItem.stock.stockLevelStatus.code}
							</p>
						</div>
					</div>
				</div>
			) : (
				<div className="my-10 font-bold text-2xl text-cyan-400 text-justify">
					Product does not exist
				</div>
			)}
			<div className="container">
				<Link
					to={{
						pathname: "/",
						search: `?page=${localStorage.getItem("pageNumber")}`,
					}}
				>
					<WhiteButton buttonName="Back" />
				</Link>
			</div>
		</div>
	);
}

export default Details;
