document.addEventListener('DOMContentLoaded', () => {
    const avisos = [
        {
        id: 1,
        pubDate: '20/08/2025 10:00',
        entregaDate: '22/08/2025 14:00',
        comuna: 'Santiago',
        sector: 'Centro',
        cantidad: 1,
        especie: 'Gato',
        edad: '2 años',
        contacto: 'Ana Pérez',
        fotos: ['https://cdn.pixabay.com/photo/2017/03/14/14/49/cat-2143332_1280.jpg']
        },
        {
        id: 2,
        pubDate: '18/08/2025 09:30',
        entregaDate: '21/08/2025 16:00',
        comuna: 'Ñuñoa',
        sector: 'Villa Olímpica',
        cantidad: 2,
        especie: 'Perro',
        edad: '3 meses',
        contacto: 'Luis Gómez',
        fotos: [
        'https://cdn.pixabay.com/photo/2014/08/21/14/51/dog-423398_1280.jpg',
        'https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_1280.jpg'
        ]
    },
    {
        id: 3,
        pubDate: '15/08/2025 11:15',
        entregaDate: '18/08/2025 13:00',
        comuna: 'Providencia',
        sector: 'Bellavista',
        cantidad: 1,
        especie: 'Gato',
        edad: '1 año',
        contacto: 'María Torres',
        fotos: ['https://cdn.pixabay.com/photo/2016/02/10/16/37/cat-1192026_1280.jpg']
    },
    {
        id: 4,
        pubDate: '12/08/2025 08:45',
        entregaDate: '15/08/2025 12:00',
        comuna: 'La Reina',
        sector: 'Santa Elena',
        cantidad: 3,
        especie: 'Perro',
        edad: '4 años',
        contacto: 'Pedro Díaz',
        fotos: ['https://cdn.pixabay.com/photo/2016/07/08/15/28/american-bulldogs-1504599_1280.jpg']
    },
    {
        id: 5,
        pubDate: '10/08/2025 10:20',
        entregaDate: '13/08/2025 15:30',
        comuna: 'Las Condes',
        sector: 'El Golf',
        cantidad: 1,
        especie: 'Gato',
        edad: '6 meses',
        contacto: 'Carla Ruiz',
        fotos: ['https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg']
        }
    ];

    const tbody = document.getElementById('avisos-tbody');
    const detalleSec = document.getElementById('detalle-section');
    const listadoSec = document.getElementById('listado-section');
    const detalleDiv = document.getElementById('detalle-content');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    avisos.forEach(av => {
        const tr = document.createElement('tr');
        tr.classList.add('clickable');
        tr.innerHTML = `
         <td>${av.pubDate}</td>
         <td>${av.entregaDate}</td>
         <td>${av.comuna}</td>
         <td>${av.sector}</td>
         <td>${av.cantidad} × ${av.especie} — ${av.edad}</td>
         <td>${av.contacto}</td>
         <td>${av.fotos.length}</td>
        `;
        tr.addEventListener('click', () => showDetalle(av));
        tbody.appendChild(tr);
    });
    function showDetalle(av) {
        listadoSec.classList.add('hidden');
        detalleSec.classList.remove('hidden');
        detalleDiv.innerHTML = `
            <p><strong>Fecha Publicación:</strong> ${av.pubDate}</p>
            <p><strong>Fecha Entrega:</strong> ${av.entregaDate}</p>
            <p><strong>Comuna:</strong> ${av.comuna}</p>
            <p><strong>Sector:</strong> ${av.sector}</p>
            <p><strong>Cantidad:</strong> ${av.cantidad}</p>
            <p><strong>Especie / Edad:</strong> ${av.especie} — ${av.edad}</p>
            <p><strong>Contacto:</strong> ${av.contacto}</p>
            <div id="fotos-detalle">
                ${av.fotos.map(src => `<img src="${src}" width="320" height="240" class="miniatura">`).join('')}
            </div>
        `;
        detalleDiv.querySelectorAll('.miniatura').forEach(img => {
            img.addEventListener('click', () => {
                modalImg.src = img.src.replace('320x240','800x600');
                modal.classList.remove('hidden');
            });
        });
    }
    document.getElementById('back-list').addEventListener('click', () => {
        detalleSec.classList.add('hidden');
        listadoSec.classList.remove('hidden');
    });
    document.getElementById('close-modal').addEventListener('click', () => {
        modal.classList.add('hidden')
    });
});