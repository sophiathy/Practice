type WhiteButtonProps = {
	buttonName: string;
	userAction?: () => void;
};

function WhiteButton({ buttonName, userAction }: WhiteButtonProps) {
	return (
		<button
			className="bg-white text-cyan-300 text-base font-semibold px-3 py-2 border border-cyan-300 rounded-2xl"
			onClick={userAction}
		>
			{buttonName}
		</button>
	);
}

export default WhiteButton;
