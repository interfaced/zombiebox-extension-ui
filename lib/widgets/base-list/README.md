# Виджет zb.ui.widgets.BaseList

## Общие определения

### Параметры (params)
Объект, состоящий из необязательных полей:

* `itemClass`
	* Тип — `Function`.
	* Контруктор [элементов](#markdown-header-items).
	* Значение по умолчанию — `zb.ui.widgets.BaseListItem`.
* `source`
	* [Источник данных](#markdown-header-source).
* `isVertical`
	* Тип — `boolean`.
	* Определяет каким будет `zb.ui.widgets.BaseList`: вертикальным или горизонтальным.
	* Значение по умолчанию — `false`.

### Источник данных (source)
`null` или любой объект, имплементящий интерфейс `zb.ui.data.IList`.

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
Массив объектов, имплементящих интерфейс `zb.ui.widgets.IBaseListItem` и отрендереных в `DOM` в данный момент.

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
Возвращает булев флаг, означающий то, что в качестве [источника данных](#markdown-header-source) передан объект имплементящий интерфейс `zb.ui.data.IList`.

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

## Верстка (markup)

### Объекты

* Контейнер — внешняя оболочка виджета. Служит для скрытия не вошедших в него [элементов](#markdown-header-items).
* Враппер — служит для позиционирования слайдера и определения количества видимых [элементов](#markdown-header-items).
* Слайдер — служит для перемещения [элементов](#markdown-header-items) в рамках враппера.

### Нюансы

* Для горизонтального однострочного списка слайдер лучше делать `display: table`, а итемы — `display: table-cell`, чтобы слайдер автоматически растягивался под все итемы.
* Для вертикального однострочного списка достаточно, чтобы слайдер и элементы были блочными.
* Для многострочных списков нужно реализовывать отдельные решения.
* Размеры и враппера и слайдера должны быть кратны размерам [элемента](#markdown-header-items).
* Отступов между [элементами](#markdown-header-items) быть не должно. Однако, если они визуально должны присутствовать, можно реализовать их внутрь самих элементов при помощи вложенных блоков.

## Рецепты (cookbook)

### Создание горизонтального списка (horizontal)

1. В шаблоне сцены добавьте строчку `{{% zb.ui.widgets.BaseList, {}, list }}`;
2. В основном файле сцены подключите зависимость: `goog.require('zb.ui.data.List')`;
3. В конструкторе сцены создайте [источник данных](#markdown-header-source) с требуемыми данными: `var source = new zb.ui.data.List(['one', 'two', 'three'])`;
4. Затем там же, но после `goog.base(this)` установите источник данных: `this._exported.list.setSource(source)`;
5. В браузере должен появиться горизонтальный список элементов **one two three**.

### Создание вертикального списка (vertical)

1. В шаблоне сцены добавьте строчку `{{% zb.ui.widgets.BaseList, {isVertical: true}, list }}`;
2. В основном файле сцены подключите зависимость: `goog.require('zb.ui.data.List')`;
3. В конструкторе сцены создайте [источник данных](#markdown-header-source) с требуемыми данными: `var source = new zb.ui.data.List(['one', 'two', 'three'])`;
4. Затем там же, но после `goog.base(this)` установите источник данных: `this._exported.list.setSource(source)`;
5. В браузере должен появиться вертикальный список элементов **one two three**.

### Создание списка из конструктора сцены (constructor)

1. В основном файле сцены подключите зависимости:

		goog.require('zb.ui.widgets.BaseList');
		goog.require('zb.ui.data.List');

2. В конструкторе сцены после `goog.base(this)` напишите:

		var source = new zb.ui.data.List(['one', 'two', 'three']);
		var list = new zb.ui.widgets.BaseList({source: source});
		this.appendWidget(list);
		this._container.appendChild(list.getContainer());

3. В браузере должен появиться горизонтальный список элементов **one two three**.

### Создание списка с нестандартными элементами (custom)

1. Создайте [горизонтальный список](#markdown-header-horizontal);
2. В шаблоне сцены замените `{{% zb.ui.widgets.BaseList, {}, list }}` на `{{% zb.ui.widgets.BaseList, {itemClass: project.widgets.MyCustomItem}, list }}`;
3. Создайте папку `app/widgets/my-custom-item` с файлами `my-custom-item.js`, `my-custom-item.jst`, `my-custom-item.css`;
4. В файле `my-custom-item.js` определите класс [элемента](#markdown-header-items):

		goog.provide('project.widgets.MyCustomItem');
		goog.require('project.widgets.templates.myCustomItem.myCustomItem');
		goog.require('zb.html');
		goog.require('zb.ui.widgets.BaseListItem');
		
		project.widgets.MyCustomItem = class extends zb.ui.widgets.BaseListItem {
			/**
			 * @param {zb.ui.widgets.IBaseListItem.Input} params
			 */
			constructor(params) {
				super(params);
			}
			
			/**
			 * @override
			 */
			_createContainer() {
				var result = project.widgets.templates.myCustomItem.myCustomItem({title: this._data});
			
				this._container = (zb.html.findFirstElementNode(result.root));
			}
		};

5. В файле `my-custom-item.jst` определите шаблон [элемента](#markdown-header-items):

		{{$ project.widgets.templates.myCustomItem.myCustomItem }}
		{{* this.title string }}
		
		<div class="w-my-custom-item">
			<div class="w-my-custom-item__title">{{- this.title }}</div>
		</div>

6. В файле `my-custom-item.css` определите стили [элемента](#markdown-header-items):

		.w-my-custom-item {
			display: table-cell;
		}

7. В браузере должен появиться горизонтальный список элементов **one two three**.

## Особенности поведения:
1. На экран должно вмещаться `(padding - loadOnLeft) * lineSize` [элементов](#markdown-header-items), иначе будет некрасиво срабатывать метод `_adjustPosition()`.
2. Последняя строка имеет особое поведение, т.к. там может быть не полное количество [элементов](#markdown-header-items).

## Информация для разработчиков `zb.ui.widgets.BaseList`

### Термины
* `source`
	* Пример — `getSourceStart`, `getSourceSize`, `getSourceIndex`.
	* Описание — методы, использующие этот корень, оперируют значениями в терминах [источника данных](#markdown-header-source).
* `local`
	* Пример — `getLocalStart`, `getLocalSize`, `getLocalIndex`.
	* Описание — методы, использующие этот корень, оперируют значениями в терминах `zb.ui.widgets.BaseList`.
* `global`
	* Пример — `getGlobalStart`, `getGlobalSize`, `getGlobalIndex`.
	* Описание — методы, использующие этот корень, оперируют значениями в терминах глобального источника данных, например сервера.

### Компоненты
1. `zb.ui.widgets.BaseList` — основной класс, агрегирующий в себе все остальные. Отвечает за `DOM` и `CSS`-составляющую виджета.
2. `zb.ui.widgets.BaseListBuffer` — класс-прослойка, который подготавливает данные из разных [источников](#markdown-header-source) к виду, понятному `zb.ui.widgets.BaseList`.
3. `zb.ui.widgets.BaseListDataList` — класс-наследник `zb.ui.widgets.BaseListBuffer`, добавляющий возможность получать данные из `zb.ui.data.List` и его наследников.
4. `zb.ui.widgets.BaseListUtils` — утилита для работы с абстрактными координатами. Используется только в `zb.ui.widgets.BaseListBuffer`.
5. `zb.ui.widgets.IBaseListItem` — интефейс, определяющий минимальный набор свойств и методов, нужных от [элементов](#markdown-header-items) для работы `zb.ui.widgets.BaseList`.
6. `zb.ui.widgets.BaseListItem` — класс для создания [элементов](#markdown-header-items), используемый по умолчанию. Реализует интерфейс `zb.ui.widgets.IBaseListItem`.

### `zb.ui.widgets.BaseListDataList` использует следующие методы `zb.ui.data.List` и его потомков:

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
