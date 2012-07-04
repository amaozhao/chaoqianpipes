from django.contrib.sitemaps import Sitemap

from cmsplugin_news.models import News

class NewsSitemap(Sitemap):
    """Sitemap for entries"""
    priority = 0.5
    changefreq = 'weekly'

    def items(self):
        """Return published entries"""
        return News.published.all()

    def lastmod(self, obj):
        """Return last modification of an entry"""
        return obj.updated
        
