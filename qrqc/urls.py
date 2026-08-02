from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,)
from .views import (QrqcListCreateAPIView, QrqcRetrieveUpdateDestroyAPIView,
                    LigneListCreateAPIView, LigneRetrieveUpdateDestroyAPIView,
                    UtilisateurListCreateAPIView, UtilisateurRetrieveUpdateDestroyAPIView,
                    Analyse5PourquoiListCreateAPIView, Analyse5PourquoiRetrieveUpdateDestroyAPIView, 
                    ContreMesureListCreateAPIView, ContreMesureRetrieveUpdateDestroyAPIView,
                    SuiviQrqcListCreateAPIView, SuiviQrqcRetrieveUpdateDestroyAPIView, 
                    PieceJointeListCreateAPIView, PieceJointeRetrieveUpdateDestroyAPIView,)


urlpatterns = [

    path(
        "token/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),

    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),
    #les routes de views de QRQC :
    path(
        "qrqc/",
        QrqcListCreateAPIView.as_view(),
        name = "qrqc_list_create",

    ),
    path(
        "qrqc/<int:pk>/",
        QrqcRetrieveUpdateDestroyAPIView.as_view(),
        name="qrqc_detail",
    ),

    #Les routes de views des autres modeles :
    path(
        "ligne/",
        LigneListCreateAPIView.as_view(),
        name="ligne_list_create" ,
    ),
    path(
        "ligne/<int:pk>/",
        LigneRetrieveUpdateDestroyAPIView.as_view(),
        name = "ligne_detail",
    ),
    #Utilisateur:
     path(
            "utilisateur/",
            UtilisateurListCreateAPIView.as_view(),
            name="utilisateur_list_create" ,
        ),
        path(
            "utilisateur/<int:pk>/",
            UtilisateurRetrieveUpdateDestroyAPIView.as_view(),
            name = "utilisateur_detail",
        ),

    #Analysdes 5 Pourquoi:
     path(
            "analyse5pourquoi/",
            Analyse5PourquoiListCreateAPIView.as_view(),
            name="analyse_5_pourquoi_list_create" ,
        ),
        path(
            "analyse5pourquoi/<int:pk>/",
            Analyse5PourquoiRetrieveUpdateDestroyAPIView.as_view(),
            name = "analyse_5_pourquoi_detail",
        ),

    #Contre Mesure 
     path(
            "contremesure/",
            ContreMesureListCreateAPIView.as_view(),
            name="contre_mesure_list_create" ,
        ),
        path(
            "contremesure/<int:pk>/",
            ContreMesureRetrieveUpdateDestroyAPIView.as_view(),
            name = "contre_mesure_detail",
        ),

    #Suivi Qrqc 
     path(
            "suiviqrqc/",
            SuiviQrqcListCreateAPIView.as_view(),
            name="suivi_qrqc_list_create" ,
        ),
        path(
            "suiviqrqc/<int:pk>/",
            SuiviQrqcRetrieveUpdateDestroyAPIView.as_view(),
            name = "suivi_qrqc_detail",
        ),

    #Piece Jointe 
     path(
            "piecejointe/",
             PieceJointeListCreateAPIView.as_view(),
             name="piece_jointe_list_create" ,
        ),
        path(
            "piecejointe/<int:pk>/",
             PieceJointeRetrieveUpdateDestroyAPIView.as_view(),
             name = "piece_jointe_detail",
        ),

    


]