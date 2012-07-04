from django.conf.urls.defaults import patterns, url

from cmsplugin_news.models import News
from cmsplugin_news.sitemaps import NewsSitemap
from cmsplugin_news.views import index, detail, search

news_info_dict = {
    'queryset': News.published.all(),
    'date_field': 'pub_date',
}

news_info_month_dict = {
    'queryset': News.published.all(),
    'date_field': 'pub_date',
    'month_format': '%m',
}

urlpatterns = patterns('',
    url(r'^$', index, name = 'news_index'),
    url(r'^sitemap.xml$', 'django.contrib.sitemaps.views.sitemap', {'sitemaps': {'news': NewsSitemap}}),
    url(r'^(?P<year>\d{4})/(?P<month>[-\w]+)/(?P<day>\d{2})/(?P<slug>[-\w]+)/$', detail, name = 'news_detail'),
    url(r'^search/$', search, name = 'news_search'),
)
