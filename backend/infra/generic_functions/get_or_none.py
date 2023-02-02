from rest_framework.exceptions import ParseError


def get_or_none(model, raise_exception=False, detail='Not found', *args, **kwargs):
    try:
        return model.objects.get(*args, **kwargs)
    except (model.DoesNotExist, model.MultipleObjectsReturned):
        if raise_exception:
            raise ParseError(detail=f'{model._meta.model_name} {detail}')
        return None
