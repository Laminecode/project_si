from django.db import models

class record(models.Model):
    id_r = models.CharField(primary_key=True ,max_length= 50)
    type = models.IntegerField()
    fait = models.BooleanField()
    date = models.DateTimeField(auto_now_add= True)

    
class patient(models.Model): 
    id = models.CharField(primary_key=True, max_length=50)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    date_naissance = models.DateField()
    sexe = models.CharField(max_length=1)
    information = models.TextField()
    record = models.ForeignKey(record, on_delete=models.CASCADE)



class Hopitalisation(models.Model):
    id = models.CharField(primary_key= True , max_length=50)
    duree = models.DurationField()
    result= models.TextField()
    record = models.OneToOneField(record,on_delete=models.CASCADE)
    medecin = models.ManyToManyField("Medecin", on_delete=models.CASCADE)

class Visite(models.Model):
    id = models.CharField(primary_key= True , max_length=50)
    result= models.TextField()
    record = models.OneToOneField(record,on_delete=models.CASCADE)
    medecin = models.ManyToManyField("Medecin", on_delete=models.CASCADE)

class Control(models.Model):
    id = models.CharField(primary_key= True , max_length=50)
    result= models.TextField()
    record = models.OneToOneField(record,on_delete=models.CASCADE)
    medecin = models.ManyToManyField("Medecin", on_delete=models.CASCADE)

class Analyse(models.Model):
    id = models.CharField(primary_key= True , max_length=50)
    result= models.TextField()
    type = models.CharField(max_length=30)
    record = models.OneToOneField(record,on_delete=models.CASCADE)
    medecin = models.ManyToManyField("Medecin", on_delete=models.CASCADE)

class Chirugie(models.Model):
    id = models.CharField(primary_key= True , max_length=50)
    detail= models.TextField()
    duree = models.DurationField()
    record = models.OneToOneField(record,on_delete=models.CASCADE)
    medecin = models.ManyToManyField("Medecin", on_delete=models.CASCADE)

class Vaccination (models.Model):
    id = models.CharField(primary_key= True , max_length=50)
    nom= models.CharField(max_length=30)
    type = models.CharField(max_length=30)
    record = models.OneToOneField(record,on_delete=models.CASCADE)
    medecin = models.ManyToManyField("Medecin", on_delete=models.CASCADE)

class Medecin(models.Model):
    id = models.CharField(primary_key = True , max_length=50)
    nom = models.CharField(max_length=30)
    prenom = models.CharField(max_length=30)
    specilite= models.CharField(max_length= 30)
    #ajouter les reference vers les deferente service 

# class MedecinHopitalisation(models.Model):
#     medecin = models.ForeignKey(Medecin, on_delete=models.CASCADE)
#     hopitalisation = models.ForeignKey(Hopitalisation, on_delete=models.CASCADE)

# class MedecinControl(models.Model):
#     medecin = models.ForeignKey(Medecin, on_delete=models.CASCADE)
#     control = models.ForeignKey(Control, on_delete=models.CASCADE)

# class MedecinAnalyse(models.Model):
#     medecin = models.ForeignKey(Medecin, on_delete=models.CASCADE)
#     analyse = models.ForeignKey(Analyse, on_delete=models.CASCADE)

# class MedecinChirugie(models.Model):
#     medecin = models.ForeignKey(Medecin, on_delete=models.CASCADE)
#     chirugie = models.ForeignKey(Chirugie, on_delete=models.CASCADE)
    
# class MedecinVaccination(models.Model):
#     medecin = models.ForeignKey(Medecin, on_delete=models.CASCADE)
#     vaccination = models.ForeignKey(Vaccination, on_delete=models.CASCADE)









