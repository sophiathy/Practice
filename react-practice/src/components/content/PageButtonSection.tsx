import WhiteButton from "./WhiteButton";

type PageButtonSectionProps = {
	totalPages: number;
	currentPage: number;
	previousPage: () => void;
	nextPage: () => void;
	jumpPage: (pageNo: number) => void;
};

function PageButtonSection({
	totalPages,
	currentPage,
	previousPage,
	nextPage,
	jumpPage,
}: PageButtonSectionProps) {
	return (
		<div className="py-4 space-x-4">
			<WhiteButton buttonName="<" userAction={previousPage} />

			{Array.from({ length: totalPages }).map((_page, index) => {
				const pageNo: number = index + 1;
				return pageNo === currentPage ? (
					<button
						className="px-4 text-cyan-400 font-bold text-3xl"
						key={pageNo}
						disabled
					>
						{pageNo}
					</button>
				) : (
					<button
						className="px-4 text-cyan-300 font-bold text-xl"
						key={pageNo}
						onClick={() => jumpPage(pageNo)}
					>
						{pageNo}
					</button>
				);
			})}

			<WhiteButton buttonName=">" userAction={nextPage} />
		</div>
	);
}

export default PageButtonSection;
