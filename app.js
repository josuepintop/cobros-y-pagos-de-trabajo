const SUPABASE_URL = 'https://cjoxzhfefrsctlwwjosj.supabase.co';
const SUPABASE_KEY = 'sb_publishable_mqR7Fu1dGBSq2Ezmb4owVQ_njk2OJ_a';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const TABLA_SUPABASE = 'cobros-pagos';
const PREFIJO_TIPO = '[tipo:';

let registros = JSON.parse(localStorage.getItem('registros_cobros')) || [];
let tarjetas = JSON.parse(localStorage.getItem('tarjetas_bancarias')) || [];
let gananciasSemanales = JSON.parse(localStorage.getItem('ganancias_semanales')) || [];

const form = document.getElementById('registro-form');
const tipoInput = document.getElementById('tipo');
const clienteInput = document.getElementById('cliente');
const montoInput = document.getElementById('monto');
const descripcionInput = document.getElementById('descripcion');
const fechaHoraInput = document.getElementById('fechaHora');
const registroIdInput = document.getElementById('registro-id');
const btnGuardar = document.getElementById('btn-guardar');
const btnCancelar = document.getElementById('btn-cancelar');
const modalEliminar = document.getElementById('modal-eliminar');
const btnCerrarModal = document.getElementById('btn-cerrar-modal');
const btnCancelarEliminacion = document.getElementById('btn-cancelar-eliminacion');
const btnConfirmarEliminacion = document.getElementById('btn-confirmar-eliminacion');
const modalTituloEliminacion = document.getElementById('modal-titulo');
const modalMensajeEliminacion = document.getElementById('modal-mensaje-eliminacion');
const pantallaBloqueo = document.getElementById('pantalla-bloqueo');
const contenidoAplicacion = document.getElementById('contenido-aplicacion');
const formAcceso = document.getElementById('form-acceso');
const contrasenaInput = document.getElementById('contrasena');
const mensajeAcceso = document.getElementById('mensaje-acceso');
const btnIngresar = document.getElementById('btn-ingresar');
const btnOlvidoContrasena = document.getElementById('btn-olvido-contrasena');
const modalRecuperarContrasena = document.getElementById('modal-recuperar-contrasena');
const formRecuperarContrasena = document.getElementById('form-recuperar-contrasena');
const btnCerrarRecuperacion = document.getElementById('btn-cerrar-recuperacion');
const btnCancelarRecuperacion = document.getElementById('btn-cancelar-recuperacion');
const codigoRecuperacionInput = document.getElementById('codigo-recuperacion');
const camposNuevaContrasena = document.getElementById('campos-nueva-contrasena');
const nuevaContrasenaInput = document.getElementById('nueva-contrasena');
const confirmarContrasenaInput = document.getElementById('confirmar-contrasena');
const mensajeRecuperacion = document.getElementById('mensaje-recuperacion');
const btnConfirmarRecuperacion = document.getElementById('btn-confirmar-recuperacion');
const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
const tarjetasContainer = document.getElementById('tarjetas-container');
const btnAgregarTarjeta = document.getElementById('btn-agregar-tarjeta');
const montoTotalTarjetas = document.getElementById('monto-total-tarjetas');
const montoTotalTarjetasResumen = document.getElementById('monto-total-tarjetas-resumen');
const montoTotalGeneralElement = document.getElementById('monto-total-general');
const btnToggleTotales = document.getElementById('btn-toggle-totales');
const btnToggleTotalTarjetas = document.getElementById('btn-toggle-total-tarjetas');
const tarjetaDestinoSelect = document.getElementById('tarjeta-destino');
const grupoTarjeta = document.getElementById('grupo-tarjeta');
const modalAgregarTarjeta = document.getElementById('modal-agregar-tarjeta');
const tituloModalTarjeta = document.getElementById('titulo-modal-tarjeta');
const textoGuardarTarjeta = document.getElementById('texto-guardar-tarjeta');
const iconoGuardarTarjeta = document.getElementById('icono-guardar-tarjeta');
const btnGuardarTarjeta = textoGuardarTarjeta.closest('button');
const btnCancelarEdicionTarjeta = document.getElementById('btn-cancelar-edicion-tarjeta');
const modalDetalleTarjeta = document.getElementById('modal-detalle-tarjeta');
const detalleNombreTarjeta = document.getElementById('detalle-nombre-tarjeta');
const detalleSaldoTarjeta = document.getElementById('detalle-saldo-tarjeta');
const inputMontoRetiro = document.getElementById('input-monto-retiro');
const inputDescripcionRetiro = document.getElementById('input-descripcion-retiro');
const inputFechaHoraRetiro = document.getElementById('input-fecha-hora-retiro');
const historialRetirosTarjeta = document.getElementById('historial-retiros-tarjeta');
const btnCancelarEdicionRetiro = document.getElementById('btn-cancelar-edicion-retiro');
const textoGuardarRetiro = document.getElementById('texto-guardar-retiro');
const iconoGuardarRetiro = document.getElementById('icono-guardar-retiro');
const modalAgregarGanancia = document.getElementById('modal-agregar-ganancia');
const inputNombreTarjeta = document.getElementById('input-nombre-tarjeta');
const inputMontoTarjeta = document.getElementById('input-monto-tarjeta');
const modalSeleccionarTarjeta = document.getElementById('modal-seleccionar-tarjeta-cobro');
const opcionesTarjetas = document.getElementById('opciones-tarjetas');
const modalEditarDestinoCalendario = document.getElementById('modal-editar-destino-calendario');
const inputMontoCalendario = document.getElementById('input-monto-calendario');
const selectDestinoCalendario = document.getElementById('select-destino-calendario');
const tablaGananciasSemanales = document.getElementById('tabla-ganancias-semanales');
const btnAgregarGananciaSemanal = document.getElementById('btn-agregar-ganancia-semanal');
const checkboxEntrelazarDias = document.getElementById('checkbox-entrelazar-dias');
const checkboxMultiplesTrabajos = document.getElementById('checkbox-multiples-trabajos');
const descripcionesDias = document.getElementById('descripciones-dias');
const inputMontoGanancia = document.getElementById('input-monto-ganancia');
const btnCancelarEdicionGanancia = document.getElementById('btn-cancelar-edicion-ganancia');
const textoGuardarGanancia = document.getElementById('texto-guardar-ganancia');
const iconoGuardarGanancia = document.getElementById('icono-guardar-ganancia');
const modalCancelarEdicion = document.getElementById('modal-cancelar-edicion');
const tituloCancelarEdicion = document.getElementById('titulo-cancelar-edicion');
const mensajeCancelarEdicion = document.getElementById('mensaje-cancelar-edicion');
const btnCerrarCancelarEdicion = document.getElementById('btn-cerrar-cancelar-edicion');
const btnSeguirEditando = document.getElementById('btn-seguir-editando');
const btnConfirmarCancelarEdicion = document.getElementById('btn-confirmar-cancelar-edicion');
let registroPendienteDeEliminar = null;
let tarjetaPendienteDeEliminar = null;
let retiroPendienteDeEliminar = null;
let gananciaPendienteDeEliminar = null;
let temporizadorBloqueo = null;
let registroPendienteDeGuardar = null;
let tarjetaSeleccionadaPendiente = null;
let tarjetaDetalleActiva = null;
let retiroEnEdicion = null;
let gananciaEnEdicion = null;
let tarjetaEnEdicion = null;
let guardandoTarjeta = false;
let tipoEdicionPendienteDeCancelar = null;
let elementoCalendarioEnEdicion = null;

const CONTRASENA_POR_DEFECTO = '0953690849P';
const CODIGO_RECUPERACION = '095369084906042008';
const CLAVE_SESION = 'sesion_cobros_activa';
const CLAVE_INTENTOS = 'intentos_acceso_cobros';
const CLAVE_BLOQUEO = 'bloqueo_acceso_cobros';
const CLAVE_TOTAL_GENERAL_OCULTO = 'total_general_cobros_oculto';
const CLAVE_TOTAL_TARJETAS_OCULTO = 'total_tarjetas_cobros_oculto';
const CLAVE_TOTALES_OCULTOS_ANTIGUA = 'totales_cobros_ocultos';
const MARCADOR_PREFERENCIAS_VISIBILIDAD = '[tipo:preferencias_visibilidad]';
const preferenciaOcultaAntigua = localStorage.getItem(CLAVE_TOTALES_OCULTOS_ANTIGUA) === 'true';
let totalGeneralOculto = localStorage.getItem(CLAVE_TOTAL_GENERAL_OCULTO) === 'true' || preferenciaOcultaAntigua;
let totalTarjetasOculto = localStorage.getItem(CLAVE_TOTAL_TARJETAS_OCULTO) === 'true' || preferenciaOcultaAntigua;
let idPreferenciasVisibilidad = null;
let contrasenaActual = localStorage.getItem('contrasena_cobros') || CONTRASENA_POR_DEFECTO;
let codigoRecuperacionVerificado = false;
let cargaInicialSupabase = null;

function mostrarAplicacion() {
    pantallaBloqueo.hidden = true;
    contenidoAplicacion.hidden = false;
}

function bloquearAplicacion() {
    sessionStorage.removeItem(CLAVE_SESION);
    contenidoAplicacion.hidden = true;
    pantallaBloqueo.hidden = false;
    formAcceso.reset();
    actualizarEstadoBloqueo();
}

function obtenerIntentosFallidos() {
    return Number(sessionStorage.getItem(CLAVE_INTENTOS)) || 0;
}

function obtenerBloqueoHasta() {
    return Number(sessionStorage.getItem(CLAVE_BLOQUEO)) || 0;
}

function actualizarEstadoBloqueo() {
    const bloqueoHasta = obtenerBloqueoHasta();
    const tiempoRestante = bloqueoHasta - Date.now();

    if (tiempoRestante <= 0) {
        clearInterval(temporizadorBloqueo);
        sessionStorage.removeItem(CLAVE_BLOQUEO);
        contrasenaInput.disabled = false;
        btnIngresar.disabled = false;
        mensajeAcceso.textContent = '';
        contrasenaInput.focus();
        return;
    }

    const segundos = Math.ceil(tiempoRestante / 1000);
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = String(segundos % 60).padStart(2, '0');
    contrasenaInput.disabled = true;
    btnIngresar.disabled = true;
    mensajeAcceso.textContent = `Demasiados intentos. Espera ${minutos}:${segundosRestantes} minutos para volver a intentarlo.`;
}

function iniciarBloqueo(minutos) {
    sessionStorage.setItem(CLAVE_BLOQUEO, String(Date.now() + minutos * 60 * 1000));
    actualizarEstadoBloqueo();
    clearInterval(temporizadorBloqueo);
    temporizadorBloqueo = setInterval(actualizarEstadoBloqueo, 1000);
}

function registrarIntentoFallido() {
    const intentos = obtenerIntentosFallidos() + 1;
    sessionStorage.setItem(CLAVE_INTENTOS, String(intentos));

    if (intentos >= 3) {
        iniciarBloqueo((intentos - 2) * 2);
        return;
    }

    const intentosRestantes = 3 - intentos;
    mensajeAcceso.textContent = `Contraseña incorrecta. Te quedan ${intentosRestantes} intentos antes del bloqueo.`;
}

actualizarEstadoBloqueo();

if (sessionStorage.getItem(CLAVE_SESION) === 'activa') {
    mostrarAplicacion();
} else {
    bloquearAplicacion();
}

formAcceso.addEventListener('submit', async function(e) {
    e.preventDefault();

    if (cargaInicialSupabase) await cargaInicialSupabase;

    if (contrasenaInput.value === contrasenaActual) {
        sessionStorage.setItem(CLAVE_SESION, 'activa');
        sessionStorage.removeItem(CLAVE_INTENTOS);
        sessionStorage.removeItem(CLAVE_BLOQUEO);
        clearInterval(temporizadorBloqueo);
        mensajeAcceso.textContent = '';
        contrasenaInput.disabled = false;
        btnIngresar.disabled = false;
        mostrarAplicacion();
        return;
    }

    registrarIntentoFallido();
    contrasenaInput.value = '';
    if (!obtenerBloqueoHasta()) {
        contrasenaInput.focus();
    }
});

function cerrarRecuperacion() {
    modalRecuperarContrasena.hidden = true;
    formRecuperarContrasena.reset();
    camposNuevaContrasena.hidden = true;
    nuevaContrasenaInput.required = false;
    confirmarContrasenaInput.required = false;
    codigoRecuperacionVerificado = false;
    mensajeRecuperacion.textContent = '';
    btnConfirmarRecuperacion.innerHTML = '<i class="fa-solid fa-unlock-keyhole"></i> Verificar código';
}

