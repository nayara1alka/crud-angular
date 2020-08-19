import { HttpClient } from '@angular/common/http'
import { tap, take } from 'rxjs/operators'

export class CrudService<T> {

    constructor(protected http: HttpClient, private API_URL ) {}

    list(){
        return this.http.get<T[]>(this.API_URL)
        .pipe(
          tap(console.log)
        )
      }
    
      loadById(id){
        return this.http.get<T>(`${this.API_URL}/${id}`).pipe(take(1));
      }
    
      private create(registro: T){
        return this.http.post(this.API_URL, registro).pipe(take(1));
      }
    
      private update(registro: T){
        return this.http.put(`${this.API_URL}/${registro['id']}`,registro).pipe(take(1));
      }
    
      save(registro: T){
        if(registro['id']){
          return this.update(registro);
        }
          return this.create(registro);
      }
    
      remove(id){
         return this.http.delete(`${this.API_URL}/${id}`).pipe(take(1));
      }

}
