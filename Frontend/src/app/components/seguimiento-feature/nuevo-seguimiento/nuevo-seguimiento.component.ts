import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Seguimiento } from '../../../models/seguimiento';
import { SeguimientoService } from '../../../services/seguimiento/seguimiento.service';
import { UsuarioService } from '../../../services/usuario/usuario.service';

@Component({
  selector: 'app-nuevo-seguimiento',
  templateUrl: './nuevo-seguimiento.component.html',
  styleUrls: ['./nuevo-seguimiento.component.css']
})
export class NuevoSeguimientoComponent implements OnInit {

  titulo = 'Nuevo Seguimiento';
  seguimiento: Seguimiento;
  // @Output() seguimientoChange: EventEmitter<seguimiento>;
  constructor(
    private segService: SeguimientoService,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.seguimiento = new Seguimiento();
  }

  ngOnInit() { }
  onClick() {
    console.log('submit');
    this.segService.crearSeguimiento(this.seguimiento).subscribe(
      seguimiento => {
        console.log('Seguimiento Creado');
        this.router.navigate(['/seguimiento', seguimiento.id]);
      },
      error => alert('Hubo un error: ' + error)
    );
  }
}
