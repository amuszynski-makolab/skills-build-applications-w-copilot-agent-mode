import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getResourceEndpoint, normalizeApiData } from '../utils/api';

const formatCellValue = (value) => {
  if (value === null || value === undefined || value === '') {
    return <span className="text-muted">-</span>;
  }

  if (typeof value === 'object') {
    return value.username || value.name || JSON.stringify(value);
  }

  return String(value);
};

const ResourceTableCard = ({
  title,
  resourcePath,
  codespaceEndpoint,
  columns,
  getRowKey,
  getSearchText,
  headingClass = 'text-primary',
}) => {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);

  const endpoint = useMemo(() => getResourceEndpoint(resourcePath), [resourcePath]);

  const fetchRows = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      console.log(`[${title}] REST endpoint:`, endpoint);
      const response = await fetch(endpoint, {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`${title} request failed: ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const htmlPreview = (await response.text()).slice(0, 120);
        throw new Error(`Unexpected API response (not JSON): ${htmlPreview}`);
      }

      const data = await response.json();
      console.log(`[${title}] fetched data:`, data);

      setRows(normalizeApiData(data));
    } catch (err) {
      setError(err.message);
      setRows([]);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint, title]);

  useEffect(() => {
    fetchRows();
  }, [fetchRows]);

  const filteredRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) {
      return rows;
    }

    return rows.filter((row) => getSearchText(row).toLowerCase().includes(normalizedQuery));
  }, [getSearchText, query, rows]);

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0">
        <div className="card-body p-4">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
            <h2 className={`h3 mb-0 ${headingClass}`}>{title}</h2>
            <div className="text-end">
              <a className="link-primary fw-semibold d-block" href={endpoint} target="_blank" rel="noreferrer">
                Open API endpoint
              </a>
              {codespaceEndpoint && (
                <small className="text-muted">Codespace URL: {codespaceEndpoint}</small>
              )}
            </div>
          </div>

          <form className="row g-2 align-items-center mb-3" onSubmit={(event) => event.preventDefault()}>
            <div className="col-sm-8 col-md-9">
              <input
                type="text"
                className="form-control"
                placeholder={`Filter ${title.toLowerCase()}...`}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <div className="col-sm-4 col-md-3 d-grid d-sm-flex gap-2">
              <button type="button" className="btn btn-outline-secondary w-100" onClick={() => setQuery('')}>
                Clear
              </button>
              <button type="button" className="btn btn-primary w-100" onClick={fetchRows}>
                Refresh
              </button>
            </div>
          </form>

          {error && <div className="alert alert-danger">{error}</div>}

          <div className="card border-0 bg-light-subtle">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-striped table-hover align-middle mb-0">
                  <thead className="table-dark">
                    <tr>
                      {columns.map((column) => (
                        <th key={column.header} scope="col">
                          {column.header}
                        </th>
                      ))}
                      <th scope="col" className="text-end">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading && (
                      <tr>
                        <td colSpan={columns.length + 1} className="text-center py-4">
                          Loading...
                        </td>
                      </tr>
                    )}

                    {!isLoading && filteredRows.length === 0 && (
                      <tr>
                        <td colSpan={columns.length + 1} className="text-center py-4 text-muted">
                          No records found.
                        </td>
                      </tr>
                    )}

                    {!isLoading &&
                      filteredRows.map((row, index) => (
                        <tr key={getRowKey(row, index)}>
                          {columns.map((column) => {
                            const rawValue = column.accessor(row);
                            return (
                              <td key={`${column.header}-${getRowKey(row, index)}`}>
                                {column.render ? column.render(rawValue, row) : formatCellValue(rawValue)}
                              </td>
                            );
                          })}
                          <td className="text-end">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => setSelectedRow(row)}
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedRow && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-lg modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">{title} details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedRow(null)}
                  />
                </div>
                <div className="modal-body">
                  <pre className="bg-light rounded p-3 mb-0 small">{JSON.stringify(selectedRow, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedRow(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" onClick={() => setSelectedRow(null)} />
        </>
      )}
    </div>
  );
};

export default ResourceTableCard;
