from cms.plugin_base import CMSPluginBase
from cms.plugin_pool import plugin_pool
from django.utils.translation import ugettext_lazy as _

import admin
import models


class CMSGalleryPlugin(CMSPluginBase):

    model = models.GalleryPlugin
    inlines = [admin.ImageInline, ]
    name = _('Image gallery')
    render_template = 'cmsplugin_gallery/gallery.html'

    def render(self, context, instance, placeholder):
        latest = models.Image.objects.all().order_by('-pub_date', 'title')
        context.update({
                        'images': latest,
                        'instance': instance,
                        'placeholder': placeholder,
                       })
        self.render_template = instance.template
        return context


plugin_pool.register_plugin(CMSGalleryPlugin)
