from rest_framework.permissions import BasePermission
from .models import Role


class HasRole(BasePermission):
    allowed_role=[]
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return False
        return request.user.profil.role in self.allowed_role


class IsQualityEngineer(HasRole):
    allowed_role=[Role.QUALITY_ENGINEER]

class IsAdministrator(HasRole):
    allowed_role = [Role.ADMIN]

class IsAuthenticatedUser(HasRole):
    allowed_role = [
        Role.ADMIN,
        Role.QUALITY_ENGINEER,
        Role.QUALITY_MANAGER,
    ]


#tout le monde peut lire mais seul l'ingénieur peut modifier:
class IsAdministratorOrEngineer(HasRole):
      allowed_role = [
        Role.ADMIN,
        Role.QUALITY_ENGINEER,
    ]