# Виджет HelpBar

## Описание конструктора
Принимает на вход один необязательный параметр — объект, состоящий из необязательных полей:

* `itemClass`
	* Тип — `Function`.
	* Контруктор элементов.
	* Значение по умолчанию — `HelpBarItem`.

## Описание публичных методов

### Метод `hasKey(zbKey)`

#### Параметры
* zbKey
	* Тип — `Keys`.

#### Описание
Проверяет, должен ли `HelpBar` обработать переданный `zbKey`.
Возвращает `boolean`.

### Метод `processHelpBarKey(zbKey[, event])`

#### Параметры
* zbKey
	* Тип — `Keys`.
* event
	* Тип — `KeyboardEvent=`.

#### Описание
Обрабатывает клавиши.

### Метод `createItem(options)`

#### Параметры
Объект `options`, состоящий из обязательных полей:

* `label`
	* Тип — `string`.
	* Текст элемента.
* `keys`
	* Тип — `Array<Keys>`.
	* Массив из клавиш, которые должен обрабатывать элемент.
* `cssClass`
	* Тип — `string`.
	* CSS-класс элемента.

#### Описание
Создает элемент по установленному классу с параметрами `options`.
Возвращает элемент `HelpBar` типа `IHelpBarItem`.

### Метод `setItems(items)`

#### Параметры
* items
	* Тип — `Array<?IHelpBarItem>`

#### Описание
Устанавливает элементы в `HelpBar`.

### Метод `setOrder(order)`

#### Параметры
* order
	* Тип — `?Array<Keys>`.

#### Описание
Устанавливает порядок отображения элементов согласно позиции их клавиш в массиве.

### Метод `clear()`

#### Описание
Удаляет все элементы `HelpBar`.

### Метод `getItem(zbKey)`

#### Параметры
* zbKey
	* Тип — `Keys`.

#### Описание
Возвращает элемент `HelpBar` обрабатывающий клавишу `zbKey`.

## Использование паттерна фабрика

### Создание кнопки

    /**
     * @param {function()=} callback
     * @return {HelpBarItem}
     */
    helpBarItemFactory.back = function(callback) {
        const item = new HelpBarItem({
            cssClass: '_back',
            label: 'Назад',
            keys: [Keys.BACK]
        });

        item.on(item.EVENT_CLICK, function() {
            callback ? callback() : app.back();
        });

        return item;
    };

    /**
     * @param {function()=} callback
     * @return {HelpBarItem}
     */
    helpBarItemFactory.exit = function(callback) {
        const item = new HelpBarItem({
            cssClass: '_exit',
            label: 'Выход',
            keys: [Keys.EXIT]
        });

        item.on(item.EVENT_CLICK, function() {
            callback ? callback() : app.exit();
        });

        return item;
    };

### Интеграция со сценой

    class SomeScene extends CuteScene {
        constructor() {
            super();
        
            this._createHelpBar();
        }

        /**
         * @override
         */
        processKey(zbKey, event) {
            if (super.processKey(zbKey, event)) {
                return true;
            }
            return this._helpBar.processHelpBarKey(zbKey, event);
        }

        /**
         * @protected
         */
        _createHelpBar() {
            this._helpBar = new HelpBar;
            this._helpBar.setItems([
                helpBarItemFactory.back(),
                helpBarItemFactory.exit()
            ]);

            this._container.appendChild(this._helpBar.getContainer());
            this.appendWidget(this._helpBar);
        }
    };
