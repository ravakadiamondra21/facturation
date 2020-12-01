import {Component, OnInit} from '@angular/core';
import {AppBreadcrumbService} from '../app.breadcrumb.service';
import { AppComponent } from '../app.component';

@Component({
    templateUrl: './app.invoice.component.html'
})
export class AppInvoiceComponent implements OnInit{

    constructor(private breadcrumbService: AppBreadcrumbService, public appComponent: AppComponent) {
        this.breadcrumbService.setItems([
            { label: 'Pages' },
            { label: 'Invoice', routerLink: ['/pages/invoice'] }
        ]);
    }

    ngOnInit(): void {
        const invoiceLogoLink: HTMLImageElement = document.getElementById('invoice-logo') as HTMLImageElement;

        const logoUrl = `assets/layout/images/logo-${this.appComponent.layoutMode === 'light' ? 'poseidon' : 'poseidon-dark'}.png`;

        if (invoiceLogoLink) {
            invoiceLogoLink.src = logoUrl;
        }
    }

    print() {
        window.print();
    }
}
