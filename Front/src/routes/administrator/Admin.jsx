import React, { useState } from 'react';
import FormNewUser from '../../components/FormNewUser';
import ListUsers from '../../components/ListUsers';
import '../../css/routes/Adminstrator.css';

export default function Admin() {
  const [listUserState, setListUserState] = useState([]); // utilizada para realizar atualizar os elementos da tela
  return (
    <div className="container-administrator">
      <FormNewUser
        setListUserState={ setListUserState }
      />
      <ListUsers
        listUserState={ listUserState }
        setListUserState={ setListUserState }
      />
    </div>
  );
}
