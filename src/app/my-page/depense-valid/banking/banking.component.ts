import { Component, OnInit } from "@angular/core";
import * as XLSX from "xlsx";
import { Depense } from "../../depense/depense";
import { DepenseService } from "../../depense/depense.service";
import { Banking } from "./banking";
import { BankingService } from "./banking.service";
import { DatePipe, formatDate } from "@angular/common";
import { NewBanking } from "./newBanking";
import { NewDepense } from "../../depense/newDepense";
import { RecetteService } from "../../recette/recette.service";
import { Recette } from "../../recette/recette";
import { ColorPicker } from "primeng/colorpicker";
import { NewRecette } from "../../recette/newRecette";

@Component({
    selector: "app-banking",
    templateUrl: "./banking.component.html",
    styleUrls: ["./banking.component.scss"],
})
export class BankingComponent implements OnInit {
    constructor(
        private bankingService: BankingService,
        private depenseService: DepenseService,
        private recetteService: RecetteService,
        private datePipe: DatePipe
    ) {}

    ngOnInit() {
        return this.findNotMatched();
    }

    onFileChange(evt: any) {
        const target: DataTransfer = <DataTransfer>evt.target;

        if (target.files.length > 1) {
            alert("des fichiers multiples ne sont pas autorisés");
            return;
        } else {
            const reader: FileReader = new FileReader();
            let banque: NewBanking[] = [];
            reader.onload = (e: any) => {
                const bstr: string = e.target.result;
                const wb: XLSX.WorkBook = XLSX.read(bstr, { type: "binary" });

                const worksheetname = wb.SheetNames[0];
                const worksheet: XLSX.WorkSheet = wb.Sheets[worksheetname];

                let data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                for (let i = 1; i < data.length; i++) {
                    let one_banking: NewBanking = {
                        ref_lettrage: "",
                        chemin: "",
                        credit: 0,
                        date_operation: null,
                        debit: 0,
                        libelle: "",
                        solde: 0,
                    };

                    one_banking.date_operation = new Date(data[i][0]);
                    one_banking.libelle = data[i][1];
                    one_banking.debit = Number(data[i][2]);
                    one_banking.credit = Number(data[i][3]);
                    one_banking.solde = Number(data[i][4]);

                    banque.push(one_banking);
                }

                this.bankingService.saveBanking(banque).subscribe();
            };

            reader.readAsBinaryString(target.files[0]);
        }
        this.findNotMatched();
    }

    banking: Banking[] = [];

    findNotMatched() {
        return this.bankingService.findNotMatched().subscribe((response) => {
            this.banking = response;
        });
    }

    selectedRow: Banking;
    date;
    libelle;
    debit;
    credit;

    onSelectedRow(banking: Banking) {
        this.depense = [];
        this.isSelected = [];
        console.log(this.depense);
        this.selectedRow = banking;
        this.date = new Date(this.selectedRow.date_operation);
        this.libelle = this.selectedRow.libelle;
        this.debit = Number(this.selectedRow.debit);
        this.credit = Number(this.selectedRow.credit);
        this.visibleSidebar = true;
        console.log(this.selectedRow);
        this.openMatching();
        console.log(this.date);
        if (this.debit == 0 && this.credit != 0) {
            this.selectDepenseForMatching(this.selectedRow.date_operation);
        } else {
            this.selectRecetteForMatching(this.selectedRow.date_operation);
        }
    }

    visibleSidebar = false;
    openMatching() {}

    depense: any[] = [];
    recette: Recette[] = [];

    selectDepenseForMatching(date: Date) {
        return this.depenseService.getByDate(date).subscribe((response) => {
            this.depense = response;
            console.log(this.depense);
        });
    }

    selectRecetteForMatching(date: Date) {
        return this.recetteService.getByDate(date).subscribe((response) => {
            this.depense = response;
            console.log(this.depense);
        });
    }

    selectRecetteForM;

    valueToMatch: NewDepense = {
        date_operation: null,
        date_facture: null,
        type: "",
        fournisseur: "",
        description: "",
        montant_HT: 0,
        statu: "",
        admin: 0,
        isValidate: false,
        TVA: 0,
        circuit: "",
        numero_facture: 0,
        ref_lettrage: "",
    };