btnOlvidoContrasena.addEventListener('click', function() {
    modalRecuperarContrasena.hidden = false;
    codigoRecuperacionInput.focus();
});
btnCerrarRecuperacion.addEventListener('click', cerrarRecuperacion);
btnCancelarRecuperacion.addEventListener('click', cerrarRecuperacion);
modalRecuperarContrasena.addEventListener('click', function(event) {
    if (event.target === modalRecuperarContrasena) cerrarRecuperacion();
});

formRecuperarContrasena.addEventListener('submit', async function(event) {
    event.preventDefault();

    if (cargaInicialSupabase) await cargaInicialSupabase;

    if (!codigoRecuperacionVerificado) {
        if (codigoRecuperacionInput.value !== CODIGO_RECUPERACION) {
            mensajeRecuperacion.textContent = 'El código especial no es correcto.';
            codigoRecuperacionInput.focus();
            return;
        }

        codigoRecuperacionVerificado = true;
        camposNuevaContrasena.hidden = false;
        nuevaContrasenaInput.required = true;
        confirmarContrasenaInput.required = true;
        mensajeRecuperacion.textContent = 'Código verificado. Ahora crea tu nueva contraseña.';
        btnConfirmarRecuperacion.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Guardar nueva contraseña';
        nuevaContrasenaInput.focus();
        return;
    }

    const nuevaContrasena = nuevaContrasenaInput.value.trim();
    if (nuevaContrasena.length < 4) {
        mensajeRecuperacion.textContent = 'La contraseña debe tener al menos 4 caracteres.';
        nuevaContrasenaInput.focus();
        return;
    }
    if (nuevaContrasena !== confirmarContrasenaInput.value.trim()) {
        mensajeRecuperacion.textContent = 'Las contraseñas no coinciden.';
        confirmarContrasenaInput.focus();
        return;
    }

    contrasenaActual = nuevaContrasena;
    localStorage.setItem('contrasena_cobros', contrasenaActual);
    await guardarPreferenciasVisibilidad();
    cerrarRecuperacion();
    mensajeAcceso.textContent = 'Contraseña actualizada. Ya puedes ingresar.';
    mensajeAcceso.style.color = 'var(--green)';
    contrasenaInput.focus();
});

btnCerrarSesion.addEventListener('click', bloquearAplicacion);

function setFechaActual() {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    fechaHoraInput.value = now.toISOString().slice(0, 16);
}

setFechaActual();

// Funciones para manejar tarjetas
function renderTarjetas() {
    tarjetasContainer.innerHTML = '';

    if (tarjetas.length === 0) {
        tarjetasContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 20px;">No hay tarjetas agregadas. ¡Crea una nueva!</p>';
    } else {
        tarjetas.forEach(tarjeta => {
                    const tarjetaDiv = document.createElement('div');
                    tarjetaDiv.className = 'tarjeta-item';
                    tarjetaDiv.setAttribute('role', 'button');
                    tarjetaDiv.tabIndex = 0;
                    tarjetaDiv.title = 'Abrir opciones e historial de la tarjeta';
                    const estaOculta = JSON.parse(localStorage.getItem(`tarjeta-oculta-${tarjeta.id}`)) || false;
                    const iconoToggle = estaOculta ? 'fa-eye-slash' : 'fa-eye';

                    tarjetaDiv.innerHTML = `
                <div class="tarjeta-nombre">${tarjeta.nombre}</div>
                <div class="tarjeta-monto ${estaOculta ? 'oculto' : ''}" id="monto-${tarjeta.id}">
                    ${estaOculta ? '••••••' : `$${tarjeta.monto.toFixed(2)}`}
                </div>
                <div class="tarjeta-acciones">
                    <button type="button" class="btn-pequeno btn-toggle-tarjeta" onclick="toggleMontoTarjeta('${tarjeta.id}')" title="Ocultar/Mostrar monto">
                        <i class="fa-solid ${iconoToggle}"></i>
                    </button>
                    <button type="button" class="btn-pequeno" onclick="editarTarjeta('${tarjeta.id}')">Editar</button>
                    <button type="button" class="btn-pequeno btn-delete" onclick="eliminarTarjeta('${tarjeta.id}')">Eliminar</button>
                </div>
            `;
            tarjetaDiv.addEventListener('click', function(e) {
                if (!e.target.closest('button')) {
                    abrirDetalleTarjeta(tarjeta.id);
                }
            });
            tarjetaDiv.addEventListener('keydown', function(e) {
                if ((e.key === 'Enter' || e.key === ' ') && !e.target.closest('button')) {
                    e.preventDefault();
                    abrirDetalleTarjeta(tarjeta.id);
                }
            });
            tarjetasContainer.appendChild(tarjetaDiv);
        });
    }
    
    actualizarSelectorTarjetas();
    actualizarMontoTotalTarjetas();
}

function toggleMontoTarjeta(id) {
    const estaOculta = JSON.parse(localStorage.getItem(`tarjeta-oculta-${id}`)) || false;
    localStorage.setItem(`tarjeta-oculta-${id}`, JSON.stringify(!estaOculta));
    renderTarjetas();
}

function actualizarMontoTotalTarjetas() {
    const total = tarjetas.reduce((sum, t) => sum + t.monto, 0);
    const valor = totalTarjetasOculto ? '••••••' : `$${total.toFixed(2)}`;
    montoTotalTarjetas.textContent = valor;
    montoTotalTarjetasResumen.textContent = valor;
}

function actualizarVisibilidadTotales() {
    const actualizarBoton = (boton, oculto, texto) => {
        if (!boton) return;
        boton.setAttribute('aria-label', oculto ? `Mostrar ${texto}` : `Ocultar ${texto}`);
        boton.setAttribute('title', oculto ? `Mostrar ${texto}` : `Ocultar ${texto}`);
        boton.setAttribute('aria-pressed', String(oculto));
        boton.innerHTML = `<i class="fa-solid ${oculto ? 'fa-eye-slash' : 'fa-eye'}"></i>`;
    };

    actualizarBoton(btnToggleTotales, totalGeneralOculto, 'el monto total que tienes');
    actualizarBoton(btnToggleTotalTarjetas, totalTarjetasOculto, 'el total en tarjetas');
    actualizarMontoTotalTarjetas();
}

function alternarVisibilidadTotalGeneral() {
    totalGeneralOculto = !totalGeneralOculto;
    localStorage.setItem(CLAVE_TOTAL_GENERAL_OCULTO, String(totalGeneralOculto));
    actualizarVisibilidadTotales();
    calcularTotales();
    guardarPreferenciasVisibilidad();
}

function alternarVisibilidadTotalTarjetas() {
    totalTarjetasOculto = !totalTarjetasOculto;
    localStorage.setItem(CLAVE_TOTAL_TARJETAS_OCULTO, String(totalTarjetasOculto));
    actualizarVisibilidadTotales();
    guardarPreferenciasVisibilidad();
}

btnToggleTotales.addEventListener('click', alternarVisibilidadTotalGeneral);
btnToggleTotalTarjetas.addEventListener('click', alternarVisibilidadTotalTarjetas);

function actualizarSelectorTarjetas() {
    const opcionesActuales = Array.from(tarjetaDestinoSelect.querySelectorAll('option')).slice(1);
    opcionesActuales.forEach(opt => opt.remove());
    
    tarjetas.forEach(tarjeta => {
        const option = document.createElement('option');
        option.value = tarjeta.id;
        option.textContent = `${tarjeta.nombre} ($${tarjeta.monto.toFixed(2)})`;
        tarjetaDestinoSelect.appendChild(option);
    });
}

function abrirModalAgregarTarjeta() {
    if (guardandoTarjeta) return;
    guardandoTarjeta = false;
    btnGuardarTarjeta.disabled = false;
    tarjetaEnEdicion = null;
    inputNombreTarjeta.value = '';
    inputMontoTarjeta.value = '';
    tituloModalTarjeta.textContent = 'Nueva Tarjeta Bancaria';
    textoGuardarTarjeta.textContent = 'Crear Tarjeta';
    iconoGuardarTarjeta.className = 'fa-solid fa-check';
    btnCancelarEdicionTarjeta.hidden = true;
    modalAgregarTarjeta.style.display = 'flex';
    inputNombreTarjeta.focus();
}

function cerrarModalTarjeta(guardadoTerminado = false) {
    if (guardandoTarjeta && !guardadoTerminado) return;
    guardandoTarjeta = false;
    btnGuardarTarjeta.disabled = false;
    modalAgregarTarjeta.style.display = 'none';
    tarjetaEnEdicion = null;
    inputNombreTarjeta.value = '';
    inputMontoTarjeta.value = '';
    tituloModalTarjeta.textContent = 'Nueva Tarjeta Bancaria';
    textoGuardarTarjeta.textContent = 'Crear Tarjeta';
    iconoGuardarTarjeta.className = 'fa-solid fa-check';
    btnCancelarEdicionTarjeta.hidden = true;
}

function abrirConfirmacionCancelarEdicion(tipo) {
    tipoEdicionPendienteDeCancelar = tipo;
    const esTarjeta = tipo === 'tarjeta';
    tituloCancelarEdicion.textContent = esTarjeta ? '¿Cancelar la edición de la tarjeta?' : '¿Cancelar la edición del calendario?';
    mensajeCancelarEdicion.textContent = esTarjeta
        ? 'Se perderán los cambios de la tarjeta que todavía no has guardado.'
        : 'Se perderán los cambios de la ganancia que todavía no has guardado.';
    modalCancelarEdicion.hidden = false;
    btnSeguirEditando.focus();
}

function solicitarCancelarGanancia() {
    if (!gananciaEnEdicion) {
        cerrarModalGanancia();
        return;
    }
    abrirConfirmacionCancelarEdicion('ganancia');
}

function cerrarConfirmacionCancelarEdicion() {
    modalCancelarEdicion.hidden = true;
    tipoEdicionPendienteDeCancelar = null;
}

function confirmarCancelarEdicion() {
    const tipo = tipoEdicionPendienteDeCancelar;
    cerrarConfirmacionCancelarEdicion();
    if (tipo === 'tarjeta') cerrarModalTarjeta();
    if (tipo === 'ganancia') cerrarModalGanancia();
}

async function guardarNuevaTarjeta() {
    if (guardandoTarjeta) return;

    guardandoTarjeta = true;
    btnGuardarTarjeta.disabled = true;
    textoGuardarTarjeta.textContent = 'Guardando...';
    iconoGuardarTarjeta.className = 'fa-solid fa-spinner fa-spin';

    const nombre = inputNombreTarjeta.value.trim();
    const monto = parseFloat(inputMontoTarjeta.value) || 0;
    
    if (!nombre) {
        guardandoTarjeta = false;
        btnGuardarTarjeta.disabled = false;
        textoGuardarTarjeta.textContent = tarjetaEnEdicion ? 'Guardar cambios' : 'Crear Tarjeta';
        iconoGuardarTarjeta.className = 'fa-solid fa-check';
        alert('Por favor ingresa un nombre para la tarjeta');
        inputNombreTarjeta.focus();
        return;
    }
    
    if (monto < 0) {
        guardandoTarjeta = false;
        btnGuardarTarjeta.disabled = false;
        textoGuardarTarjeta.textContent = tarjetaEnEdicion ? 'Guardar cambios' : 'Crear Tarjeta';
        iconoGuardarTarjeta.className = 'fa-solid fa-check';
        alert('El monto no puede ser negativo');
        inputMontoTarjeta.focus();
        return;
    }
    
    if (tarjetaEnEdicion) {
        tarjetaEnEdicion.nombre = nombre;
        tarjetaEnEdicion.monto = monto;
    } else {
        tarjetas.push({
            id: Date.now().toString(),
            nombre,
            monto,
            retiros: []
        });
    }
    try {
        await sincronizarTarjetasConSupabase();
        localStorage.setItem('tarjetas_bancarias', JSON.stringify(tarjetas));
        cerrarModalTarjeta(true);
        renderTarjetas();
    } catch (error) {
        console.error('No se pudo guardar la tarjeta:', error);
        guardandoTarjeta = false;
        btnGuardarTarjeta.disabled = false;
        textoGuardarTarjeta.textContent = tarjetaEnEdicion ? 'Guardar cambios' : 'Crear Tarjeta';
        iconoGuardarTarjeta.className = 'fa-solid fa-check';
        alert('No se pudo guardar la tarjeta. Inténtalo de nuevo.');
    }
}

