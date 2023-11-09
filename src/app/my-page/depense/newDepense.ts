export interface NewDepense{
    date: Date;
    type: string;
    fournisseur: string;
    description: string;
    montant: number;
    statu: string;
    admin: number;
    isValidate: boolean;
}