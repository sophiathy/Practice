import { useEffect, useState } from "react";
import { PreviewSection } from "./PreviewSection";
import { WhiteButton } from "./WhiteButton";

type SkuContentsProps = {
	imageUrl: string;
	skuName: string;
	skuCode: string;
	skuPrice: string;
	isSelected: boolean;
	toggleSelected: () => void;
};

export function SkuContents({
	imageUrl,
	skuName,
	skuCode,
	skuPrice,
	isSelected,
	toggleSelected,
}: SkuContentsProps) {
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
			<img className="shrink-0 h-50 w-50" src={imageUrl} />
			<p className="font-semibold">{skuName}</p>
			<div className="flex-row space-x-12">
				<WhiteButton buttonName="Preview" userAction={() => togglePreview()} />

				<WhiteButton
					buttonName="Details"
					userAction={() => console.log("Clicked Details")}
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