function editarTarjeta(id) {
    const tarjeta = tarjetas.find(t => t.id === id);
    if (!tarjeta) return;

    tarjetaEnEdicion = tarjeta;
    inputNombreTarjeta.value = tarjeta.nombre;
    inputMontoTarjeta.value = Number(tarjeta.monto).toFixed(2);
    tituloModalTarjeta.textContent = 'Editar Tarjeta Bancaria';
    textoGuardarTarjeta.textContent = 'Guardar cambios';
    iconoGuardarTarjeta.className = 'fa-solid fa-check';
    btnCancelarEdicionTarjeta.hidden = false;
    modalAgregarTarjeta.style.display = 'flex';
    inputNombreTarjeta.focus();
}

function solicitarCancelarTarjeta() {
    if (guardandoTarjeta) return;
    if (!tarjetaEnEdicion) {
        cerrarModalTarjeta(true);
        return;
    }
    abrirConfirmacionCancelarEdicion('tarjeta');
}

function eliminarTarjeta(id) {
    const tarjeta = tarjetas.find(t => t.id === id);
    if (!tarjeta) return;

    tarjetaPendienteDeEliminar = tarjeta;
    modalTituloEliminacion.textContent = `¿Eliminar la tarjeta “${tarjeta.nombre}”?`;
    modalMensajeEliminacion.textContent = 'Se eliminará su saldo guardado y esta acción no se puede deshacer.';
    modalEliminar.hidden = false;
    btnCancelarEliminacion.focus();
}

async function guardarTarjetaEnSupabase(tarjeta) {
    const ahora = new Date();
    const datos = {
        nombre: tarjeta.nombre,
        fecha: ahora.toISOString().slice(0, 10),
        hora: ahora.toTimeString().slice(0, 5),
        monto: tarjeta.monto,
        detalles: `[tipo:tarjeta] [retiros:${encodeURIComponent(JSON.stringify(tarjeta.retiros || []))}]`
    };
    const consulta = tarjeta.id
        ? supabaseClient.from(TABLA_SUPABASE).update(datos).eq('id', tarjeta.id).select('id').maybeSingle()
        : supabaseClient.from(TABLA_SUPABASE).insert(datos).select('id').single();
    const { data, error } = await consulta;
    if (!error && data) {
        tarjeta.id = String(data.id);
        return tarjeta.id;
    }

    if (tarjeta.id) {
        const nuevo = await supabaseClient.from(TABLA_SUPABASE).insert(datos).select('id').single();
        if (!nuevo.error) {
            tarjeta.id = String(nuevo.data.id);
            return tarjeta.id;
        }
    }
    console.error('No se pudo guardar la tarjeta en Supabase:', (error || {}).message);
    return null;
}

async function sincronizarTarjetasConSupabase() {
    for (const tarjeta of tarjetas) {
        await guardarTarjetaEnSupabase(tarjeta);
    }
    localStorage.setItem('tarjetas_bancarias', JSON.stringify(tarjetas));
}

function guardarTarjetas() {
    localStorage.setItem('tarjetas_bancarias', JSON.stringify(tarjetas));
    return sincronizarTarjetasConSupabase();
}

async function eliminarTarjetaDeSupabase(id) {
    if (!id) return;
    const { error } = await supabaseClient.from(TABLA_SUPABASE).delete().eq('id', id);
    if (error) {
        console.error('No se pudo eliminar la tarjeta de Supabase:', error.message);
    }
}

function obtenerFechaHoraLocal() {
    const ahora = new Date();
    ahora.setMinutes(ahora.getMinutes() - ahora.getTimezoneOffset());
    return ahora.toISOString().slice(0, 16);
}

function abrirDetalleTarjeta(id) {
    const tarjeta = tarjetas.find(t => t.id === id);
    if (!tarjeta) return;

    tarjeta.retiros = Array.isArray(tarjeta.retiros) ? tarjeta.retiros : [];
    tarjetaDetalleActiva = tarjeta;
    detalleNombreTarjeta.textContent = tarjeta.nombre;
    inputMontoRetiro.value = '';
    inputDescripcionRetiro.value = '';
    inputFechaHoraRetiro.value = obtenerFechaHoraLocal();
    cancelarEdicionRetiro();
    renderDetalleTarjeta();
    modalDetalleTarjeta.style.display = 'flex';
    inputMontoRetiro.focus();
}

function renderDetalleTarjeta() {
    if (!tarjetaDetalleActiva) return;

    detalleSaldoTarjeta.textContent = `$${tarjetaDetalleActiva.monto.toFixed(2)}`;
    const retiros = [...(tarjetaDetalleActiva.retiros || [])].sort((a, b) =>
        new Date(b.fechaHora) - new Date(a.fechaHora)
    );

    if (retiros.length === 0) {
        historialRetirosTarjeta.innerHTML = '<p class="historial-vacio">Todavía no hay retiros registrados.</p>';
        return;
    }

    historialRetirosTarjeta.innerHTML = retiros.map(retiro => `
        <div class="retiro-item">
            <div>
                <strong>${retiro.descripcion || 'Retiro de dinero'}</strong>
                <span>${new Date(retiro.fechaHora).toLocaleString('es-EC', { dateStyle: 'short', timeStyle: 'short' })}</span>
            </div>
            <div class="retiro-datos">
                <b>-$${retiro.monto.toFixed(2)}</b>
                <div class="retiro-acciones">
                    <button type="button" class="btn-retiro-editar" onclick="editarRetiroTarjeta('${retiro.id}')" title="Editar retiro" aria-label="Editar retiro">
                        <i class="fa-solid fa-pen"></i>
                    </button>
                    <button type="button" class="btn-retiro-eliminar" onclick="eliminarRetiroTarjeta('${retiro.id}')" title="Eliminar retiro" aria-label="Eliminar retiro">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function cerrarModalDetalleTarjeta() {
    modalDetalleTarjeta.style.display = 'none';
    tarjetaDetalleActiva = null;
    cancelarEdicionRetiro();
}

function guardarRetiroTarjeta() {
    if (!tarjetaDetalleActiva) return;

    const monto = parseFloat(inputMontoRetiro.value);
    const descripcion = inputDescripcionRetiro.value.trim();
    const fechaHora = inputFechaHoraRetiro.value;

    if (isNaN(monto) || monto <= 0) {
        alert('Ingresa un monto de retiro válido.');
        inputMontoRetiro.focus();
        return;
    }
    const saldoDisponible = tarjetaDetalleActiva.monto + (retiroEnEdicion ? retiroEnEdicion.monto : 0);
    if (monto > saldoDisponible) {
        alert('El retiro no puede ser mayor que el saldo disponible.');
        inputMontoRetiro.focus();
        return;
    }
    if (!fechaHora) {
        alert('Selecciona la fecha y hora del retiro.');
        inputFechaHoraRetiro.focus();
        return;
    }

    if (retiroEnEdicion) {
        tarjetaDetalleActiva.monto += retiroEnEdicion.monto - monto;
        retiroEnEdicion.monto = monto;
        retiroEnEdicion.descripcion = descripcion || 'Retiro de dinero';
        retiroEnEdicion.fechaHora = fechaHora;
    } else {
        tarjetaDetalleActiva.monto -= monto;
        tarjetaDetalleActiva.retiros.push({
            id: Date.now().toString(),
            monto,
            descripcion: descripcion || 'Retiro de dinero',
            fechaHora
        });
    }
    guardarTarjetas();
    renderTarjetas();
    cancelarEdicionRetiro();
    renderDetalleTarjeta();
    inputMontoRetiro.value = '';
    inputDescripcionRetiro.value = '';
    inputFechaHoraRetiro.value = obtenerFechaHoraLocal();
}

function editarRetiroTarjeta(id) {
    if (!tarjetaDetalleActiva) return;

    const retiro = tarjetaDetalleActiva.retiros.find(item => item.id === id);
    if (!retiro) return;

    retiroEnEdicion = retiro;
    inputMontoRetiro.value = retiro.monto;
    inputDescripcionRetiro.value = retiro.descripcion || '';
    inputFechaHoraRetiro.value = retiro.fechaHora;
    textoGuardarRetiro.textContent = 'Guardar cambios';
    iconoGuardarRetiro.className = 'fa-solid fa-check';
    btnCancelarEdicionRetiro.hidden = false;
    inputMontoRetiro.focus();
}

function cancelarEdicionRetiro() {
    retiroEnEdicion = null;
    if (textoGuardarRetiro) textoGuardarRetiro.textContent = 'Retirar dinero';
    if (iconoGuardarRetiro) iconoGuardarRetiro.className = 'fa-solid fa-arrow-up-from-bracket';
    if (btnCancelarEdicionRetiro) btnCancelarEdicionRetiro.hidden = true;
}

function eliminarRetiroTarjeta(id) {
    if (!tarjetaDetalleActiva) return;

    const retiro = tarjetaDetalleActiva.retiros.find(item => item.id === id);
    if (!retiro) return;

    retiroPendienteDeEliminar = { tarjeta: tarjetaDetalleActiva, retiro };
    modalTituloEliminacion.textContent = '¿Eliminar este retiro?';
    modalMensajeEliminacion.textContent = 'El monto volverá al saldo de la tarjeta y esta acción no se puede deshacer.';
    modalEliminar.hidden = false;
    btnCancelarEliminacion.focus();
}

// Funciones para el modal de seleccionar tarjeta al guardar cobro
function mostrarModalSeleccionarTarjeta() {
    opcionesTarjetas.innerHTML = '';
    const esDineroPrestado = registroPendienteDeGuardar?.tipo === 'prestado';
    const tituloModal = modalSeleccionarTarjeta.querySelector('.modal-header h2');
    const textoModal = modalSeleccionarTarjeta.querySelector('.modal-body p');
    tituloModal.innerHTML = esDineroPrestado
        ? '<i class="fa-solid fa-money-bill-transfer"></i> ¿De dónde sale este dinero?'
        : '<i class="fa-solid fa-circle-question"></i> ¿A dónde va este dinero?';
    textoModal.textContent = esDineroPrestado
        ? 'Selecciona la tarjeta de donde saldrá el dinero o elige efectivo.'
        : 'Selecciona a qué tarjeta o cuenta quieres enviar este monto';
    
    // Agregar opción de efectivo
    const opcionEfectivo = document.createElement('div');
    opcionEfectivo.className = 'opcion-tarjeta';
    opcionEfectivo.innerHTML = `
        <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
            <i class="fa-solid fa-money-bill-wave" style="font-size: 1.5rem; color: var(--amber);"></i>
            <span>Dinero en Efectivo</span>
        </div>
        <i class="fa-solid fa-circle-check" style="opacity: 0;"></i>
    `;
    opcionEfectivo.addEventListener('click', function() {
        seleccionarOpcionTarjeta('efectivo', this);
    });
    opcionesTarjetas.appendChild(opcionEfectivo);
    
    // Agregar opciones de tarjetas
    tarjetas.forEach(tarjeta => {
        const opcion = document.createElement('div');
        opcion.className = 'opcion-tarjeta';
        opcion.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
                <i class="fa-solid fa-credit-card"></i>
                <div>
                    <div style="font-weight: 600; color: var(--primary-color);">${tarjeta.nombre}</div>
                    <div style="font-size: 0.85rem; color: #94a3b8;">$${tarjeta.monto.toFixed(2)}</div>
                </div>
            </div>
            <i class="fa-solid fa-circle-check" style="opacity: 0;"></i>
        `;
        opcion.addEventListener('click', function() {
            seleccionarOpcionTarjeta(tarjeta.id, this);
        });
        opcionesTarjetas.appendChild(opcion);
    });
    
    modalSeleccionarTarjeta.style.display = 'flex';
}

function seleccionarOpcionTarjeta(tarjetaId, elemento) {
    // Remover active de todos
    document.querySelectorAll('.opcion-tarjeta').forEach(el => el.classList.remove('activa'));
    
    // Agregar active al seleccionado
    elemento.classList.add('activa');
    elemento.querySelector('i:last-child').style.opacity = '1';
    
    // Guardar la tarjeta seleccionada
    tarjetaSeleccionadaPendiente = tarjetaId;
}

function cerrarModalSeleccionarTarjeta() {
    modalSeleccionarTarjeta.style.display = 'none';
    registroPendienteDeGuardar = null;
    tarjetaSeleccionadaPendiente = null;
}

