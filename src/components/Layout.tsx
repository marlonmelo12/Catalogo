import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaUserCircle, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import { Dropdown, DropdownItem } from './ui/DropDown';

export const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const UserTrigger = (
    <div className="flex items-center space-x-2 p-2 rounded-md hover:bg-surface">
      <FaUserCircle className="text-text-secondary" />
      <span className="font-semibold text-text-main">{user?.nome}</span>
      <FaChevronDown className="text-text-secondary" />
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-text-main">
      <header className="bg-surface shadow-md">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">Minha Coleção</Link>
          <div className="flex items-center space-x-6">
            <Link to="/playlists" className="hover:text-primary">Playlists</Link>
            <Link to="/filmes" className="hover:text-primary">Filmes</Link>
            <Link to="/livros" className="hover:text-primary">Livros</Link>
            <Dropdown trigger={UserTrigger}>
              <DropdownItem onClick={handleLogout}>
                <div className="flex items-center space-x-2">
                  <FaSignOutAlt />
                  <span>Logout</span>
                </div>
              </DropdownItem>
            </Dropdown>
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};