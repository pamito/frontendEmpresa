import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidadorSesionGuard } from 'src/app/guardianes/validador-sesion.guard';
import { BuscarPersonaComponent } from './personas/buscar-persona/buscar-persona.component';
import { CrearPersonaComponent } from './personas/crear-persona/crear-persona.component';
import { EditarPersonaComponent } from './personas/editar-persona/editar-persona.component';
import { EliminarPersonaComponent } from './personas/eliminar-persona/eliminar-persona.component';

const routes: Routes = [
  {
    path: 'crear-persona',
    component: CrearPersonaComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editar-persona',
    component: EditarPersonaComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'editar-persona/:id',
    component: EditarPersonaComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: 'eliminar-persona',
    component: EliminarPersonaComponent,
    canActivate: [ValidadorSesionGuard]
  }, 
  {
    path: 'buscar-persona',
    component: BuscarPersonaComponent,
    canActivate: [ValidadorSesionGuard]
  },
  {
    path: "listar-personas",
    component: BuscarPersonaComponent,
    canActivate: [ValidadorSesionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
