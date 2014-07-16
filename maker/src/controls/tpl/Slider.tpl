<div data-role="slider" id="{{cid}}" class="control ui-slider" data-loop="{{loop}}">
    {{#each items}}
        <div>
            <a href="{{url}}">
                <img lazyload="{{src}}">
            </a>
            <p>{{title}}</p>
        </div>
    {{/each}}
</div>