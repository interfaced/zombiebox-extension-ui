# Виджет zb.ui.Keyboard

## Интеграция

Для того, чтобы реализовать клавиатуру, нужно отнаследоваться от `zb.ui.Keyboard`:

	goog.provide('project.widgets.Keyboard');
	goog.require('zb.ui.Keyboard');
	
	/**
	 * @extends {zb.ui.Keyboard}
	 * @constructor
	 */
	project.widgets.Keyboard = function() {
		goog.base(this);
	};
	goog.inherits(project.widgets.Keyboard, zb.ui.Keyboard);

Определить типы и языки раскладок, действия:

	/**
	 * @enum {zb.ui.Keyboard.Type}
	 */
	project.widgets.Keyboard.Types = {
		ABC: 'abc'
	};
	
	/**
	 * @enum {zb.ui.Keyboard.Lang}
	 */
	project.widgets.Keyboard.Langs = {
		EN: 'en',
		RU: 'ru'
	};
	
	/**
	 * @enum {zb.ui.Keyboard.Action}
	 */
	project.widgets.Keyboard.Actions = {
		CAPS: 'caps',
		LANG_EN: 'lang-en',
		LANG_RU: 'lang-ru'
	};

Создать и подключить пустой шаблон виджета:

	goog.require('project.widgets.templates.keyboard.keyboard');

	/**
	 * @inheritDoc
	 */
	project.widgets.Keyboard.prototype._renderTemplate = function() {
		return project.widgets.templates.keyboard.keyboard(this._getTemplateData(), this._getTemplateOptions());
	};

В шаблоне описать раскладки:

	{{$ project.widgets.templates.keyboard.keyboard }}
	
	<div class="w-keyboard">
		<div class="w-keyboard__layout" data-component="{{% zb.ui.KeyboardLayout, {type: project.widgets.Keyboard.Types.ABC, lang: project.widgets.Keyboard.Langs.EN}, layoutAbcEn }}">
			{{ "a b c d e f g h i".split(" ").forEach(function(sym) { }}
				<div class="w-keyboard-item" data-export-id="{{@itemsAbcEn[]}}">{{=sym}}</div>
			{{ }); }}
			<div class="w-keyboard-item" data-export-id="{{@itemsAbcEn[]}}" data-keyboard-action="{{=project.widgets.Keyboard.Actions.CAPS}}">&uarr;</div>
			<div class="w-keyboard-item" data-export-id="{{@itemsAbcEn[]}}" data-keyboard-action="{{=project.widgets.Keyboard.Actions.LANG_RU}}">АБВ</div>
		</div>
		<div class="w-keyboard__layout" data-component="{{% zb.ui.KeyboardLayout, {type: project.widgets.Keyboard.Types.ABC, lang: project.widgets.Keyboard.Langs.RU}, layoutAbcRu }}">
			{{ "а б в г д е ё ж з".split(" ").forEach(function(sym) { }}
				<div class="w-keyboard-item" data-export-id="{{@itemsAbcRu[]}}">{{=sym}}</div>
			{{ }); }}
			<div class="w-keyboard-item" data-export-id="{{@itemsAbcRu[]}}" data-keyboard-action="{{=project.widgets.Keyboard.Actions.CAPS}}">&uarr;</div>
			<div class="w-keyboard-item" data-export-id="{{@itemsAbcRu[]}}" data-keyboard-action="{{=project.widgets.Keyboard.Actions.LANG_EN}}">ABC</div>
		</div>
	</div>

В конструкторе виджета подключить раскладки:

	this._addLayout(this._exported.layoutAbcEn, this._exported.itemsAbcEn);
	this._addLayout(this._exported.layoutAbcRu, this._exported.itemsAbcRu);

И там же выбрать изначальную раскладку:

	this._setLayout(this._exported.layoutAbcEn);

Обработать действия:

	/**
	 * @inheritDoc
	 */
	project.widgets.Keyboard.prototype._handleClick = function(action) {
		var isHandled = true;
		switch (action) {
			case project.widgets.Keyboard.Actions.CAPS:
				this.setCaps(!this._isCaps);
				break;
			case project.widgets.Keyboard.Actions.LANG_RU:
				this.setLang(project.widgets.Keyboard.Langs.RU);
				break;
			case project.widgets.Keyboard.Actions.LANG_EN:
				this.setLang(project.widgets.Keyboard.Langs.EN);
				break;
			default:
				isHandled = false;
		}
		return isHandled;
	};

## Изменение раскладки

Для того, чтобы изменить раскладку, нужно вызывать методы `setType`, `setLang` или `setOptions`, передавая им требуемые параметры.

## Изменение регистра

Для того, чтобы изменить регистр, нужно вызывать метод `setCaps`, передавая ему `true`, если нужно установить верхний регистр и `false`, если нужно установить нижний регистр.

## Интеграция с zb.ui.Input

Инстанс инпута можно передать при создании виджета:

	new project.widgets.Keyboard({
		input: this._exported.input
	})

Или используя метод `setInput`.
