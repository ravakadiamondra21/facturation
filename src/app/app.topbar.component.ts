import {Component} from '@angular/core';
import {AppMainComponent} from './app.main.component';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="topbar clearfix">
            <div class="topbar-left">
                <div class="logo" style="cursor: pointer; outline: none;" routerLink="/">
                    <img src="assets/layout/images/logo-black.png" alt="Logo">
                </div>
            </div>

            <div class="topbar-right">
                <a id="menu-button" href="#" (click)="app.onMenuButtonClick($event)">
                    <i class="pi pi-angle-left"></i>
                </a>

                <a id="topbar-menu-button" href="#" (click)="app.onTopbarMenuButtonClick($event)">
                    <i class="pi pi-bars"></i>
                </a>
                <ul class="topbar-items fadeInDown animated" [ngClass]="{'topbar-items-visible': app.topbarMenuActive}">
                    <li #profile class="profile-item" [ngClass]="{'active-top-menu':app.activeTopbarItem === profile}">
                        <a href="#" (click)="app.onTopbarItemClick($event,profile)">
                            <img class="profile-image" src="assets/layout/images/avatar.png">
                            <span class="topbar-item-name">Jane Williams</span>
                        </a>

                        <ul class="poseidon-menu fadeInDown">
                            <li role="menuitem">
                                <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                    <i class="pi pi-fw pi-user"></i>
                                    <span>Profile</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                    <i class="pi pi-fw pi-lock"></i>
                                    <span>Privacy</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                    <i class="pi pi-fw pi-cog"></i>
                                    <span>Settings</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                    <i class="pi pi-fw pi-sign-out"></i>
                                    <span>Logout</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li #settings [ngClass]="{'active-top-menu':app.activeTopbarItem === settings}">
                        <a href="#" (click)="app.onTopbarItemClick($event,settings)">
                            <i class="topbar-icon pi pi-fw pi-cog"></i>
                            <span class="topbar-item-name">Settings</span>
                        </a>
                        <ul class="poseidon-menu fadeInDown">
                            <li role="menuitem">
                                <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                    <i class="pi pi-fw pi-palette"></i>
                                    <span>Change Theme</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                    <i class="pi pi-fw pi-star"></i>
                                    <span>Favorites</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                    <i class="pi pi-fw pi-lock"></i>
                                    <span>Lock Screen</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                    <i class="pi pi-fw pi-image"></i>
                                    <span>Wallpaper</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li #messages [ngClass]="{'active-top-menu':app.activeTopbarItem === messages}">
                        <a href="#" (click)="app.onTopbarItemClick($event,messages)">
                            <i class="topbar-icon pi pi-fw pi-envelope"></i>
                            <span class="topbar-badge animated rubberBand">5</span>
                            <span class="topbar-item-name">Messages</span>
                        </a>
                        <ul class="poseidon-menu fadeInDown">
                            <li role="menuitem">
                                <a href="#" class="topbar-message" (click)="app.onTopbarSubItemClick($event)">
                                    <img src="assets/layout/images/avatar1.png" width="35">
                                    <span>Give me a call</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" class="topbar-message" (click)="app.onTopbarSubItemClick($event)">
                                    <img src="assets/layout/images/avatar2.png" width="35">
                                    <span>Sales reports attached</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" class="topbar-message" (click)="app.onTopbarSubItemClick($event)">
                                    <img src="assets/layout/images/avatar3.png" width="35">
                                    <span>About your invoice</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" class="topbar-message" (click)="app.onTopbarSubItemClick($event)">
                                    <img src="assets/layout/images/avatar2.png" width="35">
                                    <span>Meeting today at 10pm</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" class="topbar-message" (click)="app.onTopbarSubItemClick($event)">
                                    <img src="assets/layout/images/avatar4.png" width="35">
                                    <span>Out of office</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li #notifications [ngClass]="{'active-top-menu':app.activeTopbarItem === notifications}">
                        <a href="#" (click)="app.onTopbarItemClick($event,notifications)">
                            <i class="topbar-icon pi pi-fw pi-bell"></i>
                            <span class="topbar-badge animated rubberBand">4</span>
                            <span class="topbar-item-name">Notifications</span>
                        </a>
                        <ul class="poseidon-menu fadeInDown">
                            <li role="menuitem">
                                <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                    <i class="pi pi-fw pi-sliders-h"></i>
                                    <span>Pending tasks</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                    <i class="pi pi-fw pi-calendar"></i>
                                    <span>Meeting today at 3pm</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                    <i class="pi pi-fw pi-download"></i>
                                    <span>Download documents</span>
                                </a>
                            </li>
                            <li role="menuitem">
                                <a href="#" (click)="app.onTopbarSubItemClick($event)">
                                    <i class="pi pi-fw pi-ticket"></i>
                                    <span>Book flight</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    `
})
export class AppTopBarComponent {

    constructor(public app: AppMainComponent) {}

}
