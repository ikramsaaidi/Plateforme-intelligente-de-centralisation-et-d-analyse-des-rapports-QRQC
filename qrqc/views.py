from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Qrqc,Ligne, Utilisateur, Analyse5Pourquoi, ContreMesure, SuiviQrqc, PieceJointe
from .serializers import QrqcSerializer, LigneSerializer, UtilisateurSerializer, Analyse5PourquoiSerializer, SuiviQrqcSerializer, ContreMesureSerializer, PieceJointeSerializer


class QrqcListCreateAPIView(generics.ListCreateAPIView):
    queryset = Qrqc.objects.all()
    serializer_class = QrqcSerializer
    permission_classes = [IsAuthenticated]


#2 eme view pour QRQC:
class QrqcRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Qrqc.objects.all()
    serializer_class = QrqcSerializer
    permission_classes = [IsAuthenticated]




################################################################################
#views des autres modeles ###################################################


#Ligne:
class LigneListCreateAPIView(generics.ListCreateAPIView):
    queryset = Ligne.objects.all()
    serializer_class = LigneSerializer
    permission_classes = [IsAuthenticated]


class LigneRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
        queryset = Ligne.objects.all()
        serializer_class = LigneSerializer
        permission_classes = [IsAuthenticated]
    

#Utilisateur:
class UtilisateurListCreateAPIView(generics.ListCreateAPIView):
     queryset = Utilisateur.objects.all()
     serializer_class = UtilisateurSerializer
     permission_classes = [IsAuthenticated]

class UtilisateurRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
          queryset = Utilisateur.objects.all()
          serializer_class = UtilisateurSerializer
          permission_classes = [IsAuthenticated]

#Analyse des 5 Pourquoi :
class Analyse5PourquoiListCreateAPIView(generics.ListCreateAPIView):
      queryset = Analyse5Pourquoi.objects.all()
      serializer_class = Analyse5PourquoiSerializer
      permission_classes = [IsAuthenticated]

class Analyse5PourquoiRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
            queryset = Analyse5Pourquoi.objects.all()
            serializer_class = Analyse5PourquoiSerializer
            permission_classes = [IsAuthenticated]


# Contre mesure : 
class ContreMesureListCreateAPIView(generics.ListCreateAPIView):
       queryset = ContreMesure.objects.all()
       serializer_class = ContreMesureSerializer
       permission_classes = [IsAuthenticated]


class ContreMesureRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
       queryset = ContreMesure.objects.all()
       serializer_class = ContreMesureSerializer
       permission_classes = [IsAuthenticated]


#Suivi QRQC
class SuiviQrqcListCreateAPIView(generics.ListCreateAPIView):
       queryset = SuiviQrqc.objects.all()
       serializer_class = SuiviQrqcSerializer
       permission_classes = [IsAuthenticated]

class SuiviQrqcRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
       queryset = SuiviQrqc.objects.all()
       serializer_class = SuiviQrqcSerializer
       permission_classes = [IsAuthenticated]


#Piece Jointe 
class PieceJointeListCreateAPIView(generics.ListCreateAPIView):
       queryset = PieceJointe.objects.all()
       serializer_class = PieceJointeSerializer
       permission_classes = [IsAuthenticated]


class PieceJointeRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
         queryset = PieceJointe.objects.all()
         serializer_class = PieceJointeSerializer
         permission_classes = [IsAuthenticated]
              
       
       

     

