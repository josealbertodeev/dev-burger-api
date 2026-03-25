
const adminMiddleware = (request, response, next) => {
	if (!request.userIsAdmin) {
		return response.status(401).json({ error: 'Access denied - Admin privileges required' });
	}

	return next();
};

export default adminMiddleware;
