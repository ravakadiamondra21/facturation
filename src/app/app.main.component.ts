import {Component, AfterViewInit, Renderer2, OnDestroy, OnInit} from '@angular/core';
import { MenuService } from './app.menu.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-main',
    templateUrl: './app.main.component.html'
})
export class AppMainComponent implements AfterViewInit, OnDestroy, OnInit {

    layoutMode = 'static';

    rotateMenuButton: boolean;

    topbarMenuActive: boolean;

    overlayMenuActive: boolean;

    staticMenuDesktopInactive: boolean;

    staticMenuMobileActive: boolean;

    menuClick: boolean;

    topbarItemClick: boolean;

    activeTopbarItem: any;

    documentClickListener: () => void;

    inputStyle = 'outlined';

    ripple: boolean;

    configActive: boolean;

    configClick: boolean;

    constructor(public renderer: Renderer2, private menuService: MenuService, private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }

    ngAfterViewInit() {
        // hides the horizontal submenus or top menu if outside is clicked
        this.documentClickListener = this.renderer.listen('body', 'click', (event) => {
            if (!this.topbarItemClick) {
                this.activeTopbarItem = null;
                this.topbarMenuActive = false;
            }

            if (!this.menuClick && this.isHorizontal()) {
                this.menuService.reset();
            }

            if (this.configActive && !this.configClick) {
                this.configActive = false;
            }

            this.configClick = false;
            this.topbarItemClick = false;
            this.menuClick = false;
        });
    }

    onMenuButtonClick(event) {
        this.rotateMenuButton = !this.rotateMenuButton;
        this.topbarMenuActive = false;

        if (this.layoutMode === 'overlay') {
            this.overlayMenuActive = !this.overlayMenuActive;
        } else {
            if (this.isDesktop()) {
                this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
            } else {
                if (this.staticMenuMobileActive) {
                    this.staticMenuMobileActive = false;
                } else {
                    this.staticMenuMobileActive = true;
                }
            }
        }

        event.preventDefault();
    }

    onMenuClick($event) {
        this.menuClick = true;
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.topbarMenuActive = !this.topbarMenuActive;

        if (this.overlayMenuActive || this.staticMenuMobileActive) {
            this.rotateMenuButton = false;
            this.overlayMenuActive = false;
            this.staticMenuMobileActive = false;
        }

        event.preventDefault();
    }

    onTopbarItemClick(event, item) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        } else {
            this.activeTopbarItem = item; }

        event.preventDefault();
    }

    onTopbarSubItemClick(event) {
        event.preventDefault();
    }

    onRippleChange(event) {
        this.ripple = event.checked;
    }

    onConfigClick(event) {
        this.configClick = true;
    }

    isTablet() {
        const width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    isOverlay() {
        return this.layoutMode === 'overlay';
    }

    isHorizontal() {
        return this.layoutMode === 'horizontal';
    }

    changeToStaticMenu() {
        this.layoutMode = 'static';
    }

    changeToOverlayMenu() {
        this.layoutMode = 'overlay';
    }

    changeToHorizontalMenu() {
        this.layoutMode = 'horizontal';
    }

    ngOnDestroy() {
        if (this.documentClickListener) {
            this.documentClickListener();
        }
    }

}
