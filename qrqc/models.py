from django.db import models
from django.core.validators import MinValueValidator,MaxValueValidator

#table ligne :
class Ligne (models.Model):
    #id_ligne sera creer automatiquement :
    nom_ligne=models.CharField(
        max_length=100,
    )
    zone=models.CharField(
        max_length=100,
    )
    #affichage se forme de chaine de caractere 
    def __str__(self):
        return f"{self.nom_ligne} - {self.zone}"


    

#table d'utilisateur :
class Utilisateur (models.Model) :
    nom_complet=models.CharField(max_length=100,) 
    role=models.CharField(max_length=50)  
    def __str__(self):
       return f"{self.nom_complet} - {self.role}"   




#table principale qrqc : 
class Qrqc (models.Model):
    numero_qrqc=models.IntegerField()
    date_creation=models.DateField() #date de remplissage de QRQC   
    date_detection=models.DateField()
    heure_detection=models.TimeField () #date et heure  a laquelle le probleme a ete detecte
    description_probleme=models.TextField()
    reference_faisceau=models.CharField(max_length=100)
    quantite=models.IntegerField(
        validators=[MinValueValidator(1)]
    )
    securiser_ligne_zone=models.BooleanField(default=False)
    informer_operateur=models.BooleanField(default=False)
    poste_detection=models.CharField(max_length=50)
    mode_detection=models.CharField(max_length=50)
    detecte_par=models.CharField(max_length=20)
    code_circuit=models.CharField(max_length=20)
    famille=models.CharField(max_length=50)
    qte_ok=models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)]

    )
    qte_ng =models.IntegerField(
            default=0,
            validators=[MinValueValidator(0)]
    
        )
    escalade_niv2=models.BooleanField(default=False)
    escalade_decideur=models.CharField(
           null=True,
           blank=True,
           max_length=50
    )
    ligne=models.ForeignKey('Ligne',
                            on_delete=models.PROTECT)
    utilisateur=models.ForeignKey('Utilisateur',
                                   on_delete=models.PROTECT)
    def __str__(self):
        return f"{self.numero_qrqc} - {self.ligne}"



#analyse :
class TypeAnalyse(models.TextChoices):
    DETECTION='Détection',"Détection"
    OCCURRENCE='Occurrence','Occurrence'
class Analyse5Pourquoi(models.Model):
    type_analyse=models.CharField(
       max_length=20,
       choices=TypeAnalyse.choices
    )
    numero_pourquoi=models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    description=models.TextField(
         null=True,
         blank=True
    )
    qrqc=models.ForeignKey(
        'Qrqc',
        on_delete=models.PROTECT
        )
    def __str__(self):
        return f"{self.type_analyse}-{self.numero_pourquoi}"





#contre_mesure:
#choix de statut action 
class StatutAction(models.TextChoices):
    EN_COURS="en cours","En cours"
    PLANIFIEE="planifiee","Planifiée"
    REALISEE="realisee","Réalisée"
class ContreMesure(models.Model):
    type_analyse=models.CharField(
        max_length=20,
        choices=TypeAnalyse.choices
    )
    cause_racine=models.TextField(
        null=True,
        blank=True
    )
    action_corrective=models.TextField(
         null=True,
         blank=True
    )
    # a verifie :
    responsable=models.CharField(max_length=20,
                                  null=True,
                                  blank=True)
    date_prevue=models.DateField(
         null=True,
         blank=True
    )
    statut_action=models.CharField(
        max_length=20,
        choices=StatutAction.choices,
        default=StatutAction.EN_COURS
    )
    qrqc=models.ForeignKey('Qrqc',
                           on_delete=models.PROTECT)
    def __str__(self):
        return f"{self.type_analyse} - {self.qrqc}"


#Suivi Qrqc
class Resultat(models.TextChoices):
    OK="OK","OK"
    NG="NG","NG"
class SuiviQrqc(models.Model):
    jour=models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    date_suivi=models.DateField()
    resultat=models.CharField(
        max_length=10,
        choices=Resultat.choices

    )
    commentaire=models.TextField(
        null=True,
        blank=True
    )
    qrqc=models.ForeignKey(
        'Qrqc',
        on_delete=models.PROTECT
    )
    def __str__(self):
        return f"{self.jour} - {self.resultat} - {self.qrqc}"


#piece jointe
class PieceJointe(models.Model):
    nom_fichier=models.CharField(
        max_length=255
    )
    fichier=models.FileField(upload_to="qrqc/")
    date_import=models.DateField()
    commentaire=models.TextField(
        null=True,
        blank=True
    )
    qrqc=models.ForeignKey(
        'Qrqc',
        on_delete=models.PROTECT
    )
    def __str__ (self):
        return f"{self.nom_fichier} "





    
    

