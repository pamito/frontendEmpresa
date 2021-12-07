import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-eliminar-persona',
  templateUrl: './eliminar-persona.component.html',
  styleUrls: ['./eliminar-persona.component.css']
})
export class EliminarPersonaComponent implements OnInit {
  id: string = "";
  fgValidador: FormGroup = this.fb.group({
    'id': ['', [Validators.required]],
    'nombres': ['', [Validators.required]],
    'apellidos': ['', [Validators.required]],
    'telefono': ['', [Validators.required]],
    'direccion': ['', [Validators.required]],
    'email': ['', [Validators.required]],
    'edad': ['', [Validators.required]],
    'fecha_nacimiento': ['', [Validators.required]],
    'sueldo': ['', [Validators.required]],
    

  });
  constructor(private fb: FormBuilder, 
    private servicioPersona: PersonaService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.BuscarPersona();
  }

  BuscarPersona() {
    this.servicioPersona.ObtenerEmpleadoId(this.id).subscribe((datos: ModeloPersona)=>{
      this.fgValidador.controls["id"].setValue(this.id);
      this.fgValidador.controls["nombres"].setValue(datos.nombres);
      this.fgValidador.controls["apellidos"].setValue(datos.apellidos);
      this.fgValidador.controls["telefono"].setValue(datos.telefono);
      this.fgValidador.controls["direccion"].setValue(datos.direccion);
      this.fgValidador.controls["email"].setValue(datos.email);
      this.fgValidador.controls["edad"].setValue(datos.edad);
      this.fgValidador.controls["fecha_nacimiento"].setValue(datos.fecha_nacimiento);
      this.fgValidador.controls["sueldo"].setValue(datos.sueldo);
    });
  }

  EliminarPersona(){
    
    
    
    this.servicioPersona.EliminarEmpleado(this.id).subscribe((datos: ModeloPersona)=>{
      alert("Persona Eliminada");
      this.router.navigate(['/administracion/listar-personas']);
    }, (error: any) => {
      alert("Error");
    })

  }

}
