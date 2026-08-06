# Contrat API – Plateforme QRQC

## 1. Présentation

### Objectif

Cette API permet la communication entre le frontend développé avec React + Tailwind CSS et le backend développé avec Django REST Framework. Les données sont échangées au format JSON via le protocole HTTP.

L'objectif est de permettre aux ingénieurs qualité et aux responsables qualité de gérer les rapports QRQC, les analyses des 5 Pourquoi, les contre-mesures, les suivis, les pièces jointes ainsi que les fonctionnalités d'OCR, de tableau de bord et d'intelligence artificielle.

---

## 2. Architecture REST

Le système suit l'architecture REST.

Le frontend React communique avec le backend Django uniquement par des requêtes HTTP.

Les données sont échangées au format JSON.

```
React
      │
HTTP + JSON
      │
      ▼
Django REST Framework
      │
      ▼
PostgreSQL
```

---

## 3. Ressources principales

L'API est organisée autour des ressources suivantes :

- QRQC
- Analyse 5 Pourquoi
- Contre-mesure
- Suivi QRQC
- Pièce Jointe
- Ligne
- Utilisateur

---

## 4. Endpoints principaux

| Méthode | Endpoint | Description |
|----------|----------|-------------|
| GET | /api/qrqc/ | Liste des QRQC |
| POST | /api/qrqc/ | Créer un QRQC |
| GET | /api/qrqc/{id}/ | Détail d'un QRQC |
| PUT | /api/qrqc/{id}/ | Modifier complètement |
| PATCH | /api/qrqc/{id}/ | Modifier partiellement |
| DELETE | /api/qrqc/{id}/ | Supprimer |

Le même principe sera appliqué aux ressources :

- Analyse5Pourquoi
- ContreMesure
- SuiviQrqc
- PieceJointe
- Ligne
- Utilisateur

---

## 5. Format des échanges

Les échanges entre React et Django utilisent exclusivement le format JSON.

### Exemple de requête

```json
{
  "numero_qrqc": "QR001",
  "quantite": 10
}
```

### Exemple de réponse

```json
{
  "id": 1,
  "numero_qrqc": "QR001",
  "quantite": 10
}
```

---

## 6. Permissions

### Ingénieur Qualité

- Gestion complète des QRQC
- Gestion des analyses
- Gestion des contre-mesures
- Gestion du suivi
- Gestion des pièces jointes
- Utilisation de l'OCR
- Consultation du dashboard
- Consultation des statistiques IA

### Responsable Qualité

- Consultation des QRQC
- Consultation des analyses
- Consultation des contre-mesures
- Consultation du suivi
- Consultation des pièces jointes
- Consultation du dashboard
- Consultation des statistiques IA

### Administrateur

- Gestion des utilisateurs
- Gestion des lignes
- Administration complète du système

---

## 7. Architecture du backend

Le backend est organisé autour des fichiers suivants :

- models.py
- serializers.py
- views.py
- urls.py
- permissions.py
- admin.py
- tests.py
- ocr.py
- ai.py
- utils.py

# 4. Serializers

## Objectif

Les serializers assurent la conversion des objets Django en format JSON afin de permettre la communication entre le backend Django REST Framework et le frontend React. Ils réalisent également l'opération inverse en transformant les données JSON reçues en objets Django validés.

## Serializers créés

| Serializer | Modèle associé |
|------------|----------------|
| LigneSerializer | Ligne |
| UtilisateurSerializer | Utilisateur |
| QrqcSerializer | Qrqc |
| Analyse5PourquoiSerializer | Analyse5Pourquoi |
| ContreMesureSerializer | ContreMesure |
| SuiviQrqcSerializer | SuiviQrqc |
| PieceJointeSerializer | PieceJointe |

## Champs calculés

Afin de faciliter l'affichage des informations dans React, certains serializers exposent des champs supplémentaires en lecture seule.

| Serializer | Champ ajouté | Description |
|------------|-------------|-------------|
| QrqcSerializer | ligne_nom | Nom de la ligne de production |
| QrqcSerializer | utilisateur_nom | Nom complet de l'utilisateur |
| Analyse5PourquoiSerializer | qrqc_numero | Numéro du QRQC associé |
| ContreMesureSerializer | qrqc_numero | Numéro du QRQC associé |
| SuiviQrqcSerializer | qrqc_numero | Numéro du QRQC associé |
| PieceJointeSerializer | qrqc_numero | Numéro du QRQC associé |

