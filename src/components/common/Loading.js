import Spinner from "react-bootstrap/Spinner";

export default function Loader() {
	return (
		<div className="spinner__wrap">
			<Spinner className="spinner__icon" animation="border" variant="dark" size="xxl"/>
		</div>
	);
}