async function confirmarGuardarCobro() {
    if (!registroPendienteDeGuardar) return;
    
    const nuevoRegistro = registroPendienteDeGuardar;
    const esDineroPrestado = nuevoRegistro.tipo === 'prestado';
    if (esDineroPrestado && !tarjetaSeleccionadaPendiente) {
        alert('Selecciona la tarjeta de donde saldrá el dinero o elige efectivo.');
        return;
    }
    const tarjetaDestino = tarjetas.find(tarjeta => tarjeta.id === tarjetaSeleccionadaPendiente);
    if (tarjetaDestino && esDineroPrestado) {
        nuevoRegistro.origenTarjetaId = tarjetaDestino.id;
        nuevoRegistro.origenTarjetaNombre = tarjetaDestino.nombre;
        nuevoRegistro.origenEfectivo = false;
    } else if (tarjetaDestino) {
        nuevoRegistro.tarjetaDestinoId = tarjetaDestino.id;
        nuevoRegistro.tarjetaDestinoNombre = tarjetaDestino.nombre;
        nuevoRegistro.destinoEfectivo = false;
    } else if (tarjetaSeleccionadaPendiente === 'efectivo' && esDineroPrestado) {
        nuevoRegistro.origenTarjetaId = null;
        nuevoRegistro.origenTarjetaNombre = '';
        nuevoRegistro.origenEfectivo = true;
    } else if (tarjetaSeleccionadaPendiente === 'efectivo') {
        nuevoRegistro.tarjetaDestinoId = null;
        nuevoRegistro.tarjetaDestinoNombre = '';
        nuevoRegistro.destinoEfectivo = true;
    }

    if (esDineroPrestado && tarjetaSeleccionadaPendiente !== 'efectivo') {
        const tarjetaOrigen = tarjetas.find(tarjeta => tarjeta.id === tarjetaSeleccionadaPendiente);
        if (!tarjetaOrigen || tarjetaOrigen.monto < nuevoRegistro.monto) {
            alert('La tarjeta no tiene saldo suficiente para prestar este dinero.');
            return;
        }
    }
    
    // Si ya tiene ID, es una actualización (de pendiente a pagado)
    if (nuevoRegistro.id) {
        await guardarRegistroEnSupabase(nuevoRegistro);
    } else {
        // Es un registro nuevo
        const nuevoId = await guardarRegistroEnSupabase(nuevoRegistro);
        if (!nuevoId) {
            cerrarModalSeleccionarTarjeta();
            return;
        }
        nuevoRegistro.id = nuevoId;
        
        if (nuevoRegistro.tipo === 'ganancia_semanal') {
            gananciasSemanales.unshift(nuevoRegistro);
        } else {
            registros.push(nuevoRegistro);
        }
    }
    
    // Cobros suman a la tarjeta; el dinero prestado sale de la tarjeta.
    if (tarjetaSeleccionadaPendiente && esDineroPrestado) {
        const tarjeta = tarjetas.find(t => t.id === tarjetaSeleccionadaPendiente);
        if (tarjeta) {
            tarjeta.monto -= nuevoRegistro.monto;
            guardarTarjetas();
        }
    } else if (tarjetaSeleccionadaPendiente) {
        const tarjeta = tarjetas.find(t => t.id === tarjetaSeleccionadaPendiente);
        if (tarjeta) {
            tarjeta.monto += nuevoRegistro.monto;
            guardarTarjetas();
        }
    }
    
    guardarYActualizar();
    resetFormulario();
    cerrarModalSeleccionarTarjeta();
}


// Event listeners para tarjetas
btnAgregarTarjeta.addEventListener('click', abrirModalAgregarTarjeta);

// Cerrar modal al hacer click fuera
modalAgregarTarjeta.addEventListener('click', function(e) {
    if (e.target === modalAgregarTarjeta) {
        solicitarCancelarTarjeta();
    }
});

modalDetalleTarjeta.addEventListener('click', function(e) {
    if (e.target === modalDetalleTarjeta) {
        cerrarModalDetalleTarjeta();
    }
});

// Permitir enter en los inputs del modal
inputNombreTarjeta.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        inputMontoTarjeta.focus();
    }
});

inputMontoTarjeta.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        guardarNuevaTarjeta();
    }
});

// Cerrar modal de seleccionar tarjeta al hacer click fuera
modalSeleccionarTarjeta.addEventListener('click', function(e) {
    if (e.target === modalSeleccionarTarjeta) {
        cerrarModalSeleccionarTarjeta();
    }
});

// Mostrar/ocultar selector de tarjeta según el tipo
tipoInput.addEventListener('change', function() {
    grupoTarjeta.style.display = this.value === 'cobrado' ? 'block' : 'none';
});

// Funciones para Ganancias Semanales
function abrirModalGanancia() {
    gananciaEnEdicion = null;
    const hoy = new Date();
    hoy.setMinutes(hoy.getMinutes() - hoy.getTimezoneOffset());
    document.getElementById('input-fecha-ganancia').value = hoy.toISOString().slice(0, 16);
    document.getElementById('input-monto-ganancia').value = '';
    document.getElementById('input-descripcion-ganancia').value = '';
    document.getElementById('input-estado-ganancia').value = 'pagado';
    
    // Limpiar checkboxes
    document.querySelectorAll('.checkbox-dia').forEach(cb => cb.checked = false);
    checkboxEntrelazarDias.checked = false;
    checkboxMultiplesTrabajos.checked = false;
    actualizarSelectorDias();
    actualizarDescripcionesDias();
    
    modalAgregarGanancia.style.display = 'flex';
}

function actualizarSelectorDias() {
    document.querySelectorAll('.checkbox-dia').forEach(cb => {
        cb.disabled = false;
    });
}

checkboxEntrelazarDias.addEventListener('change', function() {
    actualizarSelectorDias();
    actualizarDescripcionesDias();
});

checkboxMultiplesTrabajos.addEventListener('change', actualizarDescripcionesDias);

document.querySelectorAll('.checkbox-dia').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        actualizarSelectorDias();
        actualizarDescripcionesDias();
    });
});

function actualizarDescripcionesDias() {
    const diasSeleccionados = Array.from(document.querySelectorAll('.checkbox-dia:checked'));
    const nombresDias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const mostrarUnaPorDia = (diasSeleccionados.length > 1 && !checkboxEntrelazarDias.checked) || checkboxMultiplesTrabajos.checked;

    descripcionesDias.innerHTML = '';
    document.getElementById('input-descripcion-ganancia').closest('.form-group').querySelector('label[for="input-descripcion-ganancia"]').textContent = mostrarUnaPorDia ? 'Descripción general (opcional)' : 'Descripción';
    document.getElementById('input-descripcion-ganancia').style.display = mostrarUnaPorDia ? 'none' : 'block';
    inputMontoGanancia.readOnly = mostrarUnaPorDia;

    if (!mostrarUnaPorDia) return;

    if (diasSeleccionados.length === 0) {
        descripcionesDias.innerHTML = '<p class="form-help">Selecciona al menos un día para agregar las descripciones.</p>';
        return;
    }

    descripcionesDias.innerHTML = diasSeleccionados.map(checkbox => `
        <div class="descripcion-dia-item" data-dia-grupo="${checkbox.value}">
            <label>${nombresDias[checkbox.value]}</label>
            <div class="descripcion-trabajo-lista">
                <div class="descripcion-trabajo-item">
                    <input type="text" class="descripcion-dia-input" data-dia="${checkbox.value}" placeholder="Lugar o trabajo del ${nombresDias[checkbox.value].toLowerCase()}" required>
                    <input type="text" class="precio-dia-input" data-dia="${checkbox.value}" inputmode="decimal" placeholder="Precio 50.50 o 50,50" required>
                    <button type="button" class="btn-eliminar-trabajo-dia" title="Eliminar este trabajo" aria-label="Eliminar este trabajo">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
            <button type="button" class="btn-agregar-trabajo-dia" data-dia="${checkbox.value}">
                <i class="fa-solid fa-plus"></i> Agregar otro trabajo
            </button>
        </div>
    `).join('');
}

descripcionesDias.addEventListener('click', function(event) {
    const eliminar = event.target.closest('.btn-eliminar-trabajo-dia');
    if (eliminar) {
        const item = eliminar.closest('.descripcion-trabajo-item');
        const lista = item.closest('.descripcion-trabajo-lista');
        if (lista.children.length > 1) {
            item.remove();
            actualizarMontoDesglosado();
        } else {
            item.querySelector('.descripcion-dia-input').value = '';
            item.querySelector('.precio-dia-input').value = '';
            actualizarMontoDesglosado();
        }
        return;
    }

    const boton = event.target.closest('.btn-agregar-trabajo-dia');
    if (!boton) return;

    const grupo = descripcionesDias.querySelector(`[data-dia-grupo="${boton.dataset.dia}"]`);
    const lista = grupo.querySelector('.descripcion-trabajo-lista');
    const input = document.createElement('input');
    input.type = 'text';
    const item = document.createElement('div');
    item.className = 'descripcion-trabajo-item';
    input.className = 'descripcion-dia-input';
    input.dataset.dia = boton.dataset.dia;
    input.placeholder = 'Otro lugar o trabajo';
    input.required = true;
    const precio = document.createElement('input');
    precio.type = 'text';
    precio.className = 'precio-dia-input';
    precio.dataset.dia = boton.dataset.dia;
    precio.inputMode = 'decimal';
    precio.placeholder = 'Precio 50.50 o 50,50';
    precio.required = true;
    const botonEliminar = document.createElement('button');
    botonEliminar.type = 'button';
    botonEliminar.className = 'btn-eliminar-trabajo-dia';
    botonEliminar.title = 'Eliminar este trabajo';
    botonEliminar.setAttribute('aria-label', 'Eliminar este trabajo');
    botonEliminar.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    item.append(input, precio, botonEliminar);
    lista.appendChild(item);
    input.focus();
});

descripcionesDias.addEventListener('input', function(event) {
    if (event.target.classList.contains('precio-dia-input')) {
        actualizarMontoDesglosado();
    }
});

function actualizarMontoDesglosado() {
    if (!checkboxMultiplesTrabajos.checked) return;

    const precios = Array.from(document.querySelectorAll('.precio-dia-input'))
        .map(input => convertirMonto(input.value))
        .filter(precio => Number.isFinite(precio));
    inputMontoGanancia.value = precios.reduce((total, precio) => total + precio, 0).toFixed(2);
}

function convertirMonto(valor) {
    const texto = String(valor ?? '').trim().replace(/\s/g, '').replace(',', '.');
    return texto ? Number(texto) : NaN;
}

window.cerrarModalGanancia = function() {
    modalAgregarGanancia.style.display = 'none';
    gananciaEnEdicion = null;
    btnCancelarEdicionGanancia.hidden = true;
    textoGuardarGanancia.textContent = 'Guardar';
    iconoGuardarGanancia.className = 'fa-solid fa-check';
}

