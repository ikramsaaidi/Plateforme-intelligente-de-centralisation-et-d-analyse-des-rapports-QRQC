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