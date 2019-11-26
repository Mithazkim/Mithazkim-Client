import React from 'react';
import Dictionary from 'dictionary/dictionary';
import { RouteComponentProps } from 'react-router-dom';
import { routes } from 'components/router/routes';

interface AdminMenuProps extends RouteComponentProps {}

const AdminMenu: React.FC<AdminMenuProps> = props => {
  return (
    <div>
      <h2>{Dictionary.admin.menu.header}</h2>
      <button onClick={() => props.history.push(routes.admin + routes.addFood)} className='btn btn-outline-primary'>
        {Dictionary.admin.menu.add_food}
      </button>
      <button onClick={() => props.history.push(routes.admin + routes.addFood)} className='btn btn-outline-primary'>
        {Dictionary.admin.menu.add_card}
      </button>
    </div>
  );
};

export default AdminMenu;
