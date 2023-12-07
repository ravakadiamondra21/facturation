export interface Banking{
    id: number;
    ref_lettrage: string;
    date_operation: Date;
    libelle: string;
    debit: number;
    credit: number;
    solde: number;
    chemin: string;
}