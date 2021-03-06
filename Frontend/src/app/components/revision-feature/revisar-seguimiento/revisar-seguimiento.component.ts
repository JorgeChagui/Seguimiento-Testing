import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { Seguimiento } from '../../../models/seguimiento';
import { AgendaDeAmbiente } from '../../../models/agenda-de-ambiente';
import { CartaDeCertificacion } from '../../../models/carta-de-certificacion';
import { Defects } from '../../../models/defects';
import { DoDDdTVSTS } from '../../../models/dod-ddt-vsts';
import { Releases } from '../../../models/releases';
import { Repositorio } from '../../../models/repositorio';
import { Requirements } from '../../../models/requirements';
import { TestLab } from '../../../models/test-lab';
import { Usd } from '../../../models/usd';
import { SeguimientoService } from '../../../services/seguimiento/seguimiento.service';
import { UsuarioService } from '../../../services/usuario/usuario.service';

@Component({
  selector: 'app-revisar-seguimiento',
  templateUrl: './revisar-seguimiento.component.html',
  styleUrls: ['./revisar-seguimiento.component.css']
})
export class RevisarSeguimientoComponent implements OnInit {
  auditor: Usuario;
  titulo = 'Revisar Seguimiento';
  seguimiento: Seguimiento;
  agendaDeAmbiente: AgendaDeAmbiente;
  cartaDeCertificacion: CartaDeCertificacion;
  defects: Defects;
  doDDdTVSTS: DoDDdTVSTS;
  releases: Releases;
  repositorio: Repositorio;
  requirements: Requirements;
  testLab: TestLab;
  usd: Usd;
  // @Output() seguimientoChange: EventEmitter<seguimiento>;
  constructor(
    private route: ActivatedRoute,
    private segService: SeguimientoService,
    private router: Router,
    private usuarioService: UsuarioService
  ) {
    this.seguimiento = new Seguimiento();
  }

  ngOnInit() {
    // Agregar CanActivate Guard
    this.auditor = this.usuarioService.getIdentidad();
    if (this.auditor.rolId === 1) {
      this.router.navigate(['/seguimientos']);
    }

    const id = this.route.snapshot.paramMap.get('id');
      this.segService.getSeguimiento(id).subscribe(
        respuesta => {
        console.log(respuesta);
        this.seguimiento = respuesta['seguimiento'];
        this.agendaDeAmbiente = (respuesta['agendaDeAmbiente']);
        this.cartaDeCertificacion = (respuesta['cartaDeCertificacion']);
        this.defects = (respuesta['defects']);
        this.doDDdTVSTS = (respuesta['doDDdTVSTS']);
        this.releases = (respuesta['releases']);
        this.repositorio = (respuesta['repositorio']);
        this.requirements = (respuesta['requirements']);
        this.testLab = (respuesta['testLab']);
        this.usd = (respuesta['usd']);
      },
      error => {
        console.log(error);
        this.router.navigate(['/revision-seguimientos']);
      });
  }
  atras() {
    this.router.navigate(['/revision-seguimientos']);
  }
}
