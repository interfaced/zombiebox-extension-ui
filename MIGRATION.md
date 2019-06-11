Руководство по миграции
-----------------------

## С версии 1.0.0 на версию 2.0.0-alpha.1

Управление зависимостями было изменено с библиотеки google Closure (`goog.require` и` goog.provide`) на ECMAScript
модули (`import` и` export`). В результате эта версия полностью несовместима со старыми проектами.

Миграция кодовой базы довольно проста: `goog.require` должен быть заменен соответствующими операторами `import`,
а `goog.provide` —` export`, конфигурация проекта так же должна быть обновлена.

Пример использования ECMAScript модулей:

```js
import DataList from 'ui/data/list';
import Button from 'ui/widgets/button/button';
import AbstractKeyboard, {Action as AbstractKeyboardAction} from 'ui/widgets/keyboard/abstract-keyboard';
```

## С версии 0.5.3 на версию 1.0.0

* Все виджеты перенесены в неймспейс `widgets`. Например, `zb.ui.Button` -> `zb.ui.widgets.Button`.
  Следует обновить неймспейсы во всех местах использования;
* CSS-классам виджетов добавлен префикс `zbui`. Например, `.w-help-bar -> .w-zbui-help-bar`.
  Следует обновить классы во всех местах использования;
* Сущности `zb.ui.DataList`, `zb.ui.DynamicList`, `zb.ui.CyclicalDataList`, `zb.ui.IDataList`
  перенесены в неймспейс `data`. Следует обновить неймспейсы во всех местах использования;
* Класс `zb.ui.Keyboard` переименован в `zb.ui.widgets.AbstractKeyboard`.
  Следует использовать новое название;
* Класс `zb.ui.BaseListBuffer` переименован в `zb.ui.widgets.AbstractBaseListBuffer`.
  Следует использовать новое название;
* Методы `zb.ui.imagePreload` теперь возвращают промис с объектом `Image`. Чтобы получить, ссылку на изображение,
  которая возвращалась ранее, следует обратиться к свойству `Image#src`;
* Удалены файлы относящиеся к Google analytics `lib/analytics.js` и `zb.ui.GoogleAnalytics`.
  Вместо их использования предлагается сделать свою реализацию;
* Класс `zb.ui.popups.Base` переименован в `zb.ui.popups.AbstractBase`.
  Следует использовать новое название;
* У класса `zb.ui.popups.Base` удалено событие `EVENT_CLOSE` и метод `_onClose`.
  Вместо их использования предлагается сделать свою реализацию;
* Объект `zb.ui.widgets.DivInput.AnimationPropertyNames` переименован в `zb.ui.widgets.DivInput.AnimationPropertyName`.
  Следует использовать новое название;
* Виджет `zb.ui.widgets.Throbber` теперь сбрасывает свое состояние при старте.
  Если требуется использовать предыдущее состояние виджета, следует реализовать логику запоминания состояния
  при наследовании.

## С версии 0.5.2 на версию 0.5.3

В связи с изменением обработки настроек `zb.ui.DynamicList` нужно соблюдать следующие условия при их задании:

* `startLoadingOnItemsLeft`, `frameSize`, `initialBufferSize` и `bufferSize` должны быть больше нуля и не равны `NaN`;
* `frameSize` должен быть больше или равен `startLoadingOnItemsLeft`;
* `initialBufferSize` должен быть больше или равен `frameSize`;
* `bufferSize` должен быть больше или равен `frameSize`;
* комбинация настроек `bufferSize - startLoadingOnItemsLeft * 2 < frameSize`
вызыват рекурсию и не должа быть использована.

## С версии 0.5.1 на версию 0.5.2

Миграция не подразумевает каких-либо изменений.

## С версии 0.5.0 на версию 0.5.1

Миграция не подразумевает каких-либо изменений.

## С версии 0.4.2 на версию 0.5.0

### `zb.ui.BaseList`:

* Удален метод `getLocalSize()`. Вместо него нужно использовать `getSize()`;
* Удален метод `getLocalIndex()`. Вместо него нужно использовать `getCurrentIndex()`.

### `zb.ui.HelpBarItem`:

* Удален метод `isMyKey()`. Вместо него нужно использовать `hasKey()`.

### `zb.ui.DynamicList`:

* Удален метод `getFrameSize()`. Получить `frameSize` теперь можно только отнаследовавшись.

### `zb.ui.MatrixDataList`:

* Удален класс `zb.ui.MatrixDataList`. Вместо него нужно использовать `zb.ui.BaseList` с опцией `lineSize`.

### `zb.ui.Keyboard`:

* `zb.ui.Keyboard.Type` перенесен в `zb.ui.KeyboardLayout.Type`;
* `zb.ui.Keyboard.Lang` перенесен в `zb.ui.KeyboardLayout.Lang`;
* `zb.ui.Keyboard.Action` перенесен в `zb.ui.KeyboardLayout.Action`;
* `zb.ui.Keyboard.Data` перенесен в `zb.ui.KeyboardLayout.Data`.

## С версии 0.4.1 на версию 0.4.2

### `zb.ui.BaseList`:

* Запрещен метод `getLocalSize()`. Вместо него следует использовать `getSize()`;
* Запрещен метод `getLocalIndex()`. Вместо него следует использовать `getCurrentIndex()`.

### `zb.ui.HelpBarItem`:

* Запрещен метод `isMyKey()`. Вместо него следует использовать `hasKey()`.

### `zb.ui.MatrixDataList`:

* Запрещен класс `zb.ui.MatrixDataList`. Вместо него следует использовать `zb.ui.BaseList` с опцией `lineSize`.

## С версии 0.4.0 на версию 0.4.1

Миграция не подразумевает каких-либо изменений.

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
