import {Component, OnInit} from '@angular/core';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-config',
    template: `
        <div id="layout-config" class="layout-config" [ngClass]="{'layout-config-active': appMain.configActive}" (click)="appMain.onConfigClick($event)">
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
                                <p-radioButton name="layoutMode" value="light" [(ngModel)]="app.layoutMode" inputId="layoutMode1" (onClick)="onLayoutModeChange($event)"></p-radioButton>
                                <label for="layoutMode1">Light</label>
                            </div>
                            <div class="p-col-12 p-md-6">
                                <p-radioButton name="layoutMode" value="dark" [(ngModel)]="app.layoutMode" inputId="layoutMode2" (onClick)="onLayoutModeChange($event)"></p-radioButton>
                                <label for="layoutMode2">Dark</label>
                            </div>
                            <div class="p-col-12 p-md-6">
                                <p-radioButton name="layoutMode" value="dim" [(ngModel)]="app.layoutMode" inputId="layoutMode3" (onClick)="onLayoutModeChange($event)"></p-radioButton>
                                <label for="layoutMode3">Dim</label>
                            </div>
                        </div>
                    </div>

                    <div id="orientation-panel" class="layout-config-section dark">
                        <span class="section-name">RTL Mode</span>
                        <p-inputSwitch [ngModel]="app.isRTL" (onChange)="appMain.onRTLChange($event)"></p-inputSwitch>
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
                        <p-inputSwitch [ngModel]="app.ripple" (onChange)="appMain.onRippleChange($event)"></p-inputSwitch>
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
                                <p-radioButton name="menuTheme" [disabled]="app.layoutMode !== 'light'" value="light" [(ngModel)]="app.menuTheme" inputId="menuTheme1"></p-radioButton>
                                <label for="menuTheme1">Light</label>
                            </div>
                            <div class="p-col-12 p-md-6">
                                <p-radioButton name="menuTheme" [disabled]="app.layoutMode !== 'light'" value="dark" [(ngModel)]="app.menuTheme" inputId="menuTheme2"></p-radioButton>
                                <label for="menuTheme2">Dark</label>
                            </div>
                            <div class="p-col-12 p-md-6">
                                <p-radioButton name="menuTheme" [disabled]="app.layoutMode !== 'light'" value="dim" [(ngModel)]="app.menuTheme" inputId="menuTheme3"></p-radioButton>
                                <label for="menuTheme3">Dim</label>
                            </div>
                        </div>
                    </div>

                    <div id="topbarthemes-panel" class="layout-config-section options">
                        <span class="section-name">Topbar Theme</span>
                        <div class="p-grid layout-config-options">
                            <div class="p-col-12 p-md-6">
                                <p-radioButton name="topbarTheme" [disabled]="app.layoutMode !== 'light'" value="light" [(ngModel)]="app.topbarTheme" inputId="topbarTheme1"></p-radioButton>
                                <label for="topbarTheme1">Light</label>
                            </div>
                            <div class="p-col-12 p-md-6">
                                <p-radioButton name="topbarTheme" [disabled]="app.layoutMode !== 'light'" value="dark" [(ngModel)]="app.topbarTheme" inputId="topbarTheme2"></p-radioButton>
                                <label for="topbarTheme2">Dark</label>
                            </div>
                            <div class="p-col-12 p-md-6">
                                <p-radioButton name="topbarTheme" [disabled]="app.layoutMode !== 'light'" value="dim" [(ngModel)]="app.topbarTheme" inputId="topbarTheme3"></p-radioButton>
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

    constructor(public appMain: AppMainComponent, public app: AppComponent) {}

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
        this.app.menuTheme = this.app.layoutMode;
        this.app.topbarTheme = this.app.layoutMode;

        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
        const layoutHref = 'assets/layout/css/layout-' + this.app.layoutMode + '.css';
        this.replaceLink(layoutLink, layoutHref);

        const themeLink = document.getElementById('theme-css');
        const urlTokens = themeLink.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = 'theme-' + this.app.layoutMode + '.css';
        const newURL = urlTokens.join('/');

        this.replaceLink(themeLink, newURL);
    }

    changeTheme(theme) {
        this.theme = theme;

        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
        const themeHref = 'assets/theme/' + theme + '/theme-' + this.app.layoutMode + '.css';
        this.replaceLink(themeLink, themeHref, this.appMain['refreshTrafficChart']);
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

    onConfigButtonClick(event) {
        this.appMain.configActive = !this.appMain.configActive;
        this.appMain.configClick = true;
        event.preventDefault();
    }
}
