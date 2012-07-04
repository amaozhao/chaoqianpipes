from django.contrib.sitemaps import Sitemap

from cmsplugin_gallery.models import Image

class ImageSitemap(Sitemap):
    """Sitemap for entries"""
    priority = 0.5
    changefreq = 'weekly'

    def items(self):
        """Return published entries"""
        return Image.objects.all()

    def lastmod(self, obj):
        """Return last modification of an entry"""
        return obj.pub_date
        
