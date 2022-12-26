declare const useAuthorization: (permissions?: string | string[]) => {
    userPermissions: string[];
    can: (permissions: string | string[]) => boolean;
    granted: boolean;
};
export default useAuthorization;
