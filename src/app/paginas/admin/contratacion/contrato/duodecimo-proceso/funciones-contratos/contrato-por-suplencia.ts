import { dateFunctions } from 'src/app/utils/dateFunctions';

export function contratoPorSuplencia(
  registroTrabajador: any,
  registroEmpleador: any,
  datosLocales: any,
  prueba_meses: string,
  prueba_inicio: string,
  prueba_termino: string,
  fechaFormateada: string,
  num_valores: Array<string>,
  fechaActualValor: string,
  convertirFormatoFecha: dateFunctions
): any {
  const formatoFechaInicio = convertirFormatoFecha.convertirFecha(
    datosLocales.fecha_inicio
  );
  const formatoFechaRenovacion = convertirFormatoFecha.convertirFecha(
    datosLocales.fecha_renovacion
  );
  var docDefinition = {
    content: [
      { text: datosLocales.modelo_contrato, style: 'header' },
      '\n',
      {
        text: [
          'Conste por el presente documento, el Contrato de Trabajo de Naturaleza Accidental bajo la modalidad de Suplencia, al amparo del art. 61º del TUO del Decreto Legislativo 728, Ley de productividad y competitividad laboral, aprobado por D.S. Nº 003-97-TR, y normas complementarias, que celebran, de una parte,\n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          { text: registroEmpleador.empleador, style: 'datos_locales' },
          ', identificado con RUC Nº ',
          { text: registroEmpleador.ruc, style: 'datos_locales' },
          ', con domicilio en ',
          { text: registroEmpleador.domicilio, style: 'datos_locales' },
          ', Lima, debidamente representada por ',
          {
            text: registroEmpleador.representante_legal,
            style: 'datos_locales',
          },
          ' identificado con DNI Nº ',
          {
            text: registroEmpleador.dni_representante_legal,
            style: 'datos_locales',
          },
          ' en calidad de ',
          {
            text: registroEmpleador.cargo_representante_legal,
            style: 'datos_locales',
          },
          ' , según poder inscrito en la Partida Electrónica Nº ',
          {
            text: registroEmpleador.numero_partida_registral,
            style: 'datos_locales',
          },
          ' Asiento ',
          { text: registroEmpleador.numero_asiento, style: 'datos_locales' },
          ' del Registro de Personas Jurídicas de la Oficina Registral de ',
          { text: registroEmpleador.oficina_registral },
          ' , a quien en adelante se le denominará EL EMPLEADOR y de la otra parte, \n\n',
        ],
        style: 'alinear',
      },
      {
        text: [
          {
            text:
              registroTrabajador.primer_nombre +
              ' ' +
              registroTrabajador.segundo_nombre +
              ' ' +
              registroTrabajador.apellido_paterno +
              ' ' +
              registroTrabajador.apellido_materno,
            style: 'datos_locales',
          },
          ' identificada con DNI Nº',
          {
            text: registroTrabajador.numero_documento,
            style: 'datos_locales',
          },
          ', con domicilio en ',
          { text: registroTrabajador.direccion, bold: true, fontSize: 12 },
          ', a quien en adelante se le denominará EL TRABAJADOR.\n\n',
        ],
        style: 'alinear',
      },
      {
        text: 'A quienes se les puede denominar “LAS PARTES”, en los términos y condiciones siguientes:\n\n',
      },
      {
        text: ['CLÁUSULA ', num_valores[0], '. - ANTECEDENTES\n\n'],
        style: 'subtitulo',
      },
      {
        text: [
          'EL EMPLEADOR es una sociedad constituida y existente bajo las leyes del Perú, cuyo objeto social es dedicarse a ',
          {
            text: registroEmpleador.actividad_economica,
            style: 'datos_locales',
          },
          '.\n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'Por su parte, EL TRABAJADOR declara ser ',
          {
            text: datosLocales.oferta_laboral,
            style: 'datos_locales',
          },
          ' de profesión, y contar con la capacidad y experiencia necesaria para desempeñar el cargo ofrecido. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'Con fecha ',
          {
            text: datosLocales.fecha_inicio,
            style: 'datos_locales',
          },
          ', EL EMPLEADOR contrató a ',
          {
            text:
              registroTrabajador.primer_nombre +
              ' ' +
              registroTrabajador.segundo_nombre +
              ' ' +
              registroTrabajador.apellido_paterno +
              ' ' +
              registroTrabajador.apellido_materno,
            style: 'datos_locales',
          },
          datosLocales.genero_suplencia == 'femenino'
            ? ' (en adelante, “LA TRABAJADORA SUPLIDA”), identificada con DNI N° '
            : ' (en adelante, “LA TRABAJADORA SUPLIDO”), identificada con DNI N° ',
          {
            text: registroTrabajador.numero_documento,
            style: 'datos_locales',
          },
          ', en el cargo de ',
          {
            text: datosLocales.oferta_laboral,
            style: 'datos_locales',
          },
          '. \n\n',
        ],
        style: 'parrafo',
      },
      datosLocales.genero_suplencia == 'femenino'
        ? {
            text: [
              'Siendo que con fecha ',
              {
                text: datosLocales.fecha_suplencia,
                style: 'datos_locales',
              },
              ' , LA TRABAJADORA SUPLIDA comunicó a EL EMPLEADOR que se encuentra en estado de gestación y que, a consecuencia de ello, hará ejercicio de su derecho a la licencia por maternidad, según lo regulado en la Ley N° 26644 y su reglamento, EL EMPLEADOR requiere de la contratación de un trabajador para cubrir la ausencia de LA TRABAJADORA SUPLIDA durante el periodo de tiempo que se contempla en la cláusula novena del presente contrato. \n\n',
            ],
            style: 'parrafo',
          }
        : {
            text: [
              'Siendo que con fecha ',
              {
                text: datosLocales.fecha_suplencia,
                style: 'datos_locales',
              },
              ' , LA TRABAJADORA SUPLIDO comunicó a EL EMPLEADOR que se encuentra en estado de gestación y que, a consecuencia de ello, hará ejercicio de su derecho a la licencia por maternidad, según lo regulado en la Ley N° 26644 y su reglamento, EL EMPLEADOR requiere de la contratación de un trabajador para cubrir la ausencia de LA TRABAJADORA SUPLIDO durante el periodo de tiempo que se contempla en la cláusula novena del presente contrato. \n\n',
            ],
            style: 'parrafo',
          },
      {
        text: ['CLÁUSULA ', num_valores[1], '. - OBJETO DEL CONTRATO\n\n'],
        style: 'subtitulo',
      },
      {
        text: [
          'Por el presente documento, EL EMPLEADOR contrata a plazo fijo - bajo la modalidad de Suplencia, regulada a través del artículo 61 del Texto Único Ordenado de la Ley de Productividad y Competitividad Laboral (LPCL) - los servicios de EL TRABAJADOR para que desempeñe el cargo de ',
          {
            text: datosLocales.oferta_laboral,
            style: 'datos_locales',
          },
          datosLocales.genero_suplencia == 'femenino'
            ? ', en razón de los hechos descritos en la cláusula primera; teniendo como principal motivo de contratación el reemplazo temporal de LA TRABAJADORA SUPLIDA  por la licencia por maternidad que gozará, a menos que se amplie su licencia por cualquier otro motivo y a solicitud de LA TRABAJADORA SUPLIDA. \n\n'
            : ', en razón de los hechos descritos en la cláusula primera; teniendo como principal motivo de contratación el reemplazo temporal de LA TRABAJADORA SUPLIDO  por la licencia por maternidad que gozará, a menos que se amplie su licencia por cualquier otro motivo y a solicitud de LA TRABAJADORA SUPLIDO. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'EL EMPLEADOR, en ejercicio de las facultades conferidas por el artículo 9º del Decreto Supremo Nº 003-97-TR, Ley de Productividad y Competitividad Laboral, podrá establecer modificaciones en las tareas asignadas a EL TRABAJADOR, tomando en cuenta las necesidades de EL EMPLEADOR. Para lo cual, EL EMPLEADOR se reserva la facultad de poder modificar el centro de trabajo en caso las necesidades comerciales así lo requieran. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: ['CLÁUSULA ', num_valores[2], '. - PRESTACIÓN DE SERVICIOS\n\n'],
        style: 'subtitulo',
      },
      {
        text: [
          'EL TRABAJADOR se compromete a cumplir las labores encomendadas y aquellas que le pudiera impartir EL EMPLEADOR. Dicha obligación incluye el cumplimiento de todas las normas internas de EL EMPLEADOR, aquellas propias del centro de trabajo en el cual brindará sus servicios, las contenidas en las Políticas y Reglamentos Internos, y todas aquellas disposiciones internas que se le impartan por necesidades del servicio.\n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'Corresponde en especial a EL TRABAJADOR, desempeñar las funciones principales, conexas y complementarias al cargo para el cual es contratado, principalmente las que se detallan en el Anexo A del presente contrato.\n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'Se deja constancia que, en el cumplimiento de sus obligaciones derivadas del presente contrato, EL TRABAJADOR deberá en todo momento cumplir con las obligaciones habituales para este tipo de funciones. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'Así, EL TRABAJADOR estará obligado a desempeñar todas las labores que complementen o favorezcan la correcta ejecución de su cargo, y a seguir las instrucciones específicas que EL EMPLEADOR le comunique directamente o a través de sus representantes.\n\n',
        ],
        style: 'parrafo',
      },
      {
        text: ['CLÁUSULA ', num_valores[3], '.- DE LA BUENA FE LABORAL\n\n'],
        style: 'subtitulo',
      },
      {
        text: [
          'EL TRABAJADOR se obliga, en forma expresa, a poner al servicio de EL EMPLEADOR toda su capacidad y lealtad.\n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'EL TRABAJADOR se compromete siempre y en todo caso a obrar de buena fe en relación con su empleo. Asimismo, EL TRABAJADOR se compromete a observar las políticas y normas que disponga EL EMPLEADOR, teniendo como objetivo su progreso y permanente desarrollo.\n\n',
        ],
        style: 'parrafo',
      },
      datosLocales.trabajador_confianza
        ? {
            text: [
              'CLÁUSULA ',
              num_valores[4],
              '. - PERSONAL DE CONFIANZA\n\n',
            ],
            style: 'subtitulo',
          }
        : null,
      datosLocales.trabajador_confianza
        ? {
            text: [
              'En virtud del artículo 43 del Decreto Legislativo N° 728, se considera trabajadores de confianza a aquellos que laboran en contacto personal y directo con EL EMPLEADOR o con el personal de dirección, teniendo acceso a secretos industriales, comerciales o profesionales y, en general, a información de carácter reservado. Asimismo, a los que contribuyen a la formación de decisiones empresariales.\n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.trabajador_confianza
        ? {
            text: [
              'En ese sentido, EL TRABAJADOR al desempeñarse en el cargo de   ',
              {
                text: datosLocales.oferta_laboral,
                style: 'datos_locales',
              },
              '   es considerado como personal de confianza debido al puesto que desempeña al laborar en contacto personal y directo con    ',
              {
                text: datosLocales.pregunta_1,
                style: 'datos_locales',
              },
              '   , teniendo acceso a información confidencial de EL EMPLEADOR y la información contable, en general a información de carácter reservado tales como    ',
              {
                text: datosLocales.pregunta_2,
                style: 'datos_locales',
              },
              '    \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.trabajador_confianza
        ? {
            text: [
              'De acuerdo a lo antes mencionado, EL TRABAJADOR, cuenta con una relación laboral de confianza exclusiva sujeta a fiscalización inmediata por lo que el desarrollo de sus funciones se regirá por todo aquello que la legislación laboral señale respecto a esta situación especial.\n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.trabajador_direccion
        ? {
            text: [
              'CLÁUSULA ',
              num_valores[5],
              '.-  PERSONAL DE DIRECCIÓN\n\n',
            ],
            style: 'subtitulo',
          }
        : null,
      datosLocales.trabajador_direccion
        ? {
            text: [
              'En virtud del artículo 43 del Decreto Legislativo N° 728, se considera puesto de dirección a los trabajadores que ejercen la representación de EL EMPLEADOR a nivel interno y externo, ejercen funciones de administración y control y tienen un alto grado de responsabilidad, y de sus labores depende el resultado de la actividad de EL EMPLEADOR.  \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.trabajador_direccion
        ? {
            text: [
              'En ese sentido, EL TRABAJADOR al desempeñarse en el cargo de ',
              {
                text: datosLocales.oferta_laboral,
                style: 'datos_locales',
              },
              ' es considerado como personal de dirección y por ende de confianza debido a que cuenta con representación de EL EMPLEADOR a nivel interno y externo ya que ejerce funciones de administración y control, toda vez que que supervisa y tiene un alto grado de responsabilidad, y de sus labores depende el resultado de la actividad de EL EMPLEADOR, asimismo, tiene acceso a información confidencial tales como  ',
              {
                text: datosLocales.pregunta_3,
                style: 'datos_locales',
              },
              ' , secretos industriales, comerciales o profesionales y, en general, a información de carácter reservado.  \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.fiscalizacion_inmediata
        ? {
            text: [
              'CLÁUSULA ',
              num_valores[6],
              '. – PERSONAL SIN FISCALIZACIÓN INMEDIATA  \n\n',
            ],
            style: 'subtitulo',
          }
        : null,
      datosLocales.fiscalizacion_inmediata
        ? datosLocales.trabajador_confianza
          ? {
              text: [
                'Por el puesto que ocupa EL TRABAJADOR, este reconoce que desempeña sus labores sin supervisión inmediata de EL EMPLEADOR, por lo tanto, es considerado como   ',
                {
                  text: ' Trabajador de Confianza',
                  style: 'datos_locales',
                },
                '  en virtud del artículo    ',
                {
                  text: ' 10',
                  style: 'datos_locales',
                },
                '   del Decreto Supremo N° 008-2002-TR.\n\n',
              ],
              style: 'parrafo',
            }
          : {
              text: [
                'Por el puesto que ocupa EL TRABAJADOR, este reconoce que desempeña sus labores sin supervisión inmediata de EL EMPLEADOR, por lo tanto, es considerado como   ',
                {
                  text: ' Trabajador de Dirección',
                  style: 'datos_locales',
                },
                '  en virtud del artículo    ',
                {
                  text: ' 11',
                  style: 'datos_locales',
                },
                '   del Decreto Supremo N° 008-2002-TR.\n\n',
              ],
              style: 'parrafo',
            }
        : null,
      {
        text: [
          'CLÁUSULA ',
          num_valores[7],
          '. - DEL LUGAR DE PRESTACIÓN DE SERVICIOS\n\n',
        ],
        style: 'subtitulo',
      },
      {
        text: [
          'Las partes acuerdan que, en atención al cargo de   ',
          { text: datosLocales.oferta_laboral, style: 'datos_locales' },
          '   que ocupará EL TRABAJADOR, los servicios descritos en la cláusula primera del presente contrato, serán prestados en las instalaciones de EL EMPLEADOR ubicada en Los Olivos. \n\n',
        ],
        style: 'parrafo',
      },
      datosLocales.jornada_maxima
        ? {
            text: ['CLÁUSULA ', num_valores[8], '. - JORNADA LABORAL\n\n'],
            style: 'subtitulo',
          }
        : null,
      datosLocales.jornada_maxima
        ? {
            text: [
              'EL TRABAJADOR desarrollará sus funciones en una jornada máxima laboral de 48 horas semanales, siendo el día de descanso semanal obligatorio los domingos. \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.jornada_maxima
        ? {
            text: [
              'El horario de trabajo podrá ser distribuido de lunes a viernes pudiendo ser la jornada laboral de lunes a viernes de ',
              datosLocales.horario_inicio,
              ' a ',
              datosLocales.horario_final,
              ', incluido los 45 minutos de refrigerio, los cuales no forman parte de la jornada ni del horario de trabajo.  \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.jornada_maxima
        ? {
            text: [
              'De igual forma EL TRABAJADOR deberá cumplir las normas que EL EMPLEADOR imparta para el cumplimiento de sus objetivos, así como de las funciones y metas impartidas por EL EMPLEADOR, en ejercicio de sus facultades de Administración de acuerdo con lo indicado en el artículo 9° del del Texto Único Ordenado del Decreto Legislativo 728 – Ley de Productividad y Competitividad Laboral aprobado por el Decreto Supremo N.º 003-97-TR.   \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.jornada_maxima
        ? {
            text: [
              'Asimismo, EL EMPLEADOR podrá variar el horario señalado precedentemente, de acuerdo con sus necesidades, las mismas que están relacionadas con las funciones que desempeña EL TRABAJADOR, sin que ello represente hostilidad u otro similar de alguna clase, sujetándose EL TRABAJADOR a las jornadas alternativas o acumulativas que establezca EL EMPLEADOR.   \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      {
        text: ['CLÁUSULA ', num_valores[9], '. - ÉTICA Y LEY\n\n'],
        style: 'subtitulo',
      },
      {
        text: [
          'EL TRABAJADOR desempeñará sus funciones profesionales de acuerdo con las normas usuales de ética y las leyes peruanas, de acuerdo con el Código de Conducta existente en EL EMPLEADOR, así como de acuerdo con los mejores intereses de EL EMPLEADOR, siempre y cuando estas no sean contrarias a las leyes peruanas vigentes.  \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'EL TRABAJADOR declara que no tiene ningún conflicto de interés personal a declarar para EL EMPLEADOR y se compromete a informar sobre cualquier conflicto de interés que pueda surgir durante su relación laboral.  \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'CLÁUSULA ',
          num_valores[10],
          '.- RECURSOS TECNOLÓGICOS E INFORMÁTICOS\n\n',
        ],
        style: 'subtitulo',
      },
      {
        text: [
          'EL EMPLEADOR proporcionará a EL TRABAJADOR diversos equipos informáticos (hardware y software) para el cabal desempeño de sus labores. EL TRABAJADOR declara conocer que dichos equipos sólo podrán ser empleados para asuntos propios de su trabajo; consecuentemente, dichos equipos no podrán ser utilizado para asuntos ajenos a su labor o que sean personales. EL TRABAJADOR reconoce que dichos equipos y software son de propiedad exclusiva de EL EMPLEADOR, así como la información almacenada en el mismo, la cual en modo alguno le pertenece a EL TRABAJADOR. EL TRABAJADOR y EL EMPLEADOR acuerdan que éste último tiene el derecho de acceder, por cualquier medio, al equipo informático entregado a EL TRABAJADOR, incluyendo a la información guardada en el mismo, con la finalidad de consolidar información, verificar cuestiones relacionadas con la seguridad de su información y comprobar que no venga siendo empleado con fines distintos de aquellos para los cuales fue entregado.  \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: ['CLÁUSULA ', num_valores[11], '.- REMUNERACIÓN\n\n'],
        style: 'subtitulo',
      },
      {
        text: [
          'EL TRABAJADOR percibirá como contraprestación por sus servicios una remuneración mensual básica ascendente a S/',
          {
            text: datosLocales.remuneracion,
            style: 'datos_locales',
          },
          ' (con 00/100 soles), durante el tiempo de duración de la relación laboral.  \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'Además, EL TRABAJADOR tendrá derecho a percibir las gratificaciones y demás derechos y beneficios que puedan corresponderle de conformidad con la legislación laboral peruana, debiendo comunicar a EL EMPLEADOR en caso tuviera hijos que dieran lugar al beneficio de Asignación Familiar, lo cual acreditará con la documentación pertinente.   \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'Las ausencias injustificadas por parte de EL TRABAJADOR implican la pérdida de la remuneración proporcionalmente a la duración de dicha ausencia, sin perjuicio del ejercicio de las facultades disciplinarias propias de EL EMPLEADOR previstas en la legislación laboral y normas internas de EL EMPLEADOR.  \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: ['CLÁUSULA ', num_valores[12], '. - PLAZO\n\n'],
        style: 'subtitulo',
      },
      {
        text: [
          'El plazo de duración del presente contrato es de ',
          {
            text: datosLocales.duracion_contrato,
            style: 'datos_locales',
          },
          datosLocales.genero_suplencia == 'femenino'
            ? ' , tiempo estimado para cubrir las necesidades a que se hace referencia en la cláusula primera, mientras retorna a sus labores diarias LA TRABAJADORA SUPLIDA. Este plazo se iniciará el '
            : ' , tiempo estimado para cubrir las necesidades a que se hace referencia en la cláusula primera, mientras retorna a sus labores diarias LA TRABAJADORA SUPLIDO. Este plazo se iniciará el ',
          {
            text: formatoFechaInicio,
            style: 'datos_locales',
          },
          ' y concluirá el ',
          {
            text: formatoFechaRenovacion,
            style: 'datos_locales',
          },
          '.  \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'En el supuesto que EL TRABAJADOR decidiera poner término a la relación laboral emanada del presente documento, deberá comunicarlo por escrito a EL EMPLEADOR con una anterioridad a la fecha de cese, no menor de treinta (30) días calendario. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: ['CLÁUSULA ', num_valores[13], '. - PERIODO DE PRUEBA\n\n'],
        style: 'subtitulo',
      },
      {
        text: [
          'En atención al artículo 10 del Texto Único Ordenado del Decreto Legislativo N° 728 – Ley de Productividad y Competitividad Laboral aprobado por el Decreto Supremo N.º 003-97-TR, el período de prueba es de ',
          prueba_meses,
          ' , el cual empieza el ',
          prueba_inicio,
          ' y termina el ',
          prueba_termino,
          ' . Queda entendido que durante este periodo de prueba EL EMPLEADOR puede resolver el contrato sin expresión de causa.  \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'CLÁUSULA ',
          num_valores[14],
          '. - RENOVACIÓN Y EXTINCIÓN DEL CONTRATO\n\n',
        ],
        style: 'subtitulo',
      },
      {
        text: [
          'Las partes podrán prorrogar o renovar el presente contrato si la ausencia del titular se mantiene por cualquier otro motivo, hasta su reincorporación. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'Asimismo, considerando que el presente contrato temporal por suplencia tiene por objeto el desempeño provisional del cargo de ',
          {
            text: datosLocales.oferta_laboral,
            style: 'datos_locales',
          },
          datosLocales.genero_suplencia == 'femenino'
            ? ', el presente contrato se extinguirá automáticamente, sin penalidades ni indemnizaciones cuando LA TRABAJADORA SUPLIDA retorne a su puesto original. Esta disposición opera como una condición resolutoria y se regula por lo establecido en el artículo 16 inciso c) del Decreto Supremo N° 003-97-TR, Ley de Productividad y Competitividad Laboral. Esta disposición se aplicará aun cuando no haya concluido el plazo del presente contrato o de cualquiera de sus prórrogas, de ser el caso. EL TRABAJADOR declara tener pleno conocimiento de la naturaleza del contrato de suplencia y de las implicancias de la presente cláusula. \n\n'
            : ', el presente contrato se extinguirá automáticamente, sin penalidades ni indemnizaciones cuando LA TRABAJADORA SUPLIDO retorne a su puesto original. Esta disposición opera como una condición resolutoria y se regula por lo establecido en el artículo 16 inciso c) del Decreto Supremo N° 003-97-TR, Ley de Productividad y Competitividad Laboral. Esta disposición se aplicará aun cuando no haya concluido el plazo del presente contrato o de cualquiera de sus prórrogas, de ser el caso. EL TRABAJADOR declara tener pleno conocimiento de la naturaleza del contrato de suplencia y de las implicancias de la presente cláusula. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'CLÁUSULA ',
          num_valores[15],
          '. - ENTREGA DE MATERIALES EN CASO DE CESE\n\n',
        ],
        style: 'subtitulo',
      },
      {
        text: [
          'EL TRABAJADOR se obliga, en caso de terminar por cualquier razón la relación laboral, a entregar en forma inmediata y ordenada a EL EMPLEADOR toda la documentación, material técnico o comercial y cualquier otro bien de propiedad de EL EMPLEADOR que tuviera en su poder, así como a trasladar sus funciones y responsabilidades a la persona designada a tal efecto por EL EMPLEADOR. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: ['CLÁUSULA ', num_valores[16], '. - BUENA FE LABORAL\n\n'],
        style: 'subtitulo',
      },
      {
        text: [
          'EL TRABAJADOR se obliga, en forma expresa, a poner al servicio de EL EMPLEADOR toda su capacidad y lealtad. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'EL TRABAJADOR se compromete siempre y en todo caso a obrar de buena fe en relación con su empleo.  Asimismo, EL TRABAJADOR se compromete a observar las políticas y normas que disponga EL EMPLEADOR, teniendo como objetivo su progreso y permanente desarrollo. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: ['CLÁUSULA ', num_valores[17], '. - DURACIÓN DEL CONTRATO \n\n'],
        style: 'subtitulo',
      },
      {
        text: [
          'El plazo de duración del presente contrato es de    ',
          {
            text: '1 año',
            style: 'datos_locales',
          },
          '  , y rige desde el    ',
          {
            text: datosLocales.fecha_inicio,
            style: 'datos_locales',
          },
          '  , fecha en que debe empezar sus labores EL TRABAJADOR, hasta el    ',
          {
            text: datosLocales.fecha_renovacion,
            style: 'datos_locales',
          },
          '  , fecha en que termina el contrato.\n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'Queda entendido que EL EMPLEADOR no está obligado a dar aviso alguno adicional referente al término del presente contrato, operando la extinción a la expiración del tiempo, oportunidad en la cual se le abonará a EL TRABAJADOR los beneficios sociales que pudieran corresponderle de acuerdo a Ley.\n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'Sin perjuicio de lo anteriormente señalado, las partes podrán convenir la renovación del contrato por el tiempo que resulte necesario seguir brindando los servicios en tanto se mantengan las condiciones señaladas en la cláusula primera del presente contrato. \n\n',
        ],
        style: 'parrafo',
      },
      datosLocales.exclusividad
        ? {
            text: ['CLÁUSULA ', num_valores[18], '. - EXCLUSIVIDAD\n\n'],
            style: 'subtitulo',
          }
        : null,
      datosLocales.exclusividad
        ? {
            text: [
              'EL TRABAJADOR se obliga por su parte en forma expresa a prestar servicios a EL EMPLEADOR bajo condición de exclusividad, dependencia y lealtad de acuerdo con los reglamentos, prácticas y políticas establecidas por EL EMPLEADOR. En ese sentido, EL TRABAJADOR no podrá prestar servicios paralelos a empresas que se dediquen al mismo rubro que EL EMPLEADOR o brindar servicios similares al de EL EMPLEADOR por su cuenta. \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      {
        text: ['CLÁUSULA ', num_valores[19], '. - PROHIBICIONES\n\n'],
        style: 'subtitulo',
      },
      {
        text: ['EL TRABAJADOR queda expresamente prohibido a: \n\n'],
        style: 'parrafo',
      },
      {
        text: [
          '1.	Ceder o encargar a otra persona la realización de los servicios personales que está obligado a prestar a EL EMPLEADOR al amparo de este contrato. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          '2.	Tener un comportamiento incorrecto o indebido para con sus superiores, compañeros de trabajo, clientes o que signifiquen una perturbación en la armonía y/o clima laboral que debe existir en el centro de labores y al momento de la prestación de servicios. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          '3.	Ejecutar cualquier tipo de negociaciones dentro del giro del negocio de EL EMPLEADOR, sea o no en nombre de éste, y sin su autorización. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          '4.	Cualquier otra que se establezca en las directivas y/o normativas internas de EL EMPLEADOR. \n\n',
        ],
        style: 'parrafo',
      },
      datosLocales.obligaciones_compromisos
        ? {
            text: [
              'CLÁUSULA ',
              num_valores[20],
              '. - OBLIGACIONES Y COMPROMISO DE EL TRABAJADOR\n\n',
            ],
            style: 'subtitulo',
          }
        : null,
      datosLocales.obligaciones_compromisos
        ? {
            text: ['EL TRABAJADOR se compromete a: \n\n'],
            style: 'parrafo',
          }
        : null,
      datosLocales.obligaciones_compromisos
        ? {
            ol: [
              'Cumplir con lealtad y eficiencia las labores principales, conexas y complementarias, inherentes a su puesto de trabajo, aplicando para tal fin toda su experiencia y capacidad, velando por los intereses de EL EMPLEADOR.',
              'Ejercer las funciones propias de su cargo con la mayor diligencia y responsabilidad.',
              'Cumplir con las funciones, órdenes e instrucciones de EL EMPLEADOR o sus representantes, así como las demás normas que se impartan por necesidad del servicio.',
              'A guardar reserva de la información a la que acceda en virtud del presente contrato. Esta obligación subsistirá aún después de terminada la relación laboral y su incumplimiento genera la correspondiente responsabilidad por daños y perjuicios, así como la responsabilidad penal por el delito previsto en el artículo 165° del Código Penal.',
              'No podrá ofrecer o brindar declaraciones a los medios de comunicación sobre asuntos institucionales, sin la autorización expresa de EL EMPLEADOR.',
              'No brindar servicios similares a terceras personas sin autorización expresa previa de EL EMPLEADOR.',
              'A participar en las evaluaciones y a respetar los resultados que de ellos provengan.',
              'Someterse a los exámenes médicos que sean necesarios para verificar su buen estado de salud, en la medida que éstos obedezcan a sus funciones.',
              'Cumplir con las Normas propias del centro de trabajo, así como las contenidas en el Reglamento Interno de Trabajo y en la normativa laboral y las que se impartan por necesidades del servicio en ejercicio de las facultades de administración que le corresponden a EL EMPLEADOR. \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.propiedad_intelectual
        ? {
            text: [
              'CLÁUSULA ',
              num_valores[21],
              '. - PROPIEDAD INTELECTUAL\n\n',
            ],
            style: 'subtitulo',
          }
        : null,
      datosLocales.propiedad_intelectual
        ? {
            text: [
              'EL TRABAJADOR declara conocer que EL EMPLEADOR es el propietario intelectual y económico de los diseños que se elaboren en la ejecución del presente contrato y de los existentes sean o no inscritos ante el INDECOPI u otro ente Estatal o privado, por lo que reconoce no irrogarse autoría alguna por la elaboración de los diseños que en ejecución del presente contrato elabore.  \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.propiedad_intelectual
        ? {
            text: [
              'Todos los derechos patrimoniales y morales legalmente transferibles, que se refieran al trabajo que podría estar protegido por derechos de autor, diseño, patrón, patente o software, y los cuáles sean creados en la ejecución de este Contrato o en relación con este Contrato serán de EL EMPLEADOR.  \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.propiedad_intelectual
        ? {
            text: [
              'La compensación con relación a la transferencia de los derechos patrimoniales, relacionados arriba, está incluida en el salario mensual acordado entre la Partes. La transferencia es exclusiva e irrevocable y no se extingue con la finalización de este Contrato.   \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.propiedad_intelectual
        ? {
            text: [
              'Se mantendrá en vigencia por todo el periodo durante el cual la propiedad intelectual esté protegida por ley. \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.propiedad_intelectual
        ? {
            text: [
              'Por lo cual, por medio de la presente cláusula EL TRABAJADOR se compromete a transferir y transfiere a EL EMPLEADOR de una manera exclusiva, todos los derechos, sin ninguna limitación territorial, temporal, de cantidad o de transferencia, para usar y transferir el uso, en todo o en parte, en todos los campos de aprovechamiento o aplicación, para cualquier propósito, todos los resultados de la actividad de EL TRABAJADOR, incluyendo pero no limitado a inventos, modelos de utilidad, diseños industriales, topografías de circuitos integrados, conocimientos técnicos, soluciones, ideas, realizaciones, creaciones, descubrimientos, proyectos, modelos, procesos, mejoras de cualquier naturaleza, que hayan sido creados como resultado del cumplimiento de las funciones de trabajo de EL TRABAJADOR. \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.proteccion_datos
        ? {
            text: [
              'CLÁUSULA ',
              num_valores[22],
              '. - DE LA PROTECCIÓN DE DATOS PERSONALES\n\n',
            ],
            style: 'subtitulo',
          }
        : null,
      datosLocales.proteccion_datos
        ? {
            text: [
              'EL EMPLEADOR manifiesta conocer y se obliga a cumplir con todas las obligaciones contenidas en la   Ley N° 29733 – Ley de   Protección de Datos Personales – y   su reglamento aprobado mediante Decreto Supremo N° 003-2013-JUS, en especial aquellas normas referidas al tratamiento de datos personales, solo previo consentimiento informado,   expreso e inequívoco de EL TRABAJADOR; a no recopilar datos personales por medios fraudulentos, desleales o ilícitos; a recopilar datos personales que sean actualizados, necesarios, pertinentes y adecuados, con relación a finalidades determinadas, explícitas y lícitas para las que se hayan obtenido; a no utilizar los datos personales objeto de   tratamiento para finalidades distintas de aquellas que motivaron su recopilación; a almacenar los datos personales de manera que se posibilite el ejercicio  de los derechos de EL TRABAJADOR; a suprimir y sustituir o, en su caso, completar los datos personales objeto de tratamiento cuando tenga conocimiento de su carácter inexacto o incompleto; a suprimir los datos personales objeto de tratamiento cuando hayan dejado de ser necesarios o pertinentes a la finalidad para la cual hubiesen sido recopilados o hubiese vencido el plazo para su tratamiento, salvo que medie procedimiento de anonimización o disociación, así como cualquier otra obligación prevista por la referida ley o su reglamento.  \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.proteccion_datos
        ? {
            text: [
              'Por su parte, EL TRABAJADOR autoriza a EL EMPLEADOR a utilizar sus datos personales con la finalidad de cumplir estrictamente con las funciones detalladas en el párrafo precedente.  \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      {
        text: ['CLÁUSULA ', num_valores[23], '. - VALIDEZ DEL CONTRATO\n\n'],
        style: 'subtitulo',
      },
      {
        text: [
          'Si cualquiera de las disposiciones de este contrato es contraria a la normativa legal peruana vigente o se vuelve invalida o inejecutable, la validez del resto de las disposiciones del Contrato no se verá afectadas. En lugar de la disposición inválida o inejecutable, se aplicará la disposición válida o ejecutable que más se adecue al propósito económico pretendido de la disposición inválida o inejecutable o se aplicará lo estipulado por le legislación vigente peruana. Lo mismo se aplicará a las lagunas en el Contrato.  \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'Los títulos de los artículos que aparecen en este contrato han sido incluidos con un propósito práctico y de referencia rápida. Su propósito no es el de definir, limitar o ampliar el alcance o el propósito de la disposición a la que corresponden.  \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'Todo aquello que no se encuentre expresamente regulado por este contrato se regirán por las normas legales aplicables que derivan del ordenamiento Jurídico Laboral establecido en la Ley de Productividad y Competitividad Laboral, y normas conexas, normas administrativas vigentes en Perú.  \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'CLÁUSULA ',
          num_valores[24],
          '. - DE LA SEGURIDAD Y SALUD EN EL TRABAJO\n\n',
        ],
        style: 'subtitulo',
      },
      {
        text: [
          '16.1.  EL TRABAJADOR se compromete a trabajar honestamente y conscientemente, llevar a cabo sus funciones puntualmente y en forma precisa, a seguir estrictamente cualquier disciplina de trabajo y tecnológica, protección laboral, prevención de accidentes, saneamiento, higiene ocupacional y requisitos contra incendios, según lo establecido por estándares apropiados de nuestro país, por los estatutos internos de EL EMPLEADOR y a cuidar debidamente nuestros bienes. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          '16.2.  EL TRABAJADOR prestará sus servicios a EL EMPLEADOR bajo su control y supervisión, debiendo cumplir las normas de Seguridad e Higiene Industrial, señaladas en el Anexo 1 A, a cumplir en las instalaciones de EL EMPLEADOR cuando realice labores presenciales, así como el Reglamento Interno de Trabajo de EL EMPLEADOR, que ambas partes declaran conocer. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          '16.3.   En el desarrollo de la relación laboral, EL TRABAJADOR: \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'a)	Declara conocer el contenido del Reglamento Interno de Trabajo, del Código de Ética, Reglamento de Seguridad y Salud en el Trabajo, Política sobre Conflicto de Intereses, y demás normas, políticas y reglamentos emitidos o por emitirse por EL EMPLEADOR a nivel local o corporativo, expresando su conformidad con ellos y comprometiéndose a su cabal cumplimiento. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'b)	EL TRABAJADOR declara que conoce el contenido del Plan de Vigilancia, Prevención y Control del COVID-19 en el Trabajo implementado por EL EMPLEADOR, así como las implicancias del desarrollo del mismo, y se compromete a cumplir las disposiciones que este contenga, así como adecuar el desarrollo de sus funciones a lo solicitado para evitar el contagio de COVID-19. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'CLÁUSULA ',
          num_valores[25],
          '. - DECLARACIONES DEL TRABAJADOR   \n\n',
        ],
        style: 'subtitulo',
      },
      {
        text: ['EL TRABAJADOR declara bajo juramento:   \n\n'],
        style: 'parrafo',
      },
      {
        ol: [
          'Comprender los alcances e implicancias de cada una de las cláusulas señalas en el presente contrato. ',
          'Conocer todas las políticas internas de EL EMPLEADOR.',
          'Realizarse exámenes médicos cuando EL EMPLEADOR lo requiera. ',
          'Que no tiene antecedentes penales, judiciales ni policiales. ',
          'Que el uso de su base de datos no genera violación a derechos de terceros y que la información adquirida para el desempeño de sus funciones ha sido de manera legal. ',
          'No atentar contra la buena imagen de EL EMPLEADOR y que tiene conocimiento que en caso se viera involucrado en un evento público que atente contra la imagen de EL EMPLEADOR de manera directa o indirecta, este hecho será causal de extinción de la relación laboral. ',
          'Tiene conocimiento y acepta que una vez finalizada la relación laboral no puede usar la base de datos de EL EMPLEADOR ni contactar a los clientes de EL EMPLEADOR para brindar servicios de la misma naturaleza. \n\n',
        ],
      },
      datosLocales.confidencialidad
        ? {
            text: ['CLÁUSULA ', num_valores[26], '. - RÉGIMEN LABORAL\n\n'],
            style: 'subtitulo',
          }
        : null,
      datosLocales.confidencialidad
        ? {
            text: [
              'En todo lo no previsto en el presente contrato, resulta aplicable el Decreto Supremo N° 003-97-TR, y la legislación laboral peruana vigente para el régimen laboral de la actividad privada. \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      {
        text: ['CLÁUSULA ', num_valores[27], '. - DE LA TRIBUTACIÓN   \n\n'],
        style: 'subtitulo',
      },
      {
        text: [
          'En materia de obligaciones tributarias, EL TRABAJADOR queda claramente instruida que está sujeta a la legislación peruana. En consecuencia, deberá cumplir con las obligaciones tributarias y previsionales previstas por la legislación de Perú. EL EMPLEADOR se compromete a efectuar las retenciones y aportaciones o contribuciones de ley que correspondan.  \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: ['CLÁUSULA ', num_valores[28], '. - DOMICILIO   \n\n'],
        style: 'subtitulo',
      },
      {
        text: [
          'Las partes señalan como sus respectivos domicilios los especificados en la introducción del presente contrato de trabajo, por lo que se reputarán válidas todas las comunicaciones y notificaciones dirigidas a las mismas con motivo de la ejecución del presente documento.  El cambio de domicilio de cualquiera de las partes surtirá efecto desde la fecha de comunicación de dicho cambio a la contraparte por cualquier medio escrito. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'CLÁUSULA ',
          num_valores[29],
          '. - DECLARACIONES DE LAS PARTES   \n\n',
        ],
        style: 'subtitulo',
      },
      {
        text: [
          'Las partes declaran expresamente que el presente documento ha sido celebrado sin que medie error, dolo, violencia ni intimidación entre ellas, motivo por el cual ratifican que no ha existido vicio de la voluntad alguno que perjudique los efectos de este. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'En todo lo no previsto por el presente contrato, se estará a lo establecido en las disposiciones laborales que regulan los contratos de trabajo contenidas en la Ley de Productividad y Competitividad Laboral.  \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'CLÁUSULA ',
          num_valores[30],
          '. - MODIFICACIONES Y ENMIENDAS   \n\n',
        ],
        style: 'subtitulo',
      },
      {
        text: [
          'Cualquier modificación o enmienda a este Contrato requiere un acuerdo firmado por ambas partes. Este requisito de forma escrita también se aplica a cualquier renuncia del requisito de forma escrita.  \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'CLÁUSULA ',
          num_valores[31],
          '. - SOLUCIÓN DE CONTROVERSIAS   \n\n',
        ],
        style: 'subtitulo',
      },
      {
        text: [
          'Las partes acuerdan someter cualquier discrepancia o controversia respecto a la ejecución, interpretación o cumplimiento del presente contrato, incluida su nulidad o invalidez, a los Jueces y Tribunales del Cercado de Lima, Perú. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'Hecho y firmado en Lima, ',
          fechaActualValor,
          ', en dos ejemplares de un mismo tenor para constancia de las partes. \n\n\n\n\n\n\n\n\n',
        ],
        style: 'parrafo',
      },

      {
        columns: [
          [
            {
              style: 'columna_firma',
              text: '______________________________',
            },
            {
              style: 'columna_firma',
              text: 'Pedro Sanchez Mendoza',
            },
          ],

          [
            {
              style: 'columna_firma',
              text: '______________________________',
            },
            {
              text:
                registroTrabajador.primer_nombre +
                ' ' +
                registroTrabajador.segundo_nombre +
                ' ' +
                registroTrabajador.apellido_paterno +
                ' ' +
                registroTrabajador.apellido_materno,
              style: 'columna_firma',
            },
          ],
        ],
        columnGap: 10,
      },
      {
        text: [''],
        pageBreak: 'after',
      },
      {
        text: ['\n\n\n\n\n ANEXO 1-A   \n\n'],
        style: 'anexo',
      },
      {
        text: ['FUNCIONES   \n\n\n'],
        style: 'anexo',
      },
      {
        text: [
          '- Gestión de Proyectos: Participar en la gestión de proyectos, incluyendo la planificación, el seguimiento y el control de proyectos de desarrollo de software.\n',
          '- Desarrollo de Especificaciones: Crear especificaciones técnicas detalladas que guíen a los desarrolladores en la implementación del sistema.\n',
          '- Recolección de Requisitos: Analizar y documentar los requisitos del sistema en colaboración con los usuarios y las partes interesadas.\n',
          '- Diseño de Sistemas: Diseñar la arquitectura y la estructura del sistema, incluyendo bases de datos, interfaces de usuario y componentes de software.\n',
          '- Evaluación de Tecnología: Investigar y evaluar nuevas tecnologías y herramientas que puedan beneficiar al proyecto.\n',
          '- Pruebas de Software: Planificar, diseñar y ejecutar pruebas para garantizar que el software cumple con los requisitos y está libre de errores.\n',
          '- Resolución de Problemas: Identificar y resolver problemas técnicos y de diseño a medida que surgen durante el desarrollo.\n',
          '- Optimización del Rendimiento: Identificar y abordar problemas de rendimiento en el sistema para garantizar su eficiencia.\n',
          '- Seguridad de la Información: Asegurarse de que el sistema cumple con las prácticas de seguridad de la información y aplicar medidas de seguridad adecuadas.\n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          '-	Hecho y firmado en Lima, ',
          fechaActualValor,
          ', en dos ejemplares de un mismo tenor para constancia de las partes.   \n\n\n\n\n\n\n\n\n\n\n',
        ],
        style: 'parrafo',
      },
      {
        columns: [
          [
            {
              style: 'columna_firma',
              text: '______________________________',
            },
            {
              style: 'columna_firma',
              text: 'Pedro Sanchez Mendoza',
            },
          ],

          [
            {
              style: 'columna_firma',
              text: '______________________________',
            },
            {
              text:
                registroTrabajador.primer_nombre +
                ' ' +
                registroTrabajador.segundo_nombre +
                ' ' +
                registroTrabajador.apellido_paterno +
                ' ' +
                registroTrabajador.apellido_materno,
              style: 'columna_firma',
            },
          ],
        ],
        columnGap: 10,
      },
      {
        text: ['\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n ANEXO 1-B   \n\n'],
        style: 'anexo',
      },
      {
        text: ['RECOMENDACIONES EN MATERIA DE SEGURIDAD Y SALUD EN EL TRABAJO'],
        style: 'subtitulo_anexo_b',
      },
      {
        text: ['Cargo: ', datosLocales.oferta_laboral, '   \n\n'],
        style: 'anexo',
      },
      {
        text: ['1.	Recomendaciones de carácter general:  \n\n'],
        style: 'subtitulo_num',
      },
      {
        text: [
          '-	El trabajador debe acatar las normas internas y políticas en materia de seguridad y salud en el trabajo. \n',
          '-	Reportar de modo inmediato accidentes de trabajo, incidentes peligrosos o cualquier otro tipo de situación que altere o ponga en riesgo la vida, integridad física y psicológica de los trabajadores suscitados en el ámbito laboral, según los mecanismos previstos en EL EMPLEADOR. \n',
          '-	Comunicar de modo inmediato la pérdida o deterioro de los Equipos de Protección Personal correspondientes o de cualquier equipo o herramienta de trabajo que genere un riesgo a la integridad y salud de los trabajadores de EL EMPLEADOR. \n',
          '-	Conocer las medidas de emergencia en caso de sismo, incendio, aviso de bomba, accidente, incidente y/o enfermedad de necesaria aplicación en cada caso.  \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: ['2.	Riesgos laborales del puesto de trabajo:   \n\n'],
        style: 'subtitulo_num',
      },
      {
        text: [
          '-	Riesgos causados por una postura de trabajo incorrecta. \n',
          '-	Tropiezos, resbalones y caídas al nivel del suelo (lugares de paso y superficies de trabajo) en desplazamiento a pie.  \n',
          '-	Caída, desplome o derrumbamiento de objetos almacenados en armarios, estanterías y demás instalaciones de archivo y almacenamiento de cualesquiera objeto y materiales. Caída de objetos desprendidos.  \n',
          '-	Riesgos originados por la energía eléctrica.   \n',
          '-	Fatiga emocional. Disminución de la eficiencia funcional mental y física. Monotonía, saturación mental y disminución de la capacidad de respuesta o de acción de la persona.    \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          '3.	Recomendaciones en prevención de accidentes de trabajo, incidentes de trabajo y enfermedades ocupacionales:  \n\n',
        ],
        style: 'subtitulo_num',
      },
      {
        text: [
          '-  Prestar atención a los desniveles e irregularidades del suelo, extremando la precaución en los desplazamientos por suelos o superficies mojadas o recién enceradas. Estas situaciones deberán ser comunicadas para su corrección a la brevedad posible.  \n',
          '-  Mantener las zonas de circulación y las salidas libres de obstáculos. No apilar objetos de modo inadecuado en los estantes o repisas.  \n',
          '-	No tender cables, conducciones, mangueras, enchufes al nivel del suelo de la zona de trabajo.  \n',
          '-	Mantener en todo momento el orden y la limpieza en la instalación, colocando los objetos almacenados de forma estable y evitando sobrecargas que puedan deformar la estructura de la estantería.  \n',
          '-	Emplear con racionalidad los equipos alimentados con electricidad, sin manipular las instalaciones eléctricas, ni alterar ni retirar las puestas a tierra ni los aislamientos de las partes activas de diferentes equipos, instalaciones y sistemas.   \n',
          '-	No manipular ni desarmar equipos de cómputo.   \n',
          '-	No colocar bebidas sobre escritorios o mesas donde existan equipos electrónicos.  \n',
          '-	Prestar especial atención a los calentamientos anormales de los equipos e instalaciones eléctricas (Cables, motores, armarios, etc.), así como los cosquilleos o chispazos provocados por los mismos. En este caso será necesaria su inmediata desconexión y posterior notificación, colocando el equipo en lugar seguro y señalizando su estado hasta ser revisado.   \n',
          '-	Organizar el tiempo de trabajo de manera que permita la realización de pausas espontáneamente a lo largo de la jornada laboral para descansar y cambiar el foco de atención.   \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          '4.	Medidas de protección aplicables en el puesto o función específica: \n\n',
        ],
        style: 'subtitulo_num',
      },
      {
        text: [
          '-	Interrumpir la actividad en caso de riesgo grave e inminente para su salud o integridad física y, si es necesario, abandonar el lugar de trabajo, comunicando inmediatamente al superior jerárquico correspondiente las circunstancias que justifican dicha acción.  \n',
          '-	Respetar las señalizaciones instaladas en las zonas de trabajo y no obstaculizar las vías de evacuación, áreas de circulación, puertas de salida, así como el acceso a los medios de protección contra incendios existentes.  \n',
          '-	Observar un comportamiento adecuado que evite la generación de riesgos para el propio trabajador, sus compañeros o terceras personas, así como en relación con los bienes y equipos propiedad de EL EMPLEADOR.  \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          '5.	Medidas de protección aplicables en el marco del COVID-19:  \n\n',
        ],
        style: 'subtitulo_num',
      },
      {
        text: [
          '-	EL EMPLEADOR ha adecuado su funcionamiento a las medidas necesarias que garanticen la salud los trabajadores. En dicho sentido, se debe cumplir con las medidas preventivas establecidas por EL EMPLEADOR para evitar el contagio del COVID-19 en el/los centros de trabajo de la compañía',
          datosLocales.prevencion_covid
            ? ', tal como cumplir el Plan de Vigilancia, Prevención y Control del COVID-19 en el trabajo durante la vigencia del mismo. \n\n'
            : '. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          '-	Hecho y firmado en Lima, ',
          fechaActualValor,
          ', en dos ejemplares de un mismo tenor para constancia de las partes. \n\n\n\n\n\n\n\n\n\n\n',
        ],
        style: 'parrafo',
      },
      {
        columns: [
          [
            {
              style: 'columna_firma',
              text: '______________________________',
            },
            {
              style: 'columna_firma',
              text: 'Pedro Sanchez Mendoza',
            },
          ],

          [
            {
              style: 'columna_firma',
              text: '______________________________',
            },
            {
              text:
                registroTrabajador.primer_nombre +
                ' ' +
                registroTrabajador.segundo_nombre +
                ' ' +
                registroTrabajador.apellido_paterno +
                ' ' +
                registroTrabajador.apellido_materno,
              style: 'columna_firma',
            },
          ],
        ],
        columnGap: 10,
      },
    ],
    styles: {
      header: {
        fontSize: 11,
        bold: true,
        decoration: 'underline',
        alignment: 'center',
      },
      bigger: {
        fontSize: 15,
        italics: true,
      },
      parrafo: {
        fontSize: 11,
        bold: false,
        alignment: 'justify',
      },
      alinear: {
        margin: [50, 0, -15, 0],
      },
      subtitulo: {
        alignment: 'left',
        bold: true,
        decoration: 'underline',
      },
      columna_firma: {
        width: '50%',
        alignment: 'center',
      },
      datos_locales: {
        bold: true,
        fontSize: 12,
      },
      anexo: {
        alignment: 'center',
        bold: true,
        fontSize: 12,
      },
      subtitulo_anexo_b: {
        alignment: 'center',
        bold: true,
      },
      subtitulo_num: {
        alignment: 'left',
        bold: true,
      },
    },
  };

  return docDefinition;
}
