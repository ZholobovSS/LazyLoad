# LazyLoad
Отложенная загрузка изображений

# Как подключить
Подключите скрипт и таблицу стилей удобным для вас способом в ваш проект:
  - lazy.js
  - lazy.css

Разместите следующий файл в корне вашего проекта:
  - 1x1.png

# Примеры использования
Данный скрипт позволяет настроить отложенную загрузку для следующих типов изображений:
  - одиночные изображения 
  - изображения входящие в состав слайдера
  - изображения установленные через css свойство `background или background-image`

### LazyLoad для одиночных изображений
Разметка **ДО** внедрения:
```html
    <img src="some_path_to_your_image.png" atl="some alt">
```
Разметка **ПОСЛЕ** внедрения:
```html
    <div class="relative">
        <img src="/1x1.png" data-lazyload="some_path_to_your_image.png" atl="some alt">
        <div class="lazyload__loader">
			<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
		</div>
    </div>
```

### LazyLoad для слайдера
Разметка **ДО** внедрения:
```html
    <div class="some_class_for_slider_item"> // блок обертка для слайдера 
        <img src="some_path_to_your_image.png" 
             atl="some alt">
    </div>
```
Разметка **ПОСЛЕ** внедрения:
```html
    <div class="some_class_for_slider_item"> // блок обертка для слайдера
        <div class="relative">
            <img src="/1x1.png" 
                 data-lazyload="some_path_to_your_image.png"
                 data-lazyloadslider
                 atl="some alt">
            <div class="lazyload__loader">
    			<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    		</div>
        </div>
    </div>
```

### LazyLoad для фоновых изображений
Разметка **HTML ДО** внедрения:
```html
    <div class="block"></div>
```
Разметка **CSS ДО** внедрения:
```html
    .block {
        //some css rules here
        background: url(path_to_image.png);
    }
```

Разметка **HTML ПОСЛЕ** внедрения:
```html
    <div data-lazyloadbg class="block"></div>
```
Разметка **CSS ПОСЛЕ** внедрения:
```html
    .block {
        //some css rules here
    }
    
    .loaded.block {
        background: url(path_to_image.png);
    }
```
