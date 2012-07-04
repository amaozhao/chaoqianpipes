import datetime
from haystack import indexes, site
from cmsplugin_news.models import News

class NewsIndex(indexes.BasicSearchIndex, indexes.Indexable):
    title = indexes.CharField(document=True, use_template=True)
    content = indexes.CharField(model_attr = 'content')
    pub_date = indexes.DateTimeField(model_attr='pub_date')
    
    def get_model(self):
        return News
    
    def index_queryset(self):
        """Used when the entire index for model is updated."""
        return News.objects.filter(pub_date__lte=datetime.datetime.now())
    
site.register(News, NewsIndex)