from django.contrib import admin
from .models import Ligne, Utilisateur, Qrqc, Analyse5Pourquoi, ContreMesure, SuiviQrqc, PieceJointe
#enregistrement de chaque modele :

#Ligne 
@admin.register(Ligne)
class LigneAdmin(admin.ModelAdmin):
 list_display=['nom_ligne','zone']
 search_fields=['zone','nom_ligne']
 list_filter=['zone']
 


#Utilisateur
@admin.register(Utilisateur)
class UtilisateurAdmin(admin.ModelAdmin):
  list_display=['nom_complet','role']
  search_fields=['nom_complet']
  list_filter=['role']


#Qrqc

