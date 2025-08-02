import type { Usuario } from '../../types';

interface MockDatabase {
  users: Usuario[];
  filmes: any[];
  livros: any[];
  playlists: any[];
  playlistItems: { id: number; playlistId: number; filmeId?: number; livroId?: number }[];
  nextIds: {
    user: number;
    filme: number;
    livro: number;
    playlist: number;
    playlistItem: number;
  };
}

const DB_KEY = 'minha-colecao-db';

export const getDb = (): MockDatabase => {
  const dbJson = localStorage.getItem(DB_KEY);
  if (dbJson) {
    return JSON.parse(dbJson);
  }
  const initialDb = getInitialData();
  saveDb(initialDb);
  return initialDb;
};

export const saveDb = (db: MockDatabase) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

const getInitialData = (): MockDatabase => {
  return {
    users: [
      { id: 1, nome: 'Usuário Teste', email: 'teste@teste.com', senha: '123456' }
    ],
    filmes: [
      { id: 1, titulo: 'O Poderoso Chefão', ano: 1972, diretor: 'Francis Ford Coppola', urlCapa: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg' },
      { id: 2, titulo: 'O Senhor dos Anéis: A Sociedade do Anel', ano: 2001, diretor: 'Peter Jackson', urlCapa: 'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_SX300.jpg' }
    ],
    livros: [
        { id: 1, titulo: 'O Hobbit', ano: 1937, autor: 'J.R.R. Tolkien', urlCapa: 'https://m.media-amazon.com/images/I/91b0C2YNSrL._AC_UF1000,1000_QL80_.jpg' },
    ],
    playlists: [
        { id: 1, nome: 'Meus Favoritos', usuarioId: 1 },
    ],
    playlistItems: [
        { id: 1, playlistId: 1, filmeId: 1 },
        { id: 2, playlistId: 1, livroId: 1 },
    ],
    nextIds: { user: 2, filme: 3, livro: 2, playlist: 2, playlistItem: 3 }
  };
};