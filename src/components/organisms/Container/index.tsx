import React, { ReactNode, FC } from "react";
import "./index.scss";

interface IProps {
	children?: ReactNode;
}

const Container: FC<IProps> = ({ children }) => {
	return (
		<div className="container">
			<div className="container_wrapper">{children}</div>
		</div>
	);
};

export default Container;
