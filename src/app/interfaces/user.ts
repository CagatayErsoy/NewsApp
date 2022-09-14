export interface User {
    id?: number
  email?: string
  password?: string
  username?: string
  role?: "USER" | "ADMIN" | "SUPERUSER",
  tmdb_key?: string,
  token?:string
 
}
