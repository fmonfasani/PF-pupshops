import { initAuth0 } from '@auth0/nextjs-auth0';

console.log({
  issuerBaseURL: process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL,
  baseURL: process.env.NEXT_PUBLIC_AUTH0_BASE_URL,
  clientID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
});

const auth0 = initAuth0({
  issuerBaseURL: process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL as string,
  baseURL: process.env.NEXT_PUBLIC_AUTH0_BASE_URL as string,
  clientID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID as string,
  clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
  session: {
    // Estas propiedades son opcionales y pueden omitirse si no son necesarias.
    // cookieSecret: process.env.AUTH0_SECRET as string, // Si no la necesitas, coméntala o elimínala
    // Puedes omitir cookieLifetime y storeIdToken en esta versión
  },
});

// Función para iniciar sesión
export const loginWithAuth0 = async () => {
  console.log("Iniciando sesión con Auth0...");
  try {
    await auth0.handleLogin(); // Esto redirige a la página de login
  } catch (error) {
    console.error('Error al iniciar sesión con Auth0:', error);
    throw error;
  }
};

export default auth0;
