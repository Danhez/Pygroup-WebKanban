from django.shortcuts import render
from rest_framework import viewsets
from .serializers import BoardSerializer, TaskSerializer, ColumnSerializer, UserSerializer
from .models import Board, Task, Column, User

# Create your views here.


class BoardView(viewsets.ModelViewSet):
    serializer_class = BoardSerializer
    queryset = Board.objects.all()


class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


class ColumnView(viewsets.ModelViewSet):
    serializer_class = ColumnSerializer
    queryset = Column.objects.all()


class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
