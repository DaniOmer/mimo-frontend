export interface TableColumn {
    key: string;         
    label: string;           
    sortable?: boolean;
    format?: (value: any) => string; 
    align?: "left" | "center" | "right";
    
  }
  