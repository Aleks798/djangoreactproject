from django.db import models


# Create your models here.

class Client(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField("Name", max_length=255)
    first_name = models.CharField("First name", max_length=50)
    middle_name = models.CharField("Middle name", max_length=50)
    last_name = models.CharField("Last name", max_length=50)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField("Name", max_length=255)

    def __str__(self):
        return self.name


class TypeOfInsurance(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField("Name", max_length=255)

    def __str__(self):
        return self.name


class InsuranceCompany(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField("Name", max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name


class Risk(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField("Name", max_length=255)

    def __str__(self):
        return self.name


class Region(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField("Name", max_length=255)

    def __str__(self):
        return self.name


class InsurancePolicy(models.Model):
    id = models.BigAutoField(primary_key=True)
    number = models.CharField("Number", max_length=100, unique=True)
    policy_holder = models.ForeignKey(Client, on_delete=models.DO_NOTHING, related_name='policy_holder')
    policy_owner = models.ForeignKey(Client, on_delete=models.DO_NOTHING, related_name='policy_owner')
    product = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    insurance_company = models.ForeignKey(InsuranceCompany, on_delete=models.DO_NOTHING)
    type_Of_insurance = models.ForeignKey(TypeOfInsurance, on_delete=models.DO_NOTHING)
    region = models.ForeignKey(Region, on_delete=models.DO_NOTHING)
    registration_date = models.DateTimeField("Registration date",
                                             auto_now_add=True)  # https://docs.djangoproject.com/en/4.0/ref/models/fields/#datetimefield
    start_date = models.DateTimeField('Start date', auto_now_add=True)
    end_date = models.DateTimeField('End date', auto_now_add=False)
    # duration = models.DurationField('Duration', )
    insurance_sum = models.DecimalField(max_digits=15, decimal_places=2)
    insurance_premium = models.DecimalField(max_digits=15, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return self.number


class RiskTable(models.Model):
    id = models.BigAutoField(primary_key=True)
    insurance_policy = models.ForeignKey(InsurancePolicy, on_delete=models.DO_NOTHING, related_name='insurance_policies')
    risk = models.ForeignKey(Risk, on_delete=models.DO_NOTHING, related_name='risk')
    insurance_rate = models.DecimalField(max_digits=7, decimal_places=4)
    insurance_premium = models.DecimalField(max_digits=15, decimal_places=2)

    def __str__(self):
        return self.id


class PeriodOfInsurance(models.Model):
    id = models.BigAutoField(primary_key=True)
    insurance_policy = models.ForeignKey(InsurancePolicy, on_delete=models.DO_NOTHING, related_name='ins_policies')
    start_date = models.DateTimeField('Start date', auto_now_add=True)
    end_date = models.DateTimeField('End date', auto_now_add=False)

    def __str__(self):
        return self.id