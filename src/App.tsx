import { useEffect, useState } from "react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./index.css";
import DataTableComponent from "./components/DataTableComponent";
import SelectionPanel from "./components/SelectionPanel";
import useFetchArtworks from "./hook/fetchedData";
import { Paginator } from "primereact/paginator";
import type { Artwork } from "./types/artwork";

function App() {
  const { artworks, totalRecords, fetchArtworks } = useFetchArtworks();
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    fetchArtworks(0);
  }, [fetchArtworks]);

  const handlePageChange = (e: { first: number; rows: number }) => {
    // console.log("Page change event:", e);
    setFirst(e.first);
    setRows(e.rows);
    const page = Math.floor(e.first / e.rows);
    fetchArtworks(page);
  };

  const getRowsPerPageOptions = () => {
    const options = [10, 20, 30];
    if (totalRecords > 30) {
      options.push(totalRecords);
    }
    return options;
  };

  const handleSelectionChange = (selected: Artwork[]) => {
    const existingSelections = selectedArtworks.filter(
      (artwork) => !artworks.some((current) => current.id === artwork.id)
    );
    setSelectedArtworks([...existingSelections, ...selected]);
  };

  const handleRemoveSelection = (artwork: Artwork) => {
    setSelectedArtworks(
      selectedArtworks.filter((item) => item.id !== artwork.id)
    );
  };

  const handleClearAll = () => {
    setSelectedArtworks([]);
  };

  console.log(artworks);
  return (
    <div className="p-4 mt-20 my-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Artwork Viewer</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Data Table Section */}
        <div className="lg:col-span-2">
          <DataTableComponent
            artworks={artworks}
            selectedArtworks={selectedArtworks.filter((artwork) =>
              artworks.some((current) => current.id === artwork.id)
            )}
            onSelectionChange={handleSelectionChange}
          />
          {/* Paginator */}
          <div className="mt-4">
            <Paginator
              first={first}
              rows={rows}
              totalRecords={totalRecords}
              pageLinkSize={5}
              rowsPerPageOptions={getRowsPerPageOptions()}
              onPageChange={handlePageChange}
              className="custom-paginator"
              template="PrevPageLink PageLinks NextPageLink RowsPerPageDropdown"
            />
          </div>
        </div>

        {/* Selection Panel */}
        <div className="lg:col-span-1">
          <SelectionPanel
            selectedArtworks={selectedArtworks}
            onRemoveSelection={handleRemoveSelection}
            onClearAll={handleClearAll}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
