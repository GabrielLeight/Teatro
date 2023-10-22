from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class clapsUserManager(BaseUserManager):
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not password:
            raise ValueError('User must have a password')
        user = self.model(email=self.normalize_email(email), name=name)
        user.set_password(password)
        user.save()
        return user
    
#    def create_teatro(self, email, name, password=None):
#        if not email:
#            raise ValueError('Users must have an email address')
#        if not password:
#            raise ValueError('User must have a password')
#        user = self.model(email=self.normalize_email(email), name=name)
#        user.first_name = 'None'
#        user.last_name = 'None'
#        user.is_teatro = True
#        user.is_commonUser = True
#        user.set_password(password)
#        user.save()
#        return user    

    def create_superuser(self, email, name, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not password:
            raise ValueError('User must have a password')
        user = self.model(email=self.normalize_email(email), name=name)
        user.is_superuser = True
        user.set_password(password)
        user.save()
        return user

class clapsUser(AbstractBaseUser):
    email = models.EmailField(max_length=60,unique=True)
    username = models.CharField(max_length=40,unique=True)
    direction = models.CharField(max_length=120)
    latit = models.DecimalField(max_digits=15,decimal_places=10,null=True)
    longit = models.DecimalField(max_digits=15,decimal_places=10,null=True)
    date_joined =  models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    is_teatro = models.BooleanField(default=False)
    is_commonUser = models.BooleanField(default=True)
    is_hall = models.BooleanField(default=False)


    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = clapsUserManager()

    def __str__(self):
        return self.email
    
class show(models.Model):
    titulo = models.CharField(max_length=80)
    teatro = models.ForeignKey(clapsUser, on_delete=models.CASCADE, related_name="teatro")
    hall = models.ForeignKey(clapsUser, on_delete=models.CASCADE, related_name="hall")
    sinopsis = models.CharField(max_length=900)
    trailer_url = models.URLField(max_length=200)

    REQUIRED_FIELDS = ['titulo']

    def __str__(self):
        return self.titulo