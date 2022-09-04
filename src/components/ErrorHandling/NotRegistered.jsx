import React from 'react';
import { Link } from 'react-router-dom';


function NotRegistered() {
	return (
		<div className="mt-5 text-center">
			<h3 className="mt-5">Address Not Registered!</h3>
			<p className="emoji"><span role="img" aria-label="biohazard">☣️</span></p>
			<Link to="/register">You can request registration here.</Link>
		</div>
	);
}

export default NotRegistered;