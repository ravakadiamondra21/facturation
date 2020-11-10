import {Component, OnInit} from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-config',
    template: `
        <a style="cursor: pointer" id="layout-config-button" class="layout-config-button" (click)="onConfigButtonClick($event)">
            <i class="pi pi-cog"></i>
        </a>
        <div class="layout-config" [ngClass]="{'layout-config-active': app.configActive}" (click)="app.onConfigClick($event)">
            <h5>Menu Type</h5>
            <div class="p-field-radiobutton">
                <p-radioButton name="layoutMode" value="static" [(ngModel)]="app.layoutMode" inputId="layoutMode1"></p-radioButton>
                <label for="layoutMode1">Static</label>
            </div>
            <div class="p-field-radiobutton">
                <p-radioButton name="layoutMode" value="overlay" [(ngModel)]="app.layoutMode" inputId="layoutMode2"></p-radioButton>
                <label for="layoutMode2">Overlay</label>
            </div>
            <div class="p-field-radiobutton">
                <p-radioButton name="layoutMode" value="horizontal" [(ngModel)]="app.layoutMode" inputId="layoutMode3"></p-radioButton>
                <label for="layoutMode3">Horizontal</label>
            </div>

            <h5>Input Style</h5>
            <div class="p-field-radiobutton">
                <p-radioButton name="inputStyle" value="outlined" [(ngModel)]="app.inputStyle" inputId="inputStyle1"></p-radioButton>
                <label for="inputStyle1">Outlined</label>
            </div>
            <div class="p-field-radiobutton">
                <p-radioButton name="inputStyle" value="filled" [(ngModel)]="app.inputStyle" inputId="inputStyle2"></p-radioButton>
                <label for="inputStyle2">Filled</label>
            </div>

            <h5>Ripple Effect</h5>
			<p-inputSwitch [ngModel]="app.ripple" (onChange)="app.onRippleChange($event)"></p-inputSwitch>

            <h5>Themes</h5>
            <div class="layout-themes">
                <div *ngFor="let t of themes">
                    <a style="cursor: pointer" (click)="changeTheme(t.name)" [ngStyle]="{'background-color': t.color}">
                        <i class="pi pi-check" *ngIf="theme === t.name"></i>
                    </a>
                </div>
            </div>
        </div>
    `
})
export class AppConfigComponent implements OnInit {

    themes: any[];

    theme = 'blue';

    constructor(public app: AppMainComponent) {}

    ngOnInit() {
        this.themes = [
            {name: 'blue', color: '#2f8ee5'},
            {name: 'deep-purple', color: '#7e57c2'},
            {name: 'green', color: '#57c279'},
            {name: 'light-blue', color: '#63c9f1'},
            {name: 'orange', color: '#efa64c'},
            {name: 'pink', color: '#f16383'},
            {name: 'purple', color: '#6c76af'},
            {name: 'turquoise', color: '#00acac'}
        ];
    }

    changeTheme(theme) {
        this.theme = theme;
        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
        const layoutHref = 'assets/layout/css/layout-' + theme + '.css';
        this.replaceLink(layoutLink, layoutHref);

        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
        const themeHref = 'assets/theme/theme-' + theme + '.css';
        this.replaceLink(themeLink, themeHref);
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    replaceLink(linkElement, href) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    }

    onConfigButtonClick(event) {
        this.app.configActive = !this.app.configActive;
        this.app.configClick = true;
        event.preventDefault();
    }
}
