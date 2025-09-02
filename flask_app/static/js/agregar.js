document.addEventListener('DOMContentLoaded', () => {
    const regionComuna = {
        regiones: [
            {
            nombre: "Región de Tarapacá",
            comunas: ["Camiña", "Huara", "Pozo Almonte", "Iquique", "Pica", "Colchane", "Alto Hospicio"]
            },
            {
            nombre: "Región de Antofagasta",
            comunas: ["Tocopilla", "Maria Elena", "Ollague", "Calama", "San Pedro Atacama", "Sierra Gorda", "Mejillones", "Antofagasta", "Taltal"]
            },
            {
            nombre: "Región de Atacama",
            comunas: ["Diego de Almagro", "Chañaral", "Caldera", "Copiapo", "Tierra Amarilla", "Huasco", "Freirina", "Vallenar", "Alto del Carmen"]
            },
            {
            nombre: "Región de Coquimbo",
            comunas: ["La Higuera", "La Serena", "Vicuña", "Paihuano", "Coquimbo", "Andacollo", "Rio Hurtado", "Ovalle", "Monte Patria", "Punitaqui", "Combarbala", "Mincha", "Illapel", "Salamanca", "Los Vilos"]
            },
            {
            nombre: "Región de Valparaíso",
            comunas: ["Petorca", "Cabildo", "Papudo", "La Ligua", "Zapallar", "Putaendo", "Santa Maria", "San Felipe", "Pencahue", "Catemu", "Llay Llay", "Nogales", "La Calera", "Hijuelas", "La Cruz", "Quillota", "Olmue", "Limache", "Los Andes", "Rinconada", "Calle Larga", "San Esteban", "Puchuncavi", "Quintero", "Viña del Mar", "Villa Alemana", "Quilpue", "Valparaiso", "Juan Fernandez", "Casablanca", "Concon", "Isla de Pascua", "Algarrobo", "El Quisco", "El Tabo", "Cartagena", "San Antonio", "Santo Domingo"]
            },
            {
            nombre: "Región del Libertador Bernardo Ohiggins",
            comunas: ["Mostazal", "Codegua", "Graneros", "Machali", "Rancagua", "Olivar", "Doñihue", "Requinoa", "Coinco", "Coltauco", "Quinta Tilcoco", "Las Cabras", "Rengo", "Peumo", "Pichidegua", "Malloa", "San Vicente", "Navidad", "La Estrella", "Marchigue", "Pichilemu", "Litueche", "Paredones", "San Fernando", "Peralillo", "Placilla", "Chimbarongo", "Palmilla", "Nancagua", "Santa Cruz", "Pumanque", "Chepica", "Lolol"]
            },
            {
            nombre: "Región del Maule",
            comunas: ["Teno", "Romeral", "Rauco", "Curico", "Sagrada Familia", "Hualañe", "Vichuquen", "Molina", "Licanten", "Rio Claro", "Curepto", "Pelarco", "Talca", "Pencahue", "San Clemente", "Constitucion", "Maule", "Empedrado", "San Rafael", "San Javier", "Colbun", "Villa Alegre", "Yerbas Buenas", "Linares", "Longavi", "Retiro", "Parral", "Chanco", "Pelluhue", "Cauquenes"]
            },
            {
            nombre: "Región del Biobío",
            comunas: ["Tome", "Florida", "Penco", "Talcahuano", "Concepcion", "Hualqui", "Coronel", "Lota", "Santa Juana", "Chiguayante", "San Pedro de la Paz", "Hualpen", "Cabrero", "Yumbel", "Tucapel", "Antuco", "San Rosendo", "Laja", "Quilleco", "Los Angeles", "Nacimiento", "Negrete", "Santa Barbara", "Quilaco", "Mulchen", "Alto Bio Bio", "Arauco", "Curanilahue", "Los Alamos", "Lebu", "Cañete", "Contulmo", "Tirua"]
            },
            {
            nombre: "Región de La Araucanía",
            comunas: ["Renaico", "Angol", "Collipulli", "Los Sauces", "Puren", "Ercilla", "Lumaco", "Victoria", "Traiguen", "Curacautin", "Lonquimay", "Perquenco", "Galvarino", "Lautaro", "Vilcun", "Temuco", "Carahue", "Melipeuco", "Nueva Imperial", "Puerto Saavedra", "Cunco", "Freire", "Pitrufquen", "Teodoro Schmidt", "Gorbea", "Pucon", "Villarrica", "Tolten", "Curarrehue", "Loncoche", "Padre Las Casas", "Cholchol"]
            },
            {
            nombre: "Región de Los Lagos",
            comunas: ["San Pablo", "San Juan", "Osorno", "Puyehue", "Rio Negro", "Purranque", "Puerto Octay", "Frutillar", "Fresia", "Llanquihue", "Puerto Varas", "Los Muermos", "Puerto Montt", "Maullin", "Calbuco", "Cochamo", "Ancud", "Quemchi", "Dalcahue", "Curaco de Velez", "Castro", "Chonchi", "Queilen", "Quellon", "Quinchao", "Puqueldon", "Chaiten", "Futaleufu", "Palena", "Hualaihue"]
            },
            {
            nombre: "Región Aisén del General Carlos Ibáñez del Campo",
            comunas: ["Guaitecas", "Cisnes", "Aysen", "Coyhaique", "Lago Verde", "Rio Ibañez", "Chile Chico", "Cochrane", "Tortel", "O'Higins"]
            },
            {
            nombre: "Región de Magallanes y la Antártica Chilena",
            comunas: ["Torres del Paine", "Puerto Natales", "Laguna Blanca", "San Gregorio", "Rio Verde", "Punta Arenas", "Porvenir", "Primavera", "Timaukel", "Antartica"]
            },
            {
            nombre: "Región Metropolitana de Santiago",
            comunas: ["Tiltil", "Colina", "Lampa", "Conchali", "Quilicura", "Renca", "Las Condes", "Pudahuel", "Quinta Normal", "Providencia", "Santiago", "La Reina", "Ñuñoa", "San Miguel", "Maipu", "La Cisterna", "La Florida", "La Granja", "Independencia", "Huechuraba", "Recoleta", "Vitacura", "Lo Barrenechea", "Macul", "Peñalolen", "San Joaquin", "La Pintana", "San Ramon", "El Bosque", "Pedro Aguirre Cerda", "Lo Espejo", "Estacion Central", "Cerrillos", "Lo Prado", "Cerro Navia", "San Jose de Maipo", "Puente Alto", "Pirque", "San Bernardo", "Calera de Tango", "Buin", "Paine", "Peñaflor", "Talagante", "El Monte", "Isla de Maipo", "Curacavi", "Maria Pinto", "Melipilla", "San Pedro", "Alhue", "Padre Hurtado"]
            },
            {
            nombre: "Región de Los Ríos",
            comunas: ["Lanco", "Mariquina", "Panguipulli", "Mafil", "Valdivia", "Los Lagos", "Corral", "Paillaco", "Futrono", "Lago Ranco", "La Union", "Rio Bueno"]
            },
            {
            nombre: "Región Arica y Parinacota",
            comunas: ["Gral. Lagos", "Putre", "Arica", "Camarones"]
            },
            {
            nombre: "Región del Ñuble",
            comunas: ["Cobquecura", "Ñiquen", "San Fabian", "San Carlos", "Quirihue", "Ninhue", "Trehuaco", "San Nicolas", "Coihueco", "Chillan", "Portezuelo", "Pinto", "Coelemu", "Bulnes", "San Ignacio", "Ranquil", "Quillon", "El Carmen", "Pemuco", "Yungay", "Chillan Viejo"]
            }
        ]
    };

    const regionEl = document.getElementById('region');
    const comunaEl = document.getElementById('comuna');
    const contactoPor = document.getElementById('contacto-por');
    const contactoIdContainer = document.getElementById('contacto-id-container');
    const contactoIdInput = document.getElementById('contacto-id');
    const fechaDisponibleEl = document.getElementById('fecha-disponible');
    const addFotoBtn = document.getElementById('ad-foto');
    const fotosContainer = document.getElementById('fotos-container');
    const form = document.getElementById('form-aviso');
    const dialogo = document.getElementById('confirm-dialog');
    const exito = document.getElementById('mensaje-exito');
    const maxFotos = 5;

    regionComuna.regiones.forEach(r => {
        const opt = document.createElement('option');
        opt.value = r.nombre;
        opt.textContent = r.nombre;
        regionEl.appendChild(opt);
    });

    regionEl.addEventListener('change', () => {
        comunaEl.innerHTML = '<option value="">Seleccione comuna</option>';
        const s = regionComuna.regiones.find(r => r.nombre === regionEl.value);
        if (s) {
            s.comunas.forEach(c => {
                const op = document.createElement('option');
                op.value = c;
                op.textContent = c;
                comunaEl.appendChild(op);
            });
        }
    });

    contactoPor.addEventListener('change', () => {
        if(contactoPor.value) {
            contactoIdContainer.classList.remove('hidden');
            contactoIdInput.required = true;
        } else {
            contactoIdContainer.classList.add('hidden');
            contactoIdInput.required = false
        }
    });

    const ahora = new Date();
    ahora.setHours(ahora.getHours() + 3);
    const iso = ahora.toISOString().slice(0,16);
    fechaDisponibleEl.value = iso;
    fechaDisponibleEl.min = iso;

    addFotoBtn.addEventListener('click', () => {
        const actuales = fotosContainer.querySelectorAll('input[type="file"]').length;
        if (actuales < maxFotos) {
            const nuevo = document.createElement('input');
            nuevo.type = 'file';
            nuevo.name = 'fotos';
            nuevo.accept = 'image/*';
            fotosContainer.appendChild(nuevo);
        } else {
            alert('Solo se puede subir un máximo de 5 fotos');
        }
    });
    
    form.addEventListener('submit', e => {
        e.preventDefault();
        const errores = [];
        if(!regionEl.value) errores.push('Seleccione región. ');
        if(!comunaEl.value) errores.push('Seleccion comuna. ');
        const sector = document.getElementById('sector').value.trim();
        if(sector.length === 0 || sector.length > 100) errores.push('Sector no válido.');
        const nombre = document.getElementById('nombre').value.trim();
        if (nombre.length < 3 || nombre.length > 200) errores.push('Nombre no válido.');
        const email = document.getElementById('email').value.trim();
        const emailFO = /^[^@]+@[^@]+\.[a-z]{2,}$/i;
        if(!emailFO.test(email) || email.length > 100) errores.push('emai no válido.');
        const tel = document.getElementById('telefono').value.trim();
        const telFO = /^\+569\d{8}$/;
        if(!telFO.test(tel)) errores.push('Teléfono inválido.');
        if(contactoPor.value) {
            const c_id = contactoIdInput.value.trim();
            if(c_id.length < 4 || c_id.length > 50) errores.push('Contacto no válido.');
        }

        const tipo = document.getElementById('tipo').value;
        if(!tipo) errores.push('Seleccione tipo de mascota. ');
        const cantidad = parseInt(document.getElementById('cantidad').value, 10);
        if(isNaN(cantidad) || cantidad < 1) errores.push('Cantidad inválida.');
        const edad = parseInt(document.getElementById('edad').value, 10);
        if(isNaN(edad) || edad < 1) errores.push('Edad inválida.');
        const unidad = document.getElementById('unidad-edad').value;
        if(!unidad) errores.push('Seleccione unidad de edad. ');
        const entrega = new Date(fechaDisponibleEl.value);
        if(isNaN(entrega.getTime()) || entrega < ahora) errores.push('Fecha no válida.')
        
        const fotos = fotosContainer.querySelectorAll('input[type="file"]');
        if (fotos.length < 1) errores.push('Debe subir al menos 1 foto.');
        if(fotos.length > 5) errores.push('Solo se puede subir un máximo de 5 fotos.');
        if(errores.length) {
            alert('Errores:\n' + errores.join('\n'));
            return;
        }

        form.classList.add('hidden');
        dialogo.classList.remove('hidden');
    });

    document.getElementById('confirmar-si').addEventListener('click', () => {
        dialogo.classList.add('hidden');
        exito.classList.remove('hidden');
    });
    document.getElementById('confirmar-no').addEventListener('click', () => {
        dialogo.classList.add('hidden');
        form.classList.remove('hiddden');
    });
});