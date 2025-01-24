import { dateFunctions } from 'src/app/utils/dateFunctions';

export function contratoIndeterminadoConFiscalizacion(
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
          'Conste mediante el presente documento, suscrito por duplicado con igual valor y tenor, el Contrato Individual de Trabajo a plazo indeterminado que celebran, de conformidad con lo establecido por el Texto Único Ordenado del Decreto Legislativo N° 728 – Ley de Productividad y Competitividad Laboral aprobado por el Decreto Supremo N° 003-97-TR, de una parte,\n\n',
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
        text: 'A quienes en conjunto se les podrá denominar “LAS PARTES”, en los términos y condiciones siguientes:\n\n',
      },
      {
        text: ['CLÁUSULA ', num_valores[0], '. - ANTECEDENTES\n\n'],
        style: 'subtitulo',
      },
      {
        text: [
          '1.1.	EL EMPLEADOR es una persona jurídica constituida bajo las leyes de la República de Perú que corre inscrita en la Partida Electrónica Nº ',
          {
            text: registroEmpleador.numero_partida_registral,
            style: 'datos_locales',
          },
          ' Asiento ',
          {
            text: registroEmpleador.numero_asiento,
            style: 'datos_locales',
          },
          ' del Registro de Personas Jurídicas de la Oficina Registral de ',
          {
            text: registroEmpleador.oficina_registral,
            style: 'datos_locales',
          },
          ' , que se dedica a ',
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
          '1.2.	EL EMPLEADOR requiere contratar los servicios de un profesional para desempeñar el cargo de ',
          {
            text: datosLocales.oferta_laboral,
            style: 'datos_locales',
          },
          ' y será el responsable de______ . \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          '1.3.	Por su parte, EL TRABAJADOR declara ser ',
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
          '1.4.	En virtud de los antecedentes señalados, LAS PARTES acuerdan celebrar el presente contrato bajo la modalidad temporal de inicio de actividad contemplada en el artículo 57 del Texto Único Ordenado de la Ley de Productividad y Competitividad Laboral – LPCL – para que desempeñe la realización de funciones descritas en el Anexo 1-A del presente contrato. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: ['CLÁUSULA ', num_valores[1], '. - OBJETO DEL CONTRATO\n\n'],
        style: 'subtitulo',
      },
      {
        text: [
          'Por medio del presente contrato, y al amparo de la legislación laboral vigente, EL EMPLEADOR contrata a plazo indeterminado a EL TRABAJADOR, para que desempeñe sus funciones en el puesto de ',
          {
            text: datosLocales.oferta_laboral,
            style: 'datos_locales',
          },
          ', bajo subordinación y de manera personal; de conformidad con lo establecido por el artículo 9 del Texto Único Ordenado del Decreto Legislativo N° 728 – Ley de Productividad y Competitividad Laboral aprobado por el Decreto Supremo N° 003-97-TR y su Reglamento, y a cambio de la remuneración convenida en la cláusula ',
          num_valores[10],
          '. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: ['CLÁUSULA ', num_valores[2], '. - PRESTACIÓN DE SERVICIOS\n\n'],
        style: 'subtitulo',
      },
      {
        text: [
          '3.1	EL TRABAJADOR desempeñará sus labores en el cargo de   ',
          { text: datosLocales.oferta_laboral, style: 'datos_locales' },
          '   desempeñando las funciones que se señalan en el Anexo 1-A del presente contrato.\n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'EL TRABAJADOR declara conocer la actividad que desarrollará y se obliga a desempeñar sus funciones con la mayor eficiencia y espíritu de colaboración, actuando con responsabilidad, honestidad, dedicación y diligencia. EL TRABAJADOR declara conocer los reglamentos, prácticas y políticas específicas de EL EMPLEADOR, por lo cual acepta cumplirlas.\n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'Sin embargo, EL EMPLEADOR está facultado a efectuar modificaciones razonables en función de la capacidad y aptitud de EL TRABAJADOR y a las necesidades y requerimiento de este, sin que dichas variaciones signifiquen menoscabo de categoría y/o remuneración. Queda entendido que las funciones deberán ser efectuadas de manera personal, no pudiendo EL TRABAJADOR ser reemplazado ni ayudado por tercera persona.\n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          '3.2	Dentro del alcance de sus competencias, EL TRABAJADOR ejercerá sus funciones reportando de manera directa a EL EMPLEADOR y será responsable por la gestión diaria y el correcto funcionamiento de EL EMPLEADOR, acorde a lo instruido por EL EMPLEADOR. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          '3.3	EL EMPLEADOR proporcionará a EL TRABAJADOR los materiales y condiciones de trabajo necesarios para la adecuada prestación de sus labores y le otorgará los beneficios que por ley, pacto o costumbre tuvieran los trabajadores de su misma categoría en EL EMPLEADOR.\n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'CLÁUSULA ',
          num_valores[3],
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
      {
        text: ['CLÁUSULA ', num_valores[4], '.- DE LA BUENA FE LABORAL\n\n'],
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
      {
        text: ['CLÁUSULA ', num_valores[5], '. - ÉTICA Y LEY\n\n'],
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
      datosLocales.jornada_maxima
        ? {
            text: [
              'CLÁUSULA ',
              num_valores[6],
              '. - JORNADA Y HORARIO DE TRABAJO\n\n',
            ],
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
        text: ['CLÁUSULA ', num_valores[7], '.- REMUNERACIÓN\n\n'],
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
      datosLocales.obligaciones_compromisos
        ? {
            text: [
              'CLÁUSULA ',
              num_valores[8],
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
      {
        text: ['CLÁUSULA ', num_valores[9], '. - DURACIÓN DEL CONTRATO \n\n'],
        style: 'subtitulo',
      },
      {
        text: [
          'El plazo de duración del presente contrato es indeterminado, siendo su fecha de inicio el día ',
          {
            text: formatoFechaInicio,
            style: 'datos_locales',
          },
          '.\n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'En caso EL TRABAJADOR decida renunciar voluntariamente al cargo, deberá dar aviso escrito a EL EMPLEADOR con una anticipación de 30 días naturales, conforme a ley.\n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'Queda entendido que EL EMPLEADOR no está obligado a dar aviso alguno adicional referente al término del presente contrato, operando la extinción a la expiración del tiempo señalado en el párrafo anterior, oportunidad en la cual se le abonará a EL TRABAJADOR los beneficios sociales que pudieran corresponderle de acuerdo con Ley.\n\n',
        ],
        style: 'parrafo',
      },
      {
        text: ['CLÁUSULA ', num_valores[10], '. - PERIODO DE PRUEBA\n\n'],
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
      datosLocales.exclusividad
        ? {
            text: ['CLÁUSULA ', num_valores[11], '. - EXCLUSIVIDAD\n\n'],
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
        text: ['CLÁUSULA ', num_valores[12], '. - EXTINCIÓN DEL CONTRATO\n\n'],
        style: 'subtitulo',
      },
      {
        text: [
          'EL EMPLEADOR podrá resolver inmediatamente el presente contrato, si es que EL TRABAJADOR se conduce o realiza sus labores en forma negligente, sin observar el Reglamento Interno, o realizando acciones que configuren falta grave, conforme al artículo 25º del Texto Único Ordenado de la Ley de Productividad y Competitividad Laboral, Decreto Legislativo N° 728. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'Asimismo, el vínculo laboral se extinguirá en virtud de las demás causales de extinción del contrato de trabajo, señaladas en el artículo 16 de la LPCL. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'CLÁUSULA ',
          num_valores[13],
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
        text: ['CLÁUSULA ', num_valores[14], '. - RÉGIMEN LABORAL PRIVADO\n\n'],
        style: 'subtitulo',
      },
      {
        text: [
          'El presente contrato se encuentra sujeto a las disposiciones laborales que regulan los contratos de trabajo a plazo indeterminado contenidas en el Texto Único Ordenado del Decreto Legislativo 728 – Ley de Productividad y Competitividad Laboral aprobado por el Decreto Supremo N° 003-97-TR y demás normas legales que lo regulen o que sean dictadas durante la vigencia del contrato. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'CLÁUSULA ',
          num_valores[15],
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
          '16.2.  EL TRABAJADOR prestará sus servicios a EL EMPLEADOR bajo su control y   supervisión, debiendo cumplir las normas de Seguridad e Higiene Industrial, señaladas en el ANEXO 1-B, a cumplir en las instalaciones de EL EMPLEADOR cuando realice labores presenciales, así como el Reglamento Interno de Trabajo de EL EMPLEADOR, que ambas partes declaran conocer. \n\n',
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
      datosLocales.propiedad_intelectual
        ? {
            text: [
              'CLÁUSULA ',
              num_valores[16],
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
      datosLocales.confidencialidad
        ? {
            text: ['CLÁUSULA ', num_valores[17], '. - CONFIDENCIALIDAD\n\n'],
            style: 'subtitulo',
          }
        : null,
      datosLocales.confidencialidad
        ? {
            text: [
              'La información sobre EL EMPLEADOR, sus clientes, casos y documentos, incluyendo direcciones y datos bancarios, nombres y apellidos de los clientes y sus representantes, así como otros datos, y también la información relativa a la gestión, finanzas, propiedad intelectual y otras actividades de EL EMPLEADOR (o empresas relacionadas) que EL TRABAJADOR reciba durante el cumplimiento de sus obligaciones bajo este Contrato se considerará confidencial y no sujeta a divulgación (en adelante la "Información"). \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.confidencialidad
        ? {
            text: [
              'EL TRABAJADOR procurará evitar cualquier divulgación no autorizada de dicha información a terceros salvo que la divulgación sea necesaria directamente bajo la legislación vigente de Perú o a petición motivada de las autoridades competentes con previo aviso a EL EMPLEADOR (en la persona de su delegado). \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.confidencialidad
        ? {
            text: [
              'EL TRABAJADOR no tiene derecho a revelar la información a los otros trabajadores de EL EMPLEADOR, excepto en la medida necesaria para el desempeño de sus funciones y el funcionamiento normal de EL EMPLEADOR.  \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.confidencialidad
        ? {
            text: [
              'Se deja constancia que toda información suministrada a, y/o utilizada por EL TRABAJADOR permanecerá amparada por la presente disposición de confidencialidad, en los términos aquí establecidos mientras esté en vigencia la relación de trabajo y hasta por un período de cinco (5) años siguientes a la terminación de este.   \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.confidencialidad
        ? {
            text: [
              'Queda igualmente establecido que toda la información y documentación relacionada con los servicios prestados en el desarrollo de la relación de trabajo se encuentran amparados por las previsiones de confidencialidad establecidas en esta cláusula.    \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.confidencialidad
        ? {
            text: [
              'Las obligaciones asumidas por EL TRABAJADOR en virtud del presente convenio relacionadas con no revelar los secretos de gestión, manufactura, mercadeo, ventas, proveedores y la información confidencial a la que EL TRABAJADOR tuvo acceso en EL EMPLEADOR, entre otras, serán vinculantes para EL TRABAJADOR, su representante legal, herederos, sucesores y cesionarios.    \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.confidencialidad
        ? {
            text: [
              'En caso EL TRABAJADOR incumpla con este deber de lealtad y no concurrencia, EL EMPLEADOR se reserva el derecho de accionar en contra de EL TRABAJADOR la demanda civil por daños y perjuicios y la denuncia penal por el delito contra la violación del secreto profesional tipificado en el artículo 165° de nuestro Código Penal así como los delitos contra la propiedad industrial tipificados en los artículos 222° y siguientes del Código Penal, además en caso se infrinja la presente obligación durante la relación laboral, se considera como falta grave, causal de despido inmediato.   \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.confidencialidad
        ? {
            text: [
              'De la misma manera, EL TRABAJADOR no deberá retirar o guardar cualquier bien, documento, archivo, registro e información de EL EMPLEADOR, en ninguna forma o ninguna copia de los mismos o sus partes (incluso por medios electrónicos) sin el permiso expreso de EL EMPLEADOR. Asimismo, deberá devolver todos los bienes o información ni bien se le solicite, dejando constancia a través de un documento escrito, en el cual EL TRABAJADOR detallará todo el material devuelto.  \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      {
        text: ['CLÁUSULA ', num_valores[18], '. - VALIDEZ DEL CONTRATO\n\n'],
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
      datosLocales.tecnologia_informacion
        ? {
            text: [
              'CLÁUSULA ',
              num_valores[19],
              '. - TECNOLOGÍAS DE LA INFORMACIÓN\n\n',
            ],
            style: 'subtitulo',
          }
        : null,
      datosLocales.tecnologia_informacion
        ? {
            text: [
              'EL TRABAJADOR declara que se compromete a utilizar los uniformes, equipos, herramientas, materiales, claves, accesos, usuarios y cuentas, así como los demás recursos que se le proporcionen exclusivamente para el desempeño de su trabajo de manera diligente y responsable. Asimismo, declara que en caso estos equipos sean utilizados de manera incorrecta, se malogren o pierdan por negligencia o dolo de EL TRABAJADOR, él asumirá el pago de los daños ocasionados, como custodio de dichos equipos.  \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.tecnologia_informacion
        ? {
            text: [
              'Además, EL TRABAJADOR se compromete a no instalar, temporal o permanentemente, en una computadora central, una computadora portátil, una computadora de mesa o cualquier otra máquina computadora de EL EMPLEADOR, un programa de computadora o una copia de dicho programa, para la cual EL TRABAJADOR no posea una licencia de uso aceptada por EL EMPLEADOR. \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.tecnologia_informacion
        ? {
            text: [
              'También está prohibido hacer una copia ilegal de un programa de computadora del cual EL TRABAJADOR tenga una licencia de uso.  \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.tecnologia_informacion
        ? {
            text: [
              'Por lo tanto, EL TRABAJADOR se compromete a: a) hacer uso exclusivo y adecuado de los instrumentos otorgados para el cumplimiento de sus funciones, b) reportar cualquier falla o pérdida en forma inmediata, c) darle o requerir al área correspondiente el mantenimiento preventivo o correctivo necesario y d) asumir daños o pérdidas por negligencia o dolo.   \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.tecnologia_informacion
        ? {
            text: [
              'En caso de incumplimiento de lo señalado en la presente cláusula se procederá a sancionar conforme a ley.  \n\n',
            ],
            style: 'parrafo',
          }
        : null,
      datosLocales.proteccion_datos
        ? {
            text: [
              'CLÁUSULA ',
              num_valores[20],
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
        text: [
          'CLÁUSULA ',
          num_valores[21],
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
      {
        text: ['CLÁUSULA ', num_valores[22], '. - DE LA TRIBUTACIÓN   \n\n'],
        style: 'subtitulo',
      },
      {
        text: [
          'En materia de obligaciones tributarias, EL TRABAJADOR queda claramente instruido que está sujeto a la legislación peruana. En consecuencia, deberá cumplir con las obligaciones tributarias y previsionales previstas por la legislación de Perú. EL EMPLEADOR se compromete a efectuar las retenciones y aportaciones o contribuciones de ley que correspondan.  \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: ['CLÁUSULA ', num_valores[23], '. - DOMICILIO   \n\n'],
        style: 'subtitulo',
      },
      {
        text: [
          'Las partes señalan como sus respectivos domicilios los especificados en la introducción del presente contrato, por lo que se considerarán válidas todas las comunicaciones y notificaciones dirigidas a estos con motivo de la ejecución del presente contrato. El cambio de domicilio de cualquiera de las partes surtirá efecto desde la fecha de su comunicación a la contraparte, por cualquier medio escrito. \n\n',
        ],
        style: 'parrafo',
      },
      {
        text: [
          'CLÁUSULA ',
          num_valores[24],
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
          num_valores[25],
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
          num_valores[26],
          '. - SOLUCIÓN DE CONTROVERSIAS   \n\n',
        ],
        style: 'subtitulo',
      },
      {
        text: [
          'Las partes se someten expresamente a la competencia jurisdiccional de los juzgados y salas jurisdiccionales especializadas de trabajo de la ciudad de ____, Perú, para todo asunto que no pudiendo ser resuelto de manera armoniosa entre las mismas, se derive la interpretación, aplicación o ejecución de este contrato de trabajo, incluida su nulidad o invalidez. \n\n',
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
