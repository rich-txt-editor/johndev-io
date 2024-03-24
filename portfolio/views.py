from django.shortcuts import render, get_object_or_404, redirect
from .models import Project, Skill, Post, Comment, Resume
from .forms import CommentForm
from django.utils import timezone
from rest_framework import viewsets
from .serializers import ProjectSerializer
from taggit.models import Tag, TaggedItem
from django.db.models import Count, Q
from django_ratelimit.decorators import ratelimit
from rest_framework.decorators import api_view
from rest_framework.response import Response


# Create your views here.
class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()

        return context

# View for the Projects page
def project_index(request):
    projects = Project.objects.prefetch_related('images').all()
    context = {
        'projects': projects
    }
    return render(request, 'portfolio/project_index.html', context)

def project_detail(request, pk):
    project = get_object_or_404(Project, pk=pk)
    return render(request, 'portfolio/project_detail.html', {'project': project})

# View for the Skills page
def skills_index(request):
    skills = Skill.objects.all()
    tags_with_counts = Tag.objects.annotate(count=Count('taggit_taggeditem_items')).filter(count__gt=0).order_by('name')
    
    context = {
        'skills': skills,
        'tags_with_counts': tags_with_counts,
    }
    return render(request, 'portfolio/skills_index.html', context)

# View for the main Blog page, listing all blog posts
def blog_index(request):
    posts = Post.objects.all().order_by('-created_on')

    # Prepare tags with aggregated counts of posts and projects
    tags_with_counts = Tag.objects.annotate(
        total_posts=Count('post', distinct=True),
        total_projects=Count('project', distinct=True)
    ).annotate(
        total_count=Count('post', distinct=True) + Count('project', distinct=True)
    )

    # Prepare a list of tags with their counts for the template
    tags_with_counts_list = [{
        'name': tag.name,
        'count': tag.total_count
    } for tag in tags_with_counts if tag.total_count > 0]

    context = {
        'posts': posts,
        'tags_with_counts': tags_with_counts_list,
    }

    return render(request, 'portfolio/blog_index.html', context)

# View for individual Blog post detail page
@ratelimit(key='ip', rate='5/m', method='POST', block=True)
def blog_detail(request, pk):
    post = get_object_or_404(Post, pk=pk)
    tags_with_counts = Tag.objects.annotate(num_posts=Count('taggit_taggeditem_items')).filter(num_posts__gt=0).order_by('name')
    comments = post.comments.filter(approved=True)

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
        'tags_with_counts': tags_with_counts,
        'comments': comments,
        'comment_form': comment_form
    }

    return render(request, 'portfolio/blog_detail.html', context)

def blog_by_tag(request, tag_name):
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

    return render(request, 'portfolio/tagged_content.html', {
        'display_items': display_items,
        'tags_with_counts': tags_with_aggregated_counts,
    })

# View for the About Me page
def about_me(request):
    return render(request, 'portfolio/about_me.html')

# View for the Resume page
def resume(request):
    # Annotate each tag with the number of posts/projects associated with it
    tags_with_counts = Tag.objects.annotate(count=Count('taggit_taggeditem_items')).filter(count__gt=0).order_by('name')
    resume = Resume.objects.first()

    context = {
        'tags_with_counts': tags_with_counts,
        'resume': resume,
    }
    return render(request, 'portfolio/resume.html', context)


# View for the Contact Info page
def contact(request):
    return render(request, 'portfolio/contact.html')



@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Hello, world!'})
