import React from 'react';
import ResourceTableCard from './ResourceTableCard';

const columns = [
  { header: 'Name', accessor: (row) => row.name },
  { header: 'Description', accessor: (row) => row.description },
  {
    header: 'Members',
    accessor: (row) => row.members,
    render: (value) => (Array.isArray(value) ? value.length : 'n/a'),
  },
];

const Teams = () => (
  <ResourceTableCard
    title="Teams"
    resourcePath="teams"
    columns={columns}
    getRowKey={(row, index) => row.id || row.name || `team-${index}`}
    getSearchText={(row) => `${row.name || ''} ${row.description || ''}`}
    headingClass="text-success"
  />
);

export default Teams;
