from rest_framework import serializers
from .models import Ligne,Utilisateur,Qrqc,Analyse5Pourquoi,ContreMesure,SuiviQrqc,PieceJointe

#Ligne
class LigneSerializer(serializers.ModelSerializer):
    class Meta:
        model=Ligne
        fields="__all__"


#Utilisateur
class UtilisateurSerializer(serializers.ModelSerializer):
    class Meta:
        model=Utilisateur
        fields="__all__"

#Qrqc
class QrqcSerializer(serializers.ModelSerializer):
  #Déclaration des champs
    ligne_nom=serializers.CharField(
        source="ligne.nom_ligne",
        read_only=True

    )
    utilisateur_nom=serializers.CharField(
        source="utilisateur.nom_complet",
        read_only=True
    )
    class Meta:
        model=Qrqc
        fields=[  "id",
                 "numero_qrqc",
                 "date_creation",
                "date_detection",
                "heure_detection",
                "description_probleme",
                "reference_faisceau",
                "quantite",
                "securiser_ligne_zone",
                "informer_operateur",
                "poste_detection",
                "mode_detection",
                "detecte_par",
                "code_circuit",
                "famille",
                "qte_ok",
                "qte_ng",
                "escalade_niv2",
                "escalade_decideur",
                "ligne",
                "ligne_nom",
                "utilisateur",
                "utilisateur_nom",
        ]


#Analyse des 5 pourquoi
class Analyse5PourquoiSerializer(serializers.ModelSerializer):
    qrqc_numero=serializers.IntegerField(
        source="qrqc.numero_qrqc",
        read_only=True
    )
    class Meta:
        model=Analyse5Pourquoi
        fields=["id",
            "type_analyse",
            "numero_pourquoi",
            "description",
            "qrqc",
            "qrqc_numero"

        ]



#contre mesure
class ContreMesureSerializer(serializers.ModelSerializer):
    qrqc_numero=serializers.IntegerField(
        source="qrqc.numero_qrqc",
        read_only=True
    )
    class Meta:
        model=ContreMesure
        fields=[
            "id",
            "type_analyse",
            "cause_racine",
            "action_corrective",
            "responsable",
            "date_prevue",
            "statut_action",
            "qrqc",
            "qrqc_numero"

        ]


#Suivi QRQC
class SuiviQrqcSerializer(serializers.ModelSerializer):
    qrqc_numero=serializers.IntegerField(
        source="qrqc.numero_qrqc",
        read_only=True
    )
    class Meta:
        model=SuiviQrqc
        fields=[
            "id",
            "jour",
            "date_suivi",
            "resultat",
            "commentaire",
            "qrqc",
            "qrqc_numero"
        ]

#Piece jointe
class PieceJointeSerializer(serializers.ModelSerializer):
    qrqc_numero=serializers.IntegerField(
        source="qrqc.numero_qrqc",
        read_only=True
    )
    class Meta:
        model = PieceJointe
        fields = [
    "id",
    "nom_fichier",
    "fichier",
    "date_import",
    "commentaire",
    "qrqc",
    "qrqc_numero"
]
