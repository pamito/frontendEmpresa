import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ModeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css']
})
export class BarraNavegacionComponent implements OnInit {
  iniciarSesion: boolean = false;
  subs:  Subscription = new Subscription();

  constructor(private seguridadService: SeguridadService) { }

  ngOnInit(): void {
    this.subs = this.seguridadService.ObtenerDatosUsuarioSesion().subscribe((datos:ModeloIdentificar)=>{
      if (datos.estaidentificado){
      this.iniciarSesion=true;
      }else{
        this.iniciarSesion=false;
      }
    })
  }

}
