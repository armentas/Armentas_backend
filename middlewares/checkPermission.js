
// Middleware para chequear que el usuario que esta accediendo tenga el permiso adecuado
const checkPermission = (permission) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                msg: 'Peligro: Se está intentando acceder sin autorización'
            });
        }
        
        if (!req.user.permissions.includes(permission) && !req.user.permissions.includes('All')) {
            return res.status(403).json({
                msg: `No tiene permisos de: ${permission}`
            });
        }
    
        next();
    };
}


module.exports = {
    checkPermission
}