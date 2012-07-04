from django.views.generic import ListView, DateDetailView, DetailView
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404

from cmsplugin_gallery.models import Image, Category

class Index(ListView):
    model = Image
    context_object_name = 'images'
    paginate_by = 12
    template_name = 'cmsplugin_gallery/index.html'
    
    def get_context_data(self, **kwargs):
        context = super(Index, self).get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        context['count'] = Image.objects.count()
        return context
    
index = Index.as_view()

class Detail(DateDetailView):
    model = Image
    date_field = 'pub_date'
    template_name = 'cmsplugin_gallery/product_detail.html'
    
    def get_context_data(self, **kwargs):
        context = super(Detail, self).get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        return context
    
    def get_object(self, queryset=None):
        """
        Returns the object the view is displaying.

        By default this requires `self.queryset` and a `pk` or `slug` argument
        in the URLconf, but subclasses can override this to return any object.
        """
        # Use a custom queryset if provided; this is required for subclasses
        # like DateDetailView
        if queryset is None:
            queryset = self.get_queryset()

        # Next, try looking up by primary key.
        pk = self.kwargs.get('pk', None)
        slug = self.kwargs.get('slug', None)
        if pk is not None:
            queryset = queryset.filter(pk=pk)

        # Next, try looking up by slug.
        elif slug is not None:
            slug_field = self.get_slug_field()
            queryset = queryset.filter(**{slug_field: slug})

        # If none of those are defined, it's an error.
        else:
            raise AttributeError(u"Generic detail view %s must be called with "
                                 u"either an object pk or a slug."
                                 % self.__class__.__name__)

        try:
            obj = queryset.get()
        except ObjectDoesNotExist:
            raise Http404(_(u"No %(verbose_name)s found matching the query") %
                          {'verbose_name': queryset.model._meta.verbose_name})
        obj.count_viewed += 1
        obj.save()
        return obj
    
detail = Detail.as_view()

class CategoryView(DetailView):
    model = Category
    context_object_name = 'cat'
    paginate_by = 12
    template_name = 'cmsplugin_gallery/category.html'
    
    def get_context_data(self, **kwargs):
        context = super(CategoryView, self).get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        return context
    
category = CategoryView.as_view()

class Search(ListView):
    model = Image
    template_name = 'cmsplugin_gallery/index.html'
    context_object_name = 'images'
    paginate_by = 12
    
    def get_queryset(self):
        q = self.request.GET.get('keyword')
        queryset = Image.objects.none()
        if q:
            queryset = Image.objects.filter(
            Q(title__icontains=q) | 
            Q(description__icontains=q)
            ).distinct().order_by('-pub_date')
            
        return queryset

search = Search.as_view()
