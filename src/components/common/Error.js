import PropTypes from "prop-types";
import Alert from "react-bootstrap/Alert";


export default function ErrorMessage({ message }){
    return (
		<>
		<Alert variant="danger">
			<Alert.Heading>Oops! Something went wrong</Alert.Heading>
			<p>{message}</p>
		</Alert>
		</>
	)
}
ErrorMessage.propTypes = {
	message: PropTypes.string.isRequired,
};
ErrorMessage.defaultProps = {
	message: "An error have occured",
};
