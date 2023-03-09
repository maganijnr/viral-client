import { useState, useRef } from "react";
import "./index.scss";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { convertToBase64 } from "../../helpers/convertImageToBase64";
import { uploadPost, uploadPostImage } from "../../store/actions/postActions";
import { ThreeCircles } from "react-loader-spinner";
import { useAppSelector } from "../../store/hooks/app";

const CreatePage = () => {
	const [selectedFile, setSelectedFile] = useState("");
	const [imageLoading, setImageLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const auth = useAppSelector((state) => state.auth);

	const { token } = auth;

	const imageRef = useRef<HTMLInputElement>();
	const handleImageSubmit = async (event: any) => {
		const file = event.target.files[0];
		const base64 = await convertToBase64(file);

		setImageLoading(true);

		try {
			const response = await uploadPostImage(base64);
			setSelectedFile(response);
			setImageLoading(false);
		} catch (error) {
			console.log(error);
			setImageLoading(false);
		}
	};

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		setLoading(true);
		if (!token) {
			alert("Not logged in");
			return setLoading(false);
		}

		if ((selectedFile || message) && token) {
			await uploadPost(message, selectedFile, token);
			alert("Uploaded successfully");
			setLoading(false);
		}
	};

	return (
		<div className="page_container">
			<h2>Create a post</h2>
			<div className="form_body">
				<form className="form" onSubmit={handleSubmit}>
					<div
						className="image_div"
						onClick={() => imageRef.current?.click()}
					>
						<input
							// @ts-ignore
							ref={imageRef}
							type="file"
							accept="image/png, image/jpeg, image/jpg, image/svg+xml, .blend, .obj"
							name="profileImage"
							id="profileImage"
							onChange={handleImageSubmit}
							hidden
						/>
						{imageLoading && (
							<div className="image_loader">
								<ThreeCircles color="#fff" width={20} height={20} />
							</div>
						)}
						{selectedFile ? (
							<img src={selectedFile} alt="selected image" />
						) : (
							<div className="icon_div">
								<AiOutlineCloudUpload fontSize={30} />
								<p>Upload Image</p>
							</div>
						)}
					</div>
					<div className="input_div">
						<label htmlFor="message">Message</label>
						<textarea
							className="text_area"
							name="message"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="What's on your mind?"
						></textarea>
					</div>
					<button>
						{loading ? (
							<ThreeCircles color="#fff" width={20} height={20} />
						) : (
							"Upload"
						)}
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreatePage;