Ces champs sont générés grâce au paramètre `source` de Django REST Framework et sont définis en lecture seule (`read_only=True`).

## Principe de fonctionnement

Le serializer constitue une couche intermédiaire entre Django et React :

Django (Objet Python)
↓
Serializer
↓
JSON
↓
React

Et dans le sens inverse :

React
↓
JSON
↓
Serializer
↓
Objet Django

## Bonnes pratiques appliquées

- Utilisation de `ModelSerializer` afin de réduire la quantité de code.
- Définition explicite des champs avec `fields` plutôt que `__all__` pour les serializers principaux.
- Utilisation de champs calculés (`source`) pour améliorer la lisibilité côté frontend.
- Utilisation de `read_only=True` pour empêcher la modification des champs calculés.
- Conservation des identifiants (`id`) afin de faciliter les opérations CRUD depuis React.


# 5. Authentification de l'API (JWT)

## Objectif

L'authentification de l'API est basée sur le standard JSON Web Token (JWT). Elle permet de sécuriser les endpoints de l'application sans transmettre les identifiants de l'utilisateur à chaque requête.

Après une authentification réussie, le serveur génère deux jetons :

- Un **Access Token**, utilisé pour accéder aux API protégées.
- Un **Refresh Token**, utilisé pour générer un nouvel Access Token lorsque celui-ci expire.

---

## Bibliothèque utilisée

L'authentification JWT est implémentée à l'aide de la bibliothèque :

- djangorestframework-simplejwt

Cette bibliothèque fournit un système d'authentification sécurisé, fiable et directement compatible avec Django REST Framework.

---

## Configuration

L'authentification JWT a été définie comme méthode d'authentification par défaut dans Django REST Framework.

Les durées de validité configurées sont les suivantes :

- Access Token : 15 minutes
- Refresh Token : 1 jour

---

## Routes d'authentification

| Méthode | Endpoint | Description |
|----------|----------|-------------|
| POST | /api/token/ | Authentifie un utilisateur et retourne un Access Token ainsi qu'un Refresh Token. |
| POST | /api/token/refresh/ | Génère un nouvel Access Token à partir d'un Refresh Token valide. |

---

## Fonctionnement

Le processus d'authentification suit les étapes suivantes :

1. L'utilisateur saisit son nom d'utilisateur et son mot de passe.
2. Une requête est envoyée vers `/api/token/`.
3. Django vérifie les identifiants.
4. Si l'authentification est valide, le serveur retourne un Access Token et un Refresh Token.
5. Le frontend utilise l'Access Token pour accéder aux API protégées.
6. Lorsque l'Access Token expire, le frontend envoie le Refresh Token à `/api/token/refresh/`.
7. Le serveur retourne un nouvel Access Token sans demander une nouvelle authentification.

---

## Tests réalisés

Les endpoints d'authentification ont été testés avec succès.

### Test d'obtention des tokens

- Requête POST vers `/api/token/`
- Authentification réussie
- Génération d'un Access Token
- Génération d'un Refresh Token

### Test de rafraîchissement

- Requête POST vers `/api/token/refresh/`
- Génération correcte d'un nouvel Access Token à partir d'un Refresh Token valide.

---

## Bonnes pratiques appliquées

- Utilisation d'une bibliothèque officielle (SimpleJWT).
- Durée de vie courte de l'Access Token afin de limiter les risques de sécurité.
- Séparation des rôles entre Access Token et Refresh Token.
- Centralisation des routes d'authentification dans le fichier `urls.py`.
- Configuration d'une méthode d'authentification unique pour l'ensemble des futures API REST.


# 5. API CRUD – QRQC

## Objectif

Cette première API CRUD permet de gérer les rapports QRQC via Django REST Framework. Elle constitue la base de l'architecture REST du projet et expose les opérations de création, de consultation, de modification et de suppression des rapports QRQC.

Toutes les données sont échangées au format JSON et les endpoints sont protégés par authentification JWT.

---

## Generic Views utilisées

Deux Generic Views de Django REST Framework ont été utilisées afin de limiter la quantité de code et de bénéficier des fonctionnalités CRUD intégrées.

