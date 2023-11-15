import { PreviewSection } from "./PreviewSection";
import { WhiteButton } from "./WhiteButton";

type SkuContentsProps = {
	imageUrl: string;
	skuName: string;
	skuCode: string;
	skuPrice: string;
	preview: boolean;
	togglePreview: () => void;
	isSelected: boolean;
	toggleSelected: () => void;
};

export function SkuContents({
	imageUrl,
	skuName,
	skuCode,
	skuPrice,
	preview,
	togglePreview,
	isSelected,
	toggleSelected,
}: SkuContentsProps) {
	return (
		<>
			<img className="shrink-0 h-50 w-50" src={imageUrl} />
			<p className="font-semibold">{skuName}</p>
			<div className="flex-row space-x-12">
				<WhiteButton buttonName="Preview" userAction={togglePreview} />
				<WhiteButton
					buttonName="Details"
					userAction={() => console.log("Clicked Details")}
				/>
			</div>

			{preview && (
				<PreviewSection
					code={skuCode}
					price={skuPrice}
					toggleSelected={toggleSelected}
					isSelected={isSelected}
				/>
			)}
		</>
	);
}
