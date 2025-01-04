export interface TableColumn {
    key: string;         
    label: string;           
    sortable?: boolean;
    format?: (value: any) => string | number; 
    align?: "left" | "center" | "right";
    
  }
  