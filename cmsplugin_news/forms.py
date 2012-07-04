from django import forms

from cms.plugin_pool import plugin_pool
from cms.plugins.text.settings import USE_TINYMCE
from cmsplugin_news.widgets.wymeditor_widget import WYMEditor


from cmsplugin_news.models import News

class NewsForm(forms.ModelForm):
    class Meta:
        model = News
