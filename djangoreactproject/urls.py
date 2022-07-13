"""djangoreactproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from insurance_policies import views

# (!) from django.conf.urls import url - django.conf.urls.url() was deprecated in Django 3.0,
# and is removed in Django 4.0+.
# The easiest fix is to replace url() with re_path().

# List of classes for current project /at 2022-07-13/
# Client
# Product
# TypeOfInsurance
# InsuranceCompany
# Risk
# Region
# InsurancePolicy
# RiskTable
# PeriodOfInsurance


urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/policies/$', views.policies_list),
    re_path(r'^api/policies/(?P<pk>[0-9]+)$', views.policies_detail),
    re_path(r'^api/clients/$', views.clients_list),
    re_path(r'^api/clients/(?P<pk>[0-9]+)$', views.clients_detail),
]
