---
id: git-notes
sidebar_position: 1
title: Git Notes
description: 'Helpful git notes'
---

Список git-алиасов

```bash
git config --list | grep alias
```

Переименовать последний коммит

```bash
git commit --amend -m <новое сообщение>
```

Докинуть файлы в последний коммит и запушить

```bash
git add . && git commit --amend --no-edit && git push --force
```

Поменять автора коммита

```bash
git commit --amend --author "Твоё имя <you@work.com>"
```

Отменить последний коммит

```bash
git reset HEAD~ # отменить только коммит
git reset --hard HEAD~ # отменить коммит и изменения
```

Взять файл из указанной ветки

```bash
git checkout origin/master file.txt
```

Сброс изменений файла (в индексе и в рабочей директории)

```bash
git checkout -- file.txt
```

Сброс пароля

```bash
git config --global --unset user.password
```
