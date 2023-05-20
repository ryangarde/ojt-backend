type Required<T> = {
	[P in keyof T]-?: T[P];
};

export default Required;
