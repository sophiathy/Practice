type PreviewSectionProps = {
	code: string;
	price: string;
	toggleSelected: () => void;
	isSelected: boolean;
};

function PreviewSection({
	code,
	price,
	toggleSelected,
	isSelected,
}: PreviewSectionProps) {
	return (
		<div className="py-4 space-y-8">
			<p className="font-bold">{code}</p>
			<p className="font-bold">{price}</p>
			<button
				className="bg-red-200 text-cyan-300 text-base font-semibold px-3 py-2 border border-cyan-300 rounded-2xl"
				onClick={toggleSelected}
			>
				{isSelected ? "Cancel" : "Select"}
			</button>
		</div>
	);
}

export default PreviewSection;
