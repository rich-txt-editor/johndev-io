import json

from django.http import HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, redirect
from .models import Project, Skill, Post, Resume
from .forms import CommentForm
from django.utils import timezone
from rest_framework import viewsets
from .serializers import ProjectSerializer
from taggit.models import Tag, TaggedItem
from django.db.models import Count, Q
from django_ratelimit.decorators import ratelimit
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime
from django.contrib import messages
from django.views.decorators.http import require_POST
from django.conf import settings
from django.urls import reverse
from django.utils.crypto import get_random_string
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()

        return context

# View for the Projects page

def index(request):
    nonce = get_random_string(length=32)  # Generate a random nonce
    response = render(request, 'portfolio/index.html', {'csp_nonce': nonce})  # Render the response with the nonce
    response['Content-Security-Policy'] = f"script-src 'self' 'nonce-{nonce}';"  # Set the CSP header
    return response  # Return the response object

def project_index(request):
    projects = Project.objects.prefetch_related('images').all()
    context = {
        'projects': projects
    }
    return render(request, 'portfolio/project_index.html', context)


def project_detail(request, pk):
    project = get_object_or_404(Project, pk=pk)
    nonce = get_random_string(length=32)  # Generate a random nonce
    response = render(request, 'portfolio/project_detail.html', {
        'project': project,
        'csp_nonce': nonce
    })  # Pass the nonce to the template
    response['Content-Security-Policy'] = f"script-src 'self' 'nonce-{nonce}'; style-src 'self' 'nonce-{nonce}';"  # Set the CSP header
    return response


# View for the Skills page


def skills_index(request):
    skills = Skill.objects.all()
    tags_with_counts = Tag.objects.annotate(count=Count(
        'taggit_taggeditem_items')).filter(count__gt=0).order_by('name')

    context = {
        'skills': skills,
        'tags_with_counts': tags_with_counts,
    }
    return render(request, 'portfolio/skills_index.html', context)

# View for the main Blog page, listing all blog posts

def blog_index(request):
    nonce = get_random_string(length=32)  # Generate a random nonce
    
    posts = Post.objects.all().order_by('-created_on')

    # Prepare tags with aggregated counts of posts and projects
    tags_with_counts = Tag.objects.annotate(
        total_posts=Count('post', distinct=True),
        total_projects=Count('project', distinct=True)
    ).annotate(
        total_count=Count('post', distinct=True) +
        Count('project', distinct=True)
    )

    # Prepare a list of tags with their counts for the template
    tags_with_counts_list = [{
        'name': tag.name,
        'count': tag.total_count
    } for tag in tags_with_counts if tag.total_count > 0]

    context = {
        'posts': posts,
        'tags_with_counts': tags_with_counts_list,
        'csp_nonce': nonce  # Include the nonce in the context
    }

    response = render(request, 'portfolio/blog_index.html', context)
    response['Content-Security-Policy'] = f"script-src 'self' 'nonce-{nonce}'; style-src 'self' 'nonce-{nonce}';"  # Set the CSP header with the nonce
    return response


# View for individual Blog post detail page


@ratelimit(key='ip', rate='5/m', method='POST', block=True)
def blog_detail(request, pk):
    nonce = get_random_string(length=32)
    post = get_object_or_404(Post, pk=pk)
    comments = post.comments.filter(approved=True)
    comment_form = CommentForm()
    tags_with_counts = Tag.objects.annotate(num_posts=Count('taggit_taggeditem_items')).filter(num_posts__gt=0).order_by('name')

    if request.method == 'POST':
        comment_form = CommentForm(data=request.POST)
        if comment_form.is_valid():
            new_comment = comment_form.save(commit=False)
            new_comment.post = post
            new_comment.approved = False
            new_comment.save()
            messages.success(request, 'Your comment is awaiting moderation.')
            return HttpResponseRedirect(post.get_absolute_url())
    else:
        comment_form = CommentForm()
    context = {
        'post': post,
        'comments': comments,
        'tags_with_counts': tags_with_counts,
        'comment_form': comment_form,
        'csp_nonce': nonce
    }
    response = render(request, 'portfolio/blog_detail.html', context)
    response['Content-Security-Policy'] = f"default-src 'self'; script-src 'self' 'nonce-{nonce}'; style-src 'self' 'nonce-{nonce}'; img-src 'self' data:; report-uri /csp-violation-report/"
    return response


def blog_by_tag(request, tag_name):
    # Generate a random nonce for CSP
    nonce = get_random_string(length=32)

    # Fetch posts and projects related to the tag
    posts = Post.objects.filter(tags__name__in=[tag_name])
    projects = Project.objects.filter(tags__name__in=[tag_name])

    # Combine posts and projects for display
    display_items = {'posts': posts, 'projects': projects}

    # Prepare tags with counts
    tags_with_counts = Tag.objects.annotate(
        num_posts=Count('post', filter=Q(post__tags__name=tag_name), distinct=True),
        num_projects=Count('project', filter=Q(project__tags__name=tag_name), distinct=True)
    ).filter(
        Q(post__tags__name=tag_name) | Q(project__tags__name=tag_name)
    ).distinct()

    # Aggregate counts for each tag
    tags_with_aggregated_counts = [{
        'name': tag.name,
        'count': tag.num_posts + tag.num_projects
    } for tag in tags_with_counts]

    # Set the CSP header with the nonce for inline styles and scripts
    response = render(request, 'portfolio/tagged_content.html', {
        'display_items': display_items,
        'tags_with_counts': tags_with_aggregated_counts,
        'csp_nonce': nonce
    })
    csp_policy = f"default-src 'self'; img-src 'self' data:; style-src 'self' 'nonce-{nonce}'; script-src 'self' 'nonce-{nonce}' http://localhost:8000; report-uri /csp-violation-report/"
    response['Content-Security-Policy'] = csp_policy

    return response

# View for the About Me page


def about_me(request):
    return render(request, 'portfolio/about_me.html')

# View for the Resume page


def resume(request):
    # Annotate each tag with the number of posts/projects associated with it
    tags_with_counts = Tag.objects.annotate(count=Count(
        'taggit_taggeditem_items')).filter(count__gt=0).order_by('name')
    resume = Resume.objects.first()

    context = {
        'tags_with_counts': tags_with_counts,
        'resume': resume,
    }
    return render(request, 'portfolio/resume.html', context)


# View for the Contact Info page
def contact(request):
    return render(request, 'portfolio/contact.html')


@csrf_exempt  # Disable CSRF token for this view as reports won't have it
@require_POST  # Accept only POST requests
def csp_violation_report(request):
    report = json.loads(request.body)
    # Log the report to the console or a file
    print("CSP Violation:", report)
    # You can also use logging, send to monitoring service, store in DB, etc.
    return JsonResponse({'status': 'ok'})
