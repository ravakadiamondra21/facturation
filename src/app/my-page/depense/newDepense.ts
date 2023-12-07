export interface NewDepense{
    date_operation: Date;
    date_facture: Date;
    numero_facture: number;
    circuit: string;
    type: string;
    fournisseur: string;
    description: string;
    montant_HT: Number;
    TVA: number;
    statu: string;
    admin: number;
    isValidate: boolean;
    ref_lettrage: string;
}