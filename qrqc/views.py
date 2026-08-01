from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Qrqc
from .serializers import QrqcSerializer


class QrqcListCreateAPIView(generics.ListCreateAPIView):
    queryset = Qrqc.objects.all()
    serializer_class = QrqcSerializer
    permission_classes = [IsAuthenticated]


#2 eme view pour QRQC:
class QrqcRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Qrqc.objects.all()
    serializer_class = QrqcSerializer
    permission_classes = [IsAuthenticated]

