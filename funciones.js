// Reservas base ya ocupadas para demostración por espacio
const reservas = [
  { espacio: "Sala Focus A", inicio: 10, fin: 12 },
  { espacio: "Aula Innovación B", inicio: 14, fin: 16 },
  { espacio: "Aula Creativa C", inicio: 9, fin: 11 }
];

/**
 * Obtiene el nombre del espacio o aula seleccionado en el formulario.
 */
function getEspacioActual() {
  const roomEl = document.getElementById('room');
  return roomEl ? roomEl.value : 'Sala Focus A';
}

/**
 * Maneja el cambio de aula en el selector, limpiando mensajes y refrescando el timeline.
 */
function cambiarEspacio() {
  const out = document.getElementById('msg');
  if (out) out.innerHTML = '';
  renderTimeline();
}

/**
 * Renderiza la línea de tiempo (timeline) de 8:00 a 18:00
 * indicando bloques disponibles y ocupados para el aula seleccionada.
 */
function renderTimeline() {
  const room = getEspacioActual();
  const slotsContainer = document.getElementById('timelineSlots');
  const listContainer = document.getElementById('resList');
  if (!slotsContainer || !listContainer) return;

  slotsContainer.innerHTML = '';

  // Filtrar reservas que pertenecen exclusivamente al aula actual
  const reservasEspacio = reservas.filter(r => r.espacio === room);

  // Horas de 8 a 17 (cada slot representa 1 bloque horario: 8-9, 9-10, ..., 17-18)
  for (let h = 8; h < 18; h++) {
    const isOccupied = reservasEspacio.some(r => h >= r.inicio && h < r.fin);
    const slotEl = document.createElement('div');
    slotEl.className = 'time-slot' + (isOccupied ? ' occupied' : '');
    slotEl.title = `${h}:00 - ${h + 1}:00: ` + (isOccupied ? 'Ocupado' : 'Disponible');
    slotEl.textContent = `${h}h`;
    slotsContainer.appendChild(slotEl);
  }

  // Listado de chips informativos de reservas para el aula actual
  listContainer.innerHTML = `<span style="font-size:11px; color:#64748b; margin-right:4px;">Reservas en ${room}:</span>`;
  
  if (reservasEspacio.length === 0) {
    listContainer.innerHTML += '<span style="font-size:11px; color:#94a3b8; font-style:italic;">Sin reservas registradas para hoy.</span>';
  } else {
    reservasEspacio.forEach((r, idx) => {
      const chip = document.createElement('span');
      chip.className = 'res-chip';
      chip.innerHTML = `<strong>#${idx + 1}</strong> ${r.inicio}:00 - ${r.fin}:00`;
      listContainer.appendChild(chip);
    });
  }
}

/**
 * Valida los datos y registra una nueva reserva evitando solapamientos en el aula seleccionada.
 */
function reservar() {
  const room = getEspacioActual();
  const startEl = document.getElementById('start');
  const endEl = document.getElementById('end');
  const out = document.getElementById('msg');

  const s = parseInt(startEl.value, 10);
  const e = parseInt(endEl.value, 10);

  // Validación de entradas y rango horario
  if (isNaN(s) || isNaN(e) || s >= e || s < 8 || e > 18) {
    out.innerHTML = `
      <div class="alert alert-error">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span>Error: Rango de horas inválido (Horario hábil: 8:00 a 18:00 y la hora de inicio debe ser menor al fin).</span>
      </div>`;
    return;
  }

  // Verificación de solapamiento únicamente en el aula seleccionada
  const solapa = reservas.find(r => r.espacio === room && (s < r.fin && e > r.inicio));

  if (solapa) {
    out.innerHTML = `
      <div class="alert alert-error">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </svg>
        <span>Conflicto: Horario ya reservado en ${room} (${solapa.inicio}:00 a ${solapa.fin}:00).</span>
      </div>`;
  } else {
    reservas.push({ espacio: room, inicio: s, fin: e });
    out.innerHTML = `
      <div class="alert alert-success">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span>¡Reserva exitosa registrada en ${room} de ${s}:00 a ${e}:00!</span>
      </div>`;
    renderTimeline();
  }
}

// Inicializar la vista al cargar la página
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderTimeline);
} else {
  renderTimeline();
}
