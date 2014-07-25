<div data-type="Slider" id="{{cid}}" class="control ui-slider" data-loop="{{value.loop}}">
    {{#each value.content}}
        <div>
            <a href="{{href}}">
                <img lazyload="{{pic}}">
            </a>
            <p>{{title}}</p>
        </div>
    {{/each}}
</div>