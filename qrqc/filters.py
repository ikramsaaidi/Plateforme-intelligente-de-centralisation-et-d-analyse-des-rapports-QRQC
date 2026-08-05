import django_filters 
from .models import Qrqc

class QrqcFilter(django_filters.FilterSet):
    #Recherche exacte 
    numero_qrqc = django_filters.NumberFilter(field_name = 'numero_qrqc', lookup_expr = 'exact', label ='Numero QRQC')
    escalade_niv2 = django_filters.BooleanFilter(field_name = 'escalade_niv2', lookup_expr = 'exact')
    #recherche partielle
    famille = django_filters.CharFilter(field_name ='famille', lookup_expr ='icontains')
    reference_faisceau = django_filters.CharFilter(field_name ='reference_faisceau', lookup_expr ='icontains', label ='référence faisceau')
    detecte_par= django_filters.CharFilter(field_name = 'detecte_par', lookup_expr = 'icontains', label ='team Leader')
    mode_detection = django_filters.CharFilter(field_name = 'mode_detection', lookup_expr = 'icontains', label='mode de detection')
    #recherche par intevalle pour les dates 
    date_creation_before = django_filters.DateFilter(field_name = 'date_creation', lookup_expr = 'lte')
    date_creation_after = django_filters.DateFilter(field_name = 'date_creation', lookup_expr = 'gte')
    date_detection_before = django_filters.DateFilter(field_name = 'date_detection', lookup_expr = 'lte')
    date_detection_after = django_filters.DateFilter(field_name = 'date_detection', lookup_expr = 'gte')
    # recherche :utilisateur et nom de la ligne ( foreignKeys) : 
    utilisateur = django_filters.CharFilter(
      field_name="utilisateur__nom_complet",
      lookup_expr="icontains",
    )
    ligne = django_filters.CharFilter(
        field_name = "ligne__nom_ligne",
        lookup_expr = 'icontains',
    )
    class Meta :
        model = Qrqc
        fields = [
            'numero_qrqc',
            'famille',
            'reference_faisceau',
            'detecte_par',
            'mode_detection',
            'escalade_niv2',
            'date_creation_before',
            'date_creation_after',
            'date_detection_before',
            'date_detection_after',
            'utilisateur',
            'ligne'
        ]
