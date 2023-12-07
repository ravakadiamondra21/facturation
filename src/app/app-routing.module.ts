import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {FormLayoutDemoComponent} from './demo/view/formlayoutdemo.component';
import {FloatLabelDemoComponent} from './demo/view/floatlabeldemo.component';
import {InvalidStateDemoComponent} from './demo/view/invalidstatedemo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MediaDemoComponent} from './demo/view/mediademo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';
import {AppMainComponent} from './app.main.component';
import {AppNotfoundComponent} from './pages/app.notfound.component';
import {AppErrorComponent} from './pages/app.error.component';
import {AppAccessdeniedComponent} from './pages/app.accessdenied.component';
import {AppLoginComponent} from './pages/app.login.component';
import {InputDemoComponent} from './demo/view/inputdemo.component';
import {ButtonDemoComponent} from './demo/view/buttondemo.component';
import {TableDemoComponent} from './demo/view/tabledemo.component';
import {ListDemoComponent} from './demo/view/listdemo.component';
import {TreeDemoComponent} from './demo/view/treedemo.component';
import {IconsComponent} from './utilities/icons.component';
import {AppCrudComponent} from './pages/app.crud.component';
import {AppCalendarComponent} from './pages/app.calendar.component';
import {AppTimelineDemoComponent} from './pages/app.timelinedemo.component';
import {AppInvoiceComponent} from './pages/app.invoice.component';
import {AppHelpComponent} from './pages/app.help.component';
import {BlocksComponent} from './blocks/blocks/blocks.component';
import { CaisseModule } from './my-page/validation-recette/caisse/caisse.module';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: '', component: DashboardDemoComponent},
                    {path: 'uikit/formlayout', component: FormLayoutDemoComponent},
                    {path: 'uikit/floatlabel', component: FloatLabelDemoComponent},
                    {path: 'uikit/invalidstate', component: InvalidStateDemoComponent},
                    {path: 'uikit/input', component: InputDemoComponent},
                    {path: 'uikit/button', component: ButtonDemoComponent},
                    {path: 'uikit/table', component: TableDemoComponent},
                    {path: 'uikit/list', component: ListDemoComponent},
                    {path: 'uikit/tree', component: TreeDemoComponent},
                    {path: 'uikit/panel', component: PanelsDemoComponent},
                    {path: 'uikit/overlay', component: OverlaysDemoComponent},
                    {path: 'uikit/menu', loadChildren: () => import('./demo/view/menus/menus.module').then(m => m.MenusModule)},
                    {path: 'uikit/media', component: MediaDemoComponent},
                    {path: 'uikit/message', component: MessagesDemoComponent},
                    {path: 'uikit/misc', component: MiscDemoComponent},
                    {path: 'uikit/charts', component: ChartsDemoComponent},
                    {path: 'uikit/file', component: FileDemoComponent},
                    {path: 'utilities/icons', component: IconsComponent},
                    {path: 'pages/crud', component: AppCrudComponent},
                    {path: 'pages/calendar', component: AppCalendarComponent},
                    {path: 'pages/timeline', component: AppTimelineDemoComponent},
                    {path: 'pages/invoice', component: AppInvoiceComponent},
                    {path: 'pages/help', component: AppHelpComponent},
                    {path: 'pages/empty', component: EmptyDemoComponent},
                    {path: 'documentation', component: DocumentationComponent},
                    {path: 'blocks', component: BlocksComponent},
                    {
                        path: 'mydashboard',
                        loadChildren: () => import('./my-page/dashboard/dashboard.module').then(m => m.DashboardModule)
                    },
                    {
                        path: 'depense',
                        loadChildren: () => import('./my-page/depense/depense.module').then(m => m.DepenseModule)
                    },
                    {
                        path: 'recette',
                        loadChildren: () => import('./my-page/recette/recette.module').then(m => m.RecetteModule)
                    },
                    {
                        path: 'validation-depense/banque',
                        loadChildren: () => import('./my-page/validation-depense/banque/banque.module').then(m => m.BanqueModule)
                    },
                    {
                        path: 'validation-depense/caisse',
                        loadChildren: () => import('./my-page/validation-depense/caisse/caisse.module').then(m => m.CaisseModule)
                    },
                    {
                        path: 'validation-depense/autre',
                        loadChildren: () => import('./my-page/validation-depense/autre/autre.module').then(m => m.AutreModule)
                    },
                    {
                        path: 'validation-recette/banque',
                        loadChildren: () => import('./my-page/validation-recette/banque/banque.module').then(m => m.BanqueModule)
                    },
                    {
                        path: 'validation-recette/caisse',
                        loadChildren: () => import('./my-page/validation-recette/caisse/caisse.module').then(m => m.CaisseModule)
                    },
                    {
                        path: 'validation-recette/autre',
                        loadChildren: () => import('./my-page/validation-recette/autre/autre.module').then(m => m.AutreModule)
                    },
                    {
                        path:'depense-valid/banque',
                        loadChildren: () => import('./my-page/depense-valid/banque/banque.module').then(m => m.BanqueModule)
                    },
                    {
                        path: 'depense-valid/caisse',
                        loadChildren: () => import('./my-page/depense-valid/caisse/caisse.module').then(m => m.CaisseModule)
                    },
                    {
                        path: 'recette-valid/banque',
                        loadChildren: () => import('./my-page/recette-valid/banque/banque.module').then(m => m.BanqueModule)
                    },
                    {
                        path: 'recette-valid/caisse',
                        loadChildren: () => import('./my-page/recette-valid/caisse/caisse.module').then(m => m.CaisseModule)
                    },
                    {
                        path: 'depense-banking',
                        loadChildren: () => import('./my-page/depense-valid/banking/banking.module').then(m => m.BankingModule)
                    }
                   
                ]
            },
            {
                path:'mylogin',
                loadChildren: ()=>import('./my-page/login/login.module').then(m => m.LoginModule)
            },
            {
                path:'mysignup',
                loadChildren: ()=>import('./my-page/signup/signup.module').then(m => m.SignupModule)
            },

            {path: 'error', component: AppErrorComponent},
            {path: 'access', component: AppAccessdeniedComponent},
            {path: 'notfound', component: AppNotfoundComponent},
            {path: 'login', component: AppLoginComponent},
            {path: '**', redirectTo: '/notfound'},
////////////////////////my-routing//////////////////////////////////////////
            
            
        ], {scrollPositionRestoration: 'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
