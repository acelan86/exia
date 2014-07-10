<exia:slider id="{{cid}}" class="control ui-slider" exia-loop="{{loop}}">
    {{#each items}}
        <div>
            <a href="{{url}}">
                <img lazyload="{{src}}">
            </a>
            <p>{{title}}</p>
        </div>
    {{/each}}
</exia:slider>