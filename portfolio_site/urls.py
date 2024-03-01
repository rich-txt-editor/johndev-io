"""
URL configuration for portfolio_site project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
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
from django.urls import path, include
from portfolio import views
from rest_framework.routers import DefaultRouter
from portfolio.views import ProjectViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", views.project_index, name="project_index"),
    path('project/<int:pk>/', views.project_detail, name='project_detail'),
    path("blog/", views.blog_index, name="blog_index"),
    path("blog/<int:pk>/", views.blog_detail, name="blog_detail"),
    path("about/", views.about_me, name="about_me"),
    path("skills/", views.skills_index, name="skills_index"),
    path("resume/", views.resume, name="resume"),
    path("contact/", views.contact, name="contact"),
    path('api/', include(router.urls)),
]
