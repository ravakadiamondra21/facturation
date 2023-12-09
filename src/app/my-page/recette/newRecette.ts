export interface NewRecette{
    date_operation: Date;
    date_facture: Date;
    client: string;
    description: string;
    statu: string;
    montant_HT: number;
    TVA: number;
    admin: number;
    numero_facture: number;
}