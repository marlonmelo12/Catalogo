import { getDb, saveDb } from './mock/db';
import type { Playlist, AddItemToPlaylistDto, CreatePlaylistDto } from '../types';
import { getCurrentUser } from './authService';

const populatePlaylistItems = (playlist: any, db: any): Playlist => {
  const items = db.playlistItems
    .filter((pi: any) => pi.playlistId === playlist.id)
    .map((pi: any) => {
      if (pi.filmeId) {
        const filme = db.filmes.find((f: any) => f.id === pi.filmeId);
        return filme ? { tipo: 'Filme', filme } : null;
      }
      if (pi.livroId) {
        const livro = db.livros.find((l: any) => l.id === pi.livroId);
        return livro ? { tipo: 'Livro', livro } : null;
      }
      return null;
    })
    .filter(Boolean);
  return { ...playlist, itens: items };
};

export const getPlaylists = async (): Promise<Playlist[]> => {
  const db = getDb();
  const currentUser = getCurrentUser();
  if (!currentUser) return Promise.resolve([]);
  const userPlaylists = db.playlists.filter(p => p.usuarioId === currentUser.id);
  const populatedPlaylists = userPlaylists.map(p => populatePlaylistItems(p, db));
  return Promise.resolve(populatedPlaylists);
};

export const getPlaylistById = async (id: number): Promise<Playlist> => {
  const db = getDb();
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error("Usuário não autenticado");
  const playlist = db.playlists.find(p => p.id === id && p.usuarioId === currentUser.id);
  if (!playlist) throw new Error("Playlist não encontrada");
  return Promise.resolve(populatePlaylistItems(playlist, db));
};

export const createPlaylist = async (playlistData: CreatePlaylistDto): Promise<Playlist> => {
  const db = getDb();
  const currentUser = getCurrentUser();
  if (!currentUser) throw new Error("Usuário não autenticado");
  const newPlaylist = {
    id: db.nextIds.playlist++,
    nome: playlistData.nome,
    usuarioId: currentUser.id,
    itens: [],
  };
  db.playlists.push(newPlaylist);
  saveDb(db);
  return Promise.resolve(newPlaylist);
};

export const deletePlaylist = async (playlistId: number): Promise<void> => {
  const db = getDb();
  db.playlists = db.playlists.filter(p => p.id !== playlistId);
  db.playlistItems = db.playlistItems.filter(pi => pi.playlistId !== playlistId);
  saveDb(db);
  return Promise.resolve();
};

export const addItemToPlaylist = async (playlistId: number, itemData: AddItemToPlaylistDto): Promise<void> => {
  const db = getDb();
  const newItem = {
    id: db.nextIds.playlistItem++,
    playlistId,
    filmeId: itemData.tipo === 'Filme' ? itemData.itemId : undefined,
    livroId: itemData.tipo === 'Livro' ? itemData.itemId : undefined,
  };
  db.playlistItems.push(newItem);
  saveDb(db);
  return Promise.resolve();
};

export const removeItemFromPlaylist = async (playlistId: number, itemType: string, itemId: number): Promise<void> => {
  const db = getDb();
  const isFilme = itemType.toLowerCase() === 'filme';
  db.playlistItems = db.playlistItems.filter(pi => 
    !(pi.playlistId === playlistId && (isFilme ? pi.filmeId === itemId : pi.livroId === itemId))
  );
  saveDb(db);
  return Promise.resolve();
};