# Виджет AbstractKeyboard

## Интеграция

Для того, чтобы реализовать клавиатуру, нужно отнаследоваться от `AbstractKeyboard`:

	import AbstractKeyboard, {Action as AbstractKeyboardAction} from 'ui/widgets/keyboard/abstract-keyboard';
	
	class Keyboard extends AbstractKeyboard {};

Определить типы и языки раскладок, действия:
	
	import {
		Type as KeyboardLayoutType,
		Lang as KeyboardLayoutLang,
		Action as KeyboardLayoutAction
	} from 'ui/widgets/keyboard/keyboard-layout';

	/**
	 * @enum {KeyboardLayoutType}
	 */
	const Type = {
		ABC: 'abc'
	};
	
	/**
	 * @enum {KeyboardLayoutLang}
	 */
	const Lang = {
		EN: 'en',
		RU: 'ru'
	};
	
	/**
	 * @enum {KeyboardLayoutAction}
	 */
	const Action = {
		LANG_EN: 'lang-en',
		LANG_RU: 'lang-ru'
	};

Создать и подключить пустой шаблон виджета:

	import * as template from 'generated/cutejs/...';

	/**
	 * @override
	 */
	_renderTemplate() {
		return template.render(this._getTemplateData(), this._getTemplateOptions());
	}

В шаблоне описать раскладки:

	<div class="w-zbui-keyboard">
		<div class="w-zbui-keyboard__layout" data-component="{{% KeyboardLayout, {type: Type.ABC, lang: Lang.EN}, layoutAbcEn }}">
			{{ "a b c d e f g h i".split(" ").forEach((sym) => { }}
				<div class="w-zbui-keyboard-item" data-export-id="{{@itemsAbcEn[]}}">{{=sym}}</div>
			{{ }); }}
			<div class="w-zbui-keyboard-item" data-export-id="{{@itemsAbcEn[]}}" data-keyboard-action="{{=AbstractKeyboardAction.TOGGLE_CAPS}}">&uarr;</div>
			<div class="w-zbui-keyboard-item" data-export-id="{{@itemsAbcEn[]}}" data-keyboard-action="{{=Action.LANG_RU}}">АБВ</div>
		</div>
		<div class="w-zbui-keyboard__layout" data-component="{{% KeyboardLayout, {type: Type.ABC, lang: Lang.RU}, layoutAbcRu }}">
			{{ "а б в г д е ё ж з".split(" ").forEach((sym) => { }}
				<div class="w-zbui-keyboard-item" data-export-id="{{@itemsAbcRu[]}}">{{=sym}}</div>
			{{ }); }}
			<div class="w-zbui-keyboard-item" data-export-id="{{@itemsAbcRu[]}}" data-keyboard-action="{{=AbstractKeyboardAction.TOGGLE_CAPS}}">&uarr;</div>
			<div class="w-zbui-keyboard-item" data-export-id="{{@itemsAbcRu[]}}" data-keyboard-action="{{=Action.LANG_EN}}">ABC</div>
		</div>
	</div>

В конструкторе виджета подключить раскладки:

	this._addLayout(this._exported.layoutAbcEn, this._exported.itemsAbcEn);
	this._addLayout(this._exported.layoutAbcRu, this._exported.itemsAbcRu);

И там же выбрать изначальную раскладку:

	this._setLayout(this._exported.layoutAbcEn);

Базовый набор действий находится в перечислении `Action` внутри модуля `ui/widgets/keyboard/abstract-keyboard`. Для их обработки нужно вызвать базовую
реализацию метода `_handleClick()`. Остальные действия обрабатываются при наследовании:

	/**
	 * @override
	 */
	_handleClick(action) {
		const isHandled = true;
		switch (action) {
			case KeyboardLayoutAction.LANG_RU:
				this.setLang(Lang.RU);
				break;
			case KeyboardLayoutAction.LANG_EN:
				this.setLang(Lang.EN);
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

## Интеграция с Input

Инстанс инпута можно передать при создании виджета:

	new Keyboard({
		input: this._exported.input
	})

Или используя метод `setInput`.
