const ultimosAvisos = [
    {
        fecha: '2025-08-19',
        comuna: 'Santiago',
        sector: 'República',
        cantidad: '2',
        especie: 'Perros',
        edad: '6 meses',
        foto: 'https://cdn.pixabay.com/photo/2021/07/24/07/25/chow-chow-6488849_1280.jpg'
    },
    {
        fecha: '2025-02-26',
        comuna: 'Vitacura',
        sector: 'Jardín del este',
        cantidad: '1',
        especie: 'Gato',
        edad: '2 meses',
        foto: 'https://cdn.pixabay.com/photo/2013/11/22/23/07/kitten-216019_1280.jpg'
    },
    {
        fecha: '2025-01-04',
        comuna: 'Ñuñoa',
        sector: 'Chile España',
        cantidad: '1',
        especie: 'Perro',
        edad: '9 meses',
        foto: 'https://cdn.pixabay.com/photo/2016/11/21/15/48/dog-1846066_1280.jpg'
    },
    {
        fecha: '2025-07-15',
        comuna: 'Ñuñoa',
        sector: 'Chile España',
        cantidad: '3',
        especie: 'Gatos',
        edad: '2 meses',
        foto: 'https://cdn.pixabay.com/photo/2018/07/13/10/20/kittens-3535404_1280.jpg'
    },
    {
        fecha: '2025-03-29',
        comuna: 'Maipú',
        sector: 'El Abrazo',
        cantidad: '1',
        especie: 'Perro',
        edad: '3 meses',
        foto: 'https://cdn.pixabay.com/photo/2016/02/18/18/37/puppy-1207816_1280.jpg'
    }
];

function mostrarUltimosAvisos() {
    const tbody = document.getElementById('avisos-list');
    ultimosAvisos.forEach(aviso => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
         <td>${aviso.fecha}</td>
         <td>${aviso.comuna}</td>
         <td>${aviso.sector}</td>
         <td>${aviso.cantidad} - ${aviso.especie} - ${aviso.edad}</td>
         <td><img src="${aviso.foto}" width="100" height="75" alt="${aviso.especie}"></td>
        `;
        tbody.appendChild(tr);
    });
}
document.addEventListener('DOMContentLoaded', mostrarUltimosAvisos);