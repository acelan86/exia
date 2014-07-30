exia.use('Builder.Control', function (Control) {
    "use strict";

    Control.register('Media', {
        icon : '',
        template : Handlebars.compile($('#MediaControlTemplate').html()),
        properties : [
            {
                name : 'url',
                type : 'String',
                pos : 1
            },
            {
                name : 'pic',
                type : 'String',
                pos : 2
            },
            {
                name : 'title',
                type : 'String',
                pos : 3
            },
            {
                name : 'content',
                type : 'Text'
            }
        ],
        defaults : {
            url : "#test1",
            pic : "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjZWVlIi8+PHRleHQgdGV4dC1hbmNob3I9Im1pZGRsZSIgeD0iMzIiIHk9IjMyIiBzdHlsZT0iZmlsbDojYWFhO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjEycHg7Zm9udC1mYW1pbHk6QXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+NjR4NjQ8L3RleHQ+PC9zdmc+",
            title : "图片标题",
            content : 'xxxxxxx'
        }
    });
});