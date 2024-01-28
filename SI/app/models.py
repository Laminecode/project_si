from django.db import models

class Record(models.Model):
    id = models.AutoField(primary_key=True)
    type = models.CharField(max_length=50)
    fait = models.BooleanField()
    date = models.DateTimeField(auto_now_add= True)
    patient = models.ForeignKey("Patient", on_delete=models.CASCADE, related_name='record')
    #les reference vers les differents services sont renome dans la relation des service avec record 
    
    # hopitalisation =    models.OneToOneField("Hopitalisation", on_delete=models.CASCADE)
    # visite =            models.OneToOneField("Visite", on_delete=models.CASCADE)
    # control =           models.OneToOneField("Control", on_delete=models.CASCADE)
    # analyse =           models.OneToOneField("Analyse", on_delete=models.CASCADE)
    # chirugie =          models.OneToOneField("Chirugie", on_delete=models.CASCADE)
    # vaccination =       models.OneToOneField("Vaccination", on_delete=models.CASCADE)


class Patient(models.Model): 
    id = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    date_naissance = models.DateField()
    sexe = models.CharField(max_length=1)
    information = models.TextField()
    # record = models.ForeignKey(record, on_delete=models.CASCADE)

    def dict(self):
        return {"id": self.id, "nom" : self.nom, "prenom": self.prenom,
				 "date_naissance": self.date_naissance.strftime("%Y-%m-%d"), "sexe": self.sexe, "information": self.information}

class Medecin(models.Model):
    id = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=50)
    prenom = models.CharField(max_length=50)
    specialite= models.CharField(max_length= 50)

    def dict(self):
        return {"id": self.id, "nom": self.nom, "prenom": self.prenom, "specialite": self.specialite}
    
    #les reference vers les differents services sont renome dans la relation des service avec medecin 

    # hopitalisation =    models.ManyToManyField("Hopitalisation")
    # visite =            models.ManyToManyField("Visite")
    # control =           models.ManyToManyField("Control")
    # analyse =           models.ManyToManyField("Analyse")
    # chirugie =          models.ManyToManyField("Chirugie")
    # vaccination =       models.ManyToManyField("Vaccination")


# service

def _get_service_other_info(data, record, medecin):
    data["medecin"] = {k: v.id for k, v in enumerate(medecin.all())} 
    data["patient"] = record.patient.id
    data["date"] = record.date.strftime("%Y-%m-%d")
    data["fait"] = record.fait
    return data

class Hospitalisation(models.Model):
    id = models.AutoField(primary_key=True)
    duree = models.DurationField()
    resultat = models.TextField()
    record = models.OneToOneField(Record, on_delete=models.CASCADE, related_name="hospitalisation")
    medecin = models.ManyToManyField(Medecin, related_name="hospitalisation")

    def dict(self):
        data = {"id": self.id, "duree": self.duree.days, "resultat": self.resultat}
        return _get_service_other_info(data, self.record, self.medecin)


class Visite(models.Model):
    id = models.AutoField(primary_key=True)
    resultat = models.TextField()
    record = models.OneToOneField(Record, on_delete=models.CASCADE, related_name="visite")
    medecin = models.ManyToManyField(Medecin, related_name="visite")

    def dict(self):
        data = {"id": self.id, "resultat": self.resultat}
        return _get_service_other_info(data, self.record, self.medecin)

class Control(models.Model):
    id = models.AutoField(primary_key=True)
    resultat = models.TextField()
    record = models.OneToOneField(Record, on_delete=models.CASCADE, related_name="control")
    medecin = models.ManyToManyField(Medecin, related_name="control")

    def dict(self):
        data = {"id": self.id, "resultat": self.resultat}
        return _get_service_other_info(data, self.record, self.medecin)

class Analyse(models.Model):
    id = models.AutoField(primary_key=True)
    resultat = models.TextField()
    type = models.CharField(max_length=50)
    record = models.OneToOneField(Record, on_delete=models.CASCADE, related_name="analyse")
    medecin = models.ManyToManyField(Medecin, related_name="analyse")

    def dict(self):
        data = {"id": self.id, "type": self.type, "resultat": self.resultat}
        return _get_service_other_info(data, self.record, self.medecin)

class Chirurgie(models.Model):
    id = models.AutoField(primary_key=True)
    detail= models.TextField()
    duree = models.DurationField()
    record = models.OneToOneField(Record, on_delete=models.CASCADE, related_name="chirurgie")
    medecin = models.ManyToManyField(Medecin, related_name="chirurgie")

    def dict(self):
        hours, remainder = divmod(self.duree.total_seconds(), 3600)
        minutes, _ = divmod(remainder, 60)

        data = {"id": self.id, "heure": hours, "minute": minutes, "detail": self.detail}
        return _get_service_other_info(data, self.record, self.medecin)

class Vaccination (models.Model):
    id = models.AutoField(primary_key=True)
    nom= models.CharField(max_length=50)
    type = models.CharField(max_length=50)
    record = models.OneToOneField(Record, on_delete=models.CASCADE, related_name="vaccination")
    medecin = models.ManyToManyField(Medecin, related_name="vaccination")

    def dict(self):
        data = {"id": self.id, "nom": self.nom, "type": self.type}
        return _get_service_other_info(data, self.record, self.medecin)








