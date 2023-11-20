import { Link } from "react-router-dom";

type SKU = {
	imageUrl: string;
	skuName: string;
	skuPrice: string;
	description: string;
	stockStatus: string;
};

type WhiteButtonProps = {
	path: string;
	buttonName: string;
	userAction?: () => void;
	props?: SKU;
};

function WhiteButton({
	path,
	buttonName,
	userAction,
	props,
}: WhiteButtonProps) {
	return path.trim().length ? (
		<Link to={path} state={props}>
			<button className="bg-white text-cyan-300 text-base font-semibold px-3 py-2 border border-cyan-300 rounded-2xl">
				{buttonName}
			</button>
		</Link>
	) : (
		<button
			className="bg-white text-cyan-300 text-base font-semibold px-3 py-2 border border-cyan-300 rounded-2xl"
			onClick={userAction}
		>
			{buttonName}
		</button>
	);
}

export default WhiteButton;
