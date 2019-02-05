# Виджет zb.ui.BaseList

## Общие определения

### Параметры (params)
Объект, состоящий из необязательных полей:

* `itemClass`
	* Тип — `Function`.
	* Контруктор [элементов](#markdown-header-items).
	* Значение по умолчанию — `zb.ui.BaseListItem`.
* `source`
	* [Источник данных](#markdown-header-source).
* `isVertical`
	* Тип — `boolean`.
	* Определяет каким будет `zb.ui.BaseList`: вертикальным или горизонтальным.
	* Значение по умолчанию — `false`.

### Источник данных (source)
`null` или любой объект, имплементящий интерфейс `zb.ui.IDataList`.

### Опции (options)
Объект, состоящий из необязательных полей:

* `padding`
	* Тип — `number`.
	* Определяет отступ вперед и назад от строки с выделенным итемом. Измеряется в строках.
	* Значение по умолчанию — `5`.
* `loadOnLeft`
	* Тип — `number`.
	* Определяет сколько должно остаться до конца всех [элементов](#markdown-header-items), чтобы начинать рендерить следующую порцию. Измеряется в строках.
	* Значение по умолчанию — `1`.
* `lineSize`
	* Тип — `number`.
	* Определяет сколько [элементов](#markdown-header-items) помещается в строку.
	* Значение по умолчанию — `1`.

### Элементы (items)
Массив объектов, имплементящих интерфейс `zb.ui.IBaseListItem` и отрендереных в `DOM` в данный момент.

## Описание конструктора
Принимает на вход два необязательных аргумента: [параметры](#markdown-header-params) и [опции](#markdown-header-options).

## Описание публичных методов

### Метод `setSource(source[, options])`
#### Параметры
* source — [источник данных](#markdown-header-source).
* options — [опции](#markdown-header-options).

### Метод `getSource()`
#### Описание
Возвращает [источник данных](#markdown-header-source).

### Метод `hasSource()`
#### Описание
Возвращает булев флаг, означающий то, что в качестве [источника данных](#markdown-header-source) передан объект имплементящий интерфейс `zb.ui.IDataList`.

### Метод `getLocalSize()`
#### Описание
Возвращает количество [элементов](#markdown-header-items).

### Метод `getLocalIndex()`
#### Описание
Возвращает индекс выбранного элемента, относительно всех [элементов](#markdown-header-items).

### Метод `hasItems()`
#### Описание
Возвращает булев флаг, означающий то, что [элементы](#markdown-header-items) в данный момент есть.

### Метод `getCurrentItem()`
#### Описание
Возвращает текущий выбранный [элемент](#markdown-header-items).

## Описание событий

### Событие `EVENT_CLICK`

#### Аргументы
* `{string} eventName`
* `{*} data`

#### Описание
Вызывается при выборе какого-либо [элемента](#markdown-header-items).

### Событие `EVENT_BEFORE_MOVE`

#### Аргументы
* `{string} eventName`
* `{*} newData`
* `{number} newIndex`
* `{*} oldData`
* `{number} oldIndex`

#### Описание
Вызывается до изменения выбранного [элемента](#markdown-header-items).

### Событие `EVENT_AFTER_MOVE`

#### Аргументы
* `{string} eventName`
* `{*} newData`
* `{number} newIndex`
* `{*} oldData`
* `{number} oldIndex`

#### Описание
Вызывается после изменения выбранного [элемента](#markdown-header-items).

## Особенности поведения:
1. На экран должно вмещаться `(padding - loadOnLeft) * lineSize` [элементов](#markdown-header-items), иначе будет некрасиво срабатывать метод `_adjustPosition()`.
2. Последняя строка имеет особое поведение, т.к. там может быть не полное количество [элементов](#markdown-header-items).

## Информация для разработчиков `zb.ui.BaseList`

### Термины
* `source`
	* Пример — `getSourceStart`, `getSourceSize`, `getSourceIndex`.
	* Описание — методы, использующие этот корень, оперируют значениями в терминах [источника данных](#markdown-header-source).
* `local`
	* Пример — `getLocalStart`, `getLocalSize`, `getLocalIndex`.
	* Описание — методы, использующие этот корень, оперируют значениями в терминах `zb.ui.BaseList`.
* `global`
	* Пример — `getGlobalStart`, `getGlobalSize`, `getGlobalIndex`.
	* Описание — методы, использующие этот корень, оперируют значениями в терминах глобального источника данных, например сервера.

### Компоненты
1. `zb.ui.BaseList` — основной класс, агрегирующий в себе все остальные. Отвечает за `DOM` и `CSS`-составляющую виджета.
2. `zb.ui.BaseListBuffer` — класс-прослойка, который подготавливает данные из разных [источников](#markdown-header-source) к виду, понятному `zb.ui.BaseList`.
3. `zb.ui.BaseListDataList` — класс-наследник `zb.ui.BaseListBuffer`, добавляющий возможность получать данные из `zb.ui.DataList` и его наследников.
4. `zb.ui.BaseListUtils` — утилита для работы с абстрактными координатами. Используется только в `zb.ui.BaseListBuffer`.
5. `zb.ui.IBaseListItem` — интефейс, определяющий минимальный набор свойств и методов, нужных от [элементов](#markdown-header-items) для работы `zb.ui.BaseList`.
6. `zb.ui.BaseListItem` — класс для создания [элементов](#markdown-header-items), используемый по умолчанию. Реализует интерфейс `zb.ui.IBaseListItem`.

### `zb.ui.BaseListDataList` использует следующие методы `zb.ui.DataList` и его потомков:

* `setAutoSelect`;
* `preload`;
* `isLoading`;
* `isStartReached`;
* `isEndReached`;
* `getBufferStart`;
* `size`;
* `selectAt`;
* `current`;
* `currentIndex`;
* `toArray`;
* `indexOf`;

### и события:

* `EVENT_ITEM_SELECTED`;
* `EVENT_ITEMS_ADDED`;
* `EVENT_ITEMS_REMOVED`;
* `EVENT_ITEMS_CHANGED`;
* `EVENT_CLEAR`;
