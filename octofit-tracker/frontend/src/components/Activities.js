import React from 'react';
import ResourceTableCard from './ResourceTableCard';

const columns = [
  {
    header: 'User',
    accessor: (row) => row.user,
    render: (value) => value?.username || value?.email || value || 'Unknown',
  },
  { header: 'Type', accessor: (row) => row.type },
  {
    header: 'Duration',
    accessor: (row) => row.duration,
    render: (value) => `${value ?? 0} min`,
  },
  { header: 'Date', accessor: (row) => row.date },
];

const Activities = () => (
  <ResourceTableCard
    title="Activities"
    resourcePath="activities"
    columns={columns}
    getRowKey={(row, index) => row.id || `${row.type || 'activity'}-${index}`}
    getSearchText={(row) => `${row.type || ''} ${row.date || ''} ${row.duration || ''}`}
    headingClass="text-info"
  />
);

export default Activities;
