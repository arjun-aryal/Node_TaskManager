export const serializeUser = (user) => {
    if (!user) return null;

    const { id, username, email } = user;
    
    return { id, username, email };
};