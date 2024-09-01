import { userLoggedIn, userLoggedOut } from '../reducers/user';

// Ação de login utilizando o action creator gerado automaticamente
export const login = user => userLoggedIn(user);

// Ação de logout utilizando o action creator gerado automaticamente
export const logout = () => userLoggedOut();