# Виджет zb.ui.widgets.AbstractKeyboard

## Интеграция

Для того, чтобы реализовать клавиатуру, нужно отнаследоваться от `zb.ui.widgets.AbstractKeyboard`:

	goog.provide('project.widgets.Keyboard');
	goog.require('zb.ui.widgets.AbstractKeyboard');
	
	project.widgets.Keyboard = class extends zb.ui.widgets.AbstractKeyboard {};

Определить типы и языки раскладок, действия:

	/**
	 * @enum {zb.ui.widgets.KeyboardLayout.Type}
	 */
	project.widgets.Keyboard.Types = {
		ABC: 'abc'
	};
	
	/**
	 * @enum {zb.ui.widgets.KeyboardLayout.Lang}
	 */
	project.widgets.Keyboard.Langs = {
		EN: 'en',
		RU: 'ru'
	};
	
	/**
	 * @enum {zb.ui.widgets.KeyboardLayout.Action}
	 */
	project.widgets.Keyboard.Actions = {
		LANG_EN: 'lang-en',
		LANG_RU: 'lang-ru'
	};

Создать и подключить пустой шаблон виджета:

	goog.require('project.widgets.templates.keyboard.keyboard');

	/**
	 * @override
	 */
	_renderTemplate() {
		return project.widgets.templates.keyboard.keyboard(this._getTemplateData(), this._getTemplateOptions());
	}

В шаблоне описать раскладки:

	{{$ project.widgets.templates.keyboard.keyboard }}
	
	<div class="w-zbui-keyboard">
		<div class="w-zbui-keyboard__layout" data-component="{{% zb.ui.widgets.KeyboardLayout, {type: project.widgets.Keyboard.Types.ABC, lang: project.widgets.Keyboard.Langs.EN}, layoutAbcEn }}">
			{{ "a b c d e f g h i".split(" ").forEach((sym) => { }}
				<div class="w-zbui-keyboard-item" data-export-id="{{@itemsAbcEn[]}}">{{=sym}}</div>
			{{ }); }}
			<div class="w-zbui-keyboard-item" data-export-id="{{@itemsAbcEn[]}}" data-keyboard-action="{{=zb.ui.widgets.AbstractKeyboard.Action.TOGGLE_CAPS}}">&uarr;</div>
			<div class="w-zbui-keyboard-item" data-export-id="{{@itemsAbcEn[]}}" data-keyboard-action="{{=project.widgets.Keyboard.Actions.LANG_RU}}">АБВ</div>
		</div>
		<div class="w-zbui-keyboard__layout" data-component="{{% zb.ui.widgets.KeyboardLayout, {type: project.widgets.Keyboard.Types.ABC, lang: project.widgets.Keyboard.Langs.RU}, layoutAbcRu }}">
			{{ "а б в г д е ё ж з".split(" ").forEach((sym) => { }}
				<div class="w-zbui-keyboard-item" data-export-id="{{@itemsAbcRu[]}}">{{=sym}}</div>
			{{ }); }}
			<div class="w-zbui-keyboard-item" data-export-id="{{@itemsAbcRu[]}}" data-keyboard-action="{{=zb.ui.widgets.AbstractKeyboard.Action.TOGGLE_CAPS}}">&uarr;</div>
			<div class="w-zbui-keyboard-item" data-export-id="{{@itemsAbcRu[]}}" data-keyboard-action="{{=project.widgets.Keyboard.Actions.LANG_EN}}">ABC</div>
		</div>
	</div>

В конструкторе виджета подключить раскладки:

	this._addLayout(this._exported.layoutAbcEn, this._exported.itemsAbcEn);
	this._addLayout(this._exported.layoutAbcRu, this._exported.itemsAbcRu);

И там же выбрать изначальную раскладку:

	this._setLayout(this._exported.layoutAbcEn);

Базовый набор действий находится в `zb.ui.widgets.AbstractKeyboard.Action`. Для их обработки нужно вызвать базовую
реализацию метода `_handleClick()`. Остальные действия обрабатываются при наследовании:

	/**
	 * @override
	 */
	_handleClick(action) {
		var isHandled = true;
		switch (action) {
			case project.widgets.Keyboard.Actions.LANG_RU:
				this.setLang(project.widgets.Keyboard.Langs.RU);
				break;
			case project.widgets.Keyboard.Actions.LANG_EN:
				this.setLang(project.widgets.Keyboard.Langs.EN);
				break;
			default:
				isHandled = false;
		}
		return isHandled || super._handleClick(action);
	}

## Изменение раскладки

Для того, чтобы изменить раскладку, нужно вызывать методы `setType`, `setLang` или `setOptions`, передавая им требуемые параметры.

## Изменение регистра

Для того, чтобы изменить регистр, нужно вызывать метод `setCaps`, передавая ему `true`, если нужно установить верхний регистр и `false`, если нужно установить нижний регистр.

## Интеграция с zb.ui.widgets.Input

Инстанс инпута можно передать при создании виджета:

	new project.widgets.Keyboard({
		input: this._exported.input
	})

Или используя метод `setInput`.
