import { useLocation } from "react-router-dom";
import WhiteButton from "../components/content/WhiteButton";

function Details() {
	const sku = useLocation();

	return (
		<div className="flex flex-col space-y-10 text-justify">
			<p className="font-bold text-xl">{sku.state.skuName}</p>

			<div className="flex space-x-24 text-justify">
				{sku.state.imageUrl.length ? (
					<img className="shrink-0 h-50 w-50 p-16" src={sku.state.imageUrl} />
				) : (
					<div className="container mx-auto border-4 rounded-xl bg-white p-36 text-center">
						No Image
					</div>
				)}

				<div className="flex flex-col space-y-8">
					<p className="font-semibold text-lg">{sku.state.skuPrice}</p>
					<p className="text-sm">{sku.state.description}</p>
					<p className="text-base">{sku.state.stockStatus}</p>
				</div>
			</div>

			<div className="container">
				<WhiteButton path="/" buttonName="Back" />
			</div>
		</div>
	);
}

export default Details;
