from django.utils.translation import ugettext_lazy as _
from django.utils.translation import ungettext
from django.contrib import admin
from django.conf import settings
from django.forms import Media

from cmsplugin_news.forms import NewsForm
from cmsplugin_news.models import News
    
class NewsAdmin(admin.ModelAdmin):
    """
        Admin for news
    """
    date_hierarchy = 'pub_date'
    list_display = ('slug', 'title', 'is_published', 'pub_date')
    #list_editable = ('title', 'is_published')
    list_filter = ('is_published', )
    search_fields = ['title', 'excerpt', 'content']
    prepopulated_fields = {'slug': ('title',)}
    form = NewsForm
    
    actions = ['make_published', 'make_unpublished']
    
    save_as = True
    
    def queryset(self, request):
        """
            Override to use the objects and not just the default visibles only.
        """
        return News.objects.all()
       
    def make_published(self, request, queryset):
        """
            Marks selected news items as published
        """
        rows_updated = queryset.update(is_published=True)
        self.message_user(request, ungettext('%(count)d newsitem was published', 
                                            '%(count)d newsitems where published', 
                                            rows_updated) % {'count': rows_updated})
    make_published.short_description = _('Publish selected news')

    def make_unpublished(self, request, queryset):
        """
            Marks selected news items as unpublished
        """
        rows_updated =queryset.update(is_published=False)
        self.message_user(request, ungettext('%(count)d newsitem was unpublished', 
                                            '%(count)d newsitems where unpublished', 
                                            rows_updated) % {'count': rows_updated})
    make_unpublished.short_description = _('Unpublish selected news')
    
    def _media(self):
        STATIC_URL = settings.STATIC_URL
        media = super(NewsAdmin, self).media

        media += Media(
            js=(
            '%sjs/tiny_mce/tiny_mce.js' % STATIC_URL,
            '%sjs/tinymce_setup.js' % STATIC_URL,
            )
        )
        return media
    media = property(_media)

admin.site.register(News, NewsAdmin)