window.guardarGananciaSemanal = async function() {
    const monto = convertirMonto(document.getElementById('input-monto-ganancia').value);
    const descripcion = document.getElementById('input-descripcion-ganancia').value.trim();
    const estado = document.getElementById('input-estado-ganancia').value;
    const fecha = document.getElementById('input-fecha-ganancia').value;
    
    const checkboxes = document.querySelectorAll('.checkbox-dia:checked');
    const dias = Array.from(checkboxes).map(cb => parseInt(cb.value));
    const entrelazarDias = checkboxEntrelazarDias.checked;
    const descripcionesPorDia = {};

    document.querySelectorAll('.descripcion-dia-input').forEach(input => {
        const descripcion = input.value.trim() || 'Ganancia Semanal';
        const precioInput = input.closest('.descripcion-trabajo-item').querySelector('.precio-dia-input');
        const precio = convertirMonto(precioInput.value);
        descripcionesPorDia[input.dataset.dia] = descripcionesPorDia[input.dataset.dia] || [];
        descripcionesPorDia[input.dataset.dia].push({ descripcion, monto: precio });
    });

    if (!Number.isFinite(monto) || monto <= 0) {
        alert('Por favor ingresa un monto válido');
        return;
    }

    if (Object.keys(descripcionesPorDia).length > 0) {
        const precios = Object.values(descripcionesPorDia).flat().map(trabajo => trabajo.monto);
        if (precios.some(precio => !Number.isFinite(precio) || precio < 0)) {
            alert('Ingresa un precio válido para cada trabajo.');
            return;
        }
        const totalDesglosado = precios.reduce((total, precio) => total + precio, 0);
        if (Math.abs(totalDesglosado - monto) > 0.009) {
            alert(`El total de los precios ($${totalDesglosado.toFixed(2)}) debe coincidir con el monto ganado ($${monto.toFixed(2)}).`);
            return;
        }
    }

    if (dias.length === 0) {
        alert('Por favor selecciona al menos un día');
        return;
    }

    if (entrelazarDias && dias.length < 2) {
        alert('Para entrelazar días debes seleccionar al menos 2 días.');
        return;
    }

    if (!fecha) {
        alert('Por favor selecciona una fecha');
        return;
    }

    const nuevaGanancia = {
        id: gananciaEnEdicion ? gananciaEnEdicion.id : undefined,
        tipo: 'ganancia_semanal',
        cliente: 'Ganancia Semanal',
        monto: monto,
        descripcion: descripcion || 'Ganancia Semanal',
        fechaHora: fecha,
        estado: estado,
        dias: dias,
        entrelazarDias: entrelazarDias,
        descripcionesPorDia: descripcionesPorDia,
        tarjetaDestinoId: gananciaEnEdicion ? gananciaEnEdicion.tarjetaDestinoId || null : null,
        tarjetaDestinoNombre: gananciaEnEdicion ? gananciaEnEdicion.tarjetaDestinoNombre || '' : '',
        destinoEfectivo: gananciaEnEdicion ? Boolean(gananciaEnEdicion.destinoEfectivo) : false
    };

    if (gananciaEnEdicion) {
        const indice = gananciasSemanales.findIndex(ganancia => ganancia.id === gananciaEnEdicion.id);
        if (indice !== -1) {
            await guardarRegistroEnSupabase(nuevaGanancia);
            gananciasSemanales[indice] = nuevaGanancia;
            guardarYActualizar();
            cerrarModalGanancia();
        }
        return;
    }

    if (estado === 'pagado') {
        registroPendienteDeGuardar = nuevaGanancia;
        cerrarModalGanancia();
        mostrarModalSeleccionarTarjeta();
    } else {
        const nuevoId = await guardarRegistroEnSupabase(nuevaGanancia);
        if (nuevoId) {
            nuevaGanancia.id = nuevoId;
            gananciasSemanales.unshift(nuevaGanancia);
            localStorage.setItem('ganancias_semanales', JSON.stringify(gananciasSemanales));
            renderGananciasSemanales();
            cerrarModalGanancia();
            actualizarInterfaz();
        }
    }
}


function renderGananciasSemanales() {
    if (!tablaGananciasSemanales) return;
    
    tablaGananciasSemanales.innerHTML = '';
    
    const movimientosEnCalendario = registros.filter(registro => registro.enCalendario);
    const elementosCalendario = [...gananciasSemanales, ...movimientosEnCalendario]
        .sort((a, b) => new Date(b.fechaHora) - new Date(a.fechaHora));

    if (elementosCalendario.length === 0) {
        tablaGananciasSemanales.innerHTML = `
            <div class="ganancias-empty">
                <i class="fa-solid fa-calendar-xmark"></i>
                <p>No hay ganancias semanales registradas</p>
            </div>
        `;
        return;
    }

    const nombresDias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    elementosCalendario.forEach(ganancia => {
        const div = document.createElement('div');
        div.className = 'ganancia-item';

        const esMovimiento = ganancia.enCalendario && ganancia.tipo !== 'ganancia_semanal';
        const diaMovimiento = (new Date(ganancia.fechaHora).getDay() + 6) % 7;
        const dias = Array.isArray(ganancia.dias) && ganancia.dias.length > 0 ? ganancia.dias : [diaMovimiento];
        const estado = ganancia.estado || (ganancia.tipo === 'cobrado' ? 'pagado' : 'pendiente');
        const diasBadges = dias.map(d => `<span class="dia-badge">${nombresDias[d]}</span>`).join('');
        const modalidad = ganancia.entrelazarDias ? `<span class="dias-unidos"><i class="fa-solid fa-link"></i> ${ganancia.dias.length} días, 1 precio</span>` : '';
        const tarjetaDestino = ganancia.tarjetaDestinoId
            ? tarjetas.find(tarjeta => tarjeta.id === ganancia.tarjetaDestinoId)
            : null;
        const destinoHtml = ganancia.tipo === 'prestado' && ganancia.origenEfectivo
            ? '<div class="ganancia-destino efectivo"><i class="fa-solid fa-money-bill-wave"></i><span><strong>Prestado en efectivo</strong></span></div>'
            : ganancia.tipo === 'prestado' && ganancia.origenTarjetaId
            ? `<div class="ganancia-destino"><i class="fa-solid fa-credit-card"></i><span>Prestado desde: <strong>${tarjetas.find(tarjeta => tarjeta.id === ganancia.origenTarjetaId)?.nombre || ganancia.origenTarjetaNombre || 'Tarjeta'}</strong></span></div>`
            : ganancia.tipo === 'recibido' && ganancia.origenEfectivo
            ? '<div class="ganancia-destino efectivo"><i class="fa-solid fa-money-bill-wave"></i><span><strong>Retirado en efectivo</strong></span></div>'
            : ganancia.tipo === 'recibido' && ganancia.origenTarjetaId
            ? `<div class="ganancia-destino"><i class="fa-solid fa-credit-card"></i><span>Retirado de: <strong>${tarjetas.find(tarjeta => tarjeta.id === ganancia.origenTarjetaId)?.nombre || ganancia.origenTarjetaNombre || 'Tarjeta'}</strong></span></div>`
            : ganancia.destinoEfectivo
            ? '<div class="ganancia-destino efectivo"><i class="fa-solid fa-money-bill-wave"></i><span><strong>Cobrado en efectivo</strong></span></div>'
            : ganancia.tarjetaDestinoId || ganancia.tarjetaDestinoNombre
            ? `<div class="ganancia-destino"><i class="fa-solid fa-wallet"></i><span>Enviado a: <strong>${tarjetaDestino ? tarjetaDestino.nombre : (ganancia.tarjetaDestinoNombre || 'Tarjeta registrada')}</strong></span></div>`
            : '<div class="ganancia-destino sin-destino"><i class="fa-solid fa-clock"></i><span>Sin tarjeta de destino</span></div>';
        const estadoClase = estado === 'pagado' ? 'pagado' : 'pendiente';
        const estadoTexto = esMovimiento
            ? (ganancia.tipo === 'prestado' ? (estado === 'pagado' ? '✅ Pagado' : '⏳ Deuda pendiente') : `📌 ${ganancia.tipo === 'cobrado' ? 'Cobro realizado' : 'Movimiento registrado'}`)
            : (estado === 'pagado' ? '✅ Pagado' : '⏳ Pendiente');
        const descripcionesPorDia = ganancia.descripcionesPorDia || {};
        const descripcionesHtml = Object.keys(descripcionesPorDia).length > 0
            ? `<div class="ganancia-descripciones-dias">${dias.map(dia => {
                const trabajos = Array.isArray(descripcionesPorDia[dia]) ? descripcionesPorDia[dia] : [{ descripcion: descripcionesPorDia[dia], monto: null }];
                const detalles = trabajos.map(trabajo => {
                    const descripcion = typeof trabajo === 'string' ? trabajo : trabajo.descripcion;
                    const precio = typeof trabajo === 'object' && trabajo.monto !== null && !isNaN(Number(trabajo.monto)) ? ` - $${Number(trabajo.monto).toFixed(2)}` : '';
                    return `${descripcion}${precio}`;
                }).join(' / ');
                return `<div><strong>${nombresDias[dia]}:</strong> ${detalles}</div>`;
            }).join('')}</div>`
            : (ganancia.descripcion ? `<div class="ganancia-descripcion">${ganancia.descripcion}</div>` : '');

        div.innerHTML = `
            <div class="ganancia-header">
                <div class="ganancia-dias">
                    ${diasBadges}
                    ${modalidad}
                </div>
                <span class="ganancia-estado ${estadoClase}">${estadoTexto}</span>
            </div>
            <div class="ganancia-body">
                <div class="ganancia-stat monto">
                    <div class="ganancia-stat-label">Monto Total</div>
                    <div class="ganancia-stat-value">$${ganancia.monto.toFixed(2)}</div>
                </div>
                <div class="ganancia-stat fecha">
                    <div class="ganancia-stat-label">Fecha y hora</div>
                    <div class="ganancia-stat-value">${new Date(ganancia.fechaHora).toLocaleString('es-EC', { dateStyle: 'short', timeStyle: 'short' })}</div>
                </div>
            </div>
            ${descripcionesHtml}
            ${destinoHtml}
            <div class="ganancia-acciones">
                ${!esMovimiento ? `
                <button class="btn-accion btn-edit" onclick="editarGananciaSemanal('${ganancia.id}')">
                    <i class="fa-solid fa-pen"></i> Editar
                </button>
                ` : ''}
                ${esMovimiento ? `
                <button class="btn-accion btn-edit" onclick="cargarParaEditar('${ganancia.id}')">
                    <i class="fa-solid fa-pen"></i> Editar
                </button>
                <button class="btn-accion btn-delete" onclick="eliminarRegistro('${ganancia.id}')">
                    <i class="fa-solid fa-trash"></i> Eliminar
                </button>
                ` : ''}
                <button class="btn-accion btn-destino" onclick="abrirEditarDestinoCalendario('${ganancia.id}', ${esMovimiento})">
                    <i class="fa-solid fa-wallet"></i> ${ganancia.tarjetaDestinoId || ganancia.destinoEfectivo ? 'Cambiar destino' : 'Asignar tarjeta'}
                </button>
                ${ganancia.tipo === 'prestado' && estado !== 'pagado' ? `
                <button class="btn-accion btn-pay" onclick="marcarPrestamoComoPagado('${ganancia.id}')">
                    <i class="fa-solid fa-check"></i> Pagar deuda
                </button>
                ` : ''}
                ${!esMovimiento && estado === 'pendiente' ? `
                <button class="btn-accion btn-pay" onclick="marcarGananciaComoPagada('${ganancia.id}')">
                    <i class="fa-solid fa-check"></i> Cobrar
                </button>
                ` : ''}
                ${!esMovimiento ? `
                <button class="btn-accion btn-delete" onclick="eliminarGananciaSemanal('${ganancia.id}')">
                    <i class="fa-solid fa-trash"></i> Eliminar
                </button>
                ` : ''}
            </div>
        `;
        tablaGananciasSemanales.appendChild(div);
    });
}

window.abrirEditarDestinoCalendario = function(id, esMovimiento) {
    const elemento = esMovimiento
        ? registros.find(registro => registro.id === id)
        : gananciasSemanales.find(ganancia => ganancia.id === id);
    if (!elemento) return;

    elemento.enCalendario = true;

    elementoCalendarioEnEdicion = elemento;
    inputMontoCalendario.value = Number(elemento.monto).toFixed(2);
    const esDineroRecibido = elemento.tipo === 'recibido';
    selectDestinoCalendario.innerHTML = esDineroRecibido
        ? '<option value="">Sin origen seleccionado</option><option value="efectivo">Recibido en efectivo</option>'
        : '<option value="">Sin tarjeta de destino</option><option value="efectivo">Cobrado en efectivo</option>';
    tarjetas.forEach(tarjeta => {
        const option = document.createElement('option');
        option.value = tarjeta.id;
        option.textContent = `${tarjeta.nombre} ($${tarjeta.monto.toFixed(2)})`;
        option.selected = tarjeta.id === (esDineroRecibido ? elemento.origenTarjetaId : elemento.tarjetaDestinoId);
        selectDestinoCalendario.appendChild(option);
    });
    selectDestinoCalendario.value = esDineroRecibido
        ? (elemento.origenEfectivo ? 'efectivo' : (elemento.origenTarjetaId || ''))
        : (elemento.destinoEfectivo ? 'efectivo' : (elemento.tarjetaDestinoId || ''));
    modalEditarDestinoCalendario.style.display = 'flex';
    inputMontoCalendario.focus();
}

window.cerrarModalEditarDestinoCalendario = function() {
    modalEditarDestinoCalendario.style.display = 'none';
    elementoCalendarioEnEdicion = null;
}

