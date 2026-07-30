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