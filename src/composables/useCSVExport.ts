// src/composables/useCSVExport.ts
import { ref } from "vue";

export function useCSVExport() {
  const isExporting = ref(false);

  function convertToCSV(data: any[], columns: any[]): string {
    if (!data.length) return "";

    const headers = columns.map(col => `"${col.label}"`);
    const keys = columns.map(col => col.key);

    const rows = data.map(row =>
      keys.map(key => {
        const value = row[key];
        const formatted = columns.find(col => col.key === key)?.format
          ? columns.find(col => col.key === key)?.format(value)
          : value;
        return `"${formatted ?? ''}"`;
      }).join(",")
    );

    return [headers.join(","), ...rows].join("\n");
  }

  function downloadCSV(content: string, filename: string) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async function exportToCSV(
    data: any[],
    columns: any[],
    filename: string = 'export.csv',
    useWebFileSystem: boolean = false
  ) {
    isExporting.value = true;
    const csvContent = convertToCSV(data, columns);

    if (useWebFileSystem && 'showSaveFilePicker' in window) {
      try {
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const handle = await (window as any).showSaveFilePicker({
          suggestedName: filename,
          types: [{
            description: 'CSV Files',
            accept: { 'text/csv': ['.csv'] },
          }],
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
      } catch (error) {
        console.error("Error using Web File System API:", error);
        // Fallback to download if error occurs
        downloadCSV(csvContent, filename);
      }
    } else {
      downloadCSV(csvContent, filename);
    }

    isExporting.value = false;
  }

  return {
    isExporting,
    exportToCSV,
  };
}
