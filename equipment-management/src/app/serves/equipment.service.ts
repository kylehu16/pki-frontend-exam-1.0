import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError,retry } from 'rxjs/operators';
import { Equipment } from '../equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  equipmentUrl='http://localhost:8000/equipments';
  httpOptions={
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  constructor(private http:HttpClient) { }
  getEquipments(){
    return this.http.get<Equipment[]>(this.equipmentUrl).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getEquipment(asset:string):Observable<Equipment>{
    const queryUrl=`${this.equipmentUrl}/${asset}`;
    return this.http.get<Equipment>(queryUrl).pipe(catchError(this.handleError));
  }

  deleteEquipment(asset:string){
    const queryUrl=`${this.equipmentUrl}/${asset}`;
    return this.http.delete<Equipment>(queryUrl).pipe(catchError(this.handleError));
  }

  updateEquipment(equipment:Equipment){
    const queryUrl=`${this.equipmentUrl}/${equipment.id}`;
    return this.http.put<Equipment>(queryUrl,equipment).pipe(catchError(this.handleError));
  }

  addEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(this.equipmentUrl, equipment, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){

    }else{

    }
    return throwError('Something bad happened; please try again later.');
  }
}