| View | Rôle |
|------|------|
| `ListCreateAPIView` | Liste des QRQC et création d'un nouveau QRQC |
| `RetrieveUpdateDestroyAPIView` | Consultation, modification et suppression d'un QRQC |

---

## Endpoints développés

| Méthode | Endpoint | Description |
|----------|----------|-------------|
| GET | `/api/qrqc/` | Retourne la liste des rapports QRQC |
| POST | `/api/qrqc/` | Crée un nouveau rapport QRQC |
| GET | `/api/qrqc/{id}/` | Retourne le détail d'un QRQC |
| PUT | `/api/qrqc/{id}/` | Remplace complètement un QRQC |
| PATCH | `/api/qrqc/{id}/` | Modifie partiellement un QRQC |
| DELETE | `/api/qrqc/{id}/` | Supprime un QRQC |

---

## Sécurisation de l'API

L'ensemble des endpoints QRQC est protégé par JWT grâce à la permission :

```python
permission_classes = [IsAuthenticated]
```

Toute requête vers cette API nécessite un Access Token valide envoyé dans l'en-tête HTTP :

```
Authorization: Bearer <access_token>
```

Une requête sans authentification retourne automatiquement :

```
401 Unauthorized
```

---

## Tests réalisés

Les endpoints ont été testés avec Postman.

Les scénarios suivants ont été validés :

- Authentification via JWT
- Consultation de la liste des QRQC (GET)
- Création d'un nouveau QRQC (POST)
- Modification complète d'un QRQC (PUT)
- Modification partielle d'un QRQC (PATCH)
- Suppression d'un QRQC (DELETE)

Les réponses HTTP obtenues correspondent aux codes attendus (`200 OK`, `201 Created`, `204 No Content`, `401 Unauthorized`).

---

## Architecture de fonctionnement

```
Client (Postman / React)
        │
        ▼
Requête HTTP
        │
        ▼
JWT Authentication
        │
        ▼
Permission IsAuthenticated
        │
        ▼
Generic View
        │
        ▼
Serializer
        │
        ▼
Modèle Django
        │
        ▼
PostgreSQL
        │
        ▼
Réponse JSON
```

---

## Bonnes pratiques appliquées

- Utilisation des Generic Views de Django REST Framework.
- Séparation des responsabilités entre les modèles, serializers, vues et routes.
- Protection des endpoints par authentification JWT.
- Utilisation des codes HTTP standards.
- Validation automatique des données via les serializers.
- Tests fonctionnels réalisés avec Postman avant l'intégration du frontend React.

# 7. API des autres modèles

## Objectif

Après la validation des endpoints du modèle QRQC, l'API REST a été étendue aux autres modèles de l'application afin de permettre leur gestion complète depuis le frontend React.

Chaque modèle expose des endpoints CRUD (Create, Read, Update, Delete) développés avec les Generic Views de Django REST Framework. Toutes les routes sont protégées par une authentification JWT afin de garantir que seuls les utilisateurs authentifiés puissent accéder aux ressources.

---

## Generic Views utilisées

Pour chaque modèle, deux vues génériques ont été créées :

- `ListCreateAPIView` : permet de récupérer la liste des enregistrements (`GET`) et d'en créer un nouveau (`POST`).
- `RetrieveUpdateDestroyAPIView` : permet de consulter (`GET`), modifier (`PUT`, `PATCH`) ou supprimer (`DELETE`) un enregistrement identifié par sa clé primaire.

Chaque vue définit :

- le modèle concerné (`queryset`) ;
- le serializer utilisé (`serializer_class`) ;
- la permission d'accès (`permission_classes = [IsAuthenticated]`).

---

## Endpoints développés

### Ligne

| Méthode | Endpoint |
|----------|----------|
| GET / POST | `/api/ligne/` |
| GET / PUT / PATCH / DELETE | `/api/ligne/{id}/` |

### Utilisateur

| Méthode | Endpoint |
|----------|----------|
| GET / POST | `/api/utilisateur/` |
| GET / PUT / PATCH / DELETE | `/api/utilisateur/{id}/` |

### Analyse5Pourquoi

| Méthode | Endpoint |
|----------|----------|
| GET / POST | `/api/analyse5pourquoi/` |
| GET / PUT / PATCH / DELETE | `/api/analyse5pourquoi/{id}/` |

