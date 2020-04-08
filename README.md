# LazyLoad
Отложенная загрузка изображений

### Demo 
https://zholobovss.github.io/LazyLoad/


# Как подключить
Подключите `lazy.js` и `lazy.css` удобным для вас способом в ваш проект. 
Данные файлы располагаются в папке `build`:
  - build/lazy.js
  - build/lazy.css

Разместите картинку-заглушку в корне вашего проекта.
Данный файла располагаетсяв в папке `build`:
  - build/1x1.png

# Примеры использования
Данный скрипт позволяет настроить отложенную загрузку для следующих типов изображений:
  - одиночные изображения 
  - изображения входящие в состав слайдера
  - изображения установленные через css свойство `background или background-image`

### LazyLoad для `<img>` элементов
Разметка **ДО** внедрения:
```html
    <img src="some_path_to_your_image.png" atl="some alt">
```
Разметка **ПОСЛЕ** внедрения:
```html
    <img src="/1x1.png" 
         data-lazyload="some_path_to_your_image.png" 
         atl="some alt">
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
    <div data-lazyload class="block"></div>
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
