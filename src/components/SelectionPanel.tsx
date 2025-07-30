import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { ScrollPanel } from "primereact/scrollpanel";
import type { Artwork } from "../types/artwork";

interface SelectionPanelProps {
  selectedArtworks: Artwork[];
  onRemoveSelection: (artwork: Artwork) => void;
  onClearAll: () => void;
}

export default function SelectionPanel({
  selectedArtworks,
  onRemoveSelection,
  onClearAll,
}: SelectionPanelProps) {
  if (selectedArtworks.length === 0) {
    return (
      <Card className="w-full">
        <div className="text-center text-gray-500">
          <i className="pi pi-image text-4xl mb-3"></i>
          <p>No artworks selected</p>
          <p className="text-sm">
            Select artworks from the table to view them here
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <div
        className="flex !justify-around items-center mb-4"
        style={{
          justifyContent: "space-around",
        }}
      >
        <h3 className="text-lg font-semibold">
          Selected Artworks ({selectedArtworks.length})
        </h3>
        <Button
          label="Clear All"
          icon="pi pi-trash"
          severity="danger"
          size="small"
          onClick={onClearAll}
        />
      </div>

      <ScrollPanel style={{ height: "400px" }}>
        <div className="space-y-3 ">
          {selectedArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-start"
            >
              <div className="flex  justify-between w-full">
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">
                    {artwork.title}
                  </h4>
                  <p className="text-xs text-gray-600 mb-1">
                    <strong>Artist:</strong>{" "}
                    {artwork.artist_display || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-600 mb-1">
                    <strong>Origin:</strong>{" "}
                    {artwork.place_of_origin || "Unknown"}
                  </p>
                  <p className="text-xs text-gray-600 mb-1">
                    <strong>Date:</strong> {artwork.date_start} -{" "}
                    {artwork.date_end}
                  </p>
                  {artwork.inscriptions && (
                    <p className="text-xs text-gray-600">
                      <strong>Inscriptions:</strong> {artwork.inscriptions}
                    </p>
                  )}
                </div>
                <div>
                  {" "}
                  <Button
                    icon="pi pi-times"
                    size="small"
                    severity="secondary"
                    text
                    onClick={() => onRemoveSelection(artwork)}
                    className="ml-2 h-fit"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollPanel>
    </Card>
  );
}
