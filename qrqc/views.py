from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Qrqc,Ligne, Utilisateur, Analyse5Pourquoi, ContreMesure, SuiviQrqc, PieceJointe
from .serializers import QrqcSerializer, LigneSerializer, UtilisateurSerializer, Analyse5PourquoiSerializer, SuiviQrqcSerializer, ContreMesureSerializer, PieceJointeSerializer
from .permission import (
    IsAdministrator,
    IsQualityEngineer,
    IsAdministratorOrEngineer,
)
class QrqcListCreateAPIView(generics.ListCreateAPIView):
    queryset = Qrqc.objects.all()
    serializer_class = QrqcSerializer
    def get_permissions(self):

        if self.request.method == "GET":
            return [IsAuthenticated()]
        return [IsQualityEngineer()]
    
    def perform_create(self, serializer):
     serializer.save(utilisateur = self.request.user.profil)


#2 eme view pour QRQC:
class QrqcRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Qrqc.objects.all()
    serializer_class = QrqcSerializer
    def get_permissions(self):

        if self.request.method == "GET":
            return [IsAuthenticated()]

        return [IsQualityEngineer()]




################################################################################
#views des autres modeles ###################################################


#Ligne:
class LigneListCreateAPIView(generics.ListCreateAPIView):
    queryset = Ligne.objects.all()
    serializer_class = LigneSerializer
    def get_permissions(self):

        if self.request.method == "GET":
            return [IsAuthenticated()]

        return [IsAdministratorOrEngineer()]


class LigneRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
        queryset = Ligne.objects.all()
        serializer_class = LigneSerializer
        def get_permissions(self):

          if self.request.method == "GET":
            return [IsAuthenticated()]

          return [IsAdministrator()]
    

#Utilisateur:
class UtilisateurListCreateAPIView(generics.ListCreateAPIView):
     queryset = Utilisateur.objects.all()
     serializer_class = UtilisateurSerializer
     def get_permissions(self):

        if self.request.method == "GET":
            return [IsAuthenticated()]

        return [IsAdministrator()]

class UtilisateurRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
          queryset = Utilisateur.objects.all()
          serializer_class = UtilisateurSerializer
          def get_permissions(self):

            if self.request.method == "GET":
              return [IsAuthenticated()]

            return [IsAdministrator()]

#Analyse des 5 Pourquoi :
class Analyse5PourquoiListCreateAPIView(generics.ListCreateAPIView):
      queryset = Analyse5Pourquoi.objects.all()
      serializer_class = Analyse5PourquoiSerializer
      def get_permissions(self):

         if self.request.method == "GET":
             return [IsAuthenticated()]

         return [IsQualityEngineer()]

class Analyse5PourquoiRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
            queryset = Analyse5Pourquoi.objects.all()
            serializer_class = Analyse5PourquoiSerializer
            def get_permissions(self):
            
                     if self.request.method == "GET":
                         return [IsAuthenticated()]
            
                     return [IsQualityEngineer()]


# Contre mesure : 
class ContreMesureListCreateAPIView(generics.ListCreateAPIView):
       queryset = ContreMesure.objects.all()
       serializer_class = ContreMesureSerializer
       def get_permissions(self):
       
                if self.request.method == "GET":
                    return [IsAuthenticated()]
       
                return [IsQualityEngineer()]


class ContreMesureRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
       queryset = ContreMesure.objects.all()
       serializer_class = ContreMesureSerializer
       def get_permissions(self):
       
                if self.request.method == "GET":
                    return [IsAuthenticated()]
       
                return [IsQualityEngineer()]


#Suivi QRQC
class SuiviQrqcListCreateAPIView(generics.ListCreateAPIView):
       queryset = SuiviQrqc.objects.all()
       serializer_class = SuiviQrqcSerializer
       def get_permissions(self):
       
                if self.request.method == "GET":
                    return [IsAuthenticated()]
       
                return [IsQualityEngineer()]

class SuiviQrqcRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
       queryset = SuiviQrqc.objects.all()
       serializer_class = SuiviQrqcSerializer
       def get_permissions(self):
       
                if self.request.method == "GET":
                    return [IsAuthenticated()]
       
                return [IsQualityEngineer()]


#Piece Jointe 
class PieceJointeListCreateAPIView(generics.ListCreateAPIView):
       queryset = PieceJointe.objects.all()
       serializer_class = PieceJointeSerializer
       def get_permissions(self):
       
                if self.request.method == "GET":
                    return [IsAuthenticated()]
       
                return [IsQualityEngineer()]


class PieceJointeRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
         queryset = PieceJointe.objects.all()
         serializer_class = PieceJointeSerializer
         def get_permissions(self):
         
                  if self.request.method == "GET":
                      return [IsAuthenticated()]
         
                  return [IsQualityEngineer()]
              
       
       

     

