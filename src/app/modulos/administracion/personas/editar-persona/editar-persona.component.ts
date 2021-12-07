import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})
export class EditarPersonaComponent implements OnInit {

 id: string = '';
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

  EditarPersona(){
    let nombres = this.fgValidador.controls["nombres"].value;
    let apellidos = this.fgValidador.controls["apellidos"].value;
    let telefono = this.fgValidador.controls["telefono"].value;
    let direccion = this.fgValidador.controls["direccion"].value;
    let email = this.fgValidador.controls["email"].value;
    let edad = this.fgValidador.controls["edad"].value;
    let fecha_nacimiento = this.fgValidador.controls["fecha_nacimiento"].value;
    let sueldo = parseInt( this.fgValidador.controls["sueldo"].value);
    
    
    let p = new ModeloPersona();
    p.nombres = nombres;
    p.apellidos = apellidos;
    p.telefono = telefono;
    p.direccion = direccion;
    p.email= email;
    p.edad= edad;
    p.fecha_nacimiento= fecha_nacimiento;
    p.sueldo= sueldo;
    p.id = this.id; 
    
    
    this.servicioPersona.ActualizarEmpleado(p).subscribe((datos: ModeloPersona)=>{
      alert("Persona Actualizada");
      this.router.navigate(['/administracion/listar-personas']);
    }, (error: any) => {
      alert("Error");
    })

  }


}
