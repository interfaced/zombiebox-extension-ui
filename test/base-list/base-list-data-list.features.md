BaseListDataList
================

* предоставляет Buffer-интерфейс для доступа к DataList

Buffer интерфейс
----------------

* Описывает частичную выборку даннух из источника
* Предоставляет хуки на изменение выборки и курсора

### Хуки

Конструктор BaseListDataList принимает на вход два параметра

* **changeCallback**
* **selectCallback**

Это хуки, которые будут вызваны при изменении выборки данных и курсора соответственно

#### changeCallback

#### selectCallback

Параметры

* newItem
* newItemIndex
* oldItem
* oldItemIndex

(!) Индексы берутся от начала текущей (новой) выборки

(!) Если старый элемент находится за границами новой выборки его параметры приходят как **null** и **NaN**.
Также и при начальном задании setSource (предыдущий элемент отсутствует)

### Выборка

Выборка определяется параметром опций, передаваемых вторым параметром в метод **.setSource()**

* **padding**
* **lineSize**
* **loadOnLeft**


В выбоку включаются элементы всех строк, побадающих в **padding**-окрестность строки текущего элемента
Выборка изменяется не при каждом изменении позиции (строки) текущего элемента,
а только когда до границы текущей выборки осталось меньше чем **loadOnLeft** строк


### Поведение при изменении данных в источнике

* Курсор остается на том же элементе, при необходимости смещается его индекс
* Фрейм буффера пересчитывается от нового индекса текущего элемента
	* (!) хук **changeCallback** должен быть вызван даже если фактический набор элементов в фрейме буффера не изменился

### Об интеллектуальности

* Хуки должны вызываться только когда происходит изменение данных в представлении буфера.
* Если в источники произошли изменения, которые не влияют на данные буфера (элемент, локальный индекс элемента) и (состав выборки),
то хуки вызываться не должны

Test design
===========

* Hooks
	* Basic
		* On initial setSource
		* On cursor movement
			* внутри зоны бездействия
				* (!) Проверить локальные индексы в selectCallback когда они не совпадают с индексами источника
			* на границе loadOnLeft
			* внутри зоны loadOnLeft
			* за пределами текущей выборки
			* так чтобы старый элемент оказался за границами новой выборки
		* On Datalist items add/remove
			* Add
				* before the frame
					* pushing selected to new line
					* pushing selected to lol-zone
				* in the frame before selected
				* selected
				* in the frame after selected
				* after the frame
	* Tricky
		* On second second setSource