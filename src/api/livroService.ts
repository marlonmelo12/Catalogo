import { getDb, saveDb } from './mock/db';
import type { Livro, CreateLivroDto, UpdateLivroDto } from '../types';

export const getLivros = async (): Promise<Livro[]> => {
  const db = getDb();
  return Promise.resolve(db.livros);
};

export const getLivroById = async (id: number): Promise<Livro> => {
  const db = getDb();
  const livro = db.livros.find(l => l.id === id);
  if (!livro) throw new Error("Livro não encontrado");
  return Promise.resolve(livro);
};

export const createLivro = async (livroData: CreateLivroDto): Promise<Livro> => {
  const db = getDb();
  const newLivro: Livro = { id: db.nextIds.livro++, ...livroData };
  db.livros.push(newLivro);
  saveDb(db);
  return Promise.resolve(newLivro);
};

export const updateLivro = async (id: number, livroData: UpdateLivroDto): Promise<Livro> => {
  const db = getDb();
  const index = db.livros.findIndex(l => l.id === id);
  if (index === -1) throw new Error("Livro não encontrado");
  const updatedLivro = { ...db.livros[index], ...livroData };
  db.livros[index] = updatedLivro;
  saveDb(db);
  return Promise.resolve(updatedLivro);
};

export const deleteLivro = async (id: number): Promise<void> => {
  const db = getDb();
  db.livros = db.livros.filter(l => l.id !== id);
  db.playlistItems = db.playlistItems.filter(pi => pi.livroId !== id);
  saveDb(db);
  return Promise.resolve();
};