Руководство по миграции
-----------------------

## С версии 0.3.2 на версию 0.4.0

### `zb.ui.BaseList`, `zb.ui.ArrowList`, `zb.ui.ScrollList`:

* Обращаться к CSS-классу `zb.ui.BaseListItem` теперь нужно не `.w-base-list__item`, а `.w-base-list-item`;
* `zb.ui.BaseListItem` теперь не принимает на вход `focusClass` через конструктор и метод `setFocusClass()`. Изменить его можно отнаследовавшись;
* `zb.ui.BaseListItem` теперь реализует интерфейс `zb.IFocusable`;
* `focus()` и `blur()` у `zb.ui.BaseListItem` теперь вызываются при `focus()` и `blur()` самого `zb.ui.BaseList`;
* `focus()` и `blur()` у `zb.ui.BaseListItem` при выборе элемента теперь вызываются только если `zb.ui.BaseList` находится в фокусе;
* Опции (`padding`, `lineSize`, `loadOnLeft`) теперь не передаются через метод `setSource()` и второй аргумент конструктора. Задать их можно добавив в первый агумент конструктора свойство `options`:
`new zb.ui.BaseList({options: {padding: 5}})`;
* Удален метод `setItemClass()`. Задать класс элемента можно теперь только через агумент конструктора;
* Удален метод `setVertical()`. Задать направление можно теперь только через агумент конструктора;
* Удален метод `setDataList()`. Вместо него нужно использовать `setSource()`;
* Удален метод `getCurrentData()`. Вместо него нужно использовать `getSource().current()`;
* Удален метод `getGlobalSize()`. Вместо него нужно использовать `getSource().size()`;
* Удален метод `isEmpty()`. Вместо него нужно использовать `!hasSource()`;
* Удален метод `getGlobalIndex()`. Вместо него нужно использовать `getSource().currentIndex()`.

### `zb.ui.NativeInput`, `zb.ui.DivInput`, `zb.ui.DivInputPassword`:

* Создавать инпут типа `password` следует теперь не `new zb.ui.DivInputPassword`,
а `new zb.ui.NativeInput({type: zb.ui.AbstractInput.Type.PASSWORD})` или `new zb.ui.DivInput({type: zb.ui.AbstractInput.Type.PASSWORD})`;
* CSS для инпута типа `password` следует привязывать не к `.w-zbui-div-input._password {}`, а к `.w-zbui-div-input._type-password {}`;
* Секретный символ для пароля следует задавать не через наследование конструктора, а передавать как аргумент: `new zb.ui.DivInput({passwordSymbol: '*'})`;
* Для вызова ранее публичного метода `fireFinish()` нужно отнаследоваться, создать его и вызвать `_fireFinish()` внутри.

### `zb.ui.HelpBarItem`:

* CSS-класс и лейбл больше не сохраняются в `_cssClass` и `_label`. Сохранение, если требуется, теперь нужно реализовывать на уровне проекта;
* Чтобы использовать виджеты внутри `zb.ui.HelpBarItem` потребуется переопределить метод `_renderTemplate()` и реализовать добавление виджетов.

### `zb.ui.Throbber`:

* Все параметры `zb.ui.Throbber` стали опциональными.

### `zb.ui.widgets.VideoProgressBar`:

* Вместо виджета `zb.ui.widgets.VideoProgressBar` следует использовать `zb.ui.PlayerProgress`.

### `zb.ui.DynamicList`:

* Вместо метода `zb.ui.DynamicList#loadInitialBuffer()` следует использовать `zb.ui.DynamicList#preload()`.

### Новые компоненты

* `zb.ui.limit` — реализует методы `debounce()` и `throttle()`;
* `zb.ui.ExtendedList` — объединяет в себе функционал `zb.ui.ArrowList` и `zb.ui.ScrollList`;
* `zb.ui.popups.Base` — базовый попап.