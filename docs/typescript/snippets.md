---
id: snippets
sidebar_position: 2
title: Сниппеты
description: 'Сниппеты TypeScript'
---

```ts
function isKeyOf<T extends object>(obj: T, key: any): key is keyof T {
  return key in obj;
}

isKeyOf(PLATFORM_STATUS_URLS, platform);
```
