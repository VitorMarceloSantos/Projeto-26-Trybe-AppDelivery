import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { BsTrash } from 'react-icons/bs';
import { requestDelete, requestGet, setToken } from '../services/request';

export default function ListUsers(props) {
  const { listUserState, setListUserState } = props;
  const ADMIN = 'admin_manage__';
  // const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { token } = JSON.parse(localStorage.getItem('user') || false);
        setToken(token);
        await requestGet('/users')
          .then((response) => {
            setListUserState(response);
            // setListUsers(response);
            console.log('Response', response);
          });
      } catch (error) {
        console.log('Error:', error);
      }
    }
    )();
  }, [setListUserState]);

  const RemoveUser = async (nameParams, id) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('user') || false);
      setToken(token);
      await requestDelete(`/users/${id}`)
        .then(() => {
          const temp = listUserState.filter((user) => user.name !== nameParams);
          // setListUsers(temp);
          setListUserState(temp);
        });
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <section>
      {console.log('Lista', listUserState)}
      <table className="tableCar">
        <thead>
          <tr>
            <th className="column-item">Item</th>
            <th className="column-item">Nome</th>
            <th className="column-item">Email</th>
            <th className="column-item">Tipo</th>
          </tr>
        </thead>
        <tbody>
          {listUserState.map(({ name, email, role, id }, index) => (
            <tr key={ index }>
              <td
                className="tdItem"
                data-testid={ `${ADMIN}element-user-table-item-number-${index}` }
              >
                {index + 1}
              </td>
              <td
                className="tdDescricao"
                data-testid={ `${ADMIN}element-user-table-name-${index}` }
              >
                {name}
              </td>
              <td
                className="tdDescricao"
                data-testid={ `${ADMIN}element-user-table-email-${index}` }
              >
                {email}
              </td>
              <td
                className="tdDescricao"
                data-testid={ `${ADMIN}element-user-table-role-${index}` }
              >
                {role}
              </td>
              <td>
                <button
                  className="btnRemover"
                  type="button"
                  name={ name }
                  data-testid={ `${ADMIN}element-user-table-remove-${index}` }
                  onClick={ () => RemoveUser(name, id) }
                  id={ id }
                >
                  <BsTrash
                    className="icon-trash"
                    onClick={ () => RemoveUser(name, id) }
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

ListUsers.propTypes = {
  listUserState: PropTypes.arrayOf.isRequired,
  setListUserState: PropTypes.func.isRequired,
};
