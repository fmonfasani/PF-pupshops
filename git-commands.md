## Uso de git para features (ramas de funciones especificas)

1. <git status> chequear el estado

On branch feature/migration-init
Your branch is up to date with 'origin/feature/migration-init'.
"

2. <git add .> agrega al estado stage los cambios

3. <git commit -m "first migration success">
   "[feature/migration-init dccd1e2] first migration success
   3 files changed, 43 insertions(+), 12 deletions(-)"
   ps/PupShops/back/pupshops (feature/migration-init)

4. <git branch> chequear en que rama estas

back

- feature/migration-init <aca indica que estamos en la rama feature>
  front
  main

5. <git branch -vv> Para ver si esta trackeado la rama local con la remota
   back 31beed3 typeorm config

- feature/migration-init dccd1e2 [origin/feature/migration-init: ahead 1] first migration success
  front fc0f350 [origin/front] resulucion de package json
  main 8a10093 [origin/main] Merge pull request #13 from fmonfasani/front

6. <git push> empuja todos los cambios commiteados
   Enumerating objects: 16, done.
   Counting objects: 100% (16/16), done.
   Delta compression using up to 8 threads
   Compressing objects: 100% (9/9), done.
   Writing objects: 100% (9/9), 1.93 KiB | 1.93 MiB/s, done.
   Total 9 (delta 4), reused 0 (delta 0), pack-reused 0 (from 0)
   remote: Resolving deltas: 100% (4/4), completed with 4 local objects.
   To https://github.com/fmonfasani/PF-pupshops.git
   1b81f16..dccd1e2 feature/migration-init -> feature/migration-init

7. <git status> me fijo en el estado en que estoy
   On branch feature/migration-init
   Your branch is up to date with 'origin/feature/migration-init'.

nothing to commit, working tree clean

8. <git branch> chequeo en que rama estoy
   back

- feature/migration-init
  front
  main"

9. <git checkout main> <OJOO!!!> me paso a la rama main
   Switched to branch 'main'
   Your branch is up to date with 'origin/main'.

10. <git status> chequeo y confirmo que estoy en la main
    Switched to branch 'main'
    Your branch is up to date with 'origin/main'.

11. <git pull origin main> me traigo todo lo del repo remoto desde origen
    remote: Enumerating objects: 2, done.
    remote: Counting objects: 100% (2/2), done.
    remote: Compressing objects: 100% (2/2), done.
    remote: Total 2 (delta 0), reused 0 (delta 0), pack-reused 0 (from 0)
    Unpacking objects: 100% (2/2), 1.78 KiB | 165.00 KiB/s, done.
    From https://github.com/fmonfasani/PF-pupshops

- branch main -> FETCH_HEAD
  8a10093..6abdfa3 main -> origin/main
  Updating 8a10093..6abdfa3
  Fast-forward
  PupShops/back/pupshops/package-lock.json | 87 +++++++--------
  PupShops/back/pupshops/package.json | 10 +-
  PupShops/back/pupshops/src/app.module.ts | 5 +-
  PupShops/back/pupshops/src/config/typeorm.ts | 15 ++-
  .../src/migrations/1726224990864-initial.ts | 42 ++++++++
  .../modules/locations/entities/location.entity.ts | 21 ++++
  .../modules/order/entities/order-detail.entity.ts | 64 ++++++-----
  .../src/modules/order/entities/order.entity.ts | 40 ++++---
  .../modules/products/entities/product.entity.ts | 118 ++++++++++-----------
  .../src/modules/users/entities/user.entity.ts | 16 +--
  .../pupshops/src/modules/users/users.module.ts | 3 +
  PupShops/back/pupshops/tsconfig.json | 6 +-
  12 files changed, 252 insertions(+), 175 deletions(-)
  create mode 100644 PupShops/back/pupshops/src/migrations/1726224990864-initial.ts
  create mode 100644 PupShops/back/pupshops/src/modules/locations/entities/location.entity.ts

10. <git merge feature/migration-init> <OJO!!>Esto lo estamos haciendo desde el github, o por aca con CLI  
    Already up to date.

11. <git branch -d feature/migration-init> Si ya termine mi feature (funcion), borro la rama local
    Deleted branch feature/migration-init (was dccd1e2).

12. <git push origin --delete feature/migration-init> <opcional> borro la rama remota
    To https://github.com/fmonfasani/PF-pupshops.git

- [deleted] feature/migration-init