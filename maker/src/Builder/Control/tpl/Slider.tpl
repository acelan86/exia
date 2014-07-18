<div data-type="Slider" id="{{cid}}" class="control ui-slider" data-loop="{{value.loop}}">
    {{#each value.items}}
        <div>
            <a href="{{url}}">
                <img lazyload="{{src}}">
            </a>
            <p>{{title}}</p>
        </div>
    {{/each}}
</div>