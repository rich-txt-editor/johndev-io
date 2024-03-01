from django.contrib import admin
from .models import Project, Skill, Post, Comment

# Register your models here.

class CommentAdmin(admin.ModelAdmin):
    list_display = ('name', 'body', 'post', 'created_on', 'approved')
    list_filter = ('approved', 'created_on')
    search_field = ('name', 'email', 'body')
    actions = ['approve_comments']

    def approve_comments(self, request, queryset):
        queryset.update(approved=True)


admin.site.register(Project)
admin.site.register(Skill)
admin.site.register(Post)
admin.site.register(Comment, CommentAdmin)