### ContreMesure

| Méthode | Endpoint |
|----------|----------|
| GET / POST | `/api/contremesure/` |
| GET / PUT / PATCH / DELETE | `/api/contremesure/{id}/` |

### SuiviQrqc

| Méthode | Endpoint |
|----------|----------|
| GET / POST | `/api/suiviqrqc/` |
| GET / PUT / PATCH / DELETE | `/api/suiviqrqc/{id}/` |

### PieceJointe

| Méthode | Endpoint |
|----------|----------|
| GET / POST | `/api/piecejointe/` |
| GET / PUT / PATCH / DELETE | `/api/piecejointe/{id}/` |

---

## Tests réalisés

L'ensemble des endpoints a été testé avec Postman.

Les tests effectués ont permis de valider :

- la récupération des données (`GET`) ;
- la création de nouvelles ressources (`POST`) ;
- la modification complète (`PUT`) ;
- la modification partielle (`PATCH`) ;
- la suppression (`DELETE`) ;
- l'authentification par JWT ;
- le téléchargement de fichiers (`multipart/form-data`) pour le modèle `PieceJointe`.

Les réponses HTTP obtenues (`200 OK`, `201 Created`, `204 No Content`, `401 Unauthorized`) correspondent aux comportements attendus de Django REST Framework.

---

## Vérification des relations entre les modèles

Les relations définies par les clés étrangères (`ForeignKey`) ont été vérifiées à travers les différentes requêtes API.

Les tests ont confirmé :

- l'association correcte entre un QRQC et une ligne de production ;
- l'association correcte entre un QRQC et un utilisateur ;
- l'association des analyses « 5 Pourquoi » à un QRQC ;
- l'association des contre-mesures à un QRQC ;
- l'association des suivis à un QRQC ;
- l'association des pièces jointes à un QRQC.

Les champs calculés exposés par les serializers (`ligne_nom`, `utilisateur_nom` et `qrqc_numero`) ont confirmé le bon fonctionnement des relations entre les modèles et leur sérialisation dans les réponses JSON.

---

## Résultat

À l'issue de cette étape, l'ensemble des modèles de la plateforme dispose d'une API REST sécurisée permettant les opérations CRUD complètes. Les endpoints sont prêts à être consommés par le frontend React, tandis que les relations entre les différentes ressources sont correctement gérées et restituées dans les réponses JSON.

# Authentification, gestion des rôles et permissions

## Objectif

Mettre en place un système sécurisé d'authentification et d'autorisation afin de contrôler l'accès aux différentes fonctionnalités de l'application QRQC selon le rôle de chaque utilisateur.

---

# Technologies utilisées

- Django REST Framework
- Simple JWT
- PostgreSQL
- Permissions personnalisées (Custom Permissions)

---

# Fonctionnalités réalisées

## 1. Authentification JWT

Le système utilise **JSON Web Token (JWT)**.

Lorsqu'un utilisateur saisit un nom d'utilisateur et un mot de passe valides, le serveur retourne :

- Access Token
- Refresh Token

L'Access Token est ensuite utilisé pour authentifier toutes les requêtes envoyées par le frontend React vers l'API Django.

---

## 2. Gestion des utilisateurs

Deux modèles sont utilisés :

- **User** : modèle d'authentification fourni par Django.
- **Utilisateur** : profil métier de l'application.

Le modèle `Utilisateur` est relié au modèle `User` grâce à une relation `OneToOneField`.

```python
user = models.OneToOneField(
    User,
    on_delete=models.PROTECT,
    related_name="profil"
)
```

Cette séparation permet :

- d'utiliser le système d'authentification sécurisé de Django ;
- d'ajouter des informations métier (nom complet, rôle) sans modifier le modèle `User`.

---

## 3. Gestion des rôles

Trois rôles ont été définis :

- Administrateur
- Ingénieur Qualité
- Responsable Qualité

Chaque utilisateur possède un rôle enregistré dans son profil.

---

## 4. Permissions personnalisées

Une classe de base `HasRole` a été créée afin d'éviter la duplication du code.

À partir de cette classe, plusieurs permissions ont été développées :

- `IsAdministrator`
- `IsQualityEngineer`
- `IsAdministratorOrEngineer`

