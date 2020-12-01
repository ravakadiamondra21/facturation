import {Component, OnInit} from '@angular/core';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-config',
    template: `
        <div id="layout-config" class="layout-config" [ngClass]="{'layout-config-active': app.configActive}" (click)="app.onConfigClick($event)">
            <a style="cursor: pointer" id="layout-config-button" class="layout-config-button" (click)="onConfigButtonClick($event)">
                <i class="pi pi-cog"></i>
            </a>
            <div class="layout-config-content">
                <div class="layout-config-form" id="config-form">
                    <div class="layout-config-header">
                        <h3>Theme Customization</h3>
                        <span>Poseidon offers different themes for layout, topbar, menu etc.</span>
                    </div>

                    <div id="lightdark-panel" class="layout-config-section options">
                        <span class="section-name">Layout Mode</span>
                        <div class="p-grid layout-config-options">
                            <div class="p-col-12 p-md-6">
                                <p-radioButton name="layoutMode" value="light" [(ngModel)]="appComponent.layoutMode" inputId="layoutMode1" (onClick)="onLayoutModeChange($event)"></p-radioButton>
                                <label for="layoutMode1">Light</label>
                            </div>
                            <div class="p-col-12 p-md-6">
                                <p-radioButton name="layoutMode" value="dark" [(ngModel)]="appComponent.layoutMode" inputId="layoutMode2" (onClick)="onLayoutModeChange($event)"></p-radioButton>
                                <label for="layoutMode2">Dark</label>
                            </div>
                            <div class="p-col-12 p-md-6">
                                <p-radioButton name="layoutMode" value="dim" [(ngModel)]="appComponent.layoutMode" inputId="layoutMode3" (onClick)="onLayoutModeChange($event)"></p-radioButton>
                                <label for="layoutMode3">Dim</label>
                            </div>
                        </div>
                    </div>

                    <div id="orientation-panel" class="layout-config-section dark">
                        <span class="section-name">RTL Mode</span>
                        <p-inputSwitch [ngModel]="app.isRTL" (onChange)="app.onRTLChange($event)"></p-inputSwitch>
                    </div>

                    <div id="outlined-panel" class="layout-config-section options">
                        <span class="section-name">Form Type</span>
                        <div class="p-grid layout-config-options">
                            <div class="p-col-12 p-md-6">
                                <p-radioButton name="inputStyle" value="outlined" [(ngModel)]="app.inputStyle" inputId="inputStyle1"></p-radioButton>
                                <label for="inputStyle1">Outlined</label>
                            </div>
                            <div class="p-col-12 p-md-6">
                                <p-radioButton name="inputStyle" value="filled" [(ngModel)]="app.inputStyle" inputId="inputStyle2"></p-radioButton>
                                <label for="inputStyle2">Filled</label>
                            </div>
                        </div>
                    </div>

                    <div id="ripple-panel" class="layout-config-section ripple">
                        <span class="section-name">Ripple Effect</span>
                        <p-inputSwitch [ngModel]="app.ripple" (onChange)="app.onRippleChange($event)"></p-inputSwitch>
                    </div>

                    <div id="componentthemes-panel" class="layout-config-section colors">
                        <span class="section-name">Component Colors</span>
                        <div class="p-grid layout-config-colors">
                            <div *ngFor="let t of themes" class="p-col p-col-fixed">
                                <a style="cursor: pointer" (click)="changeTheme(t.name)" class="layout-config-option">
                                    <span class="layout-config-option-color" [ngStyle]="{'background-color': t.color}"></span>
                                    <span class="layout-config-option-check-mask" *ngIf="theme === t.name">
                                        <i class="pi pi-check"></i>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div id="menuthemes-panel" class="layout-config-section options">
                        <span class="section-name">Menu Theme</span>
                        <div class="p-grid layout-config-options">
                            <div class="p-col-12 p-md-6">
                                <p-radioButton name="menuTheme" [disabled]="appComponent.layoutMode !== 'light'" value="light" [(ngModel)]="appComponent.menuTheme" inputId="menuTheme1"></p-radioButton>
                                <label for="menuTheme1">Light</label>
                            </div>
                            <div class="p-col-12 p-md-6">
                                <p-radioButton name="menuTheme" [disabled]="appComponent.layoutMode !== 'light'" value="dark" [(ngModel)]="appComponent.menuTheme" inputId="menuTheme2"></p-radioButton>
                                <label for="menuTheme2">Dark</label>
                            </div>
                            <div class="p-col-12 p-md-6">
                                <p-radioButton name="menuTheme" [disabled]="appComponent.layoutMode !== 'light'" value="dim" [(ngModel)]="appComponent.menuTheme" inputId="menuTheme3"></p-radioButton>
                                <label for="menuTheme3">Dim</label>
                            </div>
                        </div>
                    </div>

                    <div id="topbarthemes-panel" class="layout-config-section options">
                        <span class="section-name">Topbar Theme</span>
                        <div class="p-grid layout-config-options">
                            <div class="p-col-12 p-md-6">
                                <p-radioButton name="topbarTheme" [disabled]="appComponent.layoutMode !== 'light'" value="light" [(ngModel)]="appComponent.topbarTheme" (onClick)="onTopbarThemeChange($event)" inputId="topbarTheme1"></p-radioButton>
                                <label for="topbarTheme1">Light</label>
                            </div>
                            <div class="p-col-12 p-md-6">
                                <p-radioButton name="topbarTheme" [disabled]="appComponent.layoutMode !== 'light'" value="dark" [(ngModel)]="appComponent.topbarTheme" (onClick)="onTopbarThemeChange($event)" inputId="topbarTheme2"></p-radioButton>
                                <label for="topbarTheme2">Dark</label>
                            </div>
                            <div class="p-col-12 p-md-6">
                                <p-radioButton name="topbarTheme" [disabled]="appComponent.layoutMode !== 'light'" value="dim" [(ngModel)]="appComponent.topbarTheme" (onClick)="onTopbarThemeChange($event)" inputId="topbarTheme3"></p-radioButton>
                                <label for="topbarTheme3">Dim</label>
                            </div>
                        </div>
                    </div>

                    <div id="menumodes-panel" class="layout-config-section options">
                        <span class="section-name">Menu Mode</span>
                        <div class="p-grid layout-config-options">
                            <div class="p-col-12 p-md-6">
                                <p-radioButton name="menuMode" value="static" [(ngModel)]="app.menuMode" inputId="menuMode1"></p-radioButton>
                                <label for="menuMode1">Static</label>
                            </div>
                            <div class="p-col-12 p-md-6">
                                <p-radioButton name="menuMode" value="overlay" [(ngModel)]="app.menuMode" inputId="menuMode2"></p-radioButton>
                                <label for="menuMode2">Overlay</label>
                            </div>
                            <div class="p-col-12 p-md-6">
                                <p-radioButton name="menuMode" value="horizontal" [(ngModel)]="app.menuMode" inputId="menuMode3"></p-radioButton>
                                <label for="menuMode3">Horizontal</label>
                            </div>
                        </div>
                    </div>

                    <div id="menutypes-panel" class="layout-config-section options">
                        <span class="section-name">Menu Type</span>
                        <div class="p-grid layout-config-options">
                            <div class="p-col-12 p-md-6">
                                <p-radioButton name="grouped" [value]="true" [(ngModel)]="app.grouped" inputId="grouped1"></p-radioButton>
                                <label for="grouped1">Grouped</label>
                            </div>
                            <div class="p-col-12 p-md-6">
                                <p-radioButton name="grouped" [value]="false" [(ngModel)]="app.grouped" inputId="grouped2"></p-radioButton>
                                <label for="grouped2">Ungrouped</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class AppConfigComponent implements OnInit {

    themes: any[];

    theme = 'denim';

    constructor(public app: AppMainComponent, private appComponent: AppComponent) {}

    ngOnInit() {
        this.themes = [
            {name: 'denim', color: '#2f8ee5'},
            {name: 'sea-green', color: '#30A059'},
            {name: 'amethyst', color: '#834CA8'},
            {name: 'wedgewood', color: '#557DAA'},
            {name: 'tapestry', color: '#A74896'},
            {name: 'cape-palliser', color: '#A46B3E'},
            {name: 'apple', color: '#52A235'},
            {name: 'gigas', color: '#5751A9'},
            {name: 'jungle-green', color: '#2B9F9C'},
            {name: 'camelot', color: '#A54357'},
            {name: 'amber', color: '#D49341'},
            {name: 'cyan', color: '#399DB2'}
        ];
    }

    onLayoutModeChange(event) {
        this.appComponent.menuTheme = this.appComponent.layoutMode;
        this.appComponent.topbarTheme = this.appComponent.layoutMode;
        this.changeLogo();

        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
        const layoutHref = 'assets/layout/css/layout-' + this.appComponent.layoutMode + '.css';
        this.replaceLink(layoutLink, layoutHref);

        const themeLink = document.getElementById('theme-css');
        const urlTokens = themeLink.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = 'theme-' + this.appComponent.layoutMode + '.css';
        const newURL = urlTokens.join('/');

        this.replaceLink(themeLink, newURL);
    }

    onTopbarThemeChange(event) {
        const appLogoLink: HTMLImageElement = document.getElementById('app-logo') as HTMLImageElement;

        const logoUrl = `assets/layout/images/logo-${this.appComponent.topbarTheme === 'light' ? 'poseidon' : 'poseidon-dark'}.png`;

        if (appLogoLink) {
            appLogoLink.src = logoUrl;
        }
    }

    changeTheme(theme) {
        this.theme = theme;

        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
        const themeHref = 'assets/theme/' + theme + '/theme-' + this.appComponent.layoutMode + '.css';
        this.replaceLink(themeLink, themeHref, this.app['refreshTrafficChart']);
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    replaceLink(linkElement, href, callback?) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
            if (callback) {
                callback();
            }
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);

                if (callback) {
                    callback();
                }
            });
        }
    }

    changeLogo() {
        const appLogoLink: HTMLImageElement = document.getElementById('app-logo') as HTMLImageElement;
        const invoiceLogoLink: HTMLImageElement = document.getElementById('invoice-logo') as HTMLImageElement;
        const footerLogoLink: HTMLImageElement = document.getElementById('footer-logo') as HTMLImageElement;


        const logoUrl = `assets/layout/images/logo-${this.appComponent.layoutMode === 'light' ? 'poseidon' : 'poseidon-dark'}.png`;

        if (appLogoLink) {
            appLogoLink.src = logoUrl;
        }

        if (invoiceLogoLink) {
            invoiceLogoLink.src = logoUrl;
        }

        if (footerLogoLink) {
            footerLogoLink.src = logoUrl;
        }
    }

    onConfigButtonClick(event) {
        this.app.configActive = !this.app.configActive;
        this.app.configClick = true;
        event.preventDefault();
    }
}
