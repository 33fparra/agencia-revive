export interface User {
  id: string;                // Id en DB
  displayName: string;        // Nombre Completo.
  email: string;              // Email del Usuario.
  phoneNumber: string;        // Número de Teléfono
  photoURL: string;           // Foto.
  providerId: string;         // Proveedor de Autenticación.
}
