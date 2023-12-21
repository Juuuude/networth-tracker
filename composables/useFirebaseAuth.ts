import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth } from 'firebase/auth';
import type { Auth } from 'firebase/auth';

export default function() {
//   const { $auth } = useNuxtApp();
//   const user = useState<User | null>("fb_user", () => null);

//   const registerUser = async (email: string, password: string): Promise<boolean> => {
//     try {
//       const userCreds = await createUserWithEmailAndPassword($auth as Auth, email, password);
//       if (userCreds) {
//         user.value = userCreds.user;
//         return true;
//       }
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         // handle error
//       }
//       return false;
//     }
//     return false;
//   };


  async function signInUser(email: string, password: string) {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      return user;
    } catch (error: any) {
      throw error;
    }
  }

  async function signOutUser(): Promise<void> {
    const auth: Auth = getAuth();
  
    try {
      await signOut(auth);
      console.log('Sign-out successful.');
    } catch (error: any) {
      // An error happened.
      console.error('Sign-out error:', error);
      throw error; // Re-throw the error if needed
    }
  }
  
  return {
    signInUser,
    signOutUser
  };
}
