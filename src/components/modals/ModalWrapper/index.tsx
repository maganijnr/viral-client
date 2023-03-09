import "./index.scss";
import { FC, ReactNode, Dispatch, SetStateAction } from "react";
import { FaTimes } from "react-icons/fa";

interface IProps {
	children: ReactNode;
	showModal: boolean;
	closeModal: () => void;
	title?: string | null;
}

const ModalWrapper: FC<IProps> = ({
	showModal,
	closeModal,
	children,
	title,
}) => {
	console.log(showModal);
	return (
		<div className={showModal ? "modal_wrapper_open" : "modal_wrapper_close"}>
			<div className={"modal_content"}>
				<div className="modal_header">
					<h3>{title}</h3>
					<FaTimes
						fontSize={20}
						className="close_icon"
						onClick={closeModal}
					/>
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default ModalWrapper;
