import { useEffect, useState } from "react";
import WhiteButton from "./WhiteButton";
import PreviewSection from "./PreviewSection";

type SkuCardProps = {
	imageUrl: string;
	skuName: string;
	skuCode: string;
	skuPrice: string;
	description: string;
	stockStatus: string;
	isSelected: boolean;
	toggleSelected: () => void;
};

function SkuCard({
	imageUrl,
	skuName,
	skuCode,
	skuPrice,
	description,
	stockStatus,
	isSelected,
	toggleSelected,
}: SkuCardProps) {
	const [isPreviewing, setIsPreviewing] = useState(false);
	const togglePreview = () => {
		setIsPreviewing((current) => !current);

		const openedPreview: string[] = JSON.parse(
			localStorage.getItem("openedPreview") ?? ""
		);

		if (isPreviewing) {
			const newOpenedPreview = openedPreview.filter(
				(code) => !(code === skuCode)
			);
			localStorage.setItem("openedPreview", JSON.stringify(newOpenedPreview));
		} else {
			const newOpenedPreview = [...openedPreview, skuCode];
			localStorage.setItem("openedPreview", JSON.stringify(newOpenedPreview));
		}
	};

	useEffect(() => {
		const openedPreview: string[] = JSON.parse(
			localStorage.getItem("openedPreview") ?? ""
		);

		if (openedPreview.includes(skuCode)) {
			setIsPreviewing(true);
		}
	}, [skuCode]);

	// const [isPreviewing, setIsPreviewing] = useState<string[]>(() => {
	// 	const previewList = localStorage.getItem("PREVIEW")
	// 	if(previewList == null) return []

	// 	return JSON.parse(previewList)
	// });

	// useEffect(() => {
	// 	localStorage.setItem("PREVIEW", JSON.stringify(isPreviewing))
	// 	console.log(JSON.stringify(isPreviewing)) //called n times of [] when renders for the 1st time
	// }, [isPreviewing])

	// function togglePreview(){
	// 	setIsPreviewing((currentList) => {
	// 		if(currentList.includes(skuCode)){
	// 			const current = [...currentList]
	// 			current.splice(current.indexOf(skuCode), 1)
	// 			console.log("Removed " + skuCode)
	// 			return current
	// 		}else{
	// 			console.log("Added " + skuCode)
	// 			return [...currentList, skuCode]
	// 		}
	// 	})
	// }

	return (
		<>
			{imageUrl.length ? (
				<img className="shrink-0 h-50 w-50" src={imageUrl} />
			) : (
				<div className="container mx-auto border-4 rounded-xl bg-white p-24">
					No Image
				</div>
			)}
			<p className="font-semibold">{skuName}</p>
			<div className="flex-row space-x-12">
				<WhiteButton
					path=""
					buttonName="Preview"
					userAction={() => togglePreview()}
				/>

				<WhiteButton
					path="/details"
					buttonName="Details"
					props={{
						imageUrl: imageUrl,
						skuName: skuName,
						skuPrice: skuPrice,
						description: description,
						stockStatus: stockStatus,
					}}
				/>
			</div>

			{isPreviewing && (
				<PreviewSection
					code={skuCode}
					price={skuPrice}
					toggleSelected={toggleSelected}
					isSelected={isSelected}
				/>
			)}

			{/* {localStorage.getItem("PREVIEW")?.includes(skuCode) && (
				<PreviewSection
					code={skuCode}
					price={skuPrice}
					toggleSelected={toggleSelected}
					isSelected={isSelected}
				/>
			)} */}
		</>
	);
}

export default SkuCard;
