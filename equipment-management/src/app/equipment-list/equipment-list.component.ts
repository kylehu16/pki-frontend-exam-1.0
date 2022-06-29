import { Component, OnInit } from '@angular/core';
import { Equipment } from '../equipment';
import { EquipmentService } from '../serves/equipment.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  providers:[EquipmentService],
  styleUrls: ['./equipment-list.component.css']
})
export class EquipmentListComponent implements OnInit {
  equipments:Equipment[]=[];
  delEquipment:Equipment|undefined;
  showDialog = false;
  constructor(private equipmentService:EquipmentService) { }

  ngOnInit(): void {
    this.getEquipments();
  }

  getEquipments():void{
    this.equipmentService.getEquipments().subscribe(equipments=>(this.equipments=equipments));
  }


  delete(){
    this.equipmentService.deleteEquipment(this.delEquipment?.id!).subscribe(equipment=>this.getEquipments());
    this.delEquipment=undefined;
    this.showDialog=!this.showDialog;
  }

  showDelDialog(equipment:Equipment){
    this.delEquipment=equipment;
    this.showDialog=!this.showDialog;
  }

}
