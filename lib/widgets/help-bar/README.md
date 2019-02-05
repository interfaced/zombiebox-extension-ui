# Виджет zb.ui.widgets.HelpBar

## Описание конструктора
Принимает на вход один необязательный параметр — объект, состоящий из необязательных полей:

* `itemClass`
	* Тип — `Function`.
	* Контруктор элементов.
	* Значение по умолчанию — `zb.ui.widgets.HelpBarItem`.

## Описание публичных методов

### Метод `hasKey(zbKey)`

#### Параметры
* zbKey
	* Тип — `zb.device.input.Keys`.

#### Описание
Проверяет, должен ли `zb.ui.widgets.HelpBar` обработать переданный `zbKey`.
Возвращает `boolean`.

### Метод `processHelpBarKey(zbKey[, opt_event])`

#### Параметры
* zbKey
	* Тип — `zb.device.input.Keys`.
* opt_event
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
	* Тип — `Array<zb.device.input.Keys>`.
	* Массив из клавиш, которые должен обрабатывать элемент.
* `cssClass`
	* Тип — `string`.
	* CSS-класс элемента.

#### Описание
Создает элемент по установленному классу с параметрами `options`.
Возвращает элемент `zb.ui.widgets.HelpBar` типа `zb.ui.widgets.IHelpBarItem`.

### Метод `setItems(items)`

#### Параметры
* items
	* Тип — `Array<?zb.ui.widgets.IHelpBarItem>`

#### Описание
Устанавливает элементы в `zb.ui.widgets.HelpBar`.

### Метод `setOrder(order)`

#### Параметры
* order
	* Тип — `?Array<zb.device.input.Keys>`.

#### Описание
Устанавливает порядок отображения элементов согласно позиции их клавиш в массиве.

### Метод `clear()`

#### Описание
Удаляет все элементы `zb.ui.widgets.HelpBar`.

### Метод `getItem(zbKey)`

#### Параметры
* zbKey
	* Тип — `zb.device.input.Keys`.

#### Описание
Возвращает элемент `zb.ui.widgets.HelpBar` обрабатывающий клавишу `zbKey`.

## Использование паттерна фабрика

### Создание кнопки

    /**
     * @param {function()=} opt_callback
     * @return {zb.ui.widgets.HelpBarItem}
     */
    someApp.widgets.helpBarItemFactory.back = function(opt_callback) {
        var item = new zb.ui.widgets.HelpBarItem({
            cssClass: '_back',
            label: 'Назад',
            keys: [zb.device.input.Keys.BACK]
        });

        item.on(item.EVENT_CLICK, function() {
            opt_callback ? opt_callback() : app.back();
        });

        return item;
    };

    /**
     * @param {function()=} opt_callback
     * @return {zb.ui.widgets.HelpBarItem}
     */
    someApp.widgets.helpBarItemFactory.exit = function(opt_callback) {
        var item = new zb.ui.widgets.HelpBarItem({
            cssClass: '_exit',
            label: 'Выход',
            keys: [zb.device.input.Keys.EXIT]
        });

        item.on(item.EVENT_CLICK, function() {
            opt_callback ? opt_callback() : app.exit();
        });

        return item;
    };

### Интеграция со сценой

    someApp.scenes.SomeScene = class extends zb.layers.CuteScene {
        constructor() {
            super();
        
            this._createHelpBar();
        }

        /**
         * @override
         */
        processKey(zbKey, opt_event) {
            if (super.processKey(zbKey, opt_event)) {
                return true;
            }
            return this._helpBar.processHelpBarKey(zbKey, opt_event);
        }

        /**
         * @protected
         */
        _createHelpBar() {
            this._helpBar = new zb.ui.widgets.HelpBar;
            this._helpBar.setItems([
                someApp.widgets.helpBarItemFactory.back(),
                someApp.widgets.helpBarItemFactory.exit()
            ]);

            this._container.appendChild(this._helpBar.getContainer());
            this.appendWidget(this._helpBar);
        }
    };
