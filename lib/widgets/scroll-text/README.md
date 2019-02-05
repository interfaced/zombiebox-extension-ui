# Виджет zb.ui.widgets.ScrollText

## Определения

* Контейнер — `DOM`-нода, которая имеет фиксированные размеры и скрывает всё, что выходит за её пределы.
* Слайдер — `DOM`-нода, которая имеет гибкие размеры и передвигается, реализуя тем самым прокрутку контента.
* Скролл-бар — виджет `zb.ui.widgets.ScrollBar`.

## Использование

### Со скролл-баром

Виджет `zb.ui.widgets.ScrollText` сам не создает никаких `DOM`-нод. Для корректной работы ему требуется 
контейнер и слайдер. Так же можно передать скролл-бар, но это опционально.

Чтобы `zb.ui.widgets.ScrollText` начал работать, нужно в шаблоне сцены или родительского виджета создать примерно
следующую структуру:
```html
<div data-component="{{% zb.ui.widgets.ScrollText, {}, scrollText }}">
	<div data-export-id="{{@slider}}"></div>
	{{% zb.ui.widgets.ScrollBar, {isVertical: true}, scrollBar }}
</div>
```

Затем в конструкторе сцены или родительского виджета после вызова базовой реализации передать недостающие компоненты:
```javascript
this._exported.scrollText.setNodes(this._exported.slider, this._exported.scrollBar);
```

Если виджет был изначально не наполнен контентом, после его наполнения нужно вызвать метод `updateView()`,
чтобы обработать изменившиеся размеры. Пример наполнения и обработки:
```javascript
zb.html.text(this._exported.slider, 'Some long text');
this._exported.scrollText.updateView();
```
