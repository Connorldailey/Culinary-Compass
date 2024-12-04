import { JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';

class AuthService {

    // Decode JWT token in localStorage
    getProfile() {
        const token = this.getToken();
        if (!token) return null;
        try {
            // Return the decoded token
            return jwtDecode<UserData>(token);
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    // Return a value that indicates if the user is logged in
    loggedIn(): boolean {
        const token = this.getToken();
        // Check if the token exists and is not expired
        return !!token && !this.isTokenExpired(token);
    }

    // Return a value that indicates if the token is expired
    isTokenExpired(token: string): boolean {
        try {
            const { exp } = jwtDecode<JwtPayload>(token);

            // If exp is undefined, consider the token invalid
            if (!exp) {
                return true;
            }

            return exp < Date.now() / 1000;
        } catch {
            return true;
        }
    }

    getToken(): string | null {
        return localStorage.getItem('id_token');
    }

    login(idToken: string) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }

    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }

}

export default new AuthService();