Ces permissions sont utilisées dans les vues Django REST Framework afin de limiter les opérations autorisées selon le rôle de l'utilisateur connecté.

---

## 5. Contrôle des accès

Les permissions implémentées sont résumées dans le tableau suivant :

| Fonctionnalité | Administrateur | Ingénieur Qualité | Responsable Qualité |
|---------------|:--------------:|:-----------------:|:-------------------:|
| Consulter les QRQC | ✅ | ✅ | ✅ |
| Créer un QRQC | ❌ | ✅ | ❌ |
| Modifier un QRQC | ❌ | ✅ | ❌ |
| Supprimer un QRQC | ❌ | ✅ | ❌ |
| Consulter les utilisateurs | ✅ | ✅ | ✅ |
| Gérer les utilisateurs | ✅ | ❌ | ❌ |
| Consulter les lignes | ✅ | ✅ | ✅ |
| Ajouter une ligne | ✅ | ✅ | ❌ |
| Modifier une ligne | ✅ | ❌ | ❌ |
| Supprimer une ligne | ✅ | ❌ | ❌ |
| Consulter les analyses | ✅ | ✅ | ✅ |
| Gérer les analyses | ❌ | ✅ | ❌ |
| Consulter les contre-mesures | ✅ | ✅ | ✅ |
| Gérer les contre-mesures | ❌ | ✅ | ❌ |
| Consulter le suivi | ✅ | ✅ | ✅ |
| Gérer le suivi | ❌ | ✅ | ❌ |
| Consulter les pièces jointes | ✅ | ✅ | ✅ |
| Gérer les pièces jointes | ❌ | ✅ | ❌ |

---

## 6. Association automatique du créateur d'un QRQC

Lors de la création d'un QRQC, l'utilisateur connecté est automatiquement enregistré comme responsable du QRQC.

Cette fonctionnalité est implémentée dans la méthode `perform_create()`.

```python
def perform_create(self, serializer):
    serializer.save(utilisateur=self.request.user.profil)
```

Ainsi :

- le frontend ne transmet jamais l'identifiant de l'utilisateur ;
- le backend récupère automatiquement l'utilisateur authentifié ;
- le Responsable Qualité peut identifier l'ingénieur ayant créé chaque QRQC.

---

## 7. Sécurisation des endpoints

Chaque vue utilise la méthode `get_permissions()` afin d'appliquer dynamiquement les permissions selon le type de requête HTTP.

Principe général :

- **GET** → accessible à tous les utilisateurs authentifiés.
- **POST / PUT / PATCH / DELETE** → accessible uniquement aux rôles autorisés.

Cette approche permet une gestion centralisée et évolutive des droits d'accès.

---

# Tests réalisés

Les scénarios suivants ont été validés avec Postman.

### Ingénieur Qualité

- Authentification via JWT.
- Création d'un QRQC.
- Modification d'un QRQC.
- Suppression d'un QRQC.
- Ajout d'une ligne.
- Création des analyses.
- Création des contre-mesures.
- Création du suivi.
- Ajout de pièces jointes.

### Responsable Qualité

- Consultation de toutes les ressources.
- Interdiction de création, modification et suppression.

### Administrateur

- Gestion des utilisateurs.
- Gestion des lignes.
- Consultation de toutes les ressources.
- Interdiction de créer, modifier ou supprimer un QRQC.

Tous les tests réalisés avec Postman ont confirmé le bon fonctionnement du système de permissions.

---

# Résultat obtenu

À l'issue de cette tâche, le backend dispose d'un système complet de sécurité permettant :

- une authentification sécurisée par JWT ;
- une gestion des rôles utilisateurs ;
- un contrôle d'accès basé sur des permissions personnalisées ;
- l'enregistrement automatique du créateur de chaque QRQC ;
- la protection de l'ensemble des endpoints REST de l'application.

Cette étape constitue le socle de sécurité du projet et garantit une communication sécurisée entre le frontend React et l'API Django.

# Recherche multicritère des QRQC

## Objectif

Mettre en place un système de recherche multicritère permettant aux utilisateurs de retrouver rapidement un ou plusieurs QRQC selon différents critères, sans avoir à parcourir toute la base de données.

Cette fonctionnalité améliore l'efficacité de la consultation des rapports et sera utilisée par l'interface React.

