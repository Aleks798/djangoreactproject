from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import InsurancePolicy
from .serializers import *


# Create your views here.


@api_view(['GET', 'POST'])
def policies_list(request):
    """
 List of insurance polices, or create a new policy.
 """
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        policies = InsurancePolicy.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(policies, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = InsurancePolicySerializer(data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data, 'count': paginator.count, 'numpages': paginator.num_pages,
                         'nextlink': '/api/policies/?page=' + str(nextPage),
                         'prevlink': '/api/policies/?page=' + str(previousPage)})

    elif request.method == 'POST':
        serializer = InsurancePolicySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def clients_list(request):
    """
 List of clients, or create a new policy.
 """
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        clients = Client.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(clients, 10)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = ClientSerializer(data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()

        return Response({'data': serializer.data, 'count': paginator.count, 'numpages': paginator.num_pages,
                         'nextlink': '/api/clients/?page=' + str(nextPage),
                         'prevlink': '/api/clients/?page=' + str(previousPage)})

    elif request.method == 'POST':
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def policies_detail(request, pk):
    """
    Retrieve, update or delete a policy by id/pk.
    """
    try:

        policy = InsurancePolicy.objects.get(pk=pk)
    except InsurancePolicy.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = InsurancePolicySerializer(policy, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = InsurancePolicySerializer(policy, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        policy.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'PUT', 'DELETE'])
def clients_detail(request, pk):
    """
    Retrieve, update or delete a client by id/pk.
    """
    try:

        client = Client.objects.get(pk=pk)
    except Client.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ClientSerializer(client, context={'request': request})
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ClientSerializer(client, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        client.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
