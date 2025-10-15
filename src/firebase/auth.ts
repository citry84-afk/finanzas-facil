// Firebase Authentication Service for FinanzasFácil
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { Preferences } from '@capacitor/preferences';

// User interface
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAnonymous: boolean;
}

// Auth state listener type
type AuthStateListener = (user: User | null) => void;

class AuthService {
  private authStateListeners: AuthStateListener[] = [];

  constructor() {
    // Initialize auth state listener
    this.initAuthStateListener();
  }

  private initAuthStateListener() {
    FirebaseAuthentication.addListener('authStateChange', ({ user }) => {
      const mappedUser = user ? this.mapFirebaseUser(user) : null;
      this.notifyAuthStateListeners(mappedUser);
      
      // Save to local storage
      if (mappedUser) {
        this.saveUserToStorage(mappedUser);
      } else {
        this.clearUserFromStorage();
      }
    });
  }

  private mapFirebaseUser(firebaseUser: any): User {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email || null,
      displayName: firebaseUser.displayName || null,
      photoURL: firebaseUser.photoURL || null,
      isAnonymous: firebaseUser.isAnonymous || false
    };
  }

  private notifyAuthStateListeners(user: User | null) {
    this.authStateListeners.forEach(listener => listener(user));
  }

  public onAuthStateChanged(listener: AuthStateListener): () => void {
    this.authStateListeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.authStateListeners = this.authStateListeners.filter(l => l !== listener);
    };
  }

  // Save user to local storage
  private async saveUserToStorage(user: User) {
    await Preferences.set({
      key: 'currentUser',
      value: JSON.stringify(user)
    });
  }

  // Clear user from local storage
  private async clearUserFromStorage() {
    await Preferences.remove({ key: 'currentUser' });
  }

  // Get current user from storage (for offline access)
  public async getCurrentUserFromStorage(): Promise<User | null> {
    const { value } = await Preferences.get({ key: 'currentUser' });
    return value ? JSON.parse(value) : null;
  }

  // Get current user
  public async getCurrentUser(): Promise<User | null> {
    try {
      const result = await FirebaseAuthentication.getCurrentUser();
      return result.user ? this.mapFirebaseUser(result.user) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  // Sign in with email and password
  public async signInWithEmailAndPassword(email: string, password: string): Promise<User> {
    try {
      const result = await FirebaseAuthentication.signInWithEmailAndPassword({
        email,
        password
      });
      
      if (!result.user) {
        throw new Error('No user returned from sign in');
      }
      
      return this.mapFirebaseUser(result.user);
    } catch (error: any) {
      console.error('Error signing in:', error);
      throw new Error(this.getAuthErrorMessage(error.code));
    }
  }

  // Create user with email and password
  public async createUserWithEmailAndPassword(email: string, password: string, displayName?: string): Promise<User> {
    try {
      const result = await FirebaseAuthentication.createUserWithEmailAndPassword({
        email,
        password
      });
      
      if (!result.user) {
        throw new Error('No user returned from registration');
      }

      // Update display name if provided
      if (displayName) {
        await this.updateProfile({ displayName });
      }
      
      return this.mapFirebaseUser(result.user);
    } catch (error: any) {
      console.error('Error creating user:', error);
      throw new Error(this.getAuthErrorMessage(error.code));
    }
  }

  // Sign in with Google
  public async signInWithGoogle(): Promise<User> {
    try {
      const result = await FirebaseAuthentication.signInWithGoogle();
      
      if (!result.user) {
        throw new Error('No user returned from Google sign in');
      }
      
      return this.mapFirebaseUser(result.user);
    } catch (error: any) {
      console.error('Error signing in with Google:', error);
      throw new Error('Error al iniciar sesión con Google');
    }
  }

  // Sign in with Apple (iOS only)
  public async signInWithApple(): Promise<User> {
    try {
      const result = await FirebaseAuthentication.signInWithApple();
      
      if (!result.user) {
        throw new Error('No user returned from Apple sign in');
      }
      
      return this.mapFirebaseUser(result.user);
    } catch (error: any) {
      console.error('Error signing in with Apple:', error);
      throw new Error('Error al iniciar sesión con Apple');
    }
  }

  // Sign out
  public async signOut(): Promise<void> {
    try {
      await FirebaseAuthentication.signOut();
      await this.clearUserFromStorage();
    } catch (error) {
      console.error('Error signing out:', error);
      throw new Error('Error al cerrar sesión');
    }
  }

  // Send password reset email
  public async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await FirebaseAuthentication.sendPasswordResetEmail({ email });
    } catch (error: any) {
      console.error('Error sending password reset email:', error);
      throw new Error(this.getAuthErrorMessage(error.code));
    }
  }

  // Update user profile
  public async updateProfile(profile: { displayName?: string; photoURL?: string }): Promise<void> {
    try {
      await FirebaseAuthentication.updateProfile(profile);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new Error('Error al actualizar el perfil');
    }
  }

  // Get user-friendly error messages
  private getAuthErrorMessage(errorCode: string): string {
    const errorMessages: Record<string, string> = {
      'auth/email-already-in-use': 'El email ya está registrado',
      'auth/invalid-email': 'Email inválido',
      'auth/operation-not-allowed': 'Operación no permitida',
      'auth/weak-password': 'La contraseña es demasiado débil',
      'auth/user-disabled': 'Usuario deshabilitado',
      'auth/user-not-found': 'Usuario no encontrado',
      'auth/wrong-password': 'Contraseña incorrecta',
      'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde',
      'auth/network-request-failed': 'Error de conexión. Verifica tu internet'
    };

    return errorMessages[errorCode] || 'Error de autenticación. Intenta de nuevo';
  }

  // Check if email is available
  public async isEmailAvailable(email: string): Promise<boolean> {
    try {
      const methods = await FirebaseAuthentication.fetchSignInMethodsForEmail({ email });
      return methods.signInMethods.length === 0;
    } catch (error) {
      console.error('Error checking email availability:', error);
      return false;
    }
  }
}

// Export singleton instance
export const authService = new AuthService();

