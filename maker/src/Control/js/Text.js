exia.use('Builder.Control', function (Control) {
    "use strict";

    Control.register('Text', {
        icon : '',
        template : Handlebars.compile($('#TextControlTemplate').html()),
        properties : [
            {
                name : 'content',
                type : 'Text',
                pos : 1,
                defaults : {
                    label : '内容'
                }
            }
        ],
        defaults : {
            content : '<p>参考消息网6月29日报道 外媒称，中国国家主席习近平表示，无论变得多么强大，中国永远都不会称霸。</p><p>据美联社6月28日报道，习近平是在接待来访的印度和缅甸领导人时讲这番话的。近来，中国陷入与包括印度在内的多个邻国的领土争端，而且正在对美国的地区实力发起挑战。报道称，28日，习近平和缅甸总统吴登盛、印度副总统哈米德·安萨里一道举行活动，纪念三国共同发表和平共处五项原则60周年。</p>'
        }
    });
});