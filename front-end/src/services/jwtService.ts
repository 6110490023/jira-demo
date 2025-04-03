import {jwtDecode} from 'jwt-decode';
import {UserLoin} from '../constant/types'
export const DecodeJwt = (tokenJWT: string): UserLoin | null => {
    try {
      // Decode the JWT token using jwt-decode and cast the result to the User type
      const decoded = jwtDecode<UserLoin>(tokenJWT);
      
      // Ensure the decoded object matches the User interface
      return decoded;
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null; // Return null if decoding fails or token is invalid
    }
  };