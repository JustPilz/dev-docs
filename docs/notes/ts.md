---
id: ts
sidebar_position: 1
title: Typescript Notes
description: 'Helpful Typescript notes'
---

Условное добавление пропса в компонент. Если `onClick` существует (truthy), то он будет добавлен как проп, иначе — нет

```ts
<Component {...(onClick && { onClick })}>
```
