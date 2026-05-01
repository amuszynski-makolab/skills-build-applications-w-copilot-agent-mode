import React from 'react';
import ResourceTableCard from './ResourceTableCard';

const codespaceEndpoint = 'https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/clubs/';

const columns = [
  { header: 'Name', accessor: (row) => row.name },
  { header: 'Description', accessor: (row) => row.description },
  { header: 'Schedule', accessor: (row) => row.schedule },
  { header: 'Max Attendance', accessor: (row) => row.max_attendance },
];

const Clubs = () => (
  <ResourceTableCard
    title="Clubs"
    resourcePath="clubs"
    codespaceEndpoint={codespaceEndpoint}
    columns={columns}
    getRowKey={(row, index) => row.id || row.name || `club-${index}`}
    getSearchText={(row) => `${row.name || ''} ${row.description || ''} ${row.schedule || ''}`}
    headingClass="text-warning"
  />
);

export default Clubs;
