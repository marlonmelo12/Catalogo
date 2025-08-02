import { getDb, saveDb } from './mock/db';
import type { Filme, CreateFilmeDto, UpdateFilmeDto } from '../types';

export const getFilmes = async (): Promise<Filme[]> => {
  const db = getDb();
  return Promise.resolve(db.filmes);
};

export const getFilmeById = async (id: number): Promise<Filme> => {
  const db = getDb();
  const filme = db.filmes.find(f => f.id === id);
  if (!filme) throw new Error("Filme não encontrado");
  return Promise.resolve(filme);
};

export const createFilme = async (filmeData: CreateFilmeDto): Promise<Filme> => {
  const db = getDb();
  const newFilme: Filme = { id: db.nextIds.filme++, ...filmeData };
  db.filmes.push(newFilme);
  saveDb(db);
  return Promise.resolve(newFilme);
};

export const updateFilme = async (id: number, filmeData: UpdateFilmeDto): Promise<Filme> => {
  const db = getDb();
  const index = db.filmes.findIndex(f => f.id === id);
  if (index === -1) throw new Error("Filme não encontrado");
  const updatedFilme = { ...db.filmes[index], ...filmeData };
  db.filmes[index] = updatedFilme;
  saveDb(db);
  return Promise.resolve(updatedFilme);
};

export const deleteFilme = async (id: number): Promise<void> => {
  const db = getDb();
  db.filmes = db.filmes.filter(f => f.id !== id);
  db.playlistItems = db.playlistItems.filter(pi => pi.filmeId !== id);
  saveDb(db);
  return Promise.resolve();
};