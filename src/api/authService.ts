import type { LoginDto, RegisterDto, Usuario } from '../types';
import { getDb, saveDb } from './mock/db';

const CURRENT_USER_KEY = 'minha-colecao-currentUser';

export const login = (credentials: LoginDto): Promise<Usuario> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const db = getDb();
      const user = db.users.find(u => u.email === credentials.email && u.senha === credentials.senha);
      if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error('Credenciais inválidas'));
      }
    }, 500);
  });
};

export const register = (userData: RegisterDto): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const db = getDb();
      if (db.users.some(u => u.email === userData.email)) {
        return reject(new Error('Email já está em uso'));
      }
      const newUser: Usuario = {
        id: db.nextIds.user++,
        nome: userData.nome,
        email: userData.email,
        senha: userData.senha,
      };
      db.users.push(newUser);
      saveDb(db);
      resolve();
    }, 500);
  });
};

export const getCurrentUser = (): Usuario | null => {
  const userJson = localStorage.getItem(CURRENT_USER_KEY);
  return userJson ? JSON.parse(userJson) : null;
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};