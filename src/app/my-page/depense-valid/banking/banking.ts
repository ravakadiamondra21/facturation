export interface Banking{
    id_banque: number;
    date_operation: Date;
    libelle: string;
    debit: number;
    credit: number;
    solde: number;
    chemin: string;
}