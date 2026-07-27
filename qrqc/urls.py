from django.urls import path
from  .import views
from django.contrib.auth import views as auth_views
urlpatterns=[
  path("", views.accueil,name='accueil'),
  path('login/',auth_views.LoginView.as_view(template_name='Qrqc/login.html'),name='login'),
  path('logout/',auth_views.LogoutView.as_view(),
       name='logout')
]
