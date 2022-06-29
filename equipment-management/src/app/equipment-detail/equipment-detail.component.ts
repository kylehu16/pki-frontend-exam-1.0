import { Component, OnInit } from '@angular/core';
import { Equipment } from '../equipment';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { EquipmentService } from '../serves/equipment.service';
import { FormBuilder,Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.css']
})
export class EquipmentDetailComponent implements OnInit {
  equipment:Equipment|undefined;
  equipmentForm=this.fb.group({
    id:[''],
    model:['',Validators.required],
    brand:['',Validators.required],
    weight:['',Validators.required],
    manufactureDate:['',Validators.required],
  });
  showDialog = false;
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private router:Router,private location:Location,private equipmentService:EquipmentService) { }

  ngOnInit(): void {
    this.getEquipment();
  }

  getEquipment():void{
    const id=this.route.snapshot.paramMap.get('id')||'';
    console.log(id);
    if(id!=='0'){
      this.equipmentService.getEquipment(id).subscribe(data=>{
        this.equipment=data;
        this.equipmentForm.setValue({
          id: this.equipment?.id || '',
          model: this.equipment?.model||'',
          brand: this.equipment?.brand||'',
          weight: this.equipment?.weight||'',
          manufactureDate: this.equipment?.manufactureDate||''
        });
      });
    }
  }

  goBack(): void {
    if(this.equipmentForm.value.id===''){
      this.showDialog=!this.showDialog;
    }
    else{
      this.router.navigateByUrl('/equipments');
    }
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.equipmentForm.value);
    if(!this.showDialog){
      this.save();
    }
  }

  save():void{
    if(this.equipment){
      if(this.equipment.id&&this.equipment.id!==''){
        console.log('update');
        this.equipmentService.updateEquipment(this.equipment).subscribe(()=>this.goBack());
      }else{

      }
    }
    else{
      console.log('add');
      this.equipment={          
      id: this.equipmentForm?.value.id || '',
      model: this.equipmentForm?.value.model||'',
      brand: this.equipmentForm?.value.brand||'',
      weight: this.equipmentForm?.value.weight||'',
      manufactureDate: this.equipmentForm?.value.manufactureDate||''}
      this.equipmentService.addEquipment(this.equipment).subscribe((data)=> {
        this.router.navigateByUrl('', {skipLocationChange:true}).then(()=>this.router.navigateByUrl(`/detail/${data.id}`));
        console.log('test',this.equipmentForm.value.id);
      });
    }
  }

  continue(){
    this.showDialog=!this.showDialog;
    this.router.navigateByUrl('/equipments');
  }

}
