import Payment from "./Components/Payment";
import { createContext, useState, useReducer, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { CURRENCIES } from "../src/Currencies";
import { userReducer, loadUserState } from "./Reducers/User";
export const CurrencyContext = createContext("USD");
export const AmountContext = createContext(0);

function App() {
	const [userState, dispatch] = useReducer(userReducer, loadUserState());
	const [currency, setCurrency] = useState("EUR");
	const [amount, setAmount] = useState(100);
	const updateCurrency = (currency) => {
		setCurrency(currency);
	};

	const updateAmount = (amount) => {
		setAmount(Number(amount));
	};
	const updateUserName = (name) => {
		dispatch({ type: "SET_USERNAME", payload: name });
	};
	const updateUserMoney = (money) => {
		dispatch({ type: "SET_MONEY", payload: Number(money) });
	};
	const saveUser = () => {
		if (
			!userState.userName ||
			!userState.userMoney ||
			isNaN(userState.userMoney)
		) {
			alert("Please enter both and correct username and money.");
			return;
		}
		console.log("Saving user:", userState.userName, userState.userMoney);
		dispatch({ type: "SET_IS_USER_CREATED", payload: true });
	};
	useEffect(() => {
		if (userState.isUserCreated) {
			localStorage.setItem("userState", JSON.stringify(userState));
		}
	}, [userState]);

	return (
		<>
			<div className="bg-body-tertiary min-vh-100 d-flex align-items-center py-4">
				<Container>
					<Row className="justify-content-center">
						<Col
							xs={12}
							sm={8}
							md={6}
							lg={4}
							className="d-flex flex-column gap-3"
						>
							{!userState.isUserCreated && (
								<Card className="border-0 shadow-sm rounded-3">
									<Card.Body className="p-3">
										<h1 className="h4 text-center text-primary mb-3">
											User Registration
										</h1>
										<Form className="d-flex flex-column gap-2">
											<Form.Control
												type="text"
												placeholder="Enter Name"
												value={userState.userName}
												onChange={(e) => updateUserName(e.target.value)}
											/>
											<Form.Control
												type="number"
												placeholder="Enter Money"
												value={userState.userMoney}
												onChange={(e) => updateUserMoney(e.target.value)}
											/>
											<Button
												type="button"
												onClick={saveUser}
												className="w-100"
											>
												Save User
											</Button>
										</Form>
									</Card.Body>
								</Card>
							)}
							<CurrencyContext.Provider value={{ currency, updateCurrency }}>
								<AmountContext.Provider value={{ amount, updateAmount }}>
									<Payment />

									<Card className="border-0 shadow-sm rounded-3">
										<Card.Body className="d-flex flex-column gap-2 p-3">
											<div className="d-flex gap-2">
												<Form.Control
													className="flex-grow-1"
													type="number"
													value={amount}
													onChange={(e) => updateAmount(e.target.value)}
												/>
												<Form.Select
													className="w-auto"
													value={currency}
													onChange={(e) => updateCurrency(e.target.value)}
												>
													{Object.keys(CURRENCIES).map((currency) => (
														<option key={currency} value={currency}>
															{currency}
														</option>
													))}
												</Form.Select>
											</div>
										</Card.Body>
									</Card>
								</AmountContext.Provider>
							</CurrencyContext.Provider>
						</Col>
					</Row>
				</Container>
			</div>
		</>
	);
}

export default App;
