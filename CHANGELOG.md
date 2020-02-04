История изменений
-----------------------

## Версия 2.1.1 

* Обновлены зависимости проекта;
* Поддержка ZombieBox 2.6.

## Версия 2.1.0

* Обновлены зависимости проекта;
* Исправлен код-стайл в соответствии с `eslint-config-interfaced` версии 2.0.0-beta.2;
* Вместо `IThenable` используется `Promise`.

## Версия 2.0.0

* Обновлены зависимости проекта.

## Версия 2.0.0-alpha.3

* Обновлен интерфейс взаимодействия с `zombiebox` — добавлено наследование от `AbstractExtension`.

## Версия 2.0.0-alpha.2

* Шаблонизатор из ZombieBox вынесен в отдельный пакет `zombiebox-extension-cutejs`.
  Была произведена миграция проекта на него.

## Версия 2.0.0-alpha.1

* Управление зависимостями было изменено с библиотеки google Closure на ECMAScript модули;
* Обновлены зависимости проекта.

## Версия 1.0.0

* Исправлен код-стайл в соответствии с `eslint-config-interfaced` версии 1.2.0;
* Исправлен код-стайл в соответствии с `stylelint-config-interfaced` версии 0.1.0;
* Код тестов переведен на ES6;
* Удалены файлы относящиеся к Google analytics `lib/analytics.js` и `zb.ui.GoogleAnalytics`;
* Виджеты перенесены неймспейс и папку `widgets`;
* Сущности `zb.ui.DataList`, `zb.ui.DynamicList`, `zb.ui.CyclicalDataList`, `zb.ui.IDataList` перенесены
  в неймспейс и папку `data`;
* В виджете `zb.ui.widgets.ExtendedList` добавлена возможность отключать полосу прокрутки и стрелки;
* В виджете `zb.ui.widgets.AbstractKeyboard` добавлен базовый набор действий;
* Попап `zb.ui.popups.Base` переименован в `zb.ui.popups.AbstractBase`, так же у него удалено событие `EVENT_CLOSE`;
* Объект `zb.ui.widgets.DivInput.AnimationPropertyNames` переименован в `zb.ui.widgets.DivInput.AnimationPropertyName`;
* Исправлена работа `zb.ui.widgets.ScrollText` без передачи `zb.ui.widgets.ScrollBar`,
  а так же добавлено `README.md` с описанием и примером использования;
* Исправлена ошибка, когда `zb.ui.widgets.Throbber` не сбрасывал состояние при новом старте.

## Версия 0.5.3

* Добавлена обработка неверных значений настроек `zb.ui.DynamicList`;
* Добавлен собственный CSS-класс для `zb.ui.PlayerPlayPause`; 
* Добавлен метод `cancel()` в `zb.ui.limit.debounce`;
* Добавлен метод `isFocusable()` в `zb.ui.Throbber`;
* Исправлен множественный биндинг requestAnimationFrame в `zb.ui.Throbber`.

## Версия 0.5.2

* Исправлен код-стайл в соответствии с новым `eslint`;
* В `zb.ui.imagePreload` добавлен таймаут для отмены предзагрузки картинок;
* В `zb.ui.Throbber` использован `requestAnimationFrame` вместо таймаута;
* Исправлен ворнинг при использовании `zb.ui.limit`;
* Исправлена ошибка, когда `zb.ui.Throbber` пропускал первую позицию при старте.

## Версия 0.5.1

* Исправлен GCC warning в `zb.ui.ScrollBar`.

## Версия 0.5.0

* Репозитарий подготовлен для публикации на github;
* Исправлен вызов `super()` в `zb.ui.NativeInput`;
* Исправлено пропадание последней не полностью заполненной строке `zb.ui.BaseList`;
* Исправлено не отрабатывание последней позиции в `zb.ui.Throbber`.

## Версия 0.4.2

* В `zb.ui.HelpBar` добавлен метод `hasKey()`;
* В `zb.ui.HelpBarItem` переименован метод `isMyKey()`;
* В `zb.ui.BaseList` переименованы методы `getLocalSize()` и `getLocalIndex()`;
* Запрещено использовать `zb.ui.MatrixDataList`;
* Использована полная запись `background`, `margin` в `CSS`.