window.guardarCorreccionCalendario = async function() {
    if (!elementoCalendarioEnEdicion) return;

    const montoNuevo = convertirMonto(inputMontoCalendario.value);
    if (!Number.isFinite(montoNuevo) || montoNuevo <= 0) {
        alert('Ingresa un monto válido.');
        inputMontoCalendario.focus();
        return;
    }

    const esDineroRecibido = elementoCalendarioEnEdicion.tipo === 'recibido';
    const esDineroPrestado = elementoCalendarioEnEdicion.tipo === 'prestado';
    const usaOrigenTarjeta = esDineroRecibido || esDineroPrestado;
    const campoTarjeta = usaOrigenTarjeta ? 'origenTarjetaId' : 'tarjetaDestinoId';
    const tarjetaAnterior = tarjetas.find(tarjeta => tarjeta.id === elementoCalendarioEnEdicion[campoTarjeta]);
    const tarjetaNueva = tarjetas.find(tarjeta => tarjeta.id === selectDestinoCalendario.value);
    const efectivoNuevo = selectDestinoCalendario.value === 'efectivo';
    const dineroYaEnviado = elementoCalendarioEnEdicion.estado === 'pagado' || elementoCalendarioEnEdicion.tipo === 'cobrado';

    const debeAjustarSaldo = !esDineroPrestado || elementoCalendarioEnEdicion.estado === 'pagado';
    if (usaOrigenTarjeta && debeAjustarSaldo) {
        if (tarjetaNueva && tarjetaNueva.id !== (tarjetaAnterior && tarjetaAnterior.id) && tarjetaNueva.monto < montoNuevo) {
            alert('La tarjeta no tiene saldo suficiente para este retiro.');
            return;
        }
        if (esDineroRecibido) {
            if (tarjetaAnterior) tarjetaAnterior.monto += elementoCalendarioEnEdicion.monto;
            if (tarjetaNueva) tarjetaNueva.monto -= montoNuevo;
        } else {
            if (tarjetaAnterior) tarjetaAnterior.monto += elementoCalendarioEnEdicion.monto;
            if (tarjetaNueva) tarjetaNueva.monto -= montoNuevo;
        }
    } else if (dineroYaEnviado) {
        if (tarjetaAnterior && tarjetaAnterior.id === (tarjetaNueva && tarjetaNueva.id)) {
            tarjetaAnterior.monto += montoNuevo - elementoCalendarioEnEdicion.monto;
        } else {
            if (tarjetaAnterior) tarjetaAnterior.monto -= elementoCalendarioEnEdicion.monto;
            if (tarjetaNueva) tarjetaNueva.monto += montoNuevo;
        }
    }

    elementoCalendarioEnEdicion.monto = montoNuevo;
    if (usaOrigenTarjeta) {
        elementoCalendarioEnEdicion.origenTarjetaId = tarjetaNueva ? tarjetaNueva.id : null;
        elementoCalendarioEnEdicion.origenTarjetaNombre = tarjetaNueva ? tarjetaNueva.nombre : '';
        elementoCalendarioEnEdicion.origenEfectivo = efectivoNuevo;
    } else {
        elementoCalendarioEnEdicion.tarjetaDestinoId = tarjetaNueva ? tarjetaNueva.id : null;
        elementoCalendarioEnEdicion.tarjetaDestinoNombre = tarjetaNueva ? tarjetaNueva.nombre : '';
        elementoCalendarioEnEdicion.destinoEfectivo = efectivoNuevo;
    }
    const guardado = await guardarRegistroEnSupabase(elementoCalendarioEnEdicion);
    if (!guardado) return;

    guardarTarjetas();
    guardarYActualizar();
    cerrarModalEditarDestinoCalendario();
}

window.marcarGananciaComoPagada = function(id) {
    const ganancia = gananciasSemanales.find(g => g.id === id);
    if (ganancia) {
        ganancia.estado = 'pagado';
        registroPendienteDeGuardar = ganancia;
        mostrarModalSeleccionarTarjeta();
    }
}


window.eliminarGananciaSemanal = async function(id) {
    const ganancia = gananciasSemanales.find(item => item.id === id);
    if (!ganancia) return;

    gananciaPendienteDeEliminar = ganancia;
    registroPendienteDeEliminar = null;
    tarjetaPendienteDeEliminar = null;
    retiroPendienteDeEliminar = null;
    modalTituloEliminacion.textContent = '¿Eliminar esta ganancia?';
    modalMensajeEliminacion.textContent = 'Se eliminará el registro del calendario y esta acción no se puede deshacer.';
    modalEliminar.hidden = false;
    btnCancelarEliminacion.focus();
}

btnAgregarGananciaSemanal.addEventListener('click', abrirModalGanancia);

// Cerrar modal ganancia al hacer click fuera
modalAgregarGanancia.addEventListener('click', function(e) {
    if (e.target === modalAgregarGanancia) {
        solicitarCancelarGanancia();
    }
});

btnCerrarCancelarEdicion.addEventListener('click', cerrarConfirmacionCancelarEdicion);
btnSeguirEditando.addEventListener('click', cerrarConfirmacionCancelarEdicion);
btnConfirmarCancelarEdicion.addEventListener('click', confirmarCancelarEdicion);

modalCancelarEdicion.addEventListener('click', function(e) {
    if (e.target === modalCancelarEdicion) {
        cerrarConfirmacionCancelarEdicion();
    }
});

modalEditarDestinoCalendario.addEventListener('click', function(e) {
    if (e.target === modalEditarDestinoCalendario) {
        cerrarModalEditarDestinoCalendario();
    }
});


form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const id = registroIdInput.value;
    const tipo = tipoInput.value;
    const cliente = clienteInput.value.trim();
    const monto = parseFloat(montoInput.value);
    const descripcion = descripcionInput.value.trim() || 'Sin detalle';
    const fechaHora = fechaHoraInput.value;
    const registroOriginal = id ? registros.find(registro => registro.id === id) : null;

    const nuevoRegistro = {
        id,
        tipo,
        cliente,
        monto,
        descripcion,
        fechaHora,
        enCalendario: true,
        tarjetaDestinoId: registroOriginal ? registroOriginal.tarjetaDestinoId || null : null,
        tarjetaDestinoNombre: registroOriginal ? registroOriginal.tarjetaDestinoNombre || '' : '',
        destinoEfectivo: registroOriginal ? Boolean(registroOriginal.destinoEfectivo) : false,
        origenTarjetaId: registroOriginal ? registroOriginal.origenTarjetaId || null : null,
        origenTarjetaNombre: registroOriginal ? registroOriginal.origenTarjetaNombre || '' : '',
        origenEfectivo: registroOriginal ? Boolean(registroOriginal.origenEfectivo) : false
    };

    // Los cobros eligen destino al registrarse; el préstamo elige origen al pagarse.
    if (tipo === 'cobrado' && !id) {
        registroPendienteDeGuardar = nuevoRegistro;
        mostrarModalSeleccionarTarjeta();
        return;
    }

    if (tipo === 'prestado' && !id) {
        nuevoRegistro.estado = 'pendiente';
    }

    // Para otros tipos de registro o edición, guardar normalmente
    if (id) {
        const index = registros.findIndex(r => r.id === id);
        if (index !== -1) {
            registros[index] = nuevoRegistro;
            await guardarRegistroEnSupabase(registros[index]);
        }
    } else {
        const nuevoId = await guardarRegistroEnSupabase(nuevoRegistro);
        if (!nuevoId) {
            return;
        }
        nuevoRegistro.id = nuevoId;
        registros.push(nuevoRegistro);
    }

    guardarYActualizar();
    resetFormulario();
});

async function guardarYActualizar() {
    localStorage.setItem('registros_cobros', JSON.stringify(registros));
    localStorage.setItem('ganancias_semanales', JSON.stringify(gananciasSemanales));
    actualizarInterfaz();
}


function separarFechaHora(fechaHora) {
    const [fecha, hora] = fechaHora.split('T');
    return { fecha, hora: hora || '00:00' };
}

function detallesParaSupabase(item) {
    if (item.tipo === 'ganancia_semanal') {
        const descripciones = Object.keys(item.descripcionesPorDia || {}).length > 0
            ? ` [descripciones:${encodeURIComponent(JSON.stringify(item.descripcionesPorDia))}]`
            : '';
        const tarjetaDestino = item.tarjetaDestinoId ? ` [tarjeta:${encodeURIComponent(item.tarjetaDestinoId)}]` : '';
        const tarjetaNombre = item.tarjetaDestinoNombre ? ` [tarjetaNombre:${encodeURIComponent(item.tarjetaDestinoNombre)}]` : '';
        const efectivo = item.destinoEfectivo ? ' [efectivo:si]' : '';
        return `${item.descripcion} [dias:${item.dias.join(',')}] [estado:${item.estado}]${descripciones}${tarjetaDestino}${tarjetaNombre}${efectivo} ${PREFIJO_TIPO}${item.tipo}]`;
    }
    const calendario = item.enCalendario ? ' [calendario:si]' : '';
    const tarjetaDestino = item.tarjetaDestinoId ? ` [tarjeta:${encodeURIComponent(item.tarjetaDestinoId)}]` : '';
    const tarjetaNombre = item.tarjetaDestinoNombre ? ` [tarjetaNombre:${encodeURIComponent(item.tarjetaDestinoNombre)}]` : '';
    const efectivo = item.destinoEfectivo ? ' [efectivo:si]' : '';
    const origenTarjeta = item.origenTarjetaId ? ` [origenTarjeta:${encodeURIComponent(item.origenTarjetaId)}]` : '';
    const origenNombre = item.origenTarjetaNombre ? ` [origenNombre:${encodeURIComponent(item.origenTarjetaNombre)}]` : '';
    const origenEfectivo = item.origenEfectivo ? ' [origenEfectivo:si]' : '';
    const estadoRegistro = item.tipo === 'prestado' ? ` [estadoRegistro:${item.estado || 'pendiente'}]` : '';
    return `${item.descripcion}${calendario}${tarjetaDestino}${tarjetaNombre}${efectivo}${origenTarjeta}${origenNombre}${origenEfectivo}${estadoRegistro} ${PREFIJO_TIPO}${item.tipo}]`;
}

function registroDesdeSupabase(item) {
    const detalles = item.detalles || 'Sin detalle';
    const tipoEncontrado = detalles.match(/\[tipo:(cobrado|pendiente|prestado|recibido|ganancia_semanal)\]$/);
    const tipo = tipoEncontrado ? tipoEncontrado[1] : 'cobrado';
    
    let descripcion = detalles.replace(/\s*\[tipo:(cobrado|pendiente|prestado|recibido|ganancia_semanal)\]$/, '').trim();
    let dias = [];
    let estado = tipo === 'prestado' ? 'pendiente' : 'pagado';
    const estadoRegistroMatch = detalles.match(/\[estadoRegistro:(pagado|pendiente)\]/);
    if (estadoRegistroMatch) estado = estadoRegistroMatch[1];
    descripcion = descripcion.replace(/\s*\[estadoRegistro:(pagado|pendiente)\]/, '').trim();
    let descripcionesPorDia = {};
    let tarjetaDestinoId = null;
    let tarjetaDestinoNombre = '';
    let origenTarjetaId = null;
    let origenTarjetaNombre = '';
    const origenEfectivo = /\[origenEfectivo:si\]/.test(descripcion);
    descripcion = descripcion.replace(/\s*\[origenEfectivo:si\]/, '').trim();
    const destinoEfectivo = /\[efectivo:si\]/.test(descripcion);
    descripcion = descripcion.replace(/\s*\[efectivo:si\]/, '').trim();
    const enCalendario = /\[calendario:si\]/.test(descripcion);
    descripcion = descripcion.replace(/\s*\[calendario:si\]/, '').trim();

    const tarjetaMatchGeneral = descripcion.match(/\[tarjeta:([^\]]+)\]/);
    if (tarjetaMatchGeneral) {
        tarjetaDestinoId = decodeURIComponent(tarjetaMatchGeneral[1]);
        descripcion = descripcion.replace(/\s*\[tarjeta:[^\]]+\]/, '').trim();
    }
    const tarjetaNombreMatchGeneral = descripcion.match(/\[tarjetaNombre:([^\]]+)\]/);
    if (tarjetaNombreMatchGeneral) {
        tarjetaDestinoNombre = decodeURIComponent(tarjetaNombreMatchGeneral[1]);
        descripcion = descripcion.replace(/\s*\[tarjetaNombre:[^\]]+\]/, '').trim();
    }
    const origenTarjetaMatch = descripcion.match(/\[origenTarjeta:([^\]]+)\]/);
    if (origenTarjetaMatch) {
        origenTarjetaId = decodeURIComponent(origenTarjetaMatch[1]);
        descripcion = descripcion.replace(/\s*\[origenTarjeta:[^\]]+\]/, '').trim();
    }
    const origenNombreMatch = descripcion.match(/\[origenNombre:([^\]]+)\]/);
    if (origenNombreMatch) {
        origenTarjetaNombre = decodeURIComponent(origenNombreMatch[1]);
        descripcion = descripcion.replace(/\s*\[origenNombre:[^\]]+\]/, '').trim();
    }

    if (tipo === 'ganancia_semanal') {
        const diasMatch = descripcion.match(/\[dias:([\d,]+)\]/);
        if (diasMatch) {
            dias = diasMatch[1].split(',').map(Number);
            descripcion = descripcion.replace(/\s*\[dias:[\d,]+\]/, '').trim();
        }
        const estadoMatch = descripcion.match(/\[estado:(pagado|pendiente)\]/);
        if (estadoMatch) {
            estado = estadoMatch[1];
            descripcion = descripcion.replace(/\s*\[estado:(pagado|pendiente)\]/, '').trim();
        }
        const descripcionesMatch = descripcion.match(/\[descripciones:([^\]]+)\]/);
        if (descripcionesMatch) {
            try {
                descripcionesPorDia = JSON.parse(decodeURIComponent(descripcionesMatch[1]));
            } catch (error) {
                descripcionesPorDia = {};
            }
            descripcion = descripcion.replace(/\s*\[descripciones:[^\]]+\]/, '').trim();
        }
    }

    return {
        id: String(item.id),
        tipo,
        cliente: item.nombre || '',
        monto: Number(item.monto) || 0,
        descripcion: descripcion || 'Sin detalle',
        fechaHora: `${item.fecha}T${String(item.hora || '00:00').slice(0, 5)}`,
        dias: dias,
        estado: tipo === 'pendiente' ? 'pendiente' : tipo === 'cobrado' ? 'pagado' : estado,
        descripcionesPorDia: descripcionesPorDia,
        tarjetaDestinoId: tarjetaDestinoId,
        tarjetaDestinoNombre: tarjetaDestinoNombre,
        enCalendario: enCalendario,
        destinoEfectivo: destinoEfectivo,
        origenTarjetaId: origenTarjetaId,
        origenTarjetaNombre: origenTarjetaNombre,
        origenEfectivo: origenEfectivo
    };
}

