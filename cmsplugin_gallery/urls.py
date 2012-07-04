from django.conf.urls.defaults import patterns, url

from cmsplugin_gallery.views import index, detail, category, search
from cmsplugin_gallery.sitemaps import ImageSitemap

urlpatterns = patterns('',
    url(r'^$', index, name = 'gallery_index'),
    url(r'^sitemap.xml$', 'django.contrib.sitemaps.views.sitemap', {'sitemaps': {'galleries': ImageSitemap}}),
    url(r'^categories/(?P<pk>\d+)/$', category, name = 'gallery_category'),
    url(r'^search/$', search, name = 'gallery_search'),
    url(r'^(?P<year>\d{4})/(?P<month>[-\w]+)/(?P<day>\d{2})/(?P<slug>[-\w]+)/$', detail, name = 'product_detail'),
)
