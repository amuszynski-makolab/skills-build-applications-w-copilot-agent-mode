import React from 'react';
import ResourceTableCard from './ResourceTableCard';

const codespaceEndpoint = 'https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/users/';

const columns = [
  { header: 'Username', accessor: (row) => row.username },
  { header: 'Email', accessor: (row) => row.email },
  {
    header: 'Team',
    accessor: (row) => row.team,
    render: (value) => value?.name || value?.username || 'Unassigned',
  },
  {
    header: 'Status',
    accessor: (row) => row.is_active,
    render: (value) => (
      <span className={`badge ${value ? 'text-bg-success' : 'text-bg-secondary'}`}>
        {value ? 'Active' : 'Inactive'}
      </span>
    ),
  },
];

const Users = () => (
  <ResourceTableCard
    title="Users"
    resourcePath="users"
    codespaceEndpoint={codespaceEndpoint}
    columns={columns}
    getRowKey={(row, index) => row.id || row.email || `user-${index}`}
    getSearchText={(row) => `${row.username || ''} ${row.email || ''}`}
    headingClass="text-primary"
  />
);

export default Users;
