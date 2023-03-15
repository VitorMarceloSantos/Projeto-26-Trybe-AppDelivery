import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../css/components/NavBarAdm.css';
import { RxExit } from 'react-icons/rx';
import logo from '../images/beer-house.png';

export default function NavBarAdm() {
  const [name, setName] = useState('Default');

  useEffect(() => {
    function verifyLocalStorage() { // Verifica se existe o localStorage
      const storage = window.localStorage.user;
      if (storage) {
        const storageParse = JSON.parse(localStorage.getItem('user'));
        setName(storageParse.name);
      }
    }
    verifyLocalStorage();
  }, []);

  const activeStyle = {
    textShadow: '1px 1px 2px black',
    color: 'rgb( 242, 183, 5)', // altera o estilo do elemento seleiconado
  };

  const clearStorage = () => {
    localStorage.removeItem('user'); // removendo as informações do usuario(user) do localStorage
  };

  const CUSTOMER = 'customer_products';

  return (
    <header>
      <nav className="navBar-admin">
        <div className="logo-container">
          <Link
            to="/login"
          >
            <img src={ logo } alt="Logo Imagem" className="img-beer" />
          </Link>
        </div>
        <div className="container-links">
          <NavLink
            data-testid={ `${CUSTOMER}__element-navbar-link-orders` }
            to="/admin/manage"
            className="space-elements elements-link"
            style={ ({ isActive }) => (isActive ? activeStyle : undefined) }
          >
            Cadastrar Usuário
          </NavLink>
        </div>
        <div className="container-logout">
          <div
            className="user-container space-elements"
            data-testid={ `${CUSTOMER}__element-navbar-user-full-name` }
          >
            { name }
          </div>
          <Link // votlando a Home
            data-testid={ `${CUSTOMER}__element-navbar-link-logout` }
            to="/login"
            className="space-elements"
            onClick={ clearStorage }
          >
            <RxExit
              className="link-logout"
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}