function tarjetaDesdeSupabase(item) {
    const detalles = item.detalles || '';
    const retirosMatch = detalles.match(/\[retiros:([^\]]+)\]/);
    let retiros = [];
    if (retirosMatch) {
        try {
            retiros = JSON.parse(decodeURIComponent(retirosMatch[1]));
        } catch (error) {
            retiros = [];
        }
    }
    return {
        id: String(item.id),
        nombre: item.nombre || 'Tarjeta',
        monto: Number(item.monto) || 0,
        retiros: Array.isArray(retiros) ? retiros : []
    };
}

function esTarjetaSupabase(item) {
    return /\[tipo:tarjeta\]/.test(item.detalles || '');
}

function esPreferenciaVisibilidadSupabase(item) {
    return (item.detalles || '').includes(MARCADOR_PREFERENCIAS_VISIBILIDAD);
}

function preferenciasVisibilidadDesdeSupabase(item) {
    try {
        const datos = JSON.parse(item.nombre || '{}');
        return {
            id: String(item.id),
            totalGeneralOculto: Boolean(datos.totalGeneralOculto),
            totalTarjetasOculto: Boolean(datos.totalTarjetasOculto),
            contrasena: typeof datos.contrasena === 'string' && datos.contrasena ? datos.contrasena : null
        };
    } catch (error) {
        return null;
    }
}

async function guardarPreferenciasVisibilidad() {
    const datos = {
        nombre: JSON.stringify({ totalGeneralOculto, totalTarjetasOculto, contrasena: contrasenaActual }),
        fecha: new Date().toISOString().slice(0, 10),
        hora: new Date().toTimeString().slice(0, 5),
        monto: 0,
        detalles: MARCADOR_PREFERENCIAS_VISIBILIDAD
    };
    const consulta = idPreferenciasVisibilidad
        ? supabaseClient.from(TABLA_SUPABASE).update(datos).eq('id', idPreferenciasVisibilidad)
        : supabaseClient.from(TABLA_SUPABASE).insert(datos).select('id').single();
    const { data, error } = await consulta;
    if (error) {
        console.error('No se pudieron guardar las preferencias de visibilidad:', error.message);
        return;
    }
    if (data?.id) idPreferenciasVisibilidad = String(data.id);
}

async function cargarPreferenciasVisibilidad(data) {
    const preferencia = data.find(esPreferenciaVisibilidadSupabase);
    if (!preferencia) {
        await guardarPreferenciasVisibilidad();
        return;
    }

    const valores = preferenciasVisibilidadDesdeSupabase(preferencia);
    if (!valores) return;

    idPreferenciasVisibilidad = valores.id;
    totalGeneralOculto = valores.totalGeneralOculto;
    totalTarjetasOculto = valores.totalTarjetasOculto;
    if (valores.contrasena) {
        contrasenaActual = valores.contrasena;
        localStorage.setItem('contrasena_cobros', contrasenaActual);
    }
    localStorage.setItem(CLAVE_TOTAL_GENERAL_OCULTO, String(totalGeneralOculto));
    localStorage.setItem(CLAVE_TOTAL_TARJETAS_OCULTO, String(totalTarjetasOculto));
}

function claveTarjeta(tarjeta) {
    return JSON.stringify({
        nombre: tarjeta.nombre.trim().toLowerCase(),
        monto: Number(tarjeta.monto).toFixed(2),
        retiros: tarjeta.retiros || []
    });
}

function quitarTarjetasDuplicadas(lista) {
    const claves = new Set();
    const duplicadas = [];
    const unicas = lista.filter(tarjeta => {
        const clave = claveTarjeta(tarjeta);
        if (claves.has(clave)) {
            duplicadas.push(tarjeta);
            return false;
        }
        claves.add(clave);
        return true;
    });
    return { unicas, duplicadas };
}

async function eliminarDuplicadasDeSupabase(tarjetasDuplicadas) {
    await Promise.all(tarjetasDuplicadas.map(async tarjeta => {
        const { error } = await supabaseClient
            .from(TABLA_SUPABASE)
            .delete()
            .eq('id', tarjeta.id);
        if (error) {
            console.error('No se pudo eliminar una tarjeta duplicada:', error.message);
        }
    }));
}

async function cargarRegistrosDesdeSupabase() {
    const { data, error } = await supabaseClient
        .from(TABLA_SUPABASE)
        .select('id, nombre, fecha, hora, monto, detalles')
        .order('fecha', { ascending: false });

    if (error) {
        console.error('No se pudieron cargar los registros desde Supabase:', error.message);
        return;
    }

    const tarjetasCargadas = data.filter(esTarjetaSupabase).map(tarjetaDesdeSupabase);
    const resultadoTarjetas = quitarTarjetasDuplicadas(tarjetasCargadas);
    const tarjetasNube = resultadoTarjetas.unicas;
    await eliminarDuplicadasDeSupabase(resultadoTarjetas.duplicadas);
    const todosLosRegistros = data.filter(item => !esTarjetaSupabase(item) && !esPreferenciaVisibilidadSupabase(item)).map(registroDesdeSupabase);
    tarjetas = tarjetasNube;
    
    // Separar ganancias semanales de los registros normales
    registros = todosLosRegistros.filter(r => r.tipo !== 'ganancia_semanal');
    gananciasSemanales = todosLosRegistros.filter(r => r.tipo === 'ganancia_semanal');
    
    localStorage.setItem('registros_cobros', JSON.stringify(registros));
    localStorage.setItem('ganancias_semanales', JSON.stringify(gananciasSemanales));
    actualizarInterfaz();
}

// Integrar la función para cargar automáticamente los datos de Supabase al abrir la aplicación
async function cargarDatosDesdeSupabase() {
  if (typeof supabaseClient === 'undefined' || !supabaseClient) return;

  try {
    const { data, error } = await supabaseClient
      .from(TABLA_SUPABASE)
      .select('*');

    if (error) {
      console.error('Error al obtener datos de Supabase:', error);
      return;
    }

    await cargarPreferenciasVisibilidad(data || []);

    if (data && data.length > 0) {
      // Parsear los datos usando la función existente para mantener consistencia
            const tarjetasCargadas = data.filter(esTarjetaSupabase).map(tarjetaDesdeSupabase);
            const resultadoTarjetas = quitarTarjetasDuplicadas(tarjetasCargadas);
            const tarjetasNube = resultadoTarjetas.unicas;
            await eliminarDuplicadasDeSupabase(resultadoTarjetas.duplicadas);
            tarjetas = tarjetasNube;
            localStorage.setItem('tarjetas_bancarias', JSON.stringify(tarjetas));

            const todosLosRegistros = data.filter(item => !esTarjetaSupabase(item) && !esPreferenciaVisibilidadSupabase(item)).map(registroDesdeSupabase);

      // Separar ganancias semanales de los registros normales
      registros = todosLosRegistros.filter(r => r.tipo !== 'ganancia_semanal');
      gananciasSemanales = todosLosRegistros.filter(r => r.tipo === 'ganancia_semanal');

      localStorage.setItem('registros_cobros', JSON.stringify(registros));
      localStorage.setItem('ganancias_semanales', JSON.stringify(gananciasSemanales));

      // Actualizar la interfaz de usuario con los datos de la nube
      if (typeof actualizarInterfaz === 'function') actualizarInterfaz();
        } else if (tarjetas.length > 0) {
            const resultadoLocales = quitarTarjetasDuplicadas(tarjetas);
            tarjetas = resultadoLocales.unicas;
            localStorage.setItem('tarjetas_bancarias', JSON.stringify(tarjetas));
            await sincronizarTarjetasConSupabase();
            actualizarInterfaz();
    }
        actualizarVisibilidadTotales();
  } catch (err) {
    console.error('Excepción al sincronizar con Supabase:', err);
  }
}

async function guardarRegistroEnSupabase(item) {
    const { fecha, hora } = separarFechaHora(item.fechaHora);
    const datos = {
        nombre: item.cliente,
        fecha,
        hora,
        monto: item.monto,
        detalles: detallesParaSupabase(item)
    };

    const consulta = item.id ?
        supabaseClient.from(TABLA_SUPABASE).update(datos).eq('id', item.id) :
        supabaseClient.from(TABLA_SUPABASE).insert(datos).select('id').single();
    const { data, error } = await consulta;

    if (error) {
        console.error('No se pudo guardar el registro en Supabase:', error.message);
        return null;
    }

    return item.id || String(data.id);
}

function resetFormulario() {
    form.reset();
    registroIdInput.value = '';
    document.getElementById('form-title').innerHTML = '<i class="fa-solid fa-circle-plus"></i> Registrar Nuevo Movimiento';
    btnGuardar.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Guardar Registro';
    btnCancelar.style.display = 'none';
    setFechaActual();
}

btnCancelar.addEventListener('click', resetFormulario);

function actualizarInterfaz() {
    renderTarjetas();
    renderTablas();
    renderGananciasSemanales();
    calcularTotales();
}

function renderTablas() {
    const tablaPendientes = document.getElementById('tabla-pendientes');
    const tablaCobrados = document.getElementById('tabla-cobrados');
    const tablaPrestado = document.getElementById('tabla-prestado');
    const tablaRecibido = document.getElementById('tabla-recibido');

    tablaPendientes.innerHTML = '';
    tablaCobrados.innerHTML = '';
    tablaPrestado.innerHTML = '';
    tablaRecibido.innerHTML = '';

    const pendientes = registros.filter(r => r.tipo === 'pendiente');
    const cobrados = registros.filter(r => r.tipo === 'cobrado');
    const prestado = registros.filter(r => r.tipo === 'prestado');
    const recibido = registros.filter(r => r.tipo === 'recibido');

    renderTabla(tablaPendientes, pendientes, 'No hay cobros pendientes registrados.');
    renderTabla(tablaCobrados, cobrados, 'No hay cobros realizados registrados.');
    renderTabla(tablaPrestado, prestado, 'No hay dinero prestado registrado.');
    renderTabla(tablaRecibido, recibido, 'No hay dinero recibido en préstamo registrado.');
}

function renderTabla(tabla, items, mensajeVacio) {
    if (items.length === 0) {
        tabla.innerHTML = `<tr><td colspan="5" class="empty-text">${mensajeVacio}</td></tr>`;
        return;
    }

    items.forEach(item => {
        tabla.appendChild(crearFila(item));
    });
}

