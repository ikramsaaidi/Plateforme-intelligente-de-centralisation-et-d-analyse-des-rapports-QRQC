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
@admin.register(Qrqc)
class QrqcAdmin(admin.ModelAdmin):
  list_display = [
    'numero_qrqc',
    'date_detection',
    'reference_faisceau',
    'ligne',
    'utilisateur',
    'quantite',
    'escalade_niv2'
]
  search_fields = [
    'numero_qrqc',
    'reference_faisceau',
    'code_circuit'
]
  list_filter=['date_creation','date_detection','poste_detection','ligne','escalade_niv2']



#ANALYSE 5 POURQUOI:
@admin.register(Analyse5Pourquoi)
class Analyse5PourquoiAdmin(admin.ModelAdmin):
  list_display=['numero_pourquoi','type_analyse','qrqc']
  search_fields=['numero_pourquoi','qrqc__numero_qrqc']
  list_filter=['type_analyse']

#ContreMesure
@admin.register(ContreMesure)
class ContreMesureAdmin(admin.ModelAdmin):
  list_display=['type_analyse','responsable','date_prevue','statut_action','qrqc']
  search_fields=['responsable','qrqc__numero_qrqc']
  list_filter=['type_analyse','statut_action']

#Suivi QRQC
@admin.register(SuiviQrqc) 
class SuiviQrqcAdmin(admin.ModelAdmin):
  list_display=['jour','date_suivi','qrqc','resultat']
  search_fields=['qrqc__numero_qrqc']
  list_filter=['resultat']
  date_hierarchy = 'date_suivi'


#Piece Jointe 
@admin.register(PieceJointe)
class PieceJointeAdmin(admin.ModelAdmin):
  list_display=['qrqc','nom_fichier','date_import']
  search_fields=['qrqc__numero_qrqc','nom_fichier']
 
  
  