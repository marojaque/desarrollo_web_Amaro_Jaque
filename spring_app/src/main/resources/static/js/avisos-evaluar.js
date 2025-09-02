// avisos-evaluar.js
document.addEventListener('DOMContentLoaded', function() {
  cargarAvisos();
});

function escapeHtml(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

async function cargarAvisos() {
  try {
    const res = await fetch('/api/avisos');
    if (!res.ok) {
      console.error('Error al listar avisos', res.status);
      return;
    }
    const avisos = await res.json();
    const tbody = document.querySelector('#avisos-table tbody');
    tbody.innerHTML = avisos.map(a => {
      const fecha = a.fecha ? new Date(a.fecha).toLocaleDateString('es-CL') : '-';
      return `
      <tr data-aviso-id="${a.id}">
        <td>${a.id}</td>
        <td>${fecha}</td>
        <td>${escapeHtml(a.sector || '')}</td>
        <td>${escapeHtml(a.cantidadTipoEdad || '')}</td>
        <td>${escapeHtml(a.comuna || '-')}</td>
        <td class="nota-cell">${a.promedio == null ? '-' : a.promedio} <span class="nota-count">(${a.cantidadNotas || 0})</span></td>
        <td><a href="#" class="evaluar-link">evaluar</a></td>
      </tr>`;
    }).join('');

    document.querySelectorAll('.evaluar-link').forEach(link => link.addEventListener('click', onEvaluarClick));
  } catch (err) {
    console.error('Error de red cargando avisos', err);
  }
}

async function onEvaluarClick(e) {
  e.preventDefault();
  const tr = e.target.closest('tr');
  const avisoId = tr.dataset.avisoId;
  let input = prompt("Ingrese una nota entre 1 y 7 (entero):");
  if (input === null) return;
  input = input.trim();
  const nota = parseInt(input, 10);
  if (isNaN(nota) || nota < 1 || nota > 7 || !Number.isInteger(nota)) {
    alert('Nota inválida. Debe ser un entero entre 1 y 7.');
    return;
  }

  try {
    const res = await fetch(`/api/avisos/${avisoId}/nota`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ nota })
    });

    if (res.status === 201) {
      const data = await res.json();
      updateRowNota(tr, data.promedio, data.cantidad);
    } else {
      const errData = await res.json().catch(()=>({error:'error'}));
      alert('No se pudo registrar la nota: ' + (errData.error || JSON.stringify(errData)));
    }
  } catch (err) {
    console.error('Error de red al enviar nota', err);
    alert('Error de red al enviar nota');
  }
}

function updateRowNota(tr, promedio, cantidad) {
  const cell = tr.querySelector('.nota-cell');
  if (!cell) return;
  cell.innerHTML = (promedio == null ? '-' : promedio) + ' <span class="nota-count">(' + (cantidad || 0) + ')</span>';
}