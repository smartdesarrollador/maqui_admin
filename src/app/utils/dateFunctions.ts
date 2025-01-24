import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Permite que Angular lo inyecte automáticamente
})
export class dateFunctions {
  // Función para convertir fecha
  public convertirFecha(fechaString: any) {
    // Dividir la fecha por el separador "/"
    var fechaArray = fechaString.split('/');

    // Crear un objeto Date con los componentes de la fecha
    var fecha = new Date(fechaArray[2], fechaArray[1] - 1, fechaArray[0]);

    // Array con los nombres de los meses en español
    var meses = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ];

    // Obtener los componentes de la fecha
    var dia = fecha.getDate();
    var mes = meses[fecha.getMonth()];
    var anio = fecha.getFullYear();

    // Formatear la fecha al formato deseado
    var fechaFormateada = dia + ' de ' + mes + ' del ' + anio;

    return fechaFormateada;
  }
}
