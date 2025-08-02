export interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha?: string;
}

export interface Filme {
  id: number;
  titulo: string;
  ano: number;
  diretor: string;
  urlCapa: string;
}

export interface Livro {
  id: number;
  titulo: string;
  ano: number;
  autor: string;
  urlCapa: string;
}

export interface PlaylistItem {
  tipo: 'Filme' | 'Livro';
  filme?: Filme;
  livro?: Livro;
}

export interface Playlist {
  id: number;
  nome: string;
  usuarioId: number;
  itens: PlaylistItem[];
}

export interface LoginDto {
  email: string;
  senha?: string;
}

export interface RegisterDto {
  nome: string;
  email: string;
  senha: string;
}

export interface CreateFilmeDto {
  titulo: string;
  ano: number;
  diretor: string;
  urlCapa: string;
}
export interface UpdateFilmeDto extends CreateFilmeDto {}

export interface CreateLivroDto {
  titulo: string;
  ano: number;
  autor: string;
  urlCapa: string;
}
export interface UpdateLivroDto extends CreateLivroDto {}

export interface CreatePlaylistDto {
    nome: string;
}

export interface AddItemToPlaylistDto {
    itemId: number;
    tipo: 'Filme' | 'Livro';
}