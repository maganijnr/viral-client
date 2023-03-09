import { FC, Dispatch, SetStateAction, useState, useRef } from "react";
import "./index.scss";
import ModalWrapper from "../ModalWrapper";
import { BsPencil } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../store/hooks/app";
import { convertToBase64 } from "../../../helpers/convertImageToBase64";
import {
	updateUser,
	uploadAvatarImage,
	uploadCoverImage,
} from "../../../store/actions/userActions";
import { ThreeCircles } from "react-loader-spinner";
import { updateUserState } from "../../../store/reducers/authReducer";

interface IProps {
	showModal: boolean;
	closeModal: () => void;
	title?: string | null;
}

const EditProfileModal: FC<IProps> = ({ showModal, closeModal, title }) => {
	const auth = useAppSelector((state) => state.auth);
	const userInfo = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();
	const { user, token } = auth;
	const { userProfile } = userInfo;
	const avatarRef = useRef<HTMLInputElement>();
	const coverPhotoRef = useRef<HTMLInputElement>();

	const [username, setUsername] = useState<string>(user?.username ?? "");
	const [email, setEmail] = useState<string>(user?.email ?? "");
	const [avatar, setAvatar] = useState<string>(user?.avatar ?? "");
	const [coverPhoto, setCoverPhoto] = useState<string>(user?.coverPhoto ?? "");
	const [avatarLoading, setAvatarLoading] = useState<boolean>(false);
	const [coverPhotoLoading, setCoverPhotoLoading] = useState<boolean>(false);
	const [formLoading, setFormLoading] = useState<boolean>(false);

	function shortenWords(text: string, num: number) {
		return text.length > num ? text.substring(0, num) + "..." : text;
	}

	const handleAvatarImageUpload = async (event: any) => {
		const file = event.target.files[0];
		const base64 = await convertToBase64(file);

		setAvatarLoading(true);

		try {
			const response = await uploadAvatarImage(base64);
			setAvatar(response);
			setAvatarLoading(false);
		} catch (error) {
			console.log(error);
			setAvatarLoading(false);
		}
	};

	const handleCoverImageUpload = async (event: any) => {
		const file = event.target.files[0];
		const base64 = await convertToBase64(file);

		setCoverPhotoLoading(true);

		try {
			const response = await uploadCoverImage(base64);
			setCoverPhoto(response);
			setCoverPhotoLoading(false);
		} catch (error) {
			console.log(error);
			setCoverPhotoLoading(false);
		}
	};

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		const userData = {
			username,
			avatar,
			coverPhoto,
			email,
		};
		setFormLoading(true);
		try {
			if (!token) return;
			const data = await updateUser(userData, token);
			dispatch(updateUserState(data));
			setFormLoading(false);
			closeModal();
		} catch (error) {
			console.log(error);
			setFormLoading(false);
		}
	};

	return (
		<ModalWrapper title={title} showModal={showModal} closeModal={closeModal}>
			<form onSubmit={handleSubmit}>
				<div className="avatar_input">
					<img src={avatar} />

					<input
						type="file"
						name="avatar"
						hidden
						onChange={handleAvatarImageUpload}
						id="avatar"
						// @ts-ignore
						ref={avatarRef}
					/>

					<div
						className="edit_avatar_btn"
						onClick={() => avatarRef.current?.click()}
					>
						{avatarLoading ? (
							<ThreeCircles color="#855be2" width={15} height={15} />
						) : (
							<BsPencil color="#855be2" />
						)}
					</div>
				</div>
				<div className="cover_photo_input">
					<img src={coverPhoto} />
					<h2>{shortenWords(coverPhoto, 30)}</h2>
					<input
						type="file"
						name="coverPhoto"
						hidden
						id="coverPhoto"
						onChange={handleCoverImageUpload}
						// @ts-ignore
						ref={coverPhotoRef}
					/>
					<div
						className="edit_cover_btn"
						onClick={() => coverPhotoRef.current?.click()}
					>
						{coverPhotoLoading ? (
							<ThreeCircles color="#855be2" width={15} height={15} />
						) : (
							<BsPencil color="#855be2" />
						)}
					</div>
				</div>

				<div className="form_input">
					<label htmlFor="username">Username</label>
					<input
						value={username}
						type="text"
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
				<div className="form_input">
					<label htmlFor="email">Email</label>
					<input
						value={email}
						type="text"
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>

				<button type="submit" className="form_btn">
					{formLoading ? (
						<ThreeCircles color="#855be2" width={15} height={15} />
					) : (
						"Save Changes"
					)}
				</button>
			</form>
		</ModalWrapper>
	);
};

export default EditProfileModal;
