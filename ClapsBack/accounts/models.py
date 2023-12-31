from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.core.validators import MaxValueValidator, MinValueValidator

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

    def create_superuser(self, email, username, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not password:
            raise ValueError('User must have a password')
        user = self.model(username=username,email=self.normalize_email(email))
        user.is_superuser = True
        user.set_password(password)
        user.save()
        return user

class clapsUser(AbstractBaseUser):
    #user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=60,unique=True)
    username = models.CharField(max_length=40,unique=True, primary_key=True)
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
    is_company = models.BooleanField(default=False)


    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = clapsUserManager()

    def __str__(self):
        return self.username
    
class show(models.Model):
    id_show = models.AutoField(primary_key=True)
    titulo = models.CharField(max_length=80)
    teatro = models.ForeignKey(clapsUser, on_delete=models.CASCADE, related_name="teatro")
    company = models.ForeignKey(clapsUser, on_delete=models.CASCADE, related_name="company")
    sinopsis = models.CharField(max_length=900)
    trailer_url = models.CharField(max_length=200, default=None,null=True)
    image_url = models.CharField(max_length=350, default=None, null=True)
    image2_url = models.CharField(max_length=350, default=None, null=True)
    fecha_show = models.DateTimeField()
    latitude = models.DecimalField(max_digits=15,decimal_places=10,null=True)
    longitude = models.DecimalField(max_digits=15,decimal_places=10,null=True)
    avg_rating = models.DecimalField(max_digits=15,decimal_places=10)

    REQUIRED_FIELDS = ['titulo', 'fecha_show', 'teatro', 'company']

    def __str__(self):
        return self.titulo

class critica(models.Model):
    id_crit = models.AutoField(primary_key=True)
    cuerpo_crit = models.CharField(max_length=900)
    rating = models.IntegerField(default=1,validators=[MaxValueValidator(5), MinValueValidator(0)]) 
    id_show = models.ForeignKey(show, on_delete=models.CASCADE, related_name="associated_show")
    author = models.ForeignKey(clapsUser, on_delete=models.CASCADE, related_name="id_user")
    date_posted =  models.DateTimeField(auto_now_add=True)