function crearFila(item) {
    const tr = document.createElement('tr');
    const fechaFormateada = new Date(item.fechaHora).toLocaleString('es-EC', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });

    const esPendiente = item.tipo === 'pendiente';
    const esPrestamoPendiente = item.tipo === 'prestado' && item.estado !== 'pagado';
    const colorMonto = esPendiente ? '#ef4444' : item.tipo === 'prestado' ? '#f59e0b' : '#10b981';
    const textoDestino = item.tipo === 'recibido' || item.tipo === 'prestado'
        ? (item.origenTarjetaId || item.origenEfectivo ? 'Cambiar origen' : 'Retirar de tarjeta')
        : (item.tarjetaDestinoId || item.destinoEfectivo ? 'Cambiar destino' : 'Mandar a tarjeta');
    const estadoPrestamo = item.tipo === 'prestado'
        ? `<span class="estado-prestamo ${item.estado === 'pagado' ? 'pagado' : 'pendiente'}">${item.estado === 'pagado' ? '✅ Pagado' : '⏳ Deuda pendiente'}</span>`
        : '';

    tr.innerHTML = `
    <td><strong>${item.cliente}</strong></td>
    <td style="color: ${colorMonto}; font-weight: 700;">$${item.monto.toFixed(2)}</td>
    <td>${item.descripcion}${estadoPrestamo}</td>
    <td>${fechaFormateada}</td>
    <td>
      <div class="action-buttons">
                ${esPendiente ? `<button class="btn btn-pay" onclick="marcarComoCobrado('${item.id}')" title="Marcar como pagado"><i class="fa-solid fa-check"></i> Cobrar</button>` : ''}
                ${esPrestamoPendiente ? `<button class="btn btn-pay" onclick="marcarPrestamoComoPagado('${item.id}')" title="Pagar deuda"><i class="fa-solid fa-check"></i> Pagar deuda</button>` : ''}
        <button class="btn btn-edit" onclick="cargarParaEditar('${item.id}')" title="Editar registro"><i class="fa-solid fa-pen"></i></button>
        <button class="btn btn-destino" onclick="abrirEditarDestinoCalendario('${item.id}', true)" title="${textoDestino}"><i class="fa-solid fa-wallet"></i></button>
        <button class="btn btn-delete" onclick="eliminarRegistro('${item.id}')" title="Eliminar registro"><i class="fa-solid fa-trash"></i></button>
      </div>
    </td>
  `;
    return tr;
}

function marcarComoCobrado(id) {
    const item = registros.find(r => r.id === id);
    if (item) {
        item.tipo = 'cobrado';
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        item.fechaHora = now.toISOString().slice(0, 16);
        
        registroPendienteDeGuardar = item;
        mostrarModalSeleccionarTarjeta();
    }
}


function cargarParaEditar(id) {
    const item = registros.find(r => r.id === id);
    if (item) {
        registroIdInput.value = item.id;
        tipoInput.value = item.tipo;
        clienteInput.value = item.cliente;
        montoInput.value = item.monto;
        descripcionInput.value = item.descripcion;
        fechaHoraInput.value = item.fechaHora;

        document.getElementById('form-title').innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Editar Registro';
        btnGuardar.innerHTML = '<i class="fa-solid fa-arrows-rotate"></i> Actualizar Registro';
        btnCancelar.style.display = 'inline-flex';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function eliminarRegistro(id) {
    registroPendienteDeEliminar = id;
    tarjetaPendienteDeEliminar = null;
    retiroPendienteDeEliminar = null;
    modalTituloEliminacion.textContent = '¿Estás seguro de que quieres eliminar este registro?';
    modalMensajeEliminacion.textContent = 'Esta acción no se puede deshacer.';
    modalEliminar.hidden = false;
    btnCancelarEliminacion.focus();
}

function cerrarModalEliminar() {
    modalEliminar.hidden = true;
    registroPendienteDeEliminar = null;
    tarjetaPendienteDeEliminar = null;
    retiroPendienteDeEliminar = null;
    gananciaPendienteDeEliminar = null;
    modalTituloEliminacion.textContent = '¿Estás seguro de que quieres eliminar este registro?';
    modalMensajeEliminacion.textContent = 'Esta acción no se puede deshacer.';
}

async function confirmarEliminacion() {
    if (gananciaPendienteDeEliminar) {
        const id = gananciaPendienteDeEliminar.id;
        gananciasSemanales = gananciasSemanales.filter(ganancia => ganancia.id !== id);
        localStorage.setItem('ganancias_semanales', JSON.stringify(gananciasSemanales));
        renderGananciasSemanales();
        eliminarRegistroDeSupabase(id);
        cerrarModalEliminar();
        return;
    }

    if (retiroPendienteDeEliminar) {
        const { tarjeta, retiro } = retiroPendienteDeEliminar;
        tarjeta.monto += retiro.monto;
        tarjeta.retiros = tarjeta.retiros.filter(item => item.id !== retiro.id);
        guardarTarjetas();
        renderTarjetas();
        renderDetalleTarjeta();
        cerrarModalEliminar();
        return;
    }

    if (tarjetaPendienteDeEliminar) {
        const id = tarjetaPendienteDeEliminar.id;
        tarjetas = tarjetas.filter(t => t.id !== id);
        localStorage.removeItem(`tarjeta-oculta-${id}`);
        await guardarTarjetas();
        await eliminarTarjetaDeSupabase(id);
        renderTarjetas();
        cerrarModalEliminar();
        return;
    }

    if (!registroPendienteDeEliminar) {
        return;
    }

    const id = registroPendienteDeEliminar;
    registros = registros.filter(r => r.id !== id);
    guardarYActualizar();
    eliminarRegistroDeSupabase(id);
    cerrarModalEliminar();
}

async function eliminarRegistroDeSupabase(id) {
    const { error } = await supabaseClient.from(TABLA_SUPABASE).delete().eq('id', id);
    if (error) {
        console.error('No se pudo eliminar el registro de Supabase:', error.message);
    }
}

btnCerrarModal.addEventListener('click', cerrarModalEliminar);
btnCancelarEliminacion.addEventListener('click', cerrarModalEliminar);
btnConfirmarEliminacion.addEventListener('click', confirmarEliminacion);

modalEliminar.addEventListener('click', function(e) {
    if (e.target === modalEliminar) {
        cerrarModalEliminar();
    }
});

function calcularTotales() {
    const ahora = new Date();

    let totalDiario = 0;
    let totalSemanal = 0;
    let totalMensual = 0;
    let totalPendiente = 0;
    let totalPrestado = 0;
    let totalRecibido = 0;
    let totalMontoGeneral = 0;

        registros.forEach(item => {
        const fechaItem = new Date(item.fechaHora);

        if (item.tipo === 'cobrado') {
            totalMontoGeneral += item.monto;
            if (
                fechaItem.getDate() === ahora.getDate() &&
                fechaItem.getMonth() === ahora.getMonth() &&
                fechaItem.getFullYear() === ahora.getFullYear()
            ) {
                totalDiario += item.monto;
            }

            const diferenciaDias = (ahora - fechaItem) / (1000 * 60 * 60 * 24);
            if (diferenciaDias >= 0 && diferenciaDias <= 7) {
                totalSemanal += item.monto;
            }

            if (
                fechaItem.getMonth() === ahora.getMonth() &&
                fechaItem.getFullYear() === ahora.getFullYear()
            ) {
                totalMensual += item.monto;
            }
        } else if (item.tipo === 'pendiente') {
            totalPendiente += item.monto;
        } else if (item.tipo === 'prestado') {
            totalPrestado += item.monto;
        } else if (item.tipo === 'recibido') {
            totalRecibido += item.monto;
        }
    });

    // Sumar ganancias semanales pagadas a los totales
    gananciasSemanales.forEach(item => {
        const fechaItem = new Date(item.fechaHora);
        
        if (item.estado === 'pagado') {
            totalMontoGeneral += item.monto;
            
            if (
                fechaItem.getDate() === ahora.getDate() &&
                fechaItem.getMonth() === ahora.getMonth() &&
                fechaItem.getFullYear() === ahora.getFullYear()
            ) {
                totalDiario += item.monto;
            }

            const diferenciaDias = (ahora - fechaItem) / (1000 * 60 * 60 * 24);
            if (diferenciaDias >= 0 && diferenciaDias <= 7) {
                totalSemanal += item.monto;
            }

            if (
                fechaItem.getMonth() === ahora.getMonth() &&
                fechaItem.getFullYear() === ahora.getFullYear()
            ) {
                totalMensual += item.monto;
            }
        } else if (item.estado === 'pendiente') {
            totalPendiente += item.monto;
        }
    });

    document.getElementById('total-diario').innerText = `$${totalDiario.toFixed(2)}`;
    document.getElementById('total-semanal').innerText = `$${totalSemanal.toFixed(2)}`;
    document.getElementById('total-mensual').innerText = `$${totalMensual.toFixed(2)}`;
    document.getElementById('total-pendiente').innerText = `$${totalPendiente.toFixed(2)}`;
    document.getElementById('total-prestado').innerText = `$${totalPrestado.toFixed(2)}`;
    document.getElementById('total-recibido').innerText = `$${totalRecibido.toFixed(2)}`;
    montoTotalGeneralElement.innerText = totalGeneralOculto ? '••••••' : `$${totalMontoGeneral.toFixed(2)}`;
}

window.editarGananciaSemanal = function(id) {
    const ganancia = gananciasSemanales.find(item => item.id === id);
    if (!ganancia) return;

    gananciaEnEdicion = ganancia;
    document.getElementById('input-estado-ganancia').value = ganancia.estado || 'pagado';
    document.getElementById('input-fecha-ganancia').value = ganancia.fechaHora.slice(0, 16);
    document.getElementById('input-descripcion-ganancia').value = ganancia.descripcion || '';
    checkboxEntrelazarDias.checked = Boolean(ganancia.entrelazarDias);
    checkboxMultiplesTrabajos.checked = Object.keys(ganancia.descripcionesPorDia || {}).length > 0;
    document.querySelectorAll('.checkbox-dia').forEach(checkbox => {
        checkbox.checked = ganancia.dias.includes(Number(checkbox.value));
    });
    actualizarSelectorDias();
    actualizarDescripcionesDias();

    if (checkboxMultiplesTrabajos.checked) {
        Object.entries(ganancia.descripcionesPorDia || {}).forEach(([dia, trabajos]) => {
            const listaTrabajos = Array.isArray(trabajos) ? trabajos : [{ descripcion: trabajos, monto: 0 }];
            const grupo = descripcionesDias.querySelector(`[data-dia-grupo="${dia}"]`);
            if (!grupo) return;

            const primerTrabajo = listaTrabajos[0] || { descripcion: '', monto: 0 };
            grupo.querySelector('.descripcion-dia-input').value = primerTrabajo.descripcion || '';
            grupo.querySelector('.precio-dia-input').value = Number.isFinite(Number(primerTrabajo.monto)) ? Number(primerTrabajo.monto).toFixed(2) : '';
            for (let indice = 1; indice < listaTrabajos.length; indice += 1) {
                grupo.querySelector('.btn-agregar-trabajo-dia').click();
                const inputs = grupo.querySelectorAll('.descripcion-dia-input');
                const precios = grupo.querySelectorAll('.precio-dia-input');
                inputs[inputs.length - 1].value = listaTrabajos[indice].descripcion || '';
                precios[precios.length - 1].value = Number.isFinite(Number(listaTrabajos[indice].monto)) ? Number(listaTrabajos[indice].monto).toFixed(2) : '';
            }
        });
        actualizarMontoDesglosado();
    } else {
        inputMontoGanancia.value = Number(ganancia.monto).toFixed(2);
    }

    textoGuardarGanancia.textContent = 'Guardar cambios';
    iconoGuardarGanancia.className = 'fa-solid fa-check';
    btnCancelarEdicionGanancia.hidden = false;
    modalAgregarGanancia.style.display = 'flex';
}

window.marcarPrestamoComoPagado = function(id) {
    const prestamo = registros.find(registro => registro.id === id && registro.tipo === 'prestado');
    if (!prestamo || prestamo.estado === 'pagado') return;

    prestamo.estado = 'pagado';
    registroPendienteDeGuardar = prestamo;
    mostrarModalSeleccionarTarjeta();
}

// Iniciar la carga al completar la lectura del DOM
cargaInicialSupabase = cargarDatosDesdeSupabase();