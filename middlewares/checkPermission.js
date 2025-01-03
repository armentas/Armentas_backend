
// Middleware para chequear que el usuario que esta accediendo tenga el permiso adecuado
const checkPermission = (permission) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                msg: 'Danger: Unauthorized access is being attempted.'
            });
        }
        
        if (!req.user.permissions.includes(permission) && !req.user.permissions.includes('All')) {
            return res.status(403).json({
                msg: `You do not have ${permission} permissions`
            });
        }
    
        next();
    };
}


module.exports = {
    checkPermission
}