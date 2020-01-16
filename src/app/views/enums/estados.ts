export enum Estados {
    CLONADO = 'Clonado',
    ASIGNADO = 'Asignado',
    RELLAMADO = 'Rellamado',
    AGENDADO = 'Agendado',
    CREADO = 'Creado',
    VALIDADO = 'Validado',
    RECHAZO_VALIDACION = 'Rechazo por validacion',
    AUDITORIA_APROBADA = 'Auditoria aprobada',
    AUDITORIA_OBSERVADA = 'Auditoria observada',
    RECHAZO_AUDITORIA = 'Rechazo por auditoria',
    VISITA_CREADA = 'Visita creada',
    VISITA_REPACTADA = 'Visita repactada',
    VISITA_CONFIRMADA = 'Visita confirmada',
    PENDIENTE_DOC = 'Pendiente de documentacion',
    RECHAZO_LOGISTICA = 'Rechazo por logistica',
    PRESENTADA = 'Presentada',
    PAGADA = 'Pagada',
    RECHAZO_ADMINISTRACION = 'Rechazo por administracion',
    RECHAZO_PRESENTACION = 'Rechazo presentacion',
    RECHAZO_POR_DESPIDO = 'Rechazo por despido',
    RECHAZO_NO_LE_INTERESA = 'Rechazo no le interesa',
    RECHAZO_NO_TRABAJA = 'Rechazo no trabaja',
    RECHAZO_COLGO_EL_TELEFONO = 'Rechazo colgo el telefono',
    RECHAZO_MONOTRIBUTISTA = 'Rechazo monotributista',
    RECHAZO_ENFERMO = 'Rechazo enfermo',
    RECHAZO_CONFORME_OS = 'Rechazo conforme con obra social',
    RECHAZO_CAPITA = 'Rechazo capita',
    RECHAZO_CONVENIO_OS = 'Rechazo convenio de obra social',
    RECHAZO_NO_CONTESTA = 'Rechazo no contesta',
    RECHAZO_INEXISTENTE = 'Rechazo inexistente',
    RECHAZO_NO_DISPONIBLE = 'Rechazo no disponible',
    RECHAZO_EQUIVOCADO = 'Rechazo equivocado',
    RECHAZO_FALTA_NUMERO = 'Rechazo falta numero',
    RECHAZO_CONTESTADOR_AUTOMATICO = 'Rechazo contestador automatico',
    RECHAZO_EDAD = 'Rechazo edad',
}

export enum EstadosRechazoAgrupados {
    INCONTACTABLE = 'Incontactable',
    NO_INTERESA = 'No interesa',
    OTRO_RECHAZO = 'Otros'
}

export function nombreEstadoAgrupado(estado: Estados): EstadosRechazoAgrupados | Estados {
    if (estado === Estados.RECHAZO_NO_DISPONIBLE
        || estado === Estados.RECHAZO_INEXISTENTE
        || estado === Estados.RECHAZO_NO_CONTESTA
        || estado === Estados.RECHAZO_EQUIVOCADO) {
        return EstadosRechazoAgrupados.INCONTACTABLE;
    } else if (estado === Estados.RECHAZO_NO_LE_INTERESA) {
        return EstadosRechazoAgrupados.NO_INTERESA;
    } else if (estado.toLowerCase().includes('rechazo')) {
        return EstadosRechazoAgrupados.OTRO_RECHAZO;
    } else {
        return estado;
    }
}

export function nombreEstadoAgrupadoConDetalleRechazo(estado: Estados): EstadosRechazoAgrupados | Estados {
    if (estado === Estados.RECHAZO_NO_DISPONIBLE
        || estado === Estados.RECHAZO_INEXISTENTE
        || estado === Estados.RECHAZO_NO_CONTESTA
        || estado === Estados.RECHAZO_EQUIVOCADO
        || estado === Estados.RECHAZO_NO_LE_INTERESA) {
        return estado;
    } else if (estado.toLowerCase().includes('rechazo')) {
        return EstadosRechazoAgrupados.OTRO_RECHAZO;
    } else {
        return estado;
    }
}
