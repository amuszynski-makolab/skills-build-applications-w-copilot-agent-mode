import React from 'react';
import ResourceTableCard from './ResourceTableCard';

const codespaceEndpoint = 'https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/leaderboard/';

const columns = [
  {
    header: 'User',
    accessor: (row) => row.user,
    render: (value) => value?.username || value?.email || value || 'Unknown',
  },
  {
    header: 'Score',
    accessor: (row) => row.score,
    render: (value) => <span className="badge text-bg-warning">{value ?? 0}</span>,
  },
];

const Leaderboard = () => (
  <ResourceTableCard
    title="Leaderboard"
    resourcePath="leaderboard"
    codespaceEndpoint={codespaceEndpoint}
    columns={columns}
    getRowKey={(row, index) => row.id || `leaderboard-${index}`}
    getSearchText={(row) => `${row.user || ''} ${row.score || ''}`}
    headingClass="text-warning"
  />
);

export default Leaderboard;
