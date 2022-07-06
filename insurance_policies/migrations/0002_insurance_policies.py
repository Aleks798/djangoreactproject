# Generated by Django 4.0.5 on 2022-07-05 18:45

from django.db import migrations


# add first data to DB
from django.db.models.functions import datetime


def create_data(apps, schema_editor):
    # Client
    Client = apps.get_model('insurance_policies', 'Client')
    Client(first_name="Client 001", last_name="Client 001", email="сlient001@email.com", phone="00000000",
           address="Client 000 Address").save()
    # Product
    Product = apps.get_model('insurance_policies', 'Product')
    Product(name="Product 001").save()
    # TypeOfInsurance
    TypeOfInsurance = apps.get_model('insurance_policies', 'TypeOfInsurance')
    TypeOfInsurance(name="CTP").save()
    # InsuranceCompany
    InsuranceCompany = apps.get_model('insurance_policies', 'InsuranceCompany')
    InsuranceCompany(name="Alfa Ins", email="alfa001@email.com", phone="00000000",
           address="Alfa Ins 000 Address").save()
    # Risk
    Risk = apps.get_model('insurance_policies', 'Risk')
    Risk(name="Financial Risk").save()
    # Region
    Region = apps.get_model('insurance_policies', 'Region')
    Region(name="RU").save()
    # InsurancePolicy
    # example: department_id = Department.objects.get(password = password, department_name = department_name)
    policy_holder_id = Client.objects.get(first_name="Client 001", last_name="Client 001", email="сlient001@email.com")
    product_id = Product.objects.get(name="Product 001")
    insurance_company_id = InsuranceCompany.objects.get(name="Alfa Ins", email="alfa001@email.com", phone="00000000")
    type_Of_insurance_id = TypeOfInsurance.objects.get(name="CTP")

    InsurancePolicy = apps.get_model('insurance_policies', 'InsurancePolicy')
    InsurancePolicy(number='00000000001', policy_holder_id=policy_holder_id, policy_owner_id=policy_holder_id,
                    product_id=product_id, insurance_company_id=insurance_company_id,
                    type_Of_insurance_id=type_Of_insurance_id, region=Region,
                    registration_date=datetime.datetime(2022, 7, 5),
                    start_date=datetime.datetime(2022, 7, 5), end_date=datetime.datetime(2023, 7, 4, 23, 59, 59),
                    insurance_sum=100000.00, insurance_premium=1000.00, description='Insurance policy',
                    createdAt=datetime.datetime(2022, 7, 5)).save()
    # number, policy_holder, policy_owner, product, insurance_company,
    # type_Of_insurance, region, registration_date, start_date
    # start_date, end_date, insurance_sum, insurance_premium
    # description, createdAt

    # RiskTable
    RiskTable = apps.get_model('insurance_policies', 'RiskTable')
    RiskTable(insurance_policy_id=InsurancePolicy.id, risk_id=Risk.id, insurance_rate=1.00, insurance_premium=1000)
    # PeriodOfInsurance
    PeriodOfInsurance = apps.get_model('insurance_policies', 'PeriodOfInsurance')
    PeriodOfInsurance(insurance_policy_id=InsurancePolicy.id, start_date=InsurancePolicy.start_date,
                      end_date=InsurancePolicy.end_date).save()


class Migration(migrations.Migration):
    dependencies = [
        ('insurance_policies', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_data),
    ]