    newRecette: NewRecette = {
        date_operation: null,
        date_facture: null,
        client: "",
        description: "",
        montant_HT: 0,
        statu: "",
        admin: null,
        TVA: 0,
        numero_facture: 0,
        ref_lettrage: "",
    };

    one_banking: NewBanking = {
        ref_lettrage: "",
        chemin: "",
        credit: 0,
        date_operation: null,
        debit: 0,
        libelle: "",
        solde: 0,
    };

    isSelected: any[] = [];
    change_color(item) {
        const index = this.isSelected.indexOf(item);

        if (index !== -1) {
            this.isSelected.splice(index, 1);
        } else {
            this.isSelected.push(item);
        }
    }

    functionSelect(item: any): boolean {
        return this.isSelected.includes(item);
    }

    dialog = false;

    callMatchDepense() {
        let banque;
        this.bankingService.countByRef("B").subscribe((response) => {
            let nb = Number(response);
            let NB = Number(nb + 1);
            banque = "B" + NB;

            console.log(this.isSelected);

            if (this.isSelected.length == 0) {
                this.dialog = true;
            } else {
                this.matchDepense(banque);
            }
        });
        // this.visibleSidebar = false;
        this.findNotMatched()
    }

    matchDepense(banque: string) {
        this.isSelected.forEach((item) => {
            if (item.statu == "banque") {
                this.valueToMatch.date_facture = new Date(item.date_facture);
                this.valueToMatch.date_operation = new Date(
                    item.date_operation
                );
                this.valueToMatch.type = item.type;
                this.valueToMatch.fournisseur = item.fournisseur;
                this.valueToMatch.description = item.description;
                this.valueToMatch.statu = item.statu;
                this.valueToMatch.montant_HT = Number(item.montant_HT);
                this.valueToMatch.TVA = Number(item.TVA);
                this.valueToMatch.numero_facture = Number(item.numero_facture);
                this.valueToMatch.circuit = item.circuit;
                this.valueToMatch.isValidate = false;
                this.valueToMatch.ref_lettrage = banque;
                this.valueToMatch.admin = item.admin;

                this.one_banking.date_operation = new Date(
                    this.selectedRow.date_operation
                );
                this.one_banking.libelle = this.selectedRow.libelle;
                this.one_banking.debit = Number(this.selectedRow.debit);
                this.one_banking.credit = Number(this.selectedRow.credit);
                this.one_banking.solde = Number(this.selectedRow.solde);
                this.one_banking.chemin = item.statu;
                this.one_banking.ref_lettrage = banque;

                this.depenseService
                    .updateDepense(Number(item.id), this.valueToMatch)
                    .subscribe();
                this.bankingService
                    .updateBanque(Number(this.selectedRow.id), this.one_banking)
                    .subscribe();
            }
        });
        this.visibleSidebar = false;
    }

    callMatchRecette() {
        let caisse;
        let banque;

        this.bankingService.countByRef("C").subscribe((response) => {
            let nb = Number(response);
            let NB = Number(nb + 1);
            caisse = "C" + NB;
            console.log(caisse);

            this.bankingService.countByRef("B").subscribe((response) => {
                let nb = Number(response);
                let NB = Number(nb + 1);

                banque = "B" + NB;

                this.matchRecette(caisse, banque);
            });
        });

        
        this.findNotMatched()
    }

