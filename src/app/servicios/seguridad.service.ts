import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ModeloIdentificar } from '../modelos/identificar.modelo';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  url = 'http://localhost:3000';
  datosusuariosesion = new BehaviorSubject<ModeloIdentificar>(new ModeloIdentificar());

  constructor(private http: HttpClient) { 
    this.VerificarSesion();
  }

  VerificarSesion (){
    let datos = this.ObtenerInformacionSesion();
    if (datos){
     this.RefrescarDatosSesion(datos);
    }
  }
  RefrescarDatosSesion (datos: ModeloIdentificar){
    this.datosusuariosesion.next(datos);
  }

  Identificar(usuario: string, clave: string): Observable<ModeloIdentificar> {
    return this.http.post<ModeloIdentificar>(`${this.url}/login`, {
      email: usuario,
      clave: clave
    }, {
      headers: new HttpHeaders({

      })
    })
  }

  ObtenerDatosUsuarioSesion(){
    return this.datosusuariosesion.asObservable();
  }

  AlmacenarSesion(datos: ModeloIdentificar) {
    datos.estaidentificado = true;
    let stringDatos = JSON.stringify(datos);
    localStorage.setItem("datosSesion", stringDatos);
    this.RefrescarDatosSesion(datos);
  }

  ObtenerInformacionSesion(){
    let datosString = localStorage.getItem("datosSesion");
    if(datosString){
      let datos = JSON.parse(datosString);
      return datos;
    }else{
      return null;
    }
  }

  EliminarDatosSesion(){
    localStorage.removeItem("datosSesion");
    this.RefrescarDatosSesion(new ModeloIdentificar());
  }

  seiniciosesion(){
    let datosString = localStorage.getItem("datosSesion");
    return datosString
     
  }

  ObtenerToken(){
    let datosString = localStorage.getItem("datosSesion");
    if(datosString){
      let datos = JSON.parse(datosString);
      return datos.tk;
    }else{
      return '';
    }
  }
}
