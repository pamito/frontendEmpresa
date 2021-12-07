import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModeloPersona } from 'src/app/modelos/persona.modelo';
import { PersonaService } from 'src/app/servicios/persona.service';


@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.css']
})
export class CrearPersonaComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'nombres': ['', [Validators.required]],
    'apellidos': ['', [Validators.required]],
    'telefono': ['', [Validators.required]],
    'direccion': ['', [Validators.required]],
    'email': ['', [Validators.required]],
    'edad': ['', [Validators.required]],
    'fecha_nacimiento': ['', [Validators.required]],
    'sueldo': ['', [Validators.required]],
    

  });
  constructor(private fb: FormBuilder, private servicioPersona: PersonaService,
    private router: Router) { }

  ngOnInit(): void {
  }

  GuardarPersona(){
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
    
    
    this.servicioPersona.CrearEmpleado(p).subscribe((datos: ModeloPersona)=>{
      alert("Persona Creada");
      this.router.navigate(['/administracion/listar-personas']);
    }, (error: any) => {
      alert("Error");
    })

  }

}
