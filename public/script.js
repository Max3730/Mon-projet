// Variables globales
let currentResults = [];
let currentSearchParams = {};

// Éléments du DOM
const searchForm = document.getElementById('searchForm');
const searchBtn = document.getElementById('searchBtn');
const loadingSection = document.getElementById('loadingSection');
const resultsSection = document.getElementById('resultsSection');
const errorSection = document.getElementById('errorSection');
const resultsBody = document.getElementById('resultsBody');
const resultsCount = document.getElementById('resultsCount');
const exportBtn = document.getElementById('exportBtn');
const errorMessage = document.getElementById('errorMessage');

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    console.log('🚀 Application initialisée');
});

// Gestionnaires d'événements
function initializeEventListeners() {
    searchForm.addEventListener('submit', handleSearch);
    exportBtn.addEventListener('click', handleExport);
}

// Gestion de la recherche
async function handleSearch(event) {
    event.preventDefault();
    
    // Récupération des données du formulaire
    const formData = new FormData(searchForm);
    const searchData = {
        pays: formData.get('pays').trim(),
        domaine: formData.get('domaine').trim(),
        poste: formData.get('poste').trim()
    };
    
    // Validation
    if (!searchData.pays || !searchData.domaine || !searchData.poste) {
        showError('Veuillez remplir tous les champs du formulaire.');
        return;
    }
    
    // Sauvegarde des paramètres de recherche
    currentSearchParams = { ...searchData };
    
    // Affichage du chargement
    showLoading();
    
    try {
        console.log('🔍 Lancement de la recherche:', searchData);
        
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchData)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Erreur lors de la recherche');
        }
        
        if (result.success) {
            currentResults = result.data;
            displayResults(result.data);
            console.log(`✅ ${result.count} résultats trouvés`);
        } else {
            throw new Error(result.error || 'Aucun résultat trouvé');
        }
        
    } catch (error) {
        console.error('❌ Erreur:', error);
        showError(error.message);
    }
}

// Affichage du chargement
function showLoading() {
    hideAllSections();
    loadingSection.classList.remove('hidden');
    searchBtn.disabled = true;
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Recherche...</span>';
}

// Affichage des résultats
function displayResults(results) {
    hideAllSections();
    
    if (!results || results.length === 0) {
        showError('Aucun profil trouvé pour ces critères. Essayez avec des termes différents.');
        return;
    }
    
    // Mise à jour du compteur
    resultsCount.textContent = `${results.length} profil${results.length > 1 ? 's' : ''} trouvé${results.length > 1 ? 's' : ''}`;
    
    // Génération du HTML du tableau
    resultsBody.innerHTML = results.map((result, index) => `
        <tr>
            <td>
                <strong>${escapeHtml(result.nom)}</strong>
            </td>
            <td>
                ${escapeHtml(result.description || 'Aucune description disponible')}
            </td>
            <td>
                <span class="platform-badge ${result.plateforme.toLowerCase()}">
                    ${result.plateforme}
                </span>
            </td>
            <td>
                <a href="${escapeHtml(result.lien)}" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   class="profile-link">
                    <i class="fas fa-external-link-alt"></i>
                    Voir
                </a>
            </td>
        </tr>
    `).join('');
    
    // Affichage de la section résultats
    resultsSection.classList.remove('hidden');
    
    // Réinitialisation du bouton
    resetSearchButton();
    
    // Scroll vers les résultats
    resultsSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// Affichage des erreurs
function showError(message) {
    hideAllSections();
    errorMessage.textContent = message;
    errorSection.classList.remove('hidden');
    resetSearchButton();
    
    // Scroll vers l'erreur
    errorSection.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// Masquer toutes les sections
function hideAllSections() {
    loadingSection.classList.add('hidden');
    resultsSection.classList.add('hidden');
    errorSection.classList.add('hidden');
}

// Masquer l'erreur
function hideError() {
    errorSection.classList.add('hidden');
}

// Réinitialisation du bouton de recherche
function resetSearchButton() {
    searchBtn.disabled = false;
    searchBtn.innerHTML = '<i class="fas fa-search"></i> <span>Rechercher</span>';
}

// Gestion de l'export PDF
async function handleExport() {
    if (!currentResults || currentResults.length === 0) {
        showError('Aucun résultat à exporter. Effectuez d\'abord une recherche.');
        return;
    }
    
    try {
        exportBtn.disabled = true;
        exportBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Export...';
        
        console.log('📄 Génération du PDF...');
        
        const response = await fetch('/api/export-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                results: currentResults,
                searchParams: currentSearchParams
            })
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Erreur lors de l\'export PDF');
        }
        
        // Téléchargement du PDF
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `profils-recherche-${new Date().toISOString().split('T')[0]}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        console.log('✅ PDF exporté avec succès');
        
    } catch (error) {
        console.error('❌ Erreur export PDF:', error);
        showError('Erreur lors de l\'export PDF: ' + error.message);
    } finally {
        exportBtn.disabled = false;
        exportBtn.innerHTML = '<i class="fas fa-file-pdf"></i> Exporter en PDF';
    }
}

// Utilitaire pour échapper le HTML
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Gestion des erreurs globales
window.addEventListener('error', function(event) {
    console.error('❌ Erreur JavaScript:', event.error);
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('❌ Promise rejetée:', event.reason);
});

// Fonctions utilitaires pour le debug
function debugInfo() {
    console.log('🔧 Informations de debug:');
    console.log('- Résultats actuels:', currentResults.length);
    console.log('- Paramètres de recherche:', currentSearchParams);
    console.log('- Sections visibles:', {
        loading: !loadingSection.classList.contains('hidden'),
        results: !resultsSection.classList.contains('hidden'),
        error: !errorSection.classList.contains('hidden')
    });
}

// Exposition pour le debug (développement uniquement)
if (window.location.hostname === 'localhost') {
    window.debugInfo = debugInfo;
    window.currentResults = currentResults;
    window.currentSearchParams = currentSearchParams;
}
