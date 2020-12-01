import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    topbarTheme = 'light';

    menuTheme = 'dim';

    layoutMode = 'light';
}
