import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import Swal from 'sweetalert2'; 
import { Resultado } from '../../../modelos/resultado.model';

import { ResultadoService } from '../../../servicios/resultado.service'; 
@Component({
  selector: 'ngx-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  modoCreacion: boolean = true; 
  id_resultado: string = ""; 
  intentoEnvio: boolean = false; 
  elResultado: Resultado = { 
  cedula_candidato: "", 
  nombre_candidato: "",
  apellido_candidato: "",
  numero_mesa: "", 
  nombre_partido: "", 
  votos: "", 

  
  } 
  constructor(private miServicioResultados: ResultadoService, 
    private rutaActiva: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    if (this.rutaActiva.snapshot.params.id_resultado) { 
      this.modoCreacion = false; 
      this.id_resultado = this.rutaActiva.snapshot.params.id_resultado; 
      this.getResultado(this.id_resultado) 
    } else { 
      this.modoCreacion = true; 
    }  
  }
  getResultado(id: string) { 
      this.miServicioResultados.getResultado(id).subscribe(data => { 
          this.elResultado = data; 
      }); 
  } 
  agregar(): void { 
    if (this.validarDatosCompletos()) { 
      this.intentoEnvio = true; 
      this.miServicioResultados.crear(this.elResultado).subscribe(data => { 
          Swal.fire( 
            'Creado', 
            'El Resultado ha sido creado correctamente', 
            'success'
          ) 
          this.router.navigate(["pages/resultados/listar"]); 
        }); 
    } 
  } 
  editar(): void { 
    if (this.validarDatosCompletos()) { 
      this.intentoEnvio = true; 
      this.miServicioResultados.editar(this.elResultado._id, this.elResultado).subscribe(data => { 
      Swal.fire( 
        'Actualizado', 
        'El Resultado ha sido actualizado correctamente', 
        'success'
      ) 
      this.router.navigate(["pages/resultados/listar"]); 
    }); 
  } 
} 
validarDatosCompletos():boolean{ 
  this.intentoEnvio=true; 
  if(this.elResultado.cedula_candidato=="" || 
     this.elResultado.nombre_candidato=="" ||
     this.elResultado.apellido_candidato=="" ||
     this.elResultado.numero_mesa=="" ||
     this.elResultado.nombre_partido=="" ||
     this.elResultado.votos==""
    ){ 

    return false; 
  }else{ 
    return true; 
  } 
} 
  
}
