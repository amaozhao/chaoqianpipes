from django.views.generic import ListView, DateDetailView
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404

from cmsplugin_news.models import News

class Index(ListView):
    model = News
    template_name = 'cmsplugin_news/index.html'
    context_object_name = 'latest_news'
    paginate_by = 20
    
    def get_context_data(self, **kwargs):
        context = super(Index, self).get_context_data(**kwargs)
        context['count'] = News.objects.count()
        return context
    
index = Index.as_view()

class Detail(DateDetailView):
    model = News
    date_field = 'pub_date'
    template_name = 'cmsplugin_news/news_detail.html'
    
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

class Search(ListView):
    model = News
    template_name = 'cmsplugin_news/index.html'
    context_object_name = 'latest_news'
    paginate_by = 20
    
    def get_queryset(self):
        q = self.request.GET.get('keyword')
        queryset = News.objects.none()
        if q:
            queryset = News.objects.filter(
            Q(title__icontains=q) | 
            Q(content__icontains=q)
            ).distinct().order_by('-pub_date')
            
        return queryset

search = Search.as_view()