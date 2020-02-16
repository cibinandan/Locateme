import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [];

@NgModule({
  imports: [ RouterModule.forRoot([
    { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
    { path: '**', redirectTo: 'welcome', pathMatch: 'prefix' }
  ]),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
