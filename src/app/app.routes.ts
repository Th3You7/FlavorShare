import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReceiptComponent } from './components/receipt/receipt.component';
import { ListReceiptComponent } from './components/dashboard/list-receipt/list-receipt.component';
import { AddReceiptComponent } from './components/dashboard/add-receipt/add-receipt.component';
import { EditReceiptComponent } from './components/dashboard/edit-receipt/edit-receipt.component';
import { AuthComponent } from './components/auth/auth.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    children: [
      { path: 'login', component: AuthComponent },
      { path: 'signup', component: AuthComponent },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: ListReceiptComponent,
      },
      { path: 'add-receipt', component: AddReceiptComponent },
      { path: 'edit-receipt', component: EditReceiptComponent },
    ],
    canActivate: [authGuard],
  },
  { path: 'receipt/:receiptId', component: ReceiptComponent },
  { path: '**', redirectTo: '' },
];
