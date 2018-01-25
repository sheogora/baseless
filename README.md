# Advanced LESS

## Extend
The best use for extends is to reduce the number of class declarations within the html. See the following example for declaring 3 types of messages. In our .html you will only have to use message-ok and will no longer require message.

```less
@ok: ok;
@warning: warning;
@error: error;
@success: #3abe87;
.message {
    color: #fff;
	width: auto;
	padding: 5px;
	text-align: center;

	span {
		padding: 5px;
	}
}
.message-color(@color) {
	background-color: lighten(@color, 45%);
	border-color: darken(@color, 20%);
}
.message-@{ok} {
	&:extend(.message all);
	.message-color(@success);
}
.message-@{warning} {
	&:extend(.message all);
	.message-color(orange);
}
.message-@{error} {
	&:extend(.message all);
	.message-color(red);
}
```

## Variables

### Nesting variable declarations
Interesting technique to access variable names within variable names by using the double at symbol.
```less
@number: 10;
@reference: number;
h1 { 
  size: @@reference; 
}
```
Compiled CSS :
```less
h1 {
  size: 10;
}
```

### Class variables

```less
@ok: ok;
@warning: warning;
@error: error;

.message-@{ok}{}
.message-@{warning}{}
.message-@{error}{}
```

### Media variables 
```less
@singleQuery: ~"tablet and (min-width: 500px)";

@media screen, @singleQuery {
  .set {
    color: white;
  }
}
```
Compiled LESS:
```less
@media screen, tablet and (min-width: 500px) {
  .set {
    color: white;
  }
}
```


## Mixins

### Common Mixins
The most common mixin use if not using the LESS prefixer is to create mixins that will do everything for you. Primarily to reduce clutter.
```less
.transition(@time: 0.2s, @ease: ease-in-out, @prop: all) {
	-webkit-transition: @prop @time @ease;
	-moz-transition: @prop @time @ease;
	-o-transition: @prop @time @ease;
	-ms-transition: @prop @time @ease;
	transition: @prop @time @ease;
}
```
```less
.transform (@rotate: 90deg, @scale: 1, @skew: 1deg, @translate: 10px) {
	-webkit-transform: rotate(@rotate) scale(@scale) skew(@skew) translate(@translate);
	-moz-transform: rotate(@rotate) scale(@scale) skew(@skew) translate(@translate);
	-o-transform: rotate(@rotate) scale(@scale) skew(@skew) translate(@translate);
	-ms-transform: rotate(@rotate) scale(@scale) skew(@skew) translate(@translate);
	transform: rotate(@rotate) scale(@scale) skew(@skew) translate(@translate);
}
```
```less
.box-shadow(@color: grey, @x: 0, @y: 5px, @blur: 10px) {
	-webkit-box-shadow: @x @y @blur @color;
	-moz-box-shadow: @x @y @blur @color;
	-box-shadow: @x @y @blur @color;
}
```
```less
.border-radius (@radius: 5px) {
	-webkit-border-radius: @radius;
	-moz-border-radius: @radius;
	border-radius: @radius;
}
```

### Imports
Using 2 different library versions without conflicts.
```less
.namespace-1-2-3() {
  @import "library-1.2.3.less";
}
.namespace-2-0-0() {
  @import "library-2.0.0.less";
}
#use-both-libraries-without-name-conflicts {
  .namespace-1-2-3 > .useful-mixin();
  .namespace-2-0-0 > .useful-mixin();
}
```

### Passing Lists to Mixins
Using colon inside mixin declaration, allows passing list as a single argument.
```less
.call(1, 2, 3; @color; @size); // assumes 3 variables where the first one is a list
.call(1, 2, 3); // assumes 3 variables
.call(1, 2, 3;); // assumes 1 variable that is a list
```
Useful situations where the following feature could be used:
```less
@scale: .one, .two, .three, .four, .five, .six;
.scale {
	.styleScale(@scale; #00ff00; 12px);
}
.styleScale (@list, @color, @size) {
   color: @color;
   width: @size;
   
   @{list} {
  	 color: @color;
   }
}
```
Compiled CSS:
```less
.scale {
  color: #00ff00;
  width: 12px;
}
.scale .one, .two, .three, .four, .five, .six {
  color: #00ff00;
}

```

### Variable Abstraction
Mixin private variables can be passed into classes and override the public declarations. This could be used to pass in a set of variables to a particular part of the application to override brand colors.
Less:
```less
.mixin() { 
	@clash: 45; //private
}
@clash: 0;
#call-mixin {
  .mixin();
  clash: @clash;
}
```
Compiled:
```css
#call-mixin {
  clash: 45;
}
```

## Other

### Math functions
LESS supports mathematical operations. Here are some examples:
``` less
font-size: 16 + 16px;
font-size: 16px * 2;
font-size: 32px / 2;

@list: 1, 26, 6, 9;
min(@list); // = 1
max(@list); // = 26
pi();
ceil();
floor();
round();
```
### Color manipulation
```less
saturate(@color, 20%);
desaturate(@color, 20%);
spin(@color, 20%);
fade(@color, 20%); // make transparrent
mix(@color, @color, 85%); // mix 2 colors
tint(@color, 20%);
shade(@color, 20%);
greyscale(@color);
/* identify best contrast color for background */
contrast(@color, darken(@color, 40%), lighten(@color, 40%), 40%);
```


### Resources Used
[Video Tutorials](https://www.safaribooksonline.com/library/view/learning-path/9781786467409/)
[Online LESS Compiler](http://winless.org/online-less-compiler)
[LESS Features](http://lesscss.org/features/)
[LESS vs SASS](https://gist.github.com/chriseppstein/674726)

### Future Reads
[Front End Handbook](https://www.frontendhandbook.com/)
[Object Oriented CSS](http://oocss.org/)
[Scalable and Modular Architecture for CSS](https://smacss.com/)
[Block Element Modifier](http://getbem.com/)