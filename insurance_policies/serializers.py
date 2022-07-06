from rest_framework import serializers
from .models import InsurancePolicy


class InsurancePolicySerializer(serializers.ModelSerializer):
    class Meta:
        model = InsurancePolicy
        fields = ('number', 'policy_holder', 'policy_owner', 'product', 'insurance_company', 'type_Of_insurance',
                  'region', 'registration_date', 'start_date', 'end_date', 'insurance_sum', 'insurance_premium',
                  'description', 'createdAt')
    # List of attributes for the InsurancePolicy Class
    # number, policy_holder, policy_owner, product, insurance_company,
    # type_Of_insurance, region, registration_date, start_date
    # start_date, end_date, insurance_sum, insurance_premium
    # description, createdAt
