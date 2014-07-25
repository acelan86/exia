<div id="{{cid}}" data-type="Navigator" class="control ui-nav">
    <ul>
    {{#each value.content}}
        <li><a href="{{url}}">{{text}}</a></li>
    {{/each}}
    </ul>
</div>