type WhiteButtonProps = {
	buttonName: string;
	userAction: () => void;
};

export function WhiteButton({ buttonName, userAction }: WhiteButtonProps) {
	return (
		<button
			className="bg-transparent text-cyan-300 text-base font-semibold px-3 py-2 border border-cyan-300 rounded-2xl"
			onClick={userAction}
		>
			{buttonName}
		</button>
	);
}
