/* eslint-disable react/jsx-max-depth */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { requestPost, setToken } from '../services/request';
import { validateUser } from '../validations/validateUser';
import '../css/routes/Login.css';
import logo from '../images/beer-house.png';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invisibleElement, setInvisibleElement] = useState(false);
  const navigate = useNavigate(); // instanciando para utilizar o navegate(alterar rota)
  const [viewPasswordCheck, setViewPasswordCheck] = useState(true);

  useEffect(() => {
    (async () => {
      // Verificando se o usuario já está logado, caso esteja logado o token será válido e o usuário será redirecionado para a página produtos
      const { token } = JSON.parse(localStorage.getItem('user') || false);
      if (token) {
        setToken(token); // inclui token no header
        await requestPost('/login/validate', {})
          .then(() => {
            const { role } = JSON.parse(localStorage.getItem('user') || false);
            switch (role) {
            case 'customer':
              navigate('/customer/products'); // redirecionando para a página /products
              break;
            case 'seller':
              navigate('/seller/orders'); // redirecionando para a página /seller
              break;
            case 'administrator':
              navigate('/admin/manage'); // redirecionando para a página /administrador
              break;
            default:
              navigate('/login'); // redirecionando para a página login
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    })();
  }, [navigate]);

  const handleChange = ({ target: { name, value } }) => {
    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
    if (invisibleElement) setInvisibleElement(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Utilizando o axios não há necessidade de realizar o JSON.parse(), pois converte o json em objeto automaticamento na response
      // const { status, message } = await requestPost('/login', { email, password });
      await requestPost('/login', { email, password })
        .then(({ message }) => {
          localStorage.setItem('user', JSON.stringify({ ...message }));
          switch (message.role) {
          case 'customer':
            navigate('/customer/products'); // redirecionando para a página /products
            break;
          case 'seller':
            navigate('/seller/orders'); // redirecionando para a página /seller
            break;
          case 'administrator':
            navigate('/admin/manage'); // redirecionando para a página /administrador
            break;
          default:
            navigate('/login'); // redirecionando para a página login
          }
        });
    } catch (error) { // em caso do servidor retornar erro: 404, 409 ,...
      setInvisibleElement(true);
    }
  };

  const handleRegister = () => {
    navigate('/register'); // redirecionando para a página /register
  };

  const viewPassword = () => {
    const selectedPassword = document.querySelector('.input-password');
    if (selectedPassword.type === 'text') {
      selectedPassword.type = 'password';
      setViewPasswordCheck(true);
    } else {
      selectedPassword.type = 'text';
      setViewPasswordCheck(false);
    }
  };

  return (
    <section className="login-page">
      <section className="login-form">
        <div>
          <img src={ logo } alt="Beer Logo" className="img-logo-beer" />
        </div>
        <form>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              value={ email }
              onChange={ handleChange }
              placeholder="example@example.com"
              data-testid="common_login__input-email"
              className="input-form"
            />
          </label>
          <div className="container-password">
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={ password }
                onChange={ handleChange }
                placeholder="******"
                data-testid="common_login__input-password"
                className="input-password input-form"
              />
            </label>
            <label htmlFor="view-password" className="view-password">
              <input
                type="checkbox"
                name="view-password"
                id="view-password"
                className="input-view-password"
                onClick={ viewPassword }
              />
              {viewPasswordCheck ? (
                <BsEyeSlashFill
                  className="icon-password"
                />
              ) : (
                <BsEyeFill
                  className="icon-password"
                />
              )}
            </label>
          </div>

          <button
            className="submit-button-login"
            type="submit" // usar o prevent.default()
            data-testid="common_login__button-login"
            onClick={ handleSubmit }
            disabled={ !validateUser(email, password) } // cada caractere digitado, vai executar a função
          >
            Login
          </button>
          <button
            className="register-button"
            type="button"
            data-testid="common_login__button-register"
            onClick={ handleRegister }
          >
            Registrar
          </button>
        </form>
        {invisibleElement && (
          <section
            data-testid="common_login__element-invalid-email"
            className="element-invalid"
          >
            <p>
              E-mail ou Senha Inválidos
            </p>
          </section>
        )}
      </section>
    </section>
  );
}
