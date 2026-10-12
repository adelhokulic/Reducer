import Payment from "./Components/Payment";
import { createContext, useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { CURRENCIES } from "../src/Currencies";
export const CurrencyContext = createContext("USD");
export const AmountContext = createContext(0);

function App() {
	const [currency, setCurrency] = useState("EUR");
	const [amount, setAmount] = useState(100);

	const updateCurrency = (currency) => {
		setCurrency(currency);
	};

	const updateAmount = (value) => {
		setAmount(Number(value));
	};

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
							<CurrencyContext.Provider value={{ currency, updateCurrency }}>
								<AmountContext.Provider value={{ amount, updateAmount }}>
									<Payment />
									<Card className="border-0 shadow-sm rounded-3">
										<Card.Body className="d-flex gap-2 p-3">
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
