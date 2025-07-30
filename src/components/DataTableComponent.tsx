import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputNumber } from "primereact/inputnumber";
import { useRef, useState } from "react";
import type { Artwork } from "../types/artwork";

interface DataTableComponentProps {
  artworks: Artwork[];
  selectedArtworks: Artwork[];
  onSelectionChange: (selected: Artwork[]) => void;
}

export default function DataTableComponent({
  artworks,
  selectedArtworks,
  onSelectionChange,
}: DataTableComponentProps) {
  const overlayPanelRef = useRef<OverlayPanel>(null);
  const [inputValue, setInputValue] = useState<number | null>(null);

  const handleSubmit = () => {
    if (inputValue && inputValue > 0 && inputValue <= artworks.length) {
      const selectedItems = artworks.slice(0, inputValue);
      onSelectionChange(selectedItems);
      overlayPanelRef.current?.hide();
      setInputValue(null);
    }
  };

  const customHeader = () => (
    <div className="flex align-items-center gap-2 ">
      <Button
        icon="pi pi-chevron-down"
        className="p-button-text p-button-sm !p-0"
        style={{
          backgroundColor: "transparent",
          border: "none",
          boxShadow: "none",
          padding: "0",
          margin: "0",
          height: "auto",
          width: "auto",
          minWidth: "auto",
          outline: "none",
        }}
        onClick={(e) => overlayPanelRef.current?.toggle(e)}
      />
      <span>Title</span>
    </div>
  );

  return (
    <div>
      <DataTable
        value={artworks}
        selectionMode="multiple"
        tableStyle={{ minWidth: "50rem" }}
        selection={selectedArtworks}
        onSelectionChange={(e) => onSelectionChange(e.value as Artwork[])}
        dataKey="id"
      >
        <Column selectionMode="multiple" headerStyle={{ width: "3em" }} />
        <Column field="title" header={customHeader} />
        <Column field="place_of_origin" header="Origin" />
        <Column field="artist_display" header="Artist" />
        <Column
          field="inscriptions"
          header="Inscriptions"
          body={(rowData) => {
            const text = rowData.inscriptions ? rowData.inscriptions : "N/A";
            const shortText =
              text.length > 40 ? text.slice(0, 40) + "..." : text;
            return <div>{shortText}</div>;
          }}
        />
        <Column field="date_start" header="Start Year" />
        <Column field="date_end" header="End Year" />
      </DataTable>

      <OverlayPanel ref={overlayPanelRef} className="p-3">
        <div className="flex flex-column gap-3">
          <label htmlFor="selectCount" className="font-semibold">
            Select number of items:
          </label>
          <InputNumber
            id="selectCount"
            value={inputValue}
            onValueChange={(e) => setInputValue(e.value ?? null)}
            min={1}
            max={artworks.length}
            placeholder={`1-${artworks.length}`}
            className="w-full"
          />
          <Button
            label="Submit"
            icon="pi pi-check"
            onClick={handleSubmit}
            disabled={
              !inputValue || inputValue <= 0 || inputValue > artworks.length
            }
            className="w-full"
          />
        </div>
      </OverlayPanel>
    </div>
  );
}
