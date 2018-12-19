---
title: MATH!
description: |
  I have added MathJax to my blog.
author: ThePicoNerd
date_posted: 2018-12-18 20:10:00
tags:
  - message
  - mathematics
---

## Look at it

I tried [MathJax](https://www.mathjax.org). I did not like it, nor do I recommend it. I came across [KaTeX](https://katex.org). I like it. Actually, I have come to the conclusion that KaTeX is just like MathJax, but with a few differences:

- It's faster! ⚡
- You don't have to bother with an annoying right-click menu... 💨

That's two reasons to use KaTeX. After all, two is more than zero.

The rendering is handled by the client. I tried rendering the math on the server, without any success. Here's a demo of what KaTeX can do:

$$
\frac{250}{5^2}
$$

Not impressive enough?

$$
E=mc^2
$$

Come on!

$$
F=G\frac{m_1m_2}{r^2}
$$

I know. This is the greatest idea of all time: Combining blogging with _math_! I am aware of the fact that not everyone's favorite subject is mathematics, but I like it. Once again, deal with it.

$$
x \in \mathbb{N}
$$

You still think it's worth a "meh"?

$$
\sum_{i = 1}^n -1^{i+1} + 2i
$$

There are greek letters, too. Just type `\alpha`, `\beta` or whatever letter you wish, and it will appear! It's like magic. Be careful, though. `\Alpha` is a whole other letter than `\alpha`:

```tex
\alpha \Alpha
```

Renders as:

$$
\alpha \Alpha 
$$

I will keep blogging about programming. But expect fancy formulas buried in the posts.

![Falcon Heavy Booster Landing](https://images.unsplash.com/photo-1517976547714-720226b864c1?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb)

*Did you know that rocket science involves some math?*


```javascript
var skills = new Set();

skills.add("javascript"); // That's what you are reading

while (!skills.has("math")) {
  await study("math");

  skills.add("math");
}
```
