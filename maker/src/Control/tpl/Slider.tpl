<!-- <div data-type="Slider" id="{{cid}}" class="control ui-slider" data-loop="{{value.loop}}">
    {{#each value.content}}
        <div>
            <a href="{{href}}">
                <img lazyload="{{pic}}">
            </a>
            <p>{{title}}</p>
        </div>
    {{/each}}
</div> -->

<div id="{{cid}}" class="carousel slide" data-ride="carousel">
  <!-- Indicators -->
  <ol class="carousel-indicators">
    {{#each value.content}}
        <li data-target="#{{../cid}}" data-slide-to="{{@index}}" {{#compare @index 0}} {{else}} class="active" {{/compare}}></li>
    {{/each}}
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">
    {{#each value.content}}
        <div class="item {{#compare @index 0}} {{else}} active{{/compare}}">
          <img src="{{pic}}" alt="{{title}}">
          <div class="carousel-caption">
            {{title}}
          </div>
        </div>
    {{/each}}
  </div>

  <!-- Controls -->
  <a class="left carousel-control" href="#{{cid}}" role="button" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#{{cid}}" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
