export interface IUser {
	_id: string;
	avatar: string;
	createdAt?: string;
	username: string;
	email: string;
	password?: string;
	coverPhoto?: string;
	followers?: [string];
}

export interface IPost {
	comments?: [string];
	creator?: IUser | string;
	imageUrl?: string;
	likes?: [string];
	message?: string;
	_id: string;
	createdAt?: string;
	avatar?: string;
}
