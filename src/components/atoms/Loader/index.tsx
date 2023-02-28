import "./index.scss";
import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
	return (
		<div className="loader_comp">
			<ThreeCircles width={30} height={30} color="#FFF" />
		</div>
	);
};

export default Loader;
