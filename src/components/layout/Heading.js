import React from "react";
import PropTypes from "prop-types";

function Heading({ size = "1", content }) {
	const HeadingSize = `h${size}`;

	return <HeadingSize>{content}</HeadingSize>;
}

Heading.propTypes = {
	size: PropTypes.string,
	content: PropTypes.string.isRequired,
};

export default Heading;