---

# Technologies utilisées

- Django REST Framework
- django-filter

Installation :

```bash
pip install django-filter
```

---

# Configuration

## Ajout de l'application

Dans `settings.py` :

```python
INSTALLED_APPS = [
    ...
    "django_filters",
]
```

---

## Configuration de Django REST Framework

```python
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),

    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
    ],
}
```

---

# Création du fichier `filters.py`

Un fichier `filters.py` a été créé afin de centraliser tous les critères de recherche des QRQC.

La classe principale est :

```python
QrqcFilter(FilterSet)
```

Elle contient les filtres suivants :

| Critère | Type |
|---------|------|
| Numéro QRQC | Recherche exacte |
| Famille | Recherche partielle |
| Référence faisceau | Recherche partielle |
| Détecté par | Recherche partielle |
| Mode de détection | Recherche partielle |
| Escalade Niveau 2 | Booléen |
| Date de création | Intervalle |
| Date de détection | Intervalle |
| Utilisateur | Foreign Key |
| Ligne | Foreign Key |

---

# Intégration dans la vue

Le filtre a été associé à l'API des QRQC :

```python
filterset_class = QrqcFilter
```

Ainsi, chaque requête GET peut être filtrée automatiquement via les paramètres de l'URL.

---

# Exemples d'utilisation

## Recherche par numéro

```http
GET /api/qrqc/?numero_qrqc=1001
```

---

## Recherche par famille

```http
GET /api/qrqc/?famille=Moteur
```

---

## Recherche par référence faisceau

```http
GET /api/qrqc/?reference_faisceau=FH-001
```

---

## Recherche par Team Leader

```http
GET /api/qrqc/?detecte_par=Ali
```

---

## Recherche par mode de détection

```http
GET /api/qrqc/?mode_detection=Audit
```

---

## Recherche par utilisateur

```http
GET /api/qrqc/?utilisateur=Ikram
```

---

## Recherche par ligne

```http
GET /api/qrqc/?ligne=AA
```

---

## Recherche par escalade

```http
GET /api/qrqc/?escalade_niv2=true
```

ou

```http
GET /api/qrqc/?escalade_niv2=false
```

---

## Recherche par date de création

Après une date :

```http
GET /api/qrqc/?date_creation_after=2026-08-01
```

Avant une date :

```http
GET /api/qrqc/?date_creation_before=2026-08-31
```

Entre deux dates :

```http
GET /api/qrqc/?date_creation_after=2026-08-01&date_creation_before=2026-08-31
```

---

# Recherche multicritère

Plusieurs critères peuvent être combinés dans une seule requête.

Exemple :

```http
GET /api/qrqc/?famille=Moteur&utilisateur=Ikram
```

ou

```http
GET /api/qrqc/?famille=Moteur&ligne=AA
```

ou

```http
GET /api/qrqc/?famille=Moteur&utilisateur=Ikram&escalade_niv2=false
```

Le système retourne uniquement les QRQC qui satisfont simultanément tous les critères.

---

# Tests réalisés

Les tests suivants ont été validés avec Postman :

- Consultation sans filtre
- Recherche par numéro
- Recherche par famille
- Recherche par référence faisceau
- Recherche par Team Leader
- Recherche par mode de détection
- Recherche par utilisateur
- Recherche par ligne
- Recherche par dates
- Recherche par escalade
- Recherche multicritère

Tous les tests retournent les résultats attendus.

---

# Résultat

Le backend dispose désormais d'un moteur de recherche multicritère entièrement fonctionnel.

Cette API est prête à être consommée par le frontend React pour implémenter une interface de recherche avancée.

# Frontend - Plateforme QRQC

## Introduction

Après la réalisation du backend (API REST, authentification JWT, gestion des rôles, permissions, CRUD et recherche multicritère), cette deuxième phase du projet consiste à développer l'interface utilisateur de la plateforme QRQC.

L'objectif est de créer une application web moderne, ergonomique et responsive permettant aux différents acteurs (Administrateur, Ingénieur Qualité et Responsable Qualité) d'interagir facilement avec les fonctionnalités du système.

Le frontend sera développé avec **React.js** afin d'obtenir une interface dynamique, modulaire et facilement maintenable. La communication avec le backend Django REST Framework sera réalisée via des requêtes HTTP sécurisées par JWT.

