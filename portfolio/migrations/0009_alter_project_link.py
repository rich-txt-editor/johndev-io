# Generated by Django 5.0.3 on 2024-03-14 17:42

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("portfolio", "0008_project_tags"),
    ]

    operations = [
        migrations.AlterField(
            model_name="project",
            name="link",
            field=models.URLField(blank=True, null=True),
        ),
    ]
