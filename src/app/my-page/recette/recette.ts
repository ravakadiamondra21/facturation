export interface Recette{
    id:  number;
    date: Date;
    client: string;
    description: string;
    montant: number;
    statu: string;
    isValidate: boolean;
}