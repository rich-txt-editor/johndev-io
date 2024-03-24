from django import forms
from django.core.validators import MaxLengthValidator
from .models import Comment

class CommentForm(forms.ModelForm):
    body = forms.CharField(widget=forms.Textarea, validators=[MaxLengthValidator(500)])

    class Meta:
        model = Comment
        fields = ['name', 'body']

    # Example of custom clean method
    def clean_body(self):
        body = self.cleaned_data['body']
        # Add any additional sanitization or validation here
        return body
