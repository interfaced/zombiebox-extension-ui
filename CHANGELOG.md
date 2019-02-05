История изменений
-----------------------

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
