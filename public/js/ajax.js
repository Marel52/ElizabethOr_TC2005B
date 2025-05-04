// Función para obtener el token CSRF desde un input oculto
function getCsrfToken() {
    return document.querySelector('input[name="_csrf"]').value;
}

// Función para mostrar información de un laboratorio con AJAX
function showLabInfo(labId) {
    const resultDiv = document.getElementById('ajaxResult');
    if (!resultDiv) return;
    
    // Verificar que se seleccionó un laboratorio
    if (!labId) {
        resultDiv.innerHTML = '<div class="notification is-warning">Por favor selecciona un laboratorio</div>';
        return;
    }
    
    // Mostrar mensaje de carga
    resultDiv.innerHTML = '<p class="has-text-centered"><i class="fas fa-spinner fa-spin"></i> Cargando datos...</p>';
    
    // Obtener el token CSRF
    const csrfToken = getCsrfToken();
    
    // Realizar petición AJAX
    fetch(`/api/labs/${labId}`, {
        method: 'GET',
        headers: {
            'CSRF-Token': csrfToken
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(data => {
        // Actualizar el contenido con los datos recibidos
        const lab = data.lab;
        resultDiv.innerHTML = `
            <div class="notification is-primary">
                <button class="delete" onclick="document.getElementById('ajaxResult').innerHTML = ''"></button>
                <h3 class="title is-4">${lab.title}</h3>
                <p>${lab.description || 'Sin descripción'}</p>
                <hr>
                <p><strong>ID:</strong> ${lab.id}</p>
                <p><strong>Archivo:</strong> ${lab.filename}</p>
                <p><strong>Ruta:</strong> ${lab.relative_path}</p>
                <p><strong>Fecha de creación:</strong> ${new Date(lab.created_at).toLocaleString()}</p>
                <div class="has-text-centered mt-3">
                    <a href="/labs/${lab.id}/view" class="button is-info">
                        <span class="icon"><i class="fas fa-eye"></i></span>
                        <span>Ver Laboratorio</span>
                    </a>
                </div>
                <p class="has-text-right is-size-7 mt-2">
                    <em>Datos cargados con AJAX - Lab 24</em>
                </p>
            </div>
        `;
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = `
            <div class="notification is-danger">
                <button class="delete" onclick="document.getElementById('ajaxResult').innerHTML = ''"></button>
                <p>Error al cargar los datos: ${error.message}</p>
            </div>
        `;
    });
}

// Función para buscar laboratorios con AJAX
function searchLabs() {
    const searchTerm = document.getElementById('searchInput').value;
    const resultDiv = document.getElementById('searchResults');
    
    if (!resultDiv) return;
    
    // Verificar que se ingresó un término de búsqueda
    if (!searchTerm.trim()) {
        resultDiv.innerHTML = '<div class="notification is-warning">Por favor ingresa un término de búsqueda</div>';
        return;
    }
    
    // Mostrar mensaje de carga
    resultDiv.innerHTML = '<p class="has-text-centered"><i class="fas fa-spinner fa-spin"></i> Buscando...</p>';
    
    // Obtener token CSRF
    const csrfToken = getCsrfToken();
    
    // Realizar petición AJAX
    fetch(`/api/labs/search?term=${encodeURIComponent(searchTerm)}`, {
        method: 'GET',
        headers: {
            'CSRF-Token': csrfToken
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
    })
    .then(data => {
        // Si no hay resultados
        if (data.labs.length === 0) {
            resultDiv.innerHTML = '<div class="notification is-warning">No se encontraron laboratorios</div>';
            return;
        }
        
        // Crear HTML para los resultados
        let html = `<div class="notification is-success">Se encontraron ${data.count} laboratorios</div>`;
        html += '<div class="columns is-multiline">';
        
        // Crear tarjetas para cada laboratorio
        data.labs.forEach(lab => {
            html += `
                <div class="column is-4">
                    <div class="card has-background-dark">
                        <div class="card-content has-text-white">
                            <p class="title is-5 has-text-white">${lab.title}</p>
                            <p class="subtitle is-6 has-text-grey-light">${lab.id}</p>
                            <div class="content">
                                <p>${lab.description || 'Sin descripción'}</p>
                            </div>
                        </div>
                        <footer class="card-footer">
                            <a href="/labs/${lab.id}" class="card-footer-item has-background-link has-text-white">Detalles</a>
                            <a href="javascript:void(0)" onclick="showLabInfo('${lab.id}')" class="card-footer-item has-background-primary has-text-white">Ver con AJAX</a>
                        </footer>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        resultDiv.innerHTML = html;
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = `
            <div class="notification is-danger">
                <p>Error al buscar: ${error.message}</p>
            </div>
        `;
    });
}