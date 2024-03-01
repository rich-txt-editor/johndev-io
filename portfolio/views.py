from django.shortcuts import render, get_object_or_404, redirect
from .models import Project, Skill, Post, Comment
from .forms import CommentForm
from django.utils import timezone
from rest_framework import viewsets
from .serializers import ProjectSerializer

# Create your views here.

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

# View for the Projects page
def project_index(request):
    projects = Project.objects.all()
    context = {
        'projects': projects
    }
    return render(request, 'portfolio/project_index.html', context)

# View for the individual Project details page
def project_detail(request, pk):
    project = get_object_or_404(Project, pk=pk)
    context = {
        'project': project
    }
    return render(request, 'portfolio/project_detail.html', context)

# View for the Skills page
def skills_index(request):
    skills = Skill.objects.all()
    context = {
        'skills': skills
    }
    return render(request, 'portfolio/skills_index.html', context)

# View for the main Blog page, listing all blog posts
def blog_index(request):
    posts = Post.objects.all().order_by('-created_on')
    context = {
        'posts': posts
    }
    return render(request, 'portfolio/blog_index.html', context)

# View for individual Blog post detail page
def blog_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    comments = post.comments.filter(approved=True)
    new_comment = None  # Ensure new_comment is defined outside the if statement

    if request.method == 'POST':
        comment_form = CommentForm(data=request.POST)
        if comment_form.is_valid():
            new_comment = comment_form.save(commit=False)
            new_comment.post = post
            new_comment.save()
            return redirect('blog_detail', pk=post.pk)
    else:
        comment_form = CommentForm()

    context = {
        'post': post,
        'comments': comments,
        'new_comment': new_comment,  # This variable is now always defined
        'comment_form': comment_form
    }

    return render(request, 'portfolio/blog_detail.html', context)

# View for the About Me page
def about_me(request):
    return render(request, 'portfolio/about_me.html')

# View for the Resume page
def resume(request):
    return render(request, 'portfolio/resume.html')

# View for the Contact Info page
def contact(request):
    return render(request, 'portfolio/contact.html')
