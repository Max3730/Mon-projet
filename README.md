# 🔍 Recherche Automatique de Profils LinkedIn & Facebook

Une application web complète permettant de rechercher automatiquement des profils LinkedIn et Facebook selon des critères spécifiques.

## 🎯 Fonctionnalités

- **Recherche automatique** : Utilise Puppeteer pour scraper DuckDuckGo
- **Critères personnalisables** : Pays, domaine d'activité, poste recherché
- **Résultats structurés** : Tableau avec nom, description, plateforme et lien
- **Classement intelligent** : LinkedIn en premier, puis Facebook
- **Export PDF** : Génération de rapports professionnels
- **Interface moderne** : Design responsive avec animations fluides

## 🛠️ Technologies

- **Frontend** : HTML5, CSS3, JavaScript ES6+
- **Backend** : Node.js, Express
- **Scraping** : Puppeteer
- **Styling** : CSS moderne avec variables et animations
- **PDF** : Génération via Puppeteer

## 🚀 Installation et Démarrage

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Installation
```bash
# Cloner le projet
git clone <url-du-repo>
cd linkedin-facebook-scraper

# Installer les dépendances
npm install

# Démarrer le serveur
npm start
```

### Développement
```bash
# Mode développement avec rechargement automatique
npm run dev
```

## 📖 Utilisation

1. **Accéder à l'application** : Ouvrez `http://localhost:3000`
2. **Remplir le formulaire** :
   - Pays (ex: Bénin, France, Canada)
   - Domaine d'activité (ex: Informatique, Marketing)
   - Poste recherché (ex: Développeur Web, Chef de projet)
3. **Lancer la recherche** : Cliquez sur "Rechercher"
4. **Consulter les résultats** : Tableau avec jusqu'à 10 profils
5. **Exporter** : Bouton "Exporter en PDF" pour sauvegarder

## 🔧 Architecture

```
├── server.js          # Serveur Express principal
├── scraper.js         # Module de scraping Puppeteer
├── package.json       # Dépendances et scripts
├── README.md          # Documentation
└── public/
    ├── index.html     # Interface utilisateur
    ├── style.css      # Styles CSS
    └── script.js      # JavaScript frontend
```

## 🎨 Fonctionnalités Techniques

### Backend
- **API RESTful** avec Express
- **Scraping robuste** avec Puppeteer
- **Gestion d'erreurs** complète
- **Génération PDF** avec templates HTML
- **Réutilisation d'instance** Puppeteer pour les performances

### Frontend
- **Interface responsive** (mobile/desktop)
- **États de chargement** avec spinners animés
- **Validation de formulaire** côté client
- **Gestion d'erreurs** utilisateur
- **Design glassmorphism** moderne

### Sécurité
- **Helmet.js** pour la sécurité HTTP
- **CORS** configuré
- **Validation** des données d'entrée
- **Échappement HTML** pour prévenir XSS

## 📊 Exemple de Requête

Pour rechercher des développeurs web en informatique au Bénin :
```
Requête générée : site:linkedin.com OR site:facebook.com "Développeur Web" "Informatique" "Bénin"
```

## 🔍 Résultats

Chaque résultat contient :
- **Nom/Titre** : Titre du profil ou nom de la personne
- **Description** : Extrait de la description du profil
- **Plateforme** : Badge LinkedIn ou Facebook
- **Lien** : Lien cliquable vers le profil original

## 📄 Export PDF

Le PDF généré inclut :
- **En-tête** avec date de génération
- **Critères de recherche** utilisés
- **Tableau formaté** des résultats
- **Statistiques** (nombre de profils trouvés)
- **Design professionnel** avec couleurs et mise en forme

## ⚙️ Configuration

### Variables d'environnement
```bash
PORT=3000  # Port du serveur (optionnel)
```

### Puppeteer
- Mode headless activé par défaut
- User-agent configuré pour éviter la détection
- Timeout de 30 secondes pour les pages
- Arguments optimisés pour les environnements serveur

## 🐛 Dépannage

### Problèmes courants

1. **Puppeteer ne se lance pas**
   ```bash
   # Installer les dépendances système (Linux)
   sudo apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2
   ```

2. **Timeout lors du scraping**
   - Vérifier la connexion internet
   - DuckDuckGo peut temporairement bloquer les requêtes

3. **Aucun résultat trouvé**
   - Essayer des termes de recherche plus génériques
   - Vérifier l'orthographe des critères

## 📈 Limitations

- **Limite de résultats** : 10 profils maximum par recherche
- **Dépendance externe** : Utilise DuckDuckGo (peut changer)
- **Rate limiting** : Éviter les requêtes trop fréquentes
- **Contenu dynamique** : Certains profils peuvent ne pas être accessibles

## 🔄 Améliorations Futures

- [ ] Support de Google Search en alternative
- [ ] Cache des résultats pour éviter les requêtes répétées
- [ ] Filtres avancés (expérience, localisation précise)
- [ ] Export Excel/CSV
- [ ] Historique des recherches
- [ ] API publique avec authentification

## 📝 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! Merci de :
1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📞 Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation
- Vérifier les logs du serveur

---

**Note** : Cette application est destinée à des fins éducatives et de recherche. Respectez les conditions d'utilisation des plateformes scrapées.