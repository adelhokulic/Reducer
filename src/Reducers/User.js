export const initialUserState = {
	userName: "",
	userMoney: "",
	isUserCreated: false,
};

export const loadUserState = () => {
	const userData = localStorage.getItem("userState");
	if (userData) {
		return JSON.parse(userData);
	} else return initialUserState;
};

export const userReducer = (state, action) => {
	switch (action.type) {
		case "SET_USERNAME":
			return { ...state, userName: action.payload };
		case "SET_MONEY":
			return { ...state, userMoney: action.payload };
		case "SET_IS_USER_CREATED":
			return { ...state, isUserCreated: action.payload };
		default:
			return state;
	}
};
