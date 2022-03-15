from django.db import models


class User(models.Model):
    name = models.CharField("Name", max_length=240)
    email = models.EmailField()
    avatar = models.URLField()


class Board(models.Model):
    name = models.CharField("Name", max_length=25)


class Column(models.Model):
    name = models.CharField("Name", max_length=25)
    board = models.ForeignKey(Board, on_delete=models.CASCADE)


class Task(models.Model):
    PRIORITIES = (
        ('L', 'Low'),
        ('M', 'Medium'),
        ('H', 'High'),
    )
    description = models.CharField("Description", max_length=250)
    priority = models.CharField(max_length=1,choices=PRIORITIES)
    registration_date = models.DateField("Registration Date", auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    column = models.ForeignKey(Column, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