    matchRecette(caisse: string, banque: string) {
        this.isSelected.forEach((item) => {
            if (item.statu == "caisse") {
                console.log(caisse);
                this.newRecette.date_facture = new Date(item.date_facture);
                this.newRecette.date_operation = new Date(item.date_operation);
                this.newRecette.TVA = Number(item.TVA);
                this.newRecette.client = item.client;
                this.newRecette.description = item.description;
                this.newRecette.montant_HT = Number(item.montant_HT);
                this.newRecette.admin = item.admin;
                this.newRecette.numero_facture = Number(item.numero_facture);
                this.newRecette.statu = item.statu;
                this.newRecette.ref_lettrage = caisse;

                this.one_banking.date_operation = new Date(
                    this.selectedRow.date_operation
                );
                this.one_banking.libelle = this.selectedRow.libelle;
                this.one_banking.debit = Number(this.selectedRow.debit);
                this.one_banking.credit = Number(this.selectedRow.credit);
                this.one_banking.solde = Number(this.selectedRow.solde);
                this.one_banking.chemin = item.statu;
                this.one_banking.ref_lettrage = caisse;

                this.recetteService
                    .updateRecette(item.id, this.newRecette)
                    .subscribe();
                this.bankingService
                    .updateBanque(Number(this.selectedRow.id), this.one_banking)
                    .subscribe();
            } else if (item.statu == "banque") {
                this.newRecette.date_facture = new Date(item.date_facture);
                this.newRecette.date_operation = new Date(item.date_operation);
                this.newRecette.TVA = Number(item.TVA);
                this.newRecette.client = item.client;
                this.newRecette.description = item.description;
                this.newRecette.montant_HT = Number(item.montant_HT);
                this.newRecette.admin = item.admin;
                this.newRecette.numero_facture = Number(item.numero_facture);
                this.newRecette.statu = item.statu;
                this.newRecette.ref_lettrage = banque;

                this.one_banking.date_operation = new Date(
                    this.selectedRow.date_operation
                );
                this.one_banking.libelle = this.selectedRow.libelle;
                this.one_banking.debit = Number(this.selectedRow.debit);
                this.one_banking.credit = Number(this.selectedRow.credit);
                this.one_banking.solde = Number(this.selectedRow.solde);
                this.one_banking.chemin = item.statu;
                this.one_banking.ref_lettrage = banque;

                this.recetteService
                    .updateRecette(item.id, this.newRecette)
                    .subscribe();
                this.bankingService
                    .updateBanque(Number(this.selectedRow.id), this.one_banking)
                    .subscribe();
            }
        });
        this.visibleSidebar = false;
    }

    insertCaisse(caisse) {
        let admin = localStorage.getItem("admin");
        let adminObject = JSON.parse(admin);

        this.newRecette.date_operation = new Date(
            this.selectedRow.date_operation
        );
        this.newRecette.description = this.selectedRow.libelle;
        this.newRecette.ref_lettrage = caisse;
        this.newRecette.montant_HT = this.selectedRow.credit;
        this.newRecette.admin = Number(adminObject.id);
        this.newRecette.statu = "caisse";

        this.one_banking.date_operation = new Date(
            this.selectedRow.date_operation
        );
        this.one_banking.libelle = this.selectedRow.libelle;
        this.one_banking.debit = Number(this.selectedRow.debit);
        this.one_banking.credit = Number(this.selectedRow.credit);
        this.one_banking.solde = Number(this.selectedRow.solde);
        this.one_banking.chemin = "caisse";
        this.one_banking.ref_lettrage = caisse;

        this.recetteService.postRecette(this.newRecette).subscribe();
        this.bankingService.updateBanque(
            Number(this.selectedRow.id),
            this.one_banking
        ).subscribe();
    }

    newDepense: NewDepense = {
        date_operation: null,
        date_facture: null,
        type: "",
        fournisseur: "",
        description: "",
        montant_HT: 0,
        statu: "",
        admin: 0,
        isValidate: false,
        TVA: 0,
        circuit: "",
        numero_facture: 0,
        ref_lettrage: "",
    };

    insertBanque(caisse) {
        let admin = localStorage.getItem("admin");
        let adminObject = JSON.parse(admin);

        this.newDepense.admin = Number(adminObject.id);
        this.newDepense.date_operation = new Date(
            this.selectedRow.date_operation
        );
        this.newDepense.description = this.selectedRow.libelle;
        this.newDepense.montant_HT = Number(this.selectedRow.credit);
        this.newDepense.statu = "banque";
        this.newDepense.ref_lettrage = caisse;

        this.depenseService.postDepense(this.newDepense).subscribe();
    }

    yesClick() {
        if (this.dialog === true) {
            this.bankingService.countByRef("C").subscribe((response) => {
                let nb = Number(response);
                let NB = Number(nb + 1);
                let caisse = "C" + NB;

                this.insertCaisse(caisse);
                this.insertBanque(caisse);
                this.dialog = false;
            });
        }
        this.visibleSidebar = false;
        this.findNotMatched()
    }
}