---

# Objectifs du Frontend

Le frontend devra permettre de :

- Authentifier les utilisateurs.
- Consulter le tableau de bord.
- Gérer les QRQC.
- Consulter et compléter les analyses des QRQC.
- Gérer les lignes de production.
- Gérer les utilisateurs (Administrateur).
- Consulter les statistiques.
- Fournir une interface intuitive et professionnelle.

---

# Technologies utilisées

- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hook Form
- React Icons
- React Toastify

---

# Phase 1 — Conception UI/UX

## Objectif

Avant de commencer le développement React, une phase de conception a été réalisée afin de définir l'architecture de l'application, son ergonomie ainsi que son identité visuelle.

Cette étape permet de disposer d'une vision claire de l'application avant l'implémentation.

---

## Utilisateurs

L'application est destinée à trois types d'utilisateurs :

### Administrateur

- Gérer les utilisateurs
- Gérer les lignes
- Consulter toutes les informations

### Ingénieur Qualité

- Créer un QRQC
- Modifier un QRQC
- Ajouter les analyses
- Ajouter les contre-mesures
- Effectuer le suivi
- Gérer les pièces jointes

### Responsable Qualité

- Consulter les QRQC
- Consulter les statistiques
- Consulter les analyses

---

## Architecture des écrans

L'application est composée de sept écrans principaux :

1. Login
2. Dashboard
3. Gestion des QRQC
4. Détail d'un QRQC
5. Gestion des lignes
6. Gestion des utilisateurs
7. Mon Profil

---

## Navigation

Une Sidebar permet d'accéder aux différentes fonctionnalités.

Selon le rôle de l'utilisateur, certains menus seront automatiquement masqués.

### Administrateur

- Dashboard
- Gestion des QRQC
- Lignes
- Utilisateurs
- Mon Profil

### Ingénieur Qualité

- Dashboard
- Gestion des QRQC
- Lignes
- Mon Profil

### Responsable Qualité

- Dashboard
- Gestion des QRQC
- Mon Profil

---

## Organisation de la fiche QRQC

Au lieu de créer une page indépendante pour chaque modèle de la base de données, toutes les informations liées à un QRQC seront regroupées dans une seule fiche.

Cette fiche contiendra plusieurs onglets :

- Informations générales
- Analyse des 5 Pourquoi
- Contre-mesures
- Suivi QRQC
- Pièces jointes

Cette approche améliore l'expérience utilisateur et se rapproche du fonctionnement des logiciels professionnels.

---

## Composants réutilisables

Afin de faciliter la maintenance de l'application, plusieurs composants seront développés puis réutilisés dans tout le projet.

Exemples :

- Button
- Input
- Select
- Table
- Card
- Modal
- SearchBar
- Pagination
- Loader
- Toast Notification
- Confirm Dialog

---

## Charte graphique

L'interface respecte l'identité visuelle de **Sumitomo Electric Wiring Systems (SEWS)**.

| Usage | Couleur | Code |
|--------|----------|--------|
| Couleur principale | Bleu marine Sumitomo | #074784 |
| Accent | Cyan Sumitomo | #0B96B7 |
| Sidebar | Bleu marine profond | #052F57 |
| Fond général | Gris très clair | #F8FAFC |
| Cartes | Blanc | #FFFFFF |
| Texte principal | Gris anthracite | #1F2937 |
| Bordures | Gris clair | #E5E7EB |
| Succès | Vert | #22C55E |
| Avertissement | Orange | #F59E0B |
| Erreur | Rouge | #EF4444 |

---

## Principes de conception

L'interface respecte les principes suivants :

- Design moderne et épuré.
- Navigation simple et intuitive.
- Responsive Design.
- Composants réutilisables.
- Cohérence graphique.
- Accessibilité.
- Performance.

---

## Livrables de cette phase

À la fin de cette étape, les éléments suivants sont définis :

- Architecture générale de l'application.
- Navigation entre les écrans.
- Liste des utilisateurs.
- Liste des écrans.
- Organisation de la fiche QRQC.
- Liste des composants réutilisables.
- Charte graphique.
- Principes de conception UI/UX.

Cette phase constitue la base de développement de toutes les interfaces React qui seront implémentées dans les étapes suivantes.