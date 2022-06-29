import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { EquipmentDetailComponent } from './equipment-detail/equipment-detail.component';

const routes: Routes = [
  {path:'',redirectTo:'/equipments',pathMatch: 'full' },
  {path:'equipments',component:EquipmentListComponent},
  {path:'detail/:id',component:EquipmentDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
