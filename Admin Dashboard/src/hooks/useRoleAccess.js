import { useAuth } from '@/context/AuthContext';

export const ROLES = {
    SUPERADMIN: 'Superadmin',
    TOURISM_ADMIN: 'Tourism Admin',
    VERIFICATION_OFFICER: 'Verification Officer',
    SOS_OFFICER: 'SOS Officer',
    DATA_ANALYST: 'Data Analyst',
};

export function useRoleAccess(allowedRoles = []) {
    const { user, hasRole } = useAuth();

    if (!user) return false;

    // If no specific roles are required, just checking if logged in is enough (which is handled by !user check above)
    if (allowedRoles.length === 0) return true;

    return hasRole(allowedRoles);
}
