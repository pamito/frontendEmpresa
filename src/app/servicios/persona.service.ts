import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModeloPersona } from '../modelos/persona.modelo';
import { SeguridadService } from './seguridad.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  url = 'http://localhost:3000'
  token: string = '';

  constructor(private http: HttpClient, private seguridadServicio: SeguridadService) { 
    this.token = this.seguridadServicio.ObtenerToken();
  }

  ObtenerEmpleados(): Observable<ModeloPersona[]>{
    return this.http.get<ModeloPersona[]>(`${this.url}/empleados`);
  }

  ObtenerEmpleadoId(id: string): Observable<ModeloPersona>{
    return this.http.get<ModeloPersona>(`${this.url}/empleados/${id}`);
  }

  CrearEmpleado(empleado: ModeloPersona): Observable<ModeloPersona> {
    return this.http.post<ModeloPersona>(`${this.url}/empleados`, empleado, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`  
      })
    });
  }

  ActualizarEmpleado(empleado: ModeloPersona): Observable<ModeloPersona> {
    return this.http.put<ModeloPersona>(`${this.url}/empleados/${empleado.id}`, empleado, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`  
      })
    });
  }

  EliminarEmpleado(id: string): Observable<any> {
    return this.http.delete(`${this.url}/empleados/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`  
      })
    });
  }
}
