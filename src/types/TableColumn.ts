export interface TableColumn {
    key: string;               // clé dans l'objet data (ex: 'email', 'status')
    label: string;             // titre de la colonne (ex: 'Email', 'Status')
    sortable?: boolean;        // si on veut rendre la colonne triable
    format?: (value: any) => string; 
    align?: "left" | "center" | "right";
    // fonction de formatage, ex: pour formater date, prix, etc.
    
    // Ajoute d’autres options (align, width, etc.) si besoin
  }
  