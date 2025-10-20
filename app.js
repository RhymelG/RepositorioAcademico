document.addEventListener('DOMContentLoaded', () => {
  let allCertificates = [];
  let filteredCertificates = [];
  let sortAsc = true;

  async function loadCertificates() {
    // Datos directamente en el código, sin intentar cargar JSON
    return [
      {
        id: "1",
        title: "Introducción a la Seguridad de la Información",
        issuer: "Fundación Telefonica Movistar",
        date: "2024-08-30",
        file: "pdfs/Introducción a la Seguridad de la Información (Fundacion Telefonica Movistar).pdf",
        type: "pdf" // indicador explícito que es PDF
      }
      ,{
        id: "2",
        title: "Diseño Web con HTML5 + CSS",
        issuer: "Fundación Telefonica Movistar",
        date: "2023-12-03",
        file: "pdfs/Diseño Web con HTML5 + CSS (Fundacion Telefonica Movistar).pdf",
        type: "pdf"
      }
      ,{
        id: "3",
        title: "Office Intermedio",
        issuer: "Fundación Telefonica Movistar",
        date: "2024-09-04",
        file: "pdfs/Office Intermedio (Fundacion Telefonica Movistar).pdf",
        type: "pdf"
      }
      ,{
        id: "4",
        title: "Programación con JavaScript",
        issuer: "Fundación Telefonica Movistar",
        date: "2023-12-30",
        file: "pdfs/Programación con JavaScript (Fundacion Telefonica Movistar).pdf",
        type: "pdf"
      }
      ,{
        id: "5",
        title: "Bases de Datos Relacionales y No Relacionales",
        issuer: "Universidad Politécnica de Madrid",
        date: "2024-09-14",
        file: "pdfs/Bases de Datos_Descarga tu Diploma de Seguimiento.pdf",
        type: "pdf"
      }
      ,{
        id: "6",
        title: "Creación de un bot conversacional basado en IA generativa",
        issuer: "Universidad Politécnica de Madrid",
        date: "2025-09-25",
        file: "pdfs/Creación de un bot conversacional basado en IA generativa (UPM).pdf",
        type: "pdf"
      }
      ,{
        id: "7",
        title: "Desarrollo -backend con Node.js, Express y BBDDs",
        issuer: "Universidad Politécnica de Madrid",
        date: "2025-09-29",
        file: "pdfs/Backend (ed 7)_Descarga tu Diploma de Seguimiento.pdf",
        type: "pdf"
      }
      ,{
        id: "8",
        title: "Desarrollo Frontend con HTML, CSS y JavaScript",
        issuer: "Universidad Politécnica de Madrid",
        date: "2025-09-29",
        file: "pdfs/Frontend_Descarga tu Diploma de Seguimiento.pdf",
        type: "pdf"
      }
      ,{
        id: "9",
        title: "Desarrollo de aplicaciones con React y React Native",
        issuer: "Universidad Politécnica de Madrid",
        date: "2025-09-29",
        file: "pdfs/REACT_Descarga tu Diploma de Seguimiento.pdf",
        type: "pdf"
      }
    ];
  }

  function openViewer(src) {
    const frame = document.getElementById('pdfFrame');
    frame.src = src;
    document.getElementById('viewer').style.display = 'flex';
  }

  function closeViewer() {
    document.getElementById('viewer').style.display = 'none';
    document.getElementById('pdfFrame').src = '';
  }

  function filterAndRender() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const issuer = document.getElementById('issuerFilter').value;
    let certs = allCertificates.slice();

    if (search) {
      certs = certs.filter(c =>
        c.title.toLowerCase().includes(search)
      );
    }
    if (issuer) {
      certs = certs.filter(c => c.issuer === issuer);
    }
    if (!sortAsc) {
      certs = certs.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      certs = certs.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    filteredCertificates = certs;
    renderList();
  }

  function populateIssuerFilter() {
    const select = document.getElementById('issuerFilter');
    const issuers = Array.from(new Set(allCertificates.map(c => c.issuer))).filter(Boolean);
    select.innerHTML = '<option value="">Todas las entidades</option>';
    issuers.forEach(issuer => {
      const opt = document.createElement('option');
      opt.value = issuer;
      opt.textContent = issuer;
      select.appendChild(opt);
    });
  }

  function renderList() {
    const list = document.getElementById('list');
    list.innerHTML = `
      <div class="credly-banner">
        <div class="credly-info">
          <p>Además de estos certificados, cuento con <strong>11 badges verificados</strong> en mi perfil de Credly:</p>
          <a href="https://www.credly.com/users/gabriel-rodrigo-quispe-pocohuanca" 
             class="btn-credly-profile" 
             target="_blank" 
             rel="noopener">
            <img src="verified.png" alt="Credly" width="16" height="16">
            Ver Badges en Credly
          </a>
        </div>
      </div>
    `;
    
    filteredCertificates.forEach(item => {
      const card = document.createElement('div');
      card.className = 'certificate-card';
      card.innerHTML = `
        <div class="certificate-title">${item.title}</div>
        <div class="certificate-issuer">${item.issuer || 'Sin emisor'}</div>
        <div class="certificate-date">${item.date || 'Sin fecha'}</div>
        <div class="certificate-actions">
          <button class="btn-view view" data-file="${item.file}">Ver Certificado</button>
        </div>
      `;
      list.appendChild(card);
    });
    document.querySelectorAll('.view').forEach(btn => {
      btn.onclick = () => openViewer(btn.getAttribute('data-file'));
    });
  }

  function updateStats() {
    // Actualizar total
    document.getElementById('totalCerts').textContent = allCertificates.length;

    // Actualizar stats por entidad
    const issuerStats = document.getElementById('issuerStats');
    const counts = allCertificates.reduce((acc, cert) => {
      const issuer = cert.issuer || 'Sin emisor';
      acc[issuer] = (acc[issuer] || 0) + 1;
      return acc;
    }, {});

    issuerStats.innerHTML = Object.entries(counts)
      .map(([issuer, count]) => `
        <div class="issuer-stat">
          <span>${issuer}</span>
          <span class="issuer-count">${count}</span>
        </div>
      `).join('');
  }

  document.getElementById('closeViewer').onclick = closeViewer;
  document.getElementById('backToMenu').onclick = closeViewer;

  document.getElementById('searchInput').oninput = filterAndRender;
  document.getElementById('issuerFilter').onchange = filterAndRender;
  document.getElementById('sortDate').onclick = () => {
    sortAsc = !sortAsc;
    filterAndRender();
  };

  loadCertificates().then(certs => {
    allCertificates = certs;
    populateIssuerFilter();
    filteredCertificates = allCertificates.slice();
    updateStats(); // Agregar esta línea
    filterAndRender();
  });
});
