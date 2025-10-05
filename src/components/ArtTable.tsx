import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Checkbox, type CheckboxChangeEvent } from 'primereact/checkbox';
import { fetchArtworks } from '../services/api';
import type  { Artwork } from '../types/artwork';
import type{DataTablePageEvent} from 'primereact/datatable';

const ArtTable: React.FC = () => {
  // Holds the current page's artwork data
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  // Stores selected rows across pages using a map of ID to artwork
  const [selectedRows, setSelectedRows] = useState<{ [key: number]: Artwork }>({});

  // Tracks the current page number
  const [page, setPage] = useState(1);

  // Fetch data whenever the page changes
  useEffect(() => {
    fetchArtworks(page).then(setArtworks);
  }, [page]);

  // Handles individual row selection/deselection
  const onRowSelect = (artwork: Artwork, checked: boolean) => {
    setSelectedRows(prev => {
      const updated = { ...prev };
      if (checked) {
        updated[artwork.id] = artwork;
      } else {
        delete updated[artwork.id];
      }
      return updated;
    });
  };

  // Checks if a row is currently selected
  const isSelected = (id: number) => !!selectedRows[id];

  // Selects or deselects all rows on the current page
  const toggleSelectAll = (checked: boolean) => {
    setSelectedRows(prev => {
      const updated = { ...prev };
      artworks.forEach((art) => {
        if (checked) {
          updated[art.id] = art;
        } else {
          delete updated[art.id];
        }
      });
      return updated;
    });
  };

  // Determines if all rows on the current page are selected
  const allSelected = artworks.every((art) => isSelected(art.id));

  return (
    <div>
      <DataTable
        value={artworks}
        paginator
        rows={10}
        onPage={(e:DataTablePageEvent) => setPage((e as any).page + 1)}
      >
        <Column
          header={
            <Checkbox
              checked={allSelected}
              onChange={(e:CheckboxChangeEvent) => toggleSelectAll((e as any).checked)}
            />
          }
          body={(rowData) => (
            <Checkbox
              checked={isSelected(rowData.id)}
              onChange={(e:CheckboxChangeEvent) => onRowSelect(rowData, (e as any).checked)}
            />
          )}
        />
        <Column field="title" header="Title" />
        <Column field="place_of_origin" header="Origin" />
        <Column field="artist_display" header="Artist" />
        <Column field="inscriptions" header="Inscriptions" />
        <Column field="date_start" header="Start Date" />
        <Column field="date_end" header="End Date" />
      </DataTable>

      <div style={{ marginTop: '1rem' }}>
        <h3>Selected Artworks:</h3>
        <ul>
          {Object.values(selectedRows).map((art) => (
            <li key={art.id}>{art.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArtTable;
