/* eslint-disable react/jsx-max-depth */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { requestGet, requestPost, setToken } from '../services/request';
import { validateNewUser } from '../validations/validateNewUser';

export default function FormNewUser(props) {
  const { setListUserState } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [invisibleElement, setInvisibleElement] = useState(false);
  const ADMIN = 'admin_manage__';

  const handleChange = ({ target: { name: nameTarget, value } }) => {
    switch (nameTarget) {
    case 'name':
      setName(value);
      break;
    case 'email':
      setEmail(value);
      break;
    case 'password':
      setPassword(value);
      break;
    default:
      console.log(`Sorry, we are out of ${nameTarget}`);
    }
    if (invisibleElement) setInvisibleElement(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { token } = JSON.parse(localStorage.getItem('user') || false);
      if (!token) return navigate('/login'); // retornando a tela inicial caso o token não seja válido, ou não tenha token
      setToken(token);
      await requestPost('/create/user', { name, email, password, role }) // role pode ser null
        .then(async () => {
          await requestGet('/users')
            .then((response) => {
              console.log('Response', response);
              setListUserState(response);
            });
        });
    } catch (error) { // em caso do servidor retornar erro: 404, 409 ,...
      console.log(error);
      setInvisibleElement(true);
    }
  };

  const handlerSearchRole = ({ target: { value } }) => {
    setRole(value);
  };

  return (
    <section className="container-geral-adm">
      <form className="container-form-adm">
        <div className="container-inputs-form">
          <label htmlFor="nameNewUser">
            <p>Nome:</p>
            <input
              type="text"
              name="name"
              className="input-config"
              placeholder="Digite seu nome ..."
              data-testid={ `${ADMIN}input-name` }
              value={ name }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="emailNewUser">
            <p>Email:</p>
            <input
              type="email"
              name="email"
              className="input-config"
              placeholder="email@email.com"
              data-testid={ `${ADMIN}input-email` }
              value={ email }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="passwordNewUser">
            <p>Password:</p>
            <input
              type="password"
              name="password"
              className="input-config"
              placeholder="******"
              data-testid={ `${ADMIN}input-password` }
              value={ password }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="roleNewUser">
            <p>Tipo:</p>
            <select
              name="role"
              data-testid={ `${ADMIN}select-role` }
              onChange={ handlerSearchRole }
            >
              <option value="customer" selected>Customer</option>
              <option value="seller">Seller</option>
              <option value="administrator">Administrator</option>
            </select>
          </label>
        </div>
        <button
          type="submit"
          data-testid={ `${ADMIN}button-register` }
          className="button-register"
          disabled={ !validateNewUser(name, email, password) } // cada caractere digitado, vai executar a função
          onClick={ handleSubmit }
        >
          Cadastrar
        </button>
      </form>
      {invisibleElement && (
        <section
          data-testid="admin_manage__element-invalid-register"
          className="element-invalid"
        >
          <p>
            Nome, E-mail ou Senha Inválidos
          </p>
        </section>
      )}
    </section>
  );
}

FormNewUser.propTypes = {
  setListUserState: PropTypes.func.isRequired,
};
