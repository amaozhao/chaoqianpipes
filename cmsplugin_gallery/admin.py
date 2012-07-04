from django.contrib import admin
from inline_ordering.admin import OrderableStackedInline
import forms
from cmsplugin_gallery.models import Image, Category


class ImageInline(OrderableStackedInline):

    model = Image

    def formfield_for_dbfield(self, db_field, **kwargs):
        if db_field.name == 'src':
            kwargs.pop('request', None)
            kwargs['widget'] = forms.AdminImageWidget
            return db_field.formfield(**kwargs)
        return super(ImageInline, self).\
            formfield_for_dbfield(db_field, **kwargs)

class ImageAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('title',)}
    
class CategoryAdmin(admin.ModelAdmin):
    pass

admin.site.register(Image, ImageAdmin)
admin.site.register(Category, CategoryAdmin)