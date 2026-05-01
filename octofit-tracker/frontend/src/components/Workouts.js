import React from 'react';
import ResourceTableCard from './ResourceTableCard';

const codespaceEndpoint = 'https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/workouts/';

const columns = [
  { header: 'Name', accessor: (row) => row.name },
  { header: 'Description', accessor: (row) => row.description },
  {
    header: 'Suggested For',
    accessor: (row) => row.suggested_for,
    render: (value) => {
      if (!Array.isArray(value) || value.length === 0) {
        return 'General';
      }

      return value.length;
    },
  },
];

const Workouts = () => (
  <ResourceTableCard
    title="Workouts"
    resourcePath="workouts"
    codespaceEndpoint={codespaceEndpoint}
    columns={columns}
    getRowKey={(row, index) => row.id || row.name || `workout-${index}`}
    getSearchText={(row) => `${row.name || ''} ${row.description || ''}`}
    headingClass="text-danger"
  />
);

export default Workouts;
