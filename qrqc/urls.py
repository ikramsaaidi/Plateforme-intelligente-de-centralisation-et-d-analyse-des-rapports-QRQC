from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,)
from .views import QrqcListCreateAPIView, QrqcRetrieveUpdateDestroyAPIView


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
        name = "qrqc_list_create ",

    ),
    path(
        "qrqc/<int:pk>/",
        QrqcRetrieveUpdateDestroyAPIView.as_view(),
        name="qrqc_detail",

    )


]