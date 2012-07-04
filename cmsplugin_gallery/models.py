import threading

from cms.models import CMSPlugin
from django.db import models
from django.utils.translation import ugettext_lazy as _
from inline_ordering.models import Orderable

import utils

localdata = threading.local()
localdata.TEMPLATE_CHOICES = utils.autodiscover_templates()
TEMPLATE_CHOICES = localdata.TEMPLATE_CHOICES

class Category(models.Model):
    title = models.CharField(max_length = 255)
    description = models.TextField(blank = True)
    
    def __unicode__(self):
        return self.title
    
    def get_absolute_url(self):
        return '/products/categories/%s' % self.pk
    
    class Meta:
        verbose_name = _('Category')
        verbose_name_plural = _('Categories')

class GalleryPlugin(CMSPlugin):

    template = models.CharField(max_length=255,
                                choices=TEMPLATE_CHOICES,
                                default='cmsplugin_gallery/gallery.html',
                                editable=len(TEMPLATE_CHOICES) > 1)

    def __unicode__(self):
        return _(u'%(count)d image(s) in gallery') % {'count': self.image_set.count()}


class Image(Orderable):

    def get_media_path(self, filename):
        pages = self.gallery.placeholder.page_set.all()
        return pages[0].get_media_path(filename)

    gallery = models.ForeignKey(GalleryPlugin)
    src = models.ImageField(upload_to=get_media_path,
                            height_field='src_height',
                            width_field='src_width')
    src_height = models.PositiveSmallIntegerField(editable=False, null=True)
    src_width = models.PositiveSmallIntegerField(editable=False, null=True)
    title = models.CharField(max_length=255, blank=True)
    slug = models.SlugField()
    alt = models.TextField(blank=True)
    product_type = models.CharField(max_length = 255, blank = True)
    spec = models.CharField(max_length = 255, blank = True)
    description = models.CharField(max_length = 500, blank = True)
    pub_date = models.DateTimeField(auto_now_add = True)
    count_viewed = models.IntegerField(default = 0, editable = False)
    category = models.ManyToManyField(Category, related_name = 'images')
    

    def __unicode__(self):
        return self.title or self.alt or str(self.pk)
    
    def get_absolute_url(self):
        return '/products/%s/%s/%s/%s' % (self.pub_date.strftime("%Y"), 
                                 self.pub_date.strftime("%b"), 
                                 self.pub_date.strftime("%d"),
                                 self.slug)
