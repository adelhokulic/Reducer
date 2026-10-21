import { useContext } from "react";
import { Card } from "react-bootstrap";
import { CurrencyContext, AmountContext } from "../contexts";
import { CURRENCIES } from "../Currencies";

const Paypal = () => {
	const currency = useContext(CurrencyContext);
	const amount = useContext(AmountContext);

	const result = Number(amount.amount) * CURRENCIES[currency.currency];
	return (
		<>
			<Card className="border-0 shadow-sm rounded-3">
				<Card.Body className="p-4 text-center">
					<h1 className="h4 text-primary mb-3">Paypal</h1>
					<p className="d-flex justify-content-between align-items-baseline m-0 py-2 border-top">
						<span className="text-secondary small">Currency</span>
						<span className="fw-semibold">{currency.currency}</span>
					</p>
					<p className="d-flex justify-content-between align-items-baseline m-0 py-2 border-top">
						<span className="text-secondary small">Amount</span>
						<span className="fw-semibold">{amount.amount} BAM</span>
					</p>
					<p className="d-flex justify-content-between align-items-baseline m-0 py-2 border-top">
						<span className="text-secondary small">Result</span>
						<span className="fw-semibold fs-5 text-primary">
							{result.toFixed(2)} {currency.currency}
						</span>
					</p>
				</Card.Body>
			</Card>
		</>
	);
};

export default Paypal;